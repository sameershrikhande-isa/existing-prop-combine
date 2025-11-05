/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { LocationValue, Purpose, Range, SearchState, PropertyType } from "@/components/search/types";
import { DEFAULT_AREA_BOUNDS } from "@/components/search/types";

type UsePropertySearchOptions = {
  initialState?: Partial<SearchState>;
  areaBounds?: Range;
  budgetBounds?: Range;
};

const clamp = (value: number, min: number, max: number): number => {
  if (Number.isNaN(value)) return min;
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

const parseNumber = (v: string | null): number | null => {
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

const serializeRange = (r: Range): [string | null, string | null] => [
  r.min === null ? null : String(r.min),
  r.max === null ? null : String(r.max),
];

const coerceRangeWithin = (r: Range, bounds: Range): Range => {
  if (r.min !== null && r.max !== null && r.min > r.max) {
    // swap if out of order
    return { min: r.max, max: r.min };
  }
  const min = r.min === null ? null : clamp(r.min, bounds.min ?? 0, bounds.max ?? Number.MAX_SAFE_INTEGER);
  const max = r.max === null ? null : clamp(r.max, bounds.min ?? 0, bounds.max ?? Number.MAX_SAFE_INTEGER);
  return { min, max };
};

export const usePropertySearchState = (options: UsePropertySearchOptions = {}) => {
  const { initialState, areaBounds = DEFAULT_AREA_BOUNDS, budgetBounds = { min: 0, max: 100000000 } } = options;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlState = useMemo<Partial<SearchState>>(() => {
    if (!searchParams) return {};
    const type = (searchParams.get("type") as PropertyType) ?? undefined;
    const purpose = (searchParams.get("purpose") as Purpose) ?? undefined;
    const city = searchParams.get("city");
    const area = searchParams.get("area");
    const carpetArea: Range = { min: parseNumber(searchParams.get("minArea")), max: parseNumber(searchParams.get("maxArea")) };
    const budget: Range = { min: parseNumber(searchParams.get("minPrice")), max: parseNumber(searchParams.get("maxPrice")) };
    const amenities = searchParams.get("amenities")?.split(",").filter(Boolean) ?? [];
    return {
      type,
      purpose,
      location: { city: city ?? null, area: area ?? null },
      carpetArea,
      budget,
      amenities,
    } as Partial<SearchState>;
  }, [searchParams]);

  const mergedInitial: SearchState = {
    type: initialState?.type ?? (urlState.type ?? "residential"),
    purpose: initialState?.purpose ?? (urlState.purpose ?? "rent"),
    location: {
      city: initialState?.location?.city ?? (urlState.location?.city ?? null),
      area: initialState?.location?.area ?? (urlState.location?.area ?? null),
    },
    carpetArea: coerceRangeWithin(
      {
        min: initialState?.carpetArea?.min ?? (urlState.carpetArea?.min ?? null),
        max: initialState?.carpetArea?.max ?? (urlState.carpetArea?.max ?? null),
      },
      areaBounds
    ),
    budget: coerceRangeWithin(
      {
        min: initialState?.budget?.min ?? (urlState.budget?.min ?? null),
        max: initialState?.budget?.max ?? (urlState.budget?.max ?? null),
      },
      budgetBounds
    ),
    amenities: initialState?.amenities ?? (urlState.amenities ?? []),
  };

  const [state, setState] = useState<SearchState>(mergedInitial);

  // Ensure area is cleared if city changes.
  useEffect(() => {
    setState((s) => {
      if (s.location.city === null) return { ...s, location: { city: null, area: null } };
      return s;
    });
  }, [state.location.city]);

  const updateLocation = useCallback((loc: Partial<LocationValue>) => {
    setState((s) => {
      const nextCity = loc.city ?? s.location.city;
      const nextArea = nextCity !== s.location.city ? null : (loc.area ?? s.location.area);
      return { ...s, location: { city: nextCity, area: nextArea } };
    });
  }, []);

  const updateRange = useCallback((key: "carpetArea" | "budget", next: Range) => {
    setState((s) => {
      const bounds = key === "carpetArea" ? areaBounds : budgetBounds;
      return { ...s, [key]: coerceRangeWithin(next, bounds) } as SearchState;
    });
  }, [areaBounds, budgetBounds]);

  const toggleAmenity = useCallback((id: string) => {
    setState((s) => {
      const exists = s.amenities.includes(id);
      const amenities = exists ? s.amenities.filter((a) => a !== id) : [...s.amenities, id];
      return { ...s, amenities };
    });
  }, []);

  const setAmenities = useCallback((ids: string[]) => {
    setState((s) => ({ ...s, amenities: Array.from(new Set(ids)) }));
  }, []);

  const setType = useCallback((t: PropertyType) => setState((s) => ({ ...s, type: t })), []);
  const setPurpose = useCallback((p: Purpose) => setState((s) => ({ ...s, purpose: p })), []);

  const buildQuery = useCallback((next: SearchState) => {
    const params = new URLSearchParams();
    params.set("type", next.type);
    params.set("purpose", next.purpose);
    if (next.location.city) params.set("city", next.location.city);
    if (next.location.area) params.set("area", next.location.area);
    const [minAreaS, maxAreaS] = serializeRange(next.carpetArea);
    if (minAreaS) params.set("minArea", minAreaS);
    if (maxAreaS) params.set("maxArea", maxAreaS);
    const [minPriceS, maxPriceS] = serializeRange(next.budget);
    if (minPriceS) params.set("minPrice", minPriceS);
    if (maxPriceS) params.set("maxPrice", maxPriceS);
    if (next.amenities.length) params.set("amenities", next.amenities.join(","));
    return params.toString();
  }, []);

  const pushToUrl = useCallback((next?: SearchState) => {
    const data = next ?? state;
    const query = buildQuery(data);
    const url = query ? `${pathname}?${query}` : pathname;
    router.push(url);
  }, [state, buildQuery, router, pathname]);

  return {
    state,
    setState,
    setType,
    setPurpose,
    updateLocation,
    updateRange,
    toggleAmenity,
    setAmenities,
    pushToUrl,
  } as const;
};

export type UsePropertySearchStateReturn = ReturnType<typeof usePropertySearchState>;


