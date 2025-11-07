import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Webhook endpoint for Sanity CMS to trigger revalidation
 * 
 * Environment Variable Required:
 * - SANITY_REVALIDATE_SECRET: Secret token to verify webhook requests
 *   Add this to your .env.local file: SANITY_REVALIDATE_SECRET=your-secret-token-here
 * 
 * Configure in Sanity Studio:
 * - Go to Project Settings → API → Webhooks
 * - Create webhook pointing to: https://yourdomain.com/api/revalidate?secret=your-secret-token-here
 * - Trigger on: create, update, delete
 * - Filter: _type == "homePage" || _type == "contactInfo"
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  // Verify secret token (set in env)
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { _type } = body;

    // Revalidate based on document type
    if (_type === 'homePage') {
      revalidatePath('/');
    } else if (_type === 'contactInfo') {
      revalidatePath('/contactus');
      revalidatePath('/', 'layout'); // Revalidate layout for navbar
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}

