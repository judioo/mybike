import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

/**
 * Validate the revalidation secret
 */
function validateSecret(secret: string | null): boolean {
  const expectedSecret = process.env.REVALIDATION_SECRET;
  return !expectedSecret || secret === expectedSecret;
}

/**
 * Process tags for revalidation
 */
function processTags(tags: string[]): { success: boolean; message: string; tags: string[] } {
  try {
    // Revalidate each tag
    for (const tag of tags) {
      revalidateTag(tag);
    }
    
    return {
      success: true,
      message: `Revalidated ${tags.length} tags`,
      tags,
    };
  } catch (error) {
    console.error('Error revalidating tags:', error);
    return {
      success: false,
      message: 'Error revalidating tags',
      tags,
    };
  }
}

/**
 * API route for on-demand revalidation of cached data via POST
 * POST /api/revalidate
 * Body: { tags: string[], secret: string }
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

    // Validate secret
    if (!validateSecret(secret)) {
      return NextResponse.json(
        { success: false, message: 'Invalid revalidation secret' },
        { status: 401 }
      );
    }

    const result = processTags(tags);
    
    return NextResponse.json({
      ...result,
      revalidated: result.success,
    }, { status: result.success ? 200 : 500 });
  } catch (error) {
    console.error('Error in revalidation POST:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing revalidation request' },
      { status: 500 }
    );
  }
}

/**
 * API route for on-demand revalidation of cached data via GET
 * GET /api/revalidate?tag=tag-name&secret=your-secret
 * Multiple tags can be specified with tag=tag1&tag=tag2
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    const secret = searchParams.get('secret');
    
    // Get all tag parameters (supports multiple tag params)
    const tags: string[] = [];
    searchParams.forEach((value, key) => {
      if (key === 'tag' && value) {
        tags.push(value);
      }
    });
    
    // Validate the request
    if (tags.length === 0 && !tag) {
      return NextResponse.json(
        { success: false, message: 'Missing tag parameter' },
        { status: 400 }
      );
    }
    
    // Validate secret
    if (!validateSecret(secret)) {
      return NextResponse.json(
        { success: false, message: 'Invalid revalidation secret' },
        { status: 401 }
      );
    }
    
    // Use single tag if no multiple tags were found
    const tagsToProcess = tags.length > 0 ? tags : (tag ? [tag] : []);
    const result = processTags(tagsToProcess);
    
    return NextResponse.json({
      ...result,
      revalidated: result.success,
    }, { status: result.success ? 200 : 500 });
  } catch (error) {
    console.error('Error in revalidation GET:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing revalidation request' },
      { status: 500 }
    );
  }
}
