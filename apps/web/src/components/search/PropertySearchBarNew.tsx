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
import type { PropertyAmenity, PropertyPurpose, PropertyType } from "@/types/property";

type FilterData = {
  propertyTypes: PropertyType[];
  purposes: PropertyPurpose[];
  amenities: PropertyAmenity[];
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
    if (selectedAmenityIds.length > 0) {
      params.set("amenityIds", selectedAmenityIds.join(","));
    }

    router.push(`/properties?${params.toString()}`);
  }, [selectedPropertyTypeId, selectedPurposeId, selectedAmenityIds, router]);

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

  return (
    <div
      className={`relative w-full rounded-2xl bg-white/90 dark:bg-black/80 backdrop-blur border border-black/20 dark:border-white/20 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] ${className ?? ""}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl p-px content-['']
        [background:linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0)_35%),linear-gradient(315deg,rgba(255,255,255,0.55),rgba(255,255,255,0)_35%)]
        dark:[background:linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0)_35%),linear-gradient(315deg,rgba(255,255,255,0.12),rgba(255,255,255,0)_35%)]
        [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] mask-exclude
        [-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [-webkit-mask-composite:xor]"
      />

      <div className="px-4 sm:px-6 pt-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
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

      {/* Amenities Section */}
      {filterData.amenities.length > 0 && (
        <>
          <div className="px-4 sm:px-6">
            <Separator className="my-3 md:my-4 bg-black/10 dark:bg-white/10" />
          </div>

          <div className="px-4 sm:px-6 pb-4">
            <label className="text-xs font-medium text-black/70 dark:text-white/70 mb-3 block">
              Amenities (Optional)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {filterData.amenities.slice(0, 10).map((amenity) => {
                const isSelected = selectedAmenityIds.includes(amenity._id);
                return (
                  <button
                    key={amenity._id}
                    type="button"
                    onClick={() => handleToggleAmenity(amenity._id)}
                    className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
                      isSelected
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-white dark:bg-black border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 hover:border-primary/50"
                    }`}
                  >
                    {amenity.name}
                  </button>
                );
              })}
            </div>
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

