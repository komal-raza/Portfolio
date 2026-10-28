import 'server-only'
import fs from 'node:fs'
import path from 'node:path'

export type Screenshot = {
  src: string
  width: number
  height: number
  alt: string
  /** Human-readable screen name derived from the filename. */
  label: string
  /** Sub-folder label (e.g. "Teacher portal"), if the image sits in one. */
  group?: string
  file: string
}

const PUBLIC_DIR = path.join(process.cwd(), 'public')
const SCREENSHOT_ROOT = 'ProjectImages'
const IMAGE_EXT = /\.(png|jpe?g|webp|gif|avif)$/i
const MAIN_FILE = /^main\.(png|jpe?g|webp|gif|avif)$/i

const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
export const naturalSort = (a: string, b: string) => {
  const aIsMain = MAIN_FILE.test(path.basename(a))
  const bIsMain = MAIN_FILE.test(path.basename(b))
  if (aIsMain && !bIsMain) return -1
  if (!aIsMain && bIsMain) return 1
  return collator.compare(a, b)
}

/** Display-only spelling fixes for filenames. The files themselves are never touched. */
const WORD_FIXES: Record<string, string> = {
  assignemnt: 'assignment',
  curriculm: 'curriculum',
  mangemnt: 'management',
  rolepermisison: 'role permission',
  listi: 'listing',
  mg: 'manager',
  virallaunch: 'viral launch',
}

/** "7-EditMediaAssetsAssociatedWithProductVariant.png" -> "Edit media assets associated with product variant" */
export function labelFromFilename(file: string) {
  let name = path.basename(file).replace(IMAGE_EXT, '')
  if (name.toLowerCase() === 'main') return 'Main overview'
  name = name.replace(/^\d+[-_.\s]+/, '') // leading sort number
  name = name.replace(/^localhost[_-]\d+[_-]?/i, '') // dev-server captures
  name = name.replace(/^[a-z0-9-]+(\.[a-z0-9-]+)+[_-]/i, '') // "sub.domain.site_cart" -> "cart"
  name = name.replace(/['’]s\b/g, 's') // "men'scollection"
  name = name
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .replace(/(\D)(\d+)$/, '$1 $2')
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => WORD_FIXES[word] ?? word)
    .join(' ')
    .replace(/\bmens\b/g, "men's")
    .replace(/\bwomens\b/g, "women's")
    .replace(/\bmob\b/g, 'mobile')
    .replace(/\bn\b/g, 'and')
    .trim()
  if (!name) return 'Screen'
  return name.charAt(0).toUpperCase() + name.slice(1)
}

/** Read width/height from PNG, JPEG, GIF or WebP headers without decoding the image. */
function readDimensions(filePath: string): { width: number; height: number } {
  const fd = fs.openSync(filePath, 'r')
  try {
    const head = Buffer.alloc(64)
    fs.readSync(fd, head, 0, 64, 0)

    // PNG
    if (head.readUInt32BE(0) === 0x89504e47) {
      return { width: head.readUInt32BE(16), height: head.readUInt32BE(20) }
    }
    // GIF
    if (head.toString('ascii', 0, 3) === 'GIF') {
      return { width: head.readUInt16LE(6), height: head.readUInt16LE(8) }
    }
    // WebP
    if (head.toString('ascii', 0, 4) === 'RIFF' && head.toString('ascii', 8, 12) === 'WEBP') {
      const chunk = head.toString('ascii', 12, 16)
      if (chunk === 'VP8X') return { width: 1 + head.readUIntLE(24, 3), height: 1 + head.readUIntLE(27, 3) }
      if (chunk === 'VP8L') {
        const bits = head.readUInt32LE(21)
        return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) }
      }
      return { width: head.readUInt16LE(26) & 0x3fff, height: head.readUInt16LE(28) & 0x3fff }
    }
    // JPEG: walk segments until a SOFn marker.
    if (head[0] === 0xff && head[1] === 0xd8) {
      const size = fs.fstatSync(fd).size
      const buf = Buffer.alloc(size)
      fs.readSync(fd, buf, 0, size, 0)
      let offset = 2
      while (offset < size) {
        if (buf[offset] !== 0xff) {
          offset++
          continue
        }
        const marker = buf[offset + 1]
        const length = buf.readUInt16BE(offset + 2)
        if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
          return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) }
        }
        offset += 2 + length
      }
    }
  } finally {
    fs.closeSync(fd)
  }
  return { width: 1600, height: 1000 }
}

function toScreenshot(relativeFile: string, projectName: string, group?: string): Screenshot {
  const abs = path.join(PUBLIC_DIR, SCREENSHOT_ROOT, relativeFile)
  const { width, height } = readDimensions(abs)
  const label = labelFromFilename(relativeFile)
  const src = `/${SCREENSHOT_ROOT}/${relativeFile.split(path.sep).map(encodeURIComponent).join('/')}`
  return {
    src,
    width,
    height,
    label,
    group,
    file: relativeFile,
    alt: `${projectName}${group ? `, ${group}` : ''}: ${label.charAt(0).toLowerCase()}${label.slice(1)} screen`,
  }
}

/**
 * Every image in `public/ProjectImages/<folder>`, natural-sorted (with `main.*` first).
 * One level of sub-folders is supported (each becomes a group, in `groupOrder` or natural order).
 * Adding a file to the folder adds it to the gallery on the next build.
 */
export function getScreenshots(
  folder: string,
  projectName: string,
  groupLabels: Record<string, string> = {},
  groupOrder: string[] = [],
): Screenshot[] {
  const dir = path.join(PUBLIC_DIR, SCREENSHOT_ROOT, folder)
  if (!fs.existsSync(dir)) return []

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = entries
    .filter((entry) => entry.isFile() && IMAGE_EXT.test(entry.name))
    .map((entry) => entry.name)
    .sort(naturalSort)
  const subfolders = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => {
      const ia = groupOrder.indexOf(a)
      const ib = groupOrder.indexOf(b)
      if (ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
      return naturalSort(a, b)
    })

  const rootGroup = subfolders.length > 0 ? 'Overview' : undefined
  const shots = files.map((file) => toScreenshot(path.join(folder, file), projectName, rootGroup))

  for (const sub of subfolders) {
    const group = groupLabels[sub] ?? labelFromFilename(sub)
    const subFiles = fs
      .readdirSync(path.join(dir, sub), { withFileTypes: true })
      .filter((entry) => entry.isFile() && IMAGE_EXT.test(entry.name))
      .map((entry) => entry.name)
      .sort(naturalSort)
    shots.push(...subFiles.map((file) => toScreenshot(path.join(folder, sub, file), projectName, group)))
  }

  return shots
}

/** A single named file from a project folder (used for hero and cover images). */
export function getScreenshot(folder: string, file: string, projectName: string, group?: string) {
  const abs = path.join(PUBLIC_DIR, SCREENSHOT_ROOT, folder, file)
  if (!fs.existsSync(abs)) return undefined
  return toScreenshot(path.join(folder, file), projectName, group)
}

/**
 * Resolves the cover screenshot for a project folder.
 * Prefers any file named `main.*` (e.g. `main.png`, `main.jpeg`) in the folder root,
 * falling back to the configured `fallbackFile`.
 */
export function getCoverScreenshot(folder: string, fallbackFile: string, projectName: string) {
  const dir = path.join(PUBLIC_DIR, SCREENSHOT_ROOT, folder)
  if (fs.existsSync(dir)) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    const mainEntry = entries.find((entry) => entry.isFile() && MAIN_FILE.test(entry.name))
    if (mainEntry) {
      return toScreenshot(path.join(folder, mainEntry.name), projectName)
    }
  }
  return getScreenshot(folder, fallbackFile, projectName)
}

/** All screenshot folders, so QA can confirm each one is mapped to a project. */
export function listScreenshotFolders() {
  const root = path.join(PUBLIC_DIR, SCREENSHOT_ROOT)
  if (!fs.existsSync(root)) return []
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
}
