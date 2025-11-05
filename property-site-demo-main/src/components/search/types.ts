// Types for the Property Search feature.
// These types are shared across the search bar UI and server actions.

export type PropertyType = 'residential' | 'commercial';

export type Purpose = 'rent' | 'buy';

export type Range = { min: number | null; max: number | null };

export type LocationValue = {
  city: string | null;
  area: string | null; // depends on city
};

export type SearchState = {
  type: PropertyType;
  purpose: Purpose;
  location: LocationValue;
  carpetArea: Range; // in sqft
  budget: Range; // in local currency
  amenities: string[]; // slugs/ids
};

export const DEFAULT_AREA_BOUNDS: Range = { min: 0, max: 10000 };


