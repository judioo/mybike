import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dimensions: string[] }> }
) {
  try {
    const { dimensions } = await params;

    // Parse dimensions (e.g., ["600", "600"] or ["600x600"])
    let width = 400;
    let height = 400;

    if (dimensions && dimensions.length > 0) {
      if (dimensions.length === 1) {
        // Handle format like "600x600"
        const parts = dimensions[0].split('x');
        if (parts.length === 2) {
          width = parseInt(parts[0]) || 400;
          height = parseInt(parts[1]) || 400;
        } else {
          // Single dimension, use as square
          width = height = parseInt(dimensions[0]) || 400;
        }
      } else if (dimensions.length >= 2) {
        // Handle format like ["600", "600"]
        width = parseInt(dimensions[0]) || 400;
        height = parseInt(dimensions[1]) || 400;
      }
    }

    // Limit dimensions to reasonable sizes
    width = Math.min(Math.max(width, 50), 2000);
    height = Math.min(Math.max(height, 50), 2000);

    // Generate a simple SVG placeholder
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <rect x="20%" y="20%" width="60%" height="60%" fill="#e5e7eb" rx="8"/>
        <circle cx="35%" cy="40%" r="8%" fill="#d1d5db"/>
        <polygon points="${width * 0.15},${height * 0.7} ${width * 0.4},${height * 0.45} ${width * 0.6},${height * 0.65} ${width * 0.85},${height * 0.4}" fill="#d1d5db"/>
        <text x="50%" y="85%" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.min(width, height) * 0.08}" fill="#9ca3af">
          ${width}×${height}
        </text>
      </svg>
    `;

    return new NextResponse(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('Error generating placeholder:', error);

    // Return a minimal fallback SVG
    const fallbackSvg = `
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#9ca3af">
          No Image
        </text>
      </svg>
    `;

    return new NextResponse(fallbackSvg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  }
}
