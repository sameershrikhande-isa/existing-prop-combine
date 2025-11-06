import { client } from "@/lib/sanity/client";
import {
  queryAllAmenities,
  queryAllPropertyTypes,
  queryAllPurposes,
} from "@/lib/sanity/queries";
import type { PropertyAmenity, PropertyPurpose, PropertyType } from "@/types/property";
import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const [propertyTypes, purposes, amenities] = await Promise.all([
      client.fetch<PropertyType[]>(queryAllPropertyTypes),
      client.fetch<PropertyPurpose[]>(queryAllPurposes),
      client.fetch<PropertyAmenity[]>(queryAllAmenities),
    ]);

    return NextResponse.json({
      propertyTypes,
      purposes,
      amenities,
    });
  } catch (error) {
    console.error("Error fetching filter data:", error);
    return NextResponse.json(
      { error: "Failed to fetch filter data" },
      { status: 500 }
    );
  }
}

