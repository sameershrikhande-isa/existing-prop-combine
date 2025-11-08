"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconHome2,
  IconBuildingSkyscraper,
  IconKey,
  IconHomeDollar,
  IconChevronRight,
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
      <div className={cn("rounded-2xl bg-black/10 dark:bg-white/5 p-2 backdrop-blur-md", className)}>
        <div
          className="relative w-full rounded-3xl bg-white/90 dark:bg-black/80 backdrop-blur border-[0.5px] border-black/10 dark:border-white/10 p-4"
        >
          <div className="text-center text-black/50 dark:text-white/50">Loading filters...</div>
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
          <button
            type="button"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full flex items-center justify-between gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-black px-3 py-2 text-sm text-left transition-colors hover:bg-black/5 dark:hover:bg-white/5",
              className
            )}
          >
            <span className={selected ? "text-black dark:text-white" : "text-black/70 dark:text-white/70"}>
              {selected || placeholder}
            </span>
            <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
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

      <div className={cn("pt-4", isCompact ? "px-3 sm:px-4" : "px-4 sm:px-6")}>
        <h2 className={cn("font-bold text-black dark:text-white text-center flex items-center justify-center gap-2", isCompact ? "text-xl sm:text-2xl mb-3 md:mb-4" : "text-2xl sm:text-3xl mb-4 md:mb-6")}>
          Find your dream
          <IconHome2 className={cn(isCompact ? "w-5 h-5 sm:w-6 sm:h-6" : "w-6 h-6 sm:w-7 sm:h-7")} aria-hidden />
        </h2>
        <div className={cn("flex flex-col md:flex-row items-center justify-center", isCompact ? "gap-2 md:gap-4" : "gap-3 md:gap-6")}>
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
          <div className={cn(isCompact ? "px-3 sm:px-4" : "px-4 sm:px-6")}>
            <Separator className={cn("bg-black/10 dark:bg-white/10", isCompact ? "my-2 md:my-3" : "my-3 md:my-4")} />
          </div>

          <div className={cn("pb-4", isCompact ? "px-3 sm:px-4" : "px-4 sm:px-6")}>
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
                  <label className="text-xs font-medium text-black/70 dark:text-white/70">
                    Carpet Area (Optional)
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
                <span className="text-xs font-medium text-black/70 dark:text-white/70">Amenities</span>
                <Popover open={isAmenitiesOpenInline} onOpenChange={setIsAmenitiesOpenInline}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      aria-expanded={isAmenitiesOpenInline}
                      className="w-full flex items-center justify-between gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-black px-3 py-2 text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                    >
                      <span className="text-black dark:text-white">Amenities</span>
                      {selectedAmenityIds.length > 0 ? (
                        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/90 text-white text-xs px-1">
                          {selectedAmenityIds.length}
                        </span>
                      ) : (
                        <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
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
          </div>
        </>
      )}

      {/* Amenities Section - mobile only */}
      {filterData.amenities.length > 0 && (
        <>
          <div className={cn("md:hidden", isCompact ? "px-3 sm:px-4" : "px-4 sm:px-6")}>
            <Separator className={cn("bg-black/10 dark:bg-white/10", isCompact ? "my-2 md:my-3" : "my-3 md:my-4")} />
          </div>
          <div className={cn("pb-4 md:hidden", isCompact ? "px-3 sm:px-4" : "px-4 sm:px-6")}>
            <Popover open={isAmenitiesOpenMobile} onOpenChange={setIsAmenitiesOpenMobile}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-expanded={isAmenitiesOpenMobile}
                  className="w-full flex items-center justify-between gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-black px-3 py-2 text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <span className="text-black dark:text-white">Amenities</span>
                  {selectedAmenityIds.length > 0 ? (
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/90 text-white text-xs px-1">
                      {selectedAmenityIds.length}
                    </span>
                  ) : (
                    <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
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
      <div className={cn("pb-4", isCompact ? "px-3 sm:px-4" : "px-4 sm:px-6")}>
        <Button
          onClick={handleSearch}
          className={cn("w-full bg-primary hover:bg-primary/90 text-white rounded-2xl md:rounded-xl font-medium group inline-flex items-center justify-center gap-2", isCompact ? "py-4 text-sm" : "py-6 text-base")}
        >
          <span>Search Properties</span>
          <IconChevronRight size={isCompact ? 24 : 28} aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </Button>
      </div>
    </div>
    </div>
  );
};
