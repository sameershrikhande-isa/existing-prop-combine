"use server";

import { redirect } from "next/navigation";
import type { SearchState } from "@/components/search/types";

// Server action to push URL with the search params. It can be extended to fetch data.
export async function searchPropertiesAction(formData: FormData) {
  const toStringOrNull = (v: FormDataEntryValue | null): string | null => (v ? String(v) : null);

  const type = toStringOrNull(formData.get("type")) ?? "residential";
  const purpose = toStringOrNull(formData.get("purpose")) ?? "rent";
  const city = toStringOrNull(formData.get("city"));
  const area = toStringOrNull(formData.get("area"));
  const minArea = toStringOrNull(formData.get("minArea"));
  const maxArea = toStringOrNull(formData.get("maxArea"));
  const minPrice = toStringOrNull(formData.get("minPrice"));
  const maxPrice = toStringOrNull(formData.get("maxPrice"));
  const amenities = toStringOrNull(formData.get("amenities"));

  const params = new URLSearchParams();
  params.set("type", type);
  params.set("purpose", purpose);
  if (city) params.set("city", city);
  if (area) params.set("area", area);
  if (minArea) params.set("minArea", minArea);
  if (maxArea) params.set("maxArea", maxArea);
  if (minPrice) params.set("minPrice", minPrice);
  if (maxPrice) params.set("maxPrice", maxPrice);
  if (amenities) params.set("amenities", amenities);

  redirect(`/?${params.toString()}`);
}

export function buildParamsFromState(state: SearchState): string {
  const params = new URLSearchParams();
  params.set("type", state.type);
  params.set("purpose", state.purpose);
  if (state.location.city) params.set("city", state.location.city);
  if (state.location.area) params.set("area", state.location.area);
  if (state.carpetArea.min !== null) params.set("minArea", String(state.carpetArea.min));
  if (state.carpetArea.max !== null) params.set("maxArea", String(state.carpetArea.max));
  if (state.budget.min !== null) params.set("minPrice", String(state.budget.min));
  if (state.budget.max !== null) params.set("maxPrice", String(state.budget.max));
  if (state.amenities.length) params.set("amenities", state.amenities.join(","));
  return params.toString();
}


