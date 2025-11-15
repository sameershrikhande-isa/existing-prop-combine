"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconHome2,
  IconBuildingSkyscraper,
  IconKey,
  IconHomeDollar,
  IconChevronRight,
  IconSearch,
  IconLoader2,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import * as Tabler from "@tabler/icons-react";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { DreamHomeIcon } from "@/components/ui/dream-home-icon";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PropertyAmenity, PropertyPurpose, PropertyType } from "@/types/property";
import type { FilterDimension, FilterRange } from "@/types/filters";

type FilterData = {
  propertyTypes: PropertyType[];
  purposes: PropertyPurpose[];
  amenities: PropertyAmenity[];
  filterDimensions: FilterDimension[];
};

type PropertySearchBarProps = {
  className?: string;
  isCompact?: boolean;
};

export const PropertySearchBar = ({ className, isCompact = false }: PropertySearchBarProps) => {
  const router = useRouter();
  const [filterData, setFilterData] = useState<FilterData | null>(null);
  const [loading, setLoading] = useState(true);

  // Search state
  const [selectedPropertyTypeId, setSelectedPropertyTypeId] = useState<string>("");
  const [selectedPurposeId, setSelectedPurposeId] = useState<string>("");
  const [selectedAmenityIds, setSelectedAmenityIds] = useState<string[]>([]);
  const [isAmenitiesOpenInline, setIsAmenitiesOpenInline] = useState(false);
  const [isAmenitiesOpenMobile, setIsAmenitiesOpenMobile] = useState(false);

  // Filter ranges state
  const [budgetRanges, setBudgetRanges] = useState<FilterRange[]>([]);
  const [carpetAreaRanges, setCarpetAreaRanges] = useState<FilterRange[]>([]);
  const [selectedBudgetRangeId, setSelectedBudgetRangeId] = useState<string>("");
  const [selectedCarpetAreaRangeId, setSelectedCarpetAreaRangeId] = useState<string>("");
  const [loadingRanges, setLoadingRanges] = useState(false);
  
  // Search loading state
  const [isSearching, setIsSearching] = useState(false);

  // Fetch filter data from API
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("/api/filters");
        if (!response.ok) throw new Error("Failed to fetch filters");
        const data = await response.json();
        setFilterData(data);

        // Read URL params to sync with current page state
        if (typeof window !== "undefined") {
          const urlParams = new URLSearchParams(window.location.search);
          const propertyTypeId = urlParams.get("propertyTypeId");
          const purposeId = urlParams.get("purposeId");
          const amenityIds = urlParams.get("amenityIds");

          // Set from URL if params exist and are valid, otherwise use defaults
          if (propertyTypeId && data.propertyTypes.some((t) => t._id === propertyTypeId)) {
            setSelectedPropertyTypeId(propertyTypeId);
          } else if (data.propertyTypes.length > 0) {
            setSelectedPropertyTypeId(data.propertyTypes[0]._id);
          }

          if (purposeId && data.purposes.some((p) => p._id === purposeId)) {
            setSelectedPurposeId(purposeId);
          } else if (data.purposes.length > 0) {
            setSelectedPurposeId(data.purposes[0]._id);
          }

          if (amenityIds) {
            const ids = amenityIds.split(",").filter((id) =>
              data.amenities.some((a) => a._id === id)
            );
            if (ids.length > 0) {
              setSelectedAmenityIds(ids);
            }
          }
        } else {
          // Fallback: Set defaults if no URL params (client-side only)
        if (data.propertyTypes.length > 0) {
          setSelectedPropertyTypeId(data.propertyTypes[0]._id);
        }
        if (data.purposes.length > 0) {
          setSelectedPurposeId(data.purposes[0]._id);
          }
        }
      } catch (error) {
        console.error("Error fetching filter data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  // Fetch filter ranges when propertyType or purpose changes
  useEffect(() => {
    const fetchFilterRanges = async () => {
      if (!selectedPropertyTypeId || !selectedPurposeId || !filterData) return;

      setLoadingRanges(true);
      try {
        // Find budget and carpet area dimensions
        const budgetDimension = filterData.filterDimensions.find(
          (d) => d.slug === "budget"
        );
        const carpetAreaDimension = filterData.filterDimensions.find(
          (d) => d.slug === "carpet-area"
        );

        const promises: Promise<{ ranges: FilterRange[] }>[] = [];

        // Fetch budget ranges
        if (budgetDimension) {
          promises.push(
            fetch(
              `/api/filter-ranges?propertyTypeId=${selectedPropertyTypeId}&purposeId=${selectedPurposeId}&dimensionSlug=${budgetDimension.slug}`
            ).then((res) => res.json())
          );
        } else {
          promises.push(Promise.resolve({ ranges: [] }));
        }

        // Fetch carpet area ranges
        if (carpetAreaDimension) {
          promises.push(
            fetch(
              `/api/filter-ranges?propertyTypeId=${selectedPropertyTypeId}&purposeId=${selectedPurposeId}&dimensionSlug=${carpetAreaDimension.slug}`
            ).then((res) => res.json())
          );
        } else {
          promises.push(Promise.resolve({ ranges: [] }));
        }

        const [budgetResponse, carpetAreaResponse] = await Promise.all(promises);

        const newBudgetRanges = budgetResponse.ranges || [];
        const newCarpetAreaRanges = carpetAreaResponse.ranges || [];

        setBudgetRanges(newBudgetRanges);
        setCarpetAreaRanges(newCarpetAreaRanges);

        // Sync with URL params if they exist
        if (typeof window !== "undefined") {
          const urlParams = new URLSearchParams(window.location.search);
          const budgetMin = urlParams.get("budgetMin");
          const budgetMax = urlParams.get("budgetMax");
          const carpetAreaMin = urlParams.get("carpetAreaMin");
          const carpetAreaMax = urlParams.get("carpetAreaMax");

          // Find matching budget range from URL params
          if (budgetMin || budgetMax) {
            const matchingBudgetRange = newBudgetRanges.find((r) => {
              const minMatch = budgetMin ? r.minValue === Number.parseInt(budgetMin, 10) : true;
              const maxMatch = budgetMax ? r.maxValue === Number.parseInt(budgetMax, 10) : true;
              return minMatch && maxMatch;
            });
            if (matchingBudgetRange) {
              setSelectedBudgetRangeId(matchingBudgetRange._id);
            } else {
              setSelectedBudgetRangeId("");
            }
          } else {
            setSelectedBudgetRangeId("");
          }

          // Find matching carpet area range from URL params
          if (carpetAreaMin || carpetAreaMax) {
            const matchingAreaRange = newCarpetAreaRanges.find((r) => {
              const minMatch = carpetAreaMin ? r.minValue === Number.parseInt(carpetAreaMin, 10) : true;
              const maxMatch = carpetAreaMax ? r.maxValue === Number.parseInt(carpetAreaMax, 10) : true;
              return minMatch && maxMatch;
            });
            if (matchingAreaRange) {
              setSelectedCarpetAreaRangeId(matchingAreaRange._id);
            } else {
              setSelectedCarpetAreaRangeId("");
            }
          } else {
            setSelectedCarpetAreaRangeId("");
          }
        } else {
          // Reset selections when ranges change (no URL params)
        setSelectedBudgetRangeId("");
        setSelectedCarpetAreaRangeId("");
        }
      } catch (error) {
        console.error("Error fetching filter ranges:", error);
      } finally {
        setLoadingRanges(false);
      }
    };

    fetchFilterRanges();
  }, [selectedPropertyTypeId, selectedPurposeId, filterData]);

  const handleToggleAmenity = useCallback((id: string) => {
    setSelectedAmenityIds((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  }, []);

  const handleSearch = useCallback(() => {
    setIsSearching(true);
    
    const params = new URLSearchParams();

    if (selectedPropertyTypeId) {
      params.set("propertyTypeId", selectedPropertyTypeId);
    }
    if (selectedPurposeId) {
      params.set("purposeId", selectedPurposeId);
    }

    // Add budget range params
    if (selectedBudgetRangeId) {
      const selectedRange = budgetRanges.find((r) => r._id === selectedBudgetRangeId);
      if (selectedRange) {
        params.set("budgetMin", selectedRange.minValue.toString());
        if (selectedRange.maxValue) {
          params.set("budgetMax", selectedRange.maxValue.toString());
        }
      }
    }

    // Add carpet area range params
    if (selectedCarpetAreaRangeId) {
      const selectedRange = carpetAreaRanges.find(
        (r) => r._id === selectedCarpetAreaRangeId
      );
      if (selectedRange) {
        params.set("carpetAreaMin", selectedRange.minValue.toString());
        if (selectedRange.maxValue) {
          params.set("carpetAreaMax", selectedRange.maxValue.toString());
        }
      }
    }

    if (selectedAmenityIds.length > 0) {
      params.set("amenityIds", selectedAmenityIds.join(","));
    }

    router.push(`/properties?${params.toString()}`);
    
    // Reset loading state after a short delay (navigation happens quickly)
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  }, [
    selectedPropertyTypeId,
    selectedPurposeId,
    selectedBudgetRangeId,
    selectedCarpetAreaRangeId,
    selectedAmenityIds,
    budgetRanges,
    carpetAreaRanges,
    router,
  ]);

  // Skeleton component for initial loading
  const SearchBarSkeleton = () => (
    <div className={cn("rounded-3xl bg-black/10 dark:bg-white/5 p-2 backdrop-blur-md", className)}>
      <div className="relative z-0 w-full overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-900 border-[0.5px] border-black/8 dark:border-white/8 shadow-2xl shadow-black/10">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 rounded-2xl p-px content-['']
          [background:linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0)_35%),linear-gradient(315deg,rgba(255,255,255,0.55),rgba(255,255,255,0)_35%)]
          dark:[background:linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0)_35%),linear-gradient(315deg,rgba(255,255,255,0.12),rgba(255,255,255,0)_35%)]
          [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] mask-exclude
          [-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [-webkit-mask-composite:xor]"
        />
        
        {/* Title skeleton */}
        <div className={cn("pt-4", isCompact ? "px-4 sm:px-5 lg:px-4 lg:pt-3" : "px-4 sm:px-6")}>
          <div className={cn("flex items-center justify-center gap-2", isCompact ? "mb-4 md:mb-4 lg:mb-3" : "mb-4 md:mb-6")}>
            <div className="h-8 w-40 sm:h-9 sm:w-48 animate-pulse rounded bg-black/10 dark:bg-white/10" />
            <div className={cn("animate-pulse rounded-full bg-black/10 dark:bg-white/10", isCompact ? "h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-6 lg:w-6" : "h-7 w-7 sm:h-8 sm:w-8")} />
          </div>
          
          {/* Property Type & Purpose skeleton */}
          <div className={cn("flex flex-col md:flex-row items-center justify-center", isCompact ? "gap-1 md:gap-1 lg:gap-1" : "gap-3 md:gap-6")}>
            {/* Property Type skeleton */}
            <div className="w-full md:w-auto flex flex-col md:flex-row md:items-center gap-2">
              <div className={cn("h-3 w-12 animate-pulse rounded bg-black/10 dark:bg-white/10 hidden md:block", isCompact ? "text-[11px]" : "")} />
              <div className="flex rounded-full p-1 bg-black/5 dark:bg-white/10 w-full md:w-auto">
                <div className={cn("animate-pulse rounded-full bg-black/10 dark:bg-white/10 mr-2", isCompact ? "h-10 w-24 md:h-8 md:w-20 lg:h-7 lg:w-16" : "h-10 w-24 md:h-8 md:w-20")} />
                <div className={cn("animate-pulse rounded-full bg-black/10 dark:bg-white/10", isCompact ? "h-10 w-32 md:h-8 md:w-28 lg:h-7 lg:w-24" : "h-10 w-32 md:h-8 md:w-28")} />
              </div>
            </div>
            
            {/* Separator skeleton */}
            <div className="hidden md:block h-6 w-px animate-pulse bg-black/10 dark:bg-white/10 mx-1" />
            
            {/* Purpose skeleton */}
            <div className="w-full md:w-auto flex flex-col md:flex-row md:items-center gap-2 justify-start md:justify-center">
              <div className={cn("h-3 w-16 animate-pulse rounded bg-black/10 dark:bg-white/10 hidden md:block", isCompact ? "text-xs" : "text-[11px]")} />
              <div className="flex rounded-full p-1 bg-black/5 dark:bg-white/10 w-full md:w-auto">
                <div className={cn("animate-pulse rounded-full bg-black/10 dark:bg-white/10 mr-2", isCompact ? "h-10 w-20 md:h-8 md:w-16 lg:h-7 lg:w-14" : "h-10 w-20 md:h-8 md:w-16")} />
                <div className={cn("animate-pulse rounded-full bg-black/10 dark:bg-white/10", isCompact ? "h-10 w-20 md:h-8 md:w-16 lg:h-7 lg:w-14" : "h-10 w-20 md:h-8 md:w-16")} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Filter ranges skeleton */}
        <div className={cn(isCompact ? "px-4 sm:px-5 lg:px-4" : "px-4 sm:px-6")}>
          <div className={cn("h-px w-full animate-pulse bg-black/10 dark:bg-white/10", isCompact ? "my-3 md:my-3 lg:my-2" : "my-3 md:my-4")} />
        </div>
        
        <div className={cn("pb-4", isCompact ? "px-4 sm:px-5 lg:px-4 lg:pb-3" : "px-4 sm:px-6")}>
          <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", isCompact && "lg:gap-3")}>
            {/* Budget skeleton */}
            <div className="flex flex-col gap-2">
              <div className={cn("h-4 w-20 animate-pulse rounded bg-black/10 dark:bg-white/10", isCompact ? "text-sm lg:text-xs" : "text-xs")} />
              <div className="h-10 w-full animate-pulse rounded-lg bg-black/10 dark:bg-white/10" />
            </div>
            {/* Carpet Area skeleton */}
            <div className="flex flex-col gap-2">
              <div className={cn("h-4 w-24 animate-pulse rounded bg-black/10 dark:bg-white/10", isCompact ? "text-sm lg:text-xs" : "text-xs")} />
              <div className="h-10 w-full animate-pulse rounded-lg bg-black/10 dark:bg-white/10" />
            </div>
            {/* Amenities skeleton (desktop) */}
            <div className="hidden md:flex flex-col gap-2">
              <div className={cn("h-4 w-20 animate-pulse rounded bg-black/10 dark:bg-white/10", isCompact ? "text-sm" : "text-xs")} />
              <div className="h-10 w-full animate-pulse rounded-lg bg-black/10 dark:bg-white/10" />
            </div>
          </div>
        </div>
        
        {/* Amenities skeleton (mobile) */}
        <div className={cn("pb-4 md:hidden", isCompact ? "px-4 sm:px-5" : "px-4 sm:px-6")}>
          <div className="h-10 w-full animate-pulse rounded-lg bg-black/10 dark:bg-white/10" />
        </div>
        
        {/* Search button skeleton */}
        <div className={cn("pb-4", isCompact ? "px-4 sm:px-5 lg:px-4 lg:pb-3" : "px-4 sm:px-6")}>
          <div className={cn("animate-pulse rounded-2xl md:rounded-xl bg-black/10 dark:bg-white/10", isCompact ? "h-12 lg:h-10" : "h-14")} />
        </div>
        </div>
      </div>
    );

  if (loading) {
    return <SearchBarSkeleton />;
  }

  if (!filterData) {
    return null;
  }

  type IconComponent = React.ComponentType<{ size?: number; className?: string }>;
  const resolveTabler = (name: string): IconComponent => {
    const map = Tabler as unknown as Record<string, IconComponent>;
    return map[name] ?? map["IconCircle"];
  };

  type Option = { value: string; label: string };
  const SingleSelect = ({
    value,
    onChange,
    placeholder,
    options,
    className,
  }: {
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    options: Option[];
    className?: string;
  }) => {
    const [open, setOpen] = useState(false);
    const selected = options.find((o) => o.value === value)?.label ?? "";
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-controls="property-type-listbox"
            className={cn(
              "w-full flex items-center justify-between gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-black px-3 py-2 text-left transition-colors hover:bg-black/5 dark:hover:bg-white/5",
              isCompact ? "text-base" : "text-sm",
              className
            )}
          >
            <span className={selected ? "text-black dark:text-white" : "text-black/70 dark:text-white/70"}>
              {selected || placeholder}
            </span>
            <ChevronsUpDown className={cn("shrink-0 opacity-50", isCompact ? "size-5" : "size-4")} />
          </button>
        </PopoverTrigger>
        <PopoverContent 
          align="start"
          className={cn(
            "z-[1000] w-[var(--radix-popover-trigger-width)] p-0 !bg-white dark:!bg-black shadow-xl border border-black/10 dark:border-white/10"
          )}
        >
          <Command>
            <CommandList className="max-h-60 overflow-auto">
              <CommandGroup>
                {options.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={(current) => {
                      onChange(current === value ? "" : current);
                      setOpen(false);
                    }}
                  >
                    <Check className={cn("mr-2 size-4", value === opt.value ? "opacity-100" : "opacity-0")} />
                    {opt.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className={cn("rounded-3xl bg-black/10 dark:bg-white/5 p-2 backdrop-blur-md", className)}>
    <div
      className={"relative z-0 w-full overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-900 border-[0.5px] border-black/8 dark:border-white/8 shadow-2xl shadow-black/10"}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl p-px content-['']
        [background:linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0)_35%),linear-gradient(315deg,rgba(255,255,255,0.55),rgba(255,255,255,0)_35%)]
        dark:[background:linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0)_35%),linear-gradient(315deg,rgba(255,255,255,0.12),rgba(255,255,255,0)_35%)]
        [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] mask-exclude
        [-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [-webkit-mask-composite:xor]  "
      />

      <div className={cn("pt-4", isCompact ? "px-4 sm:px-5 lg:px-4 lg:pt-3" : "px-4 sm:px-6")}>
        <h2 className={cn("font-bold text-black dark:text-white text-center flex items-center justify-center gap-2", isCompact ? "text-2xl sm:text-2xl md:text-2xl lg:text-xl mb-4 md:mb-4 lg:mb-3" : "text-2xl sm:text-3xl mb-4 md:mb-6")}>
          Find your dream
          <DreamHomeIcon className={cn(isCompact ? "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-6 lg:h-6" : "w-7 h-7 sm:w-8 sm:h-8")} aria-hidden />
        </h2>
        <div className={cn("flex flex-col md:flex-row items-center justify-center", isCompact ? "gap-1 md:gap-1 lg:gap-1" : "gap-3 md:gap-6")}>
          {/* Property Type Selection */}
          <div className="w-full md:w-auto flex flex-col md:flex-row md:items-center gap-2">
            <span className={cn("font-medium text-black/60 dark:text-white/60 uppercase tracking-wide", isCompact ? "hidden md:block lg:hidden text-[11px]" : "hidden md:block text-[11px]")}>
              Type
            </span>
            <div className="flex rounded-full p-1 bg-black/5 dark:bg-white/10 w-full md:w-auto">
              {filterData.propertyTypes.map((type) => {
                const isResidential = type.name.toLowerCase().includes("residential");
                const Icon = isResidential ? IconHome2 : IconBuildingSkyscraper;
                const isSelected = selectedPropertyTypeId === type._id;

                return (
                  <button
                    key={type._id}
                    type="button"
                    onClick={() => setSelectedPropertyTypeId(type._id)}
                    className={cn("flex-1 md:flex-none px-4 py-2.5 md:py-1.5 lg:px-3 lg:py-1.5 rounded-full transition-colors", isCompact ? "text-base md:text-sm lg:text-sm" : "text-base md:text-sm", isSelected
                        ? "bg-white dark:bg-black text-black dark:text-white shadow-md md:shadow lg:shadow"
                        : "text-black/70 dark:text-white/70")}
                    aria-pressed={isSelected}
                  >
                    <span className="inline-flex items-center justify-center gap-1.5 lg:gap-1.5">
                      <Icon size={18} className="lg:w-5 lg:h-5" aria-hidden />
                      <span>{type.name}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <Separator
            orientation="vertical"
            className="hidden md:block h-6 bg-black/10 dark:bg-white/10 mx-1"
          />

          {/* Purpose Selection */}
          <div className="w-full md:w-auto flex flex-col md:flex-row md:items-center gap-2 justify-start md:justify-center">
            <span className={cn("font-medium text-black/60 dark:text-white/60 uppercase tracking-wide", isCompact ? "hidden md:block lg:hidden text-xs" : "hidden md:block text-[11px]")}>
              Purpose
            </span>
            <div className="flex rounded-full p-1 bg-black/5 dark:bg-white/10 w-full md:w-auto">
              {filterData.purposes.map((purpose) => {
                const isRent = purpose.name.toLowerCase().includes("rent");
                const Icon = isRent ? IconKey : IconHomeDollar;
                const isSelected = selectedPurposeId === purpose._id;

                return (
                  <button
                    key={purpose._id}
                    type="button"
                    onClick={() => setSelectedPurposeId(purpose._id)}
                    className={cn("flex-1 md:flex-none px-4 py-2.5 md:py-1.5 lg:px-4 lg:py-1.5 rounded-full transition-colors", isCompact ? "text-base md:text-sm lg:text-sm" : "text-base md:text-sm", isSelected
                        ? "bg-white dark:bg-black text-black dark:text-white shadow-md md:shadow lg:shadow"
                        : "text-black/70 dark:text-white/70")}
                    aria-pressed={isSelected}
                  >
                    <span className="inline-flex items-center justify-center gap-1.5 lg:gap-1.5">
                      <Icon size={18} className="lg:w-5 lg:h-5" aria-hidden />
                      <span>{purpose.name}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Ranges Section */}
      {(loadingRanges || budgetRanges.length > 0 || carpetAreaRanges.length > 0) && (
        <>
          <div className={cn(isCompact ? "px-4 sm:px-5 lg:px-4" : "px-4 sm:px-6")}>
            <Separator className={cn("bg-black/10 dark:bg-white/10", isCompact ? "my-3 md:my-3 lg:my-2" : "my-3 md:my-4")} />
          </div>

          <div className={cn("pb-4", isCompact ? "px-4 sm:px-5 lg:px-4 lg:pb-3" : "px-4 sm:px-6")}>
            {loadingRanges ? (
              // Skeleton for filter ranges while loading
              <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", isCompact && "lg:gap-3")}>
                <div className="flex flex-col gap-2">
                  <div className={cn("h-4 w-20 animate-pulse rounded bg-black/10 dark:bg-white/10", isCompact ? "text-sm lg:text-xs" : "text-xs")} />
                  <div className="h-10 w-full animate-pulse rounded-lg bg-black/10 dark:bg-white/10" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className={cn("h-4 w-24 animate-pulse rounded bg-black/10 dark:bg-white/10", isCompact ? "text-sm lg:text-xs" : "text-xs")} />
                  <div className="h-10 w-full animate-pulse rounded-lg bg-black/10 dark:bg-white/10" />
                </div>
                <div className="hidden md:flex flex-col gap-2">
                  <div className={cn("h-4 w-20 animate-pulse rounded bg-black/10 dark:bg-white/10", isCompact ? "text-sm" : "text-xs")} />
                  <div className="h-10 w-full animate-pulse rounded-lg bg-black/10 dark:bg-white/10" />
                </div>
              </div>
            ) : (
              <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 items-start", isCompact && "lg:gap-3")}>
              {/* Budget Range */}
              {budgetRanges.length > 0 && (
                <div className="flex flex-col gap-2">
                    <label className={cn("font-medium text-black/70 dark:text-white/70", isCompact ? "text-sm lg:text-xs" : "text-xs")}>
                      Budget{!isCompact && " (Optional)"}
                  </label>
                  <SingleSelect
                    value={selectedBudgetRangeId}
                    onChange={setSelectedBudgetRangeId}
                    placeholder="Any budget"
                    options={[
                      { value: "", label: "Any budget" },
                      ...budgetRanges.map((r) => ({ value: r._id, label: r.label }))
                    ]}
                  />
                </div>
              )}

              {/* Carpet Area Range */}
              {carpetAreaRanges.length > 0 && (
                <div className="flex flex-col gap-2">
                    <label className={cn("font-medium text-black/70 dark:text-white/70", isCompact ? "text-sm lg:text-xs" : "text-xs")}>
                      Carpet Area{!isCompact && " (Optional)"}
                  </label>
                  <SingleSelect
                    value={selectedCarpetAreaRangeId}
                    onChange={setSelectedCarpetAreaRangeId}
                    placeholder="Any size"
                    options={[
                      { value: "", label: "Any size" },
                      ...carpetAreaRanges.map((r) => ({ value: r._id, label: r.label }))
                    ]}
                  />
                </div>
              )}

              {/* Amenities inline on md+ */}
              <div className="hidden md:flex flex-col gap-2">
                  <span className={cn("font-medium text-black/70 dark:text-white/70", isCompact ? "text-sm" : "text-xs")}>Amenities</span>
                <Popover open={isAmenitiesOpenInline} onOpenChange={setIsAmenitiesOpenInline}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      aria-expanded={isAmenitiesOpenInline}
                        className={cn("w-full flex items-center justify-between gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-black px-3 py-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5", isCompact ? "text-base" : "text-sm")}
                    >
                      <span className="text-black dark:text-white">Amenities</span>
                        <span className="inline-flex items-center gap-2">
                          {selectedAmenityIds.length > 0 && (
                        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/90 text-white text-xs px-1">
                          {selectedAmenityIds.length}
                            </span>
                          )}
                          <ChevronsUpDown className={cn("shrink-0 opacity-50", isCompact ? "size-5" : "size-4")} />
                        </span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent 
                    align="start" 
                    className={cn(
                      "z-[1000] w-[280px] p-0 !bg-white dark:!bg-black shadow-xl border border-black/10 dark:border-white/10"
                    )}
                  >
                    <Command>
                      <CommandList className="max-h-64 overflow-auto">
                        <CommandGroup>
                          {filterData.amenities.map((amenity) => {
                            const checked = selectedAmenityIds.includes(amenity._id);
                            const AmenityIcon = resolveTabler(amenity.iconName || "IconCircle");
                            return (
                              <CommandItem
                                key={amenity._id}
                                value={amenity.name}
                                onSelect={() => handleToggleAmenity(amenity._id)}
                                className="flex items-center justify-between gap-3 px-3 py-2"
                              >
                                <span className="flex items-center gap-2 text-sm">
                                  <AmenityIcon size={16} className="text-black/70 dark:text-white/70" aria-hidden />
                                  <span className="text-black dark:text-white">{amenity.name}</span>
                                </span>
                                <Checkbox
                                  checked={checked}
                                  className="pointer-events-none data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
                                />
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                    <div className="flex items-center justify-between p-3 border-t border-black/10 dark:border-white/10">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedAmenityIds([])}
                      >
                        Clear
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setIsAmenitiesOpenInline(false)}
                        className="bg-primary text-white hover:bg-primary/90 dark:bg-primary dark:text-white"
                      >
                        Done
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            )}
          </div>
        </>
      )}

      {/* Amenities Section - mobile only */}
      {filterData.amenities.length > 0 && (
        <>
          <div className={cn("pb-4 md:hidden", isCompact ? "px-4 sm:px-5" : "px-4 sm:px-6")}>
            <Popover open={isAmenitiesOpenMobile} onOpenChange={setIsAmenitiesOpenMobile}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-expanded={isAmenitiesOpenMobile}
                  className="w-full flex items-center justify-between gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-black px-3 py-2 text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <span className="text-black dark:text-white">Amenities</span>
                  <span className="inline-flex items-center gap-2">
                    {selectedAmenityIds.length > 0 && (
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/90 text-white text-xs px-1">
                      {selectedAmenityIds.length}
                    </span>
                  )}
                    <ChevronsUpDown className={cn("shrink-0 opacity-50", isCompact ? "size-5" : "size-4")} />
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent 
                align="start" 
                className={cn(
                  "z-[1000] w-[280px] p-0 !bg-white dark:!bg-black shadow-xl border border-black/10 dark:border-white/10"
                )}
              >
                <Command>
                  <CommandList className="max-h-64 overflow-auto">
                    <CommandGroup>
                      {filterData.amenities.map((amenity) => {
                        const checked = selectedAmenityIds.includes(amenity._id);
                        const AmenityIcon = resolveTabler(amenity.iconName || "IconCircle");
                        return (
                          <CommandItem
                            key={amenity._id}
                            value={amenity.name}
                            onSelect={() => handleToggleAmenity(amenity._id)}
                            className="flex items-center justify-between gap-3 px-3 py-2"
                          >
                            <span className="flex items-center gap-2 text-sm">
                              <AmenityIcon size={16} className="text-black/70 dark:text-white/70" aria-hidden />
                              <span className="text-black dark:text-white">{amenity.name}</span>
                            </span>
                            <Checkbox
                              checked={checked}
                              className="pointer-events-none data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
                            />
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
                <div className="flex items-center justify-between p-3 border-t border-black/10 dark:border-white/10">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedAmenityIds([])}
                  >
                    Clear
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setIsAmenitiesOpenMobile(false)}
                    className="bg-primary text-white hover:bg-primary/90 dark:bg-primary dark:text-white"
                  >
                    Done
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </>
      )}

      {/* Search Button */}
      <div className={cn("pb-4", isCompact ? "px-4 sm:px-5 lg:px-4 lg:pb-3" : "px-4 sm:px-6")}>
        <Button
          onClick={handleSearch}
          disabled={isSearching}
          className={cn(
            "w-full bg-primary hover:bg-primary/90 text-white rounded-2xl md:rounded-xl font-medium group inline-flex items-center justify-center gap-2",
            isCompact ? "py-5 text-base lg:py-3 lg:text-sm" : "py-6 text-base",
            isSearching && "opacity-75 cursor-not-allowed"
          )}
        >
          {isSearching ? (
            <IconLoader2 
              size={isCompact ? 26 : 28} 
              className={cn(
                isCompact && "lg:w-5 lg:h-5",
                "animate-spin"
              )} 
              aria-hidden="true" 
            />
          ) : (
            <IconSearch 
              size={isCompact ? 26 : 28} 
              className={cn(isCompact && "lg:w-5 lg:h-5")} 
              aria-hidden="true" 
            />
          )}
          <span>{isSearching ? "Searching..." : "Search Properties"}</span>
          {!isSearching && (
            <IconChevronRight 
              size={isCompact ? 26 : 28} 
              className={cn(
                isCompact && "lg:w-5 lg:h-5", 
                "transition-transform duration-300 group-hover:translate-x-0.5"
              )} 
              aria-hidden="true" 
            />
          )}
        </Button>
      </div>
    </div>
    </div>
  );
};
