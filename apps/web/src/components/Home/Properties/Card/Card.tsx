import type { PropertyCardData } from "@/types/property";
import type { PropertyHomes } from "@/types/properyHomes";
import { urlFor } from "@/lib/sanity/client";
import { formatBudgetRange } from "@/lib/utils";
import { Icon } from "@iconify/react";
import * as Tabler from "@tabler/icons-react";
import { IconCheck, IconHammer } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;
const resolveTabler = (name: string): IconComponent => {
  const map = Tabler as unknown as Record<string, IconComponent>;
  return map[name] ?? map["IconCircle"];
};

type PropertyCardItem = PropertyCardData | PropertyHomes;

const isSanityItem = (i: PropertyCardItem): i is PropertyCardData =>
  (i as PropertyCardData)._id !== undefined;

const PropertyCard: React.FC<{ item: PropertyCardItem }> = ({ item }) => {
  const title = isSanityItem(item) ? item.title : item.name;
  const slug = item.slug;

  // Handle price/budget display
  const price = isSanityItem(item)
    ? formatBudgetRange(item.budgetMin, item.budgetMax)
    : item.rate;

  // Handle area display
  const areaSqM = isSanityItem(item)
    ? item.carpetAreaMin && item.carpetAreaMax && item.carpetAreaMax !== item.carpetAreaMin
      ? `${item.carpetAreaMin}-${item.carpetAreaMax}`
      : `${item.carpetAreaMin}`
    : item.area;

  const locationText = isSanityItem(item)
    ? `${item.location.address}, ${item.location.city}${item.location.state ? `, ${item.location.state}` : ""}`
    : item.location;

  // Generate image URL for Sanity or use static src for legacy items
  const imageUrl = isSanityItem(item)
    ? item.mainImage
      ? urlFor(item.mainImage).width(440).height(300).url()
      : null
    : item.images?.[0]?.src ?? null;
  const imageAlt = isSanityItem(item) ? item.mainImage?.alt || title : title;

  // Purpose badge (only for Sanity items)
  const purpose = isSanityItem(item) ? item.purpose?.name : null;

  return (
    <div>
      <div className="relative rounded-2xl border border-dark/10 dark:border-white/10 group hover:shadow-3xl duration-300 dark:hover:shadow-white/20">
        <div className="overflow-hidden rounded-t-2xl">
          <Link href={`/properties/${slug}`}>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={440}
                height={300}
                className="w-full rounded-t-2xl group-hover:brightness-50 group-hover:scale-125 transition duration-300 delay-75"
                unoptimized={true}
              />
            )}
          </Link>
          {/* Purpose badge */}
          {purpose && (
            <div className="absolute top-6 left-6 px-3 py-1.5 bg-white/90 dark:bg-dark/90 backdrop-blur-sm rounded-full">
              <span className="text-sm font-medium text-dark dark:text-white">
                {purpose}
              </span>
            </div>
          )}
          <div className="absolute top-6 right-6 p-4 bg-white rounded-full hidden group-hover:block">
            <Icon
              icon="solar:arrow-right-linear"
              width={24}
              height={24}
              className="text-black"
            />
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col mobile:flex-row gap-5 mobile:gap-0 justify-between mb-6">
            <div>
              <Link href={`/properties/${slug}`}>
                <h3 className="text-xl font-medium text-black dark:text-white duration-300 group-hover:text-primary">
                  {title}
                </h3>
              </Link>
              {isSanityItem(item) && item.subtitle ? (
                <p className="text-base font-normal text-black/50 dark:text-white/50">
                  {item.subtitle}
                </p>
              ) : (
                <p className="text-base font-normal text-black/50 dark:text-white/50">
                  {locationText}
                </p>
              )}
            </div>
            <div>
              <button
                type="button"
                className="text-base font-normal text-primary px-5 py-2 rounded-full bg-primary/10"
              >
                {price}
              </button>
            </div>
          </div>
          <div className="flex">
            {/* Single Feature - only for Sanity items */}
            {isSanityItem(item) && item.features && item.features.length > 0 && item.features[0] && (() => {
              const feature = item.features[0];
              const FeatureIcon = resolveTabler(feature.iconName || "IconCircle");
              return (
                <div className="flex flex-col gap-2 border-e border-black/10 dark:border-white/20 pr-2 xs:pr-4 mobile:pr-8">
                  <FeatureIcon size={20} className="text-black dark:text-white" />
                  <p className="text-sm mobile:text-base font-normal text-black dark:text-white">
                    {feature.value} {feature.title}
                  </p>
                </div>
              );
            })()}
            {/* Legacy items - fallback to beds/baths */}
            {!isSanityItem(item) && (
              <>
                <div className="flex flex-col gap-2 border-e border-black/10 dark:border-white/20 pr-2 xs:pr-4 mobile:pr-8">
                  <Icon icon="solar:bed-linear" width={20} height={20} />
                  <p className="text-sm mobile:text-base font-normal text-black dark:text-white">
                    {item.beds} Bedrooms
                  </p>
                </div>
                <div className="flex flex-col gap-2 border-e border-black/10 dark:border-white/20 px-2 xs:px-4 mobile:pr-8">
                  <Icon icon="solar:bath-linear" width={20} height={20} />
                  <p className="text-sm mobile:text-base font-normal text-black dark:text-white">
                    {item.baths} Bathrooms
                  </p>
                </div>
              </>
            )}
            {/* Always show area */}
            <div className={`flex flex-col gap-2 ${(isSanityItem(item) && item.features && item.features.length > 0 && item.features[0]) || !isSanityItem(item) ? "border-e border-black/10 dark:border-white/20 px-2 xs:px-4 mobile:px-8" : "pr-2 xs:pr-4 mobile:pr-8"}`}>
              <Icon
                icon="lineicons:arrow-all-direction"
                width={20}
                height={20}
              />
              <p className="text-sm mobile:text-base font-normal text-black dark:text-white">
                {areaSqM}m<sup>2</sup>
              </p>
            </div>
            {/* Conditionally show construction status - only for Sanity items */}
            {isSanityItem(item) && item.constructionStatus && (
              <div className="flex flex-col gap-2 pl-2 xs:pl-4 mobile:pl-8">
                {item.constructionStatus === "ready" ? (
                  <IconCheck size={20} className="text-black dark:text-white" />
                ) : (
                  <IconHammer size={20} className="text-black dark:text-white" />
                )}
                <p className="text-sm mobile:text-base font-normal text-black dark:text-white">
                  {item.constructionStatus === "ready" ? "Ready" : "Under Construction"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard
