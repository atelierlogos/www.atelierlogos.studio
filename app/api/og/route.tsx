import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';

const icons = [
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/openai.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/claude-color.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/mcp.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/gemini-color.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/replit-color.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/cloudflare-color.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/exa-color.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/manus.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/v0.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/vllm-color.png",
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Get customizable parameters from query string
    const title = searchParams.get('title') || 'Atelier Logos';
    const subtitle = searchParams.get('subtitle') || 'Beautiful Software for Less 💵';

    // Fetch logo
    const logoUrl = new URL('/logo.png', req.url.replace('/api/og', '')).toString();

    // Load Bebas Neue font from local fonts directory
    const fontPath = join(process.cwd(), 'public', 'fonts', 'BebasNeue-Regular.ttf');
    const fontData = readFileSync(fontPath);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
            fontFamily: '"Bebas Neue", sans-serif',
          }}
        >
          {/* Left Side - Text and Logo */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '50%',
              height: '100%',
              padding: '80px 70px',
              borderRight: '1px solid #E5E7EB',
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                filter: 'drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08))',
              }}
            >
              <img
                src={logoUrl}
                width="200"
                height="200"
                style={{
                  objectFit: 'contain',
                  imageRendering: 'crisp-edges',
                }}
              />
            </div>

            {/* Title and Subtitle */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                gap: '20px',
              }}
            >
              <h1
                style={{
                  fontSize: '72px',
                  fontWeight: 700,
                  margin: 0,
                  textAlign: 'center',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: '#111827',
                  maxWidth: '90%',
                }}
              >
                {title}
              </h1>
              {subtitle && (
                <p
                  style={{
                    fontSize: '28px',
                    fontWeight: 400,
                    margin: 0,
                    textAlign: 'center',
                    lineHeight: 1.4,
                    color: '#6B7280',
                    letterSpacing: '-0.01em',
                    maxWidth: '90%',
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>

            {/* Bottom spacer for balance */}
            <div style={{ height: '40px' }} />
          </div>

          {/* Right Side - Icons Grid */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              width: '50%',
              height: '100%',
              padding: '80px 60px',
              background: 'linear-gradient(135deg, #FAFBFC 0%, #F3F4F6 100%)',
            }}
          >
            {icons.map((icon, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  width: '88px',
                  height: '88px',
                  borderRadius: '16px',
                  backgroundColor: '#FFFFFF',
                  padding: '14px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06), 0px 1px 2px rgba(0, 0, 0, 0.04)',
                  border: '1px solid rgba(0, 0, 0, 0.04)',
                }}
              >
                <img
                  src={icon}
                  width="60"
                  height="60"
                  style={{
                    objectFit: 'contain',
                    imageRendering: 'crisp-edges',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Bebas Neue',
            data: fontData,
            style: 'normal',
            weight: 400,
          },
        ],
      }
    );
  } catch (e: any) {
    console.error('OG Image Error:', e);
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
}
