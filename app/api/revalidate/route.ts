import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

/**
 * API route for on-demand revalidation of cached data
 * POST /api/revalidate
 */
export async function POST(request: NextRequest) {
  try {
    const { tags, secret } = await request.json();

    // Validate the request
    if (!tags || !Array.isArray(tags)) {
      return NextResponse.json(
        { success: false, message: 'Missing or invalid tags parameter' },
        { status: 400 }
      );
    }

    // Optional: Validate a secret to prevent unauthorized revalidation
    const expectedSecret = process.env.REVALIDATION_SECRET;
    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json(
        { success: false, message: 'Invalid revalidation secret' },
        { status: 401 }
      );
    }

    // Revalidate each tag
    for (const tag of tags) {
      revalidateTag(tag);
    }

    return NextResponse.json({
      success: true,
      revalidated: true,
      message: `Revalidated ${tags.length} tags`,
      tags,
    });
  } catch (error) {
    console.error('Error revalidating:', error);
    return NextResponse.json(
      { success: false, message: 'Error revalidating tags' },
      { status: 500 }
    );
  }
}
