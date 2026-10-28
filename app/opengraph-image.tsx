import { ImageResponse } from 'next/og'
import { site } from '@/data/site'

export const alt = `${site.name} — ${site.shortRole}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0A1328',
          color: '#E6EDF7',
          padding: '72px 80px',
          border: '1px solid #22315A',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              backgroundColor: '#C8F03F',
              color: '#0A1328',
              fontSize: 22,
              fontWeight: 700,
              padding: '10px 18px',
              borderRadius: 8,
              boxShadow: '3px 3px 0 #000000',
            }}
          >
            {site.hero.chip}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: '#E6EDF7',
              maxWidth: 960,
            }}
          >
            {site.hero.title}
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.45,
              color: '#8A9BB8',
              maxWidth: 880,
            }}
          >
            React, Node.js and PostgreSQL for Shopify apps, multi-tenant SaaS platforms and LMS products.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 28,
            borderTop: '2px solid #38BDF8',
            fontSize: 24,
            color: '#E6EDF7',
          }}
        >
          <span style={{ fontWeight: 700 }}>{site.name}</span>
          <span style={{ color: '#8A9BB8' }}>{site.location}</span>
        </div>
      </div>
    ),
    size,
  )
}
