import { client } from "@/lib/sanity/client";
import { queryFilterRanges } from "@/lib/sanity/queries";
import type { FilterRange } from "@/types/filters";
import { NextRequest, NextResponse } from "next/server";

// Mark route as dynamic since it uses searchParams
export const dynamic = 'force-dynamic';

export const revalidate = 3600; // Cache for 1 hour

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const propertyTypeId = searchParams.get("propertyTypeId");
    const purposeId = searchParams.get("purposeId");
    const dimensionSlug = searchParams.get("dimensionSlug");

    if (!propertyTypeId || !purposeId || !dimensionSlug) {
      return NextResponse.json(
        { error: "Missing required parameters: propertyTypeId, purposeId, dimensionSlug" },
        { status: 400 }
      );
    }

    const ranges = await client.fetch<FilterRange[]>(queryFilterRanges, {
      propertyTypeId,
      purposeId,
      dimensionSlug,
    });

    return NextResponse.json({ ranges });
  } catch (error) {
    console.error("Error fetching filter ranges:", error);
    return NextResponse.json(
      { error: "Failed to fetch filter ranges" },
      { status: 500 }
    );
  }
}

