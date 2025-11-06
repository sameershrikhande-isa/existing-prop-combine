"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconHome2,
  IconBuildingSkyscraper,
  IconKey,
  IconHomeDollar,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import * as Tabler from "@tabler/icons-react";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
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
};

export const PropertySearchBar = ({ className }: PropertySearchBarProps) => {
  const router = useRouter();
  const [filterData, setFilterData] = useState<FilterData | null>(null);
  const [loading, setLoading] = useState(true);

  // Search state
  const [selectedPropertyTypeId, setSelectedPropertyTypeId] = useState<string>("");
  const [selectedPurposeId, setSelectedPurposeId] = useState<string>("");
  const [selectedAmenityIds, setSelectedAmenityIds] = useState<string[]>([]);
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false);

  // Filter ranges state
  const [budgetRanges, setBudgetRanges] = useState<FilterRange[]>([]);
  const [carpetAreaRanges, setCarpetAreaRanges] = useState<FilterRange[]>([]);
  const [selectedBudgetRangeId, setSelectedBudgetRangeId] = useState<string>("");
  const [selectedCarpetAreaRangeId, setSelectedCarpetAreaRangeId] = useState<string>("");
  const [loadingRanges, setLoadingRanges] = useState(false);

  // Fetch filter data from API
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("/api/filters");
        if (!response.ok) throw new Error("Failed to fetch filters");
        const data = await response.json();
        setFilterData(data);

        // Set defaults to first items
        if (data.propertyTypes.length > 0) {
          setSelectedPropertyTypeId(data.propertyTypes[0]._id);
        }
        if (data.purposes.length > 0) {
          setSelectedPurposeId(data.purposes[0]._id);
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

        setBudgetRanges(budgetResponse.ranges || []);
        setCarpetAreaRanges(carpetAreaResponse.ranges || []);

        // Reset selections when ranges change
        setSelectedBudgetRangeId("");
        setSelectedCarpetAreaRangeId("");
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

  if (loading) {
    return (
      <div
        className={`relative w-full rounded-2xl bg-white/90 dark:bg-black/80 backdrop-blur border border-black/20 dark:border-white/20 p-8 ${className ?? ""}`}
      >
        <div className="text-center text-black/50 dark:text-white/50">
          Loading filters...
        </div>
      </div>
    );
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
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("justify-between w-full", className)}
          >
            {selected || placeholder}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
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
    <div
      className={`relative z-0 w-full rounded-2xl bg-white/90 dark:bg-black/80 backdrop-blur border border-black/20 dark:border-white/20 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] ${className ?? ""} `}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl p-px content-['']
        [background:linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0)_35%),linear-gradient(315deg,rgba(255,255,255,0.55),rgba(255,255,255,0)_35%)]
        dark:[background:linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0)_35%),linear-gradient(315deg,rgba(255,255,255,0.12),rgba(255,255,255,0)_35%)]
        [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] mask-exclude
        [-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [-webkit-mask-composite:xor]  "
      />

      <div className="px-4 sm:px-6 pt-4 ">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 
        col-span-1 overflow-hidden rounded-b rounded-t-2xl bg-gray-50 p- shadow-2xl shadow-black/10 ring-1 ring-black/5 dark:bg-gray-900 dark:ring-white/5 lg:col-span-2 lg:rounded-l-2xl lg:rounded-r
        ">
          {/* Property Type Selection */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-black/60 dark:text-white/60 uppercase tracking-wide">
              Type
            </span>
            <div className="flex rounded-full p-1 bg-black/5 dark:bg-white/10">
              {filterData.propertyTypes.map((type) => {
                const isResidential = type.name.toLowerCase().includes("residential");
                const Icon = isResidential ? IconHome2 : IconBuildingSkyscraper;
                const isSelected = selectedPropertyTypeId === type._id;

                return (
                  <button
                    key={type._id}
                    type="button"
                    onClick={() => setSelectedPropertyTypeId(type._id)}
                    className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
                      isSelected
                        ? "bg-white dark:bg-black text-black dark:text-white shadow"
                        : "text-black/70 dark:text-white/70"
                    }`}
                    aria-pressed={isSelected}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <Icon size={16} aria-hidden />
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
          <div className="flex items-center gap-2 justify-start md:justify-center">
            <span className="text-[11px] font-medium text-black/60 dark:text-white/60 uppercase tracking-wide">
              Purpose
            </span>
            <div className="flex rounded-full p-1 bg-black/5 dark:bg-white/10">
              {filterData.purposes.map((purpose) => {
                const isRent = purpose.name.toLowerCase().includes("rent");
                const Icon = isRent ? IconKey : IconHomeDollar;
                const isSelected = selectedPurposeId === purpose._id;

                return (
                  <button
                    key={purpose._id}
                    type="button"
                    onClick={() => setSelectedPurposeId(purpose._id)}
                    className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
                      isSelected
                        ? "bg-white dark:bg-black text-black dark:text-white shadow"
                        : "text-black/70 dark:text-white/70"
                    }`}
                    aria-pressed={isSelected}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <Icon size={16} aria-hidden />
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
      {(budgetRanges.length > 0 || carpetAreaRanges.length > 0) && (
        <>
          <div className="px-4 sm:px-6">
            <Separator className="my-3 md:my-4 bg-black/10 dark:bg-white/10" />
          </div>

          <div className="px-4 sm:px-6 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              {/* Budget Range */}
              {budgetRanges.length > 0 && (
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-black/70 dark:text-white/70">
                    Budget (Optional)
                  </label>
                  <SingleSelect
                    value={selectedBudgetRangeId}
                    onChange={setSelectedBudgetRangeId}
                    placeholder="Any budget"
                    options={budgetRanges.map((r) => ({ value: r._id, label: r.label }))}
                  />
                </div>
              )}

              {/* Carpet Area Range */}
              {carpetAreaRanges.length > 0 && (
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-black/70 dark:text-white/70">
                    Carpet Area (Optional)
                  </label>
                  <SingleSelect
                    value={selectedCarpetAreaRangeId}
                    onChange={setSelectedCarpetAreaRangeId}
                    placeholder="Any size"
                    options={carpetAreaRanges.map((r) => ({ value: r._id, label: r.label }))}
                  />
                </div>
              )}

              {/* Amenities inline on md+ */}
              <div className="hidden md:flex flex-col gap-2">
                <span className="text-xs font-medium text-black/70 dark:text-white/70">Amenities</span>
                <Popover open={isAmenitiesOpen} onOpenChange={setIsAmenitiesOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      aria-expanded={isAmenitiesOpen}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-4 py-2 bg-white dark:bg-black text-sm"
                    >
                      <span className="text-black/70 dark:text-white/70">Amenities</span>
                      {selectedAmenityIds.length > 0 && (
                        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/90 text-white text-xs px-1">
                          {selectedAmenityIds.length}
                        </span>
                      )}
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
                        onClick={() => setIsAmenitiesOpen(false)}
                        className="bg-primary text-white hover:bg-primary/90 dark:bg-primary dark:text-white"
                      >
                        Done
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Amenities Section - mobile only */}
      {filterData.amenities.length > 0 && (
        <>
          <div className="px-4 sm:px-6 md:hidden">
            <Separator className="my-3 md:my-4 bg-black/10 dark:bg-white/10" />
          </div>
          <div className="px-4 sm:px-6 pb-4 md:hidden">
            <Popover open={isAmenitiesOpen} onOpenChange={setIsAmenitiesOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-expanded={isAmenitiesOpen}
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-4 py-2 bg-white dark:bg-black text-sm"
                >
                  <span className="text-black/70 dark:text-white/70">Amenities</span>
                  {selectedAmenityIds.length > 0 && (
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/90 text-white text-xs px-1">
                      {selectedAmenityIds.length}
                    </span>
                  )}
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
                    onClick={() => setIsAmenitiesOpen(false)}
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
      <div className="px-4 sm:px-6 pb-4">
        <Button
          onClick={handleSearch}
          className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 text-base font-medium"
        >
          Search Properties
        </Button>
      </div>
    </div>
  );
};
