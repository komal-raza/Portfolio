/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [96, 160, 240, 320, 480],
  },
  async redirects() {
    return [
      // Old case-study URLs from the previous version of the site.
      { source: '/work/:slug', destination: '/projects/:slug', permanent: true },
      { source: '/work', destination: '/projects', permanent: true },
    ]
  },
}

export default nextConfig
