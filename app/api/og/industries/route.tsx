import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Get customizable parameters from query string
    const title = searchParams.get('title') || 'Industry Guides';
    const subtitle = searchParams.get('subtitle') || 'Spec-driven development across industries';

    // Fetch logo
    const logoUrl = new URL('/logo.png', req.url.replace('/api/og/industries', '')).toString();

    // Load fonts from local fonts directory
    const bebasFontPath = join(process.cwd(), 'public', 'fonts', 'BebasNeue-Regular.ttf');
    const bebasFontData = readFileSync(bebasFontPath);

    const spectralFontPath = join(process.cwd(), 'public', 'fonts', 'Spectral-Regular.ttf');
    const spectralFontData = readFileSync(spectralFontPath);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'hsl(160, 50%, 97%)',
            fontFamily: '"Bebas Neue", sans-serif',
            padding: '80px',
            position: 'relative',
          }}
        >
          {/* Background grid pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* Content container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '40px',
              zIndex: 1,
              maxWidth: '1000px',
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '8px 8px 0px 0px rgba(0, 0, 0, 1)',
                border: '4px solid #000000',
              }}
            >
              <img
                src={logoUrl}
                width="120"
                height="120"
                style={{
                  objectFit: 'contain',
                  imageRendering: 'crisp-edges',
                }}
              />
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 900,
                margin: 0,
                textAlign: 'center',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: '#000000',
                maxWidth: '95%',
                textTransform: 'uppercase',
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  margin: 0,
                  textAlign: 'center',
                  lineHeight: 1.4,
                  color: '#374151',
                  letterSpacing: '0em',
                  maxWidth: '90%',
                  fontFamily: '"Spectral", serif',
                }}
              >
                {subtitle}
              </p>
            )}

            {/* Industry label */}
            <div
              style={{
                display: 'flex',
                fontSize: '20px',
                fontWeight: 600,
                padding: '12px 28px',
                backgroundColor: '#000000',
                color: '#FFFFFF',
                borderRadius: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Industry Guide
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Bebas Neue',
            data: bebasFontData,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Spectral',
            data: spectralFontData,
            style: 'normal',
            weight: 400,
          },
        ],
      }
    );
  } catch (e: any) {
    console.error('Industries OG Image Error:', e);
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
}
