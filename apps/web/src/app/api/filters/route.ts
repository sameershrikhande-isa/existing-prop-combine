import { client } from "@/lib/sanity/client";
import {
  queryAllAmenities,
  queryAllFilterDimensions,
  queryAllPropertyTypes,
  queryAllPurposes,
} from "@/lib/sanity/queries";
import type { PropertyAmenity, PropertyPurpose, PropertyType } from "@/types/property";
import type { FilterDimension } from "@/types/filters";
import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const [propertyTypes, purposes, amenities, filterDimensions] = await Promise.all([
      client.fetch<PropertyType[]>(queryAllPropertyTypes),
      client.fetch<PropertyPurpose[]>(queryAllPurposes),
      client.fetch<PropertyAmenity[]>(queryAllAmenities),
      client.fetch<FilterDimension[]>(queryAllFilterDimensions),
    ]);

    return NextResponse.json({
      propertyTypes,
      purposes,
      amenities,
      filterDimensions,
    });
  } catch (error) {
    console.error("Error fetching filter data:", error);
    return NextResponse.json(
      { error: "Failed to fetch filter data" },
      { status: 500 }
    );
  }
}

