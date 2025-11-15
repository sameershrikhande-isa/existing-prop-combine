import { Icon } from "@iconify/react";
import * as Tabler from "@tabler/icons-react";
import { IconExternalLink, IconFileText, IconPlayerPlay, IconMapPin, IconPhoneCall } from "@tabler/icons-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client, urlFor } from "@/lib/sanity/client";
import {
  queryPropertyBySlugData,
  queryPropertySlugs,
} from "@/lib/sanity/queries";
import type { PropertyDetailData } from "@/types/property";
import { RichText } from "@/components/shared/RichText";
import { testimonials } from "@/app/api/testimonial";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ViewgallaryCarousal } from "@/components/ViewgallaryCarousal";
import { formatBudgetRange } from "@/lib/utils";

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

// Allow dynamic params for paths not generated at build time
export const dynamicParams = true;

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;
const resolveTabler = (name: string): IconComponent => {
  const map = Tabler as unknown as Record<string, IconComponent>;
  return map[name] ?? map["IconCircle"];
};

// Generate static params for all properties
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(queryPropertySlugs);

  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await client.fetch<PropertyDetailData>(
    queryPropertyBySlugData,
    { slug }
  );

  if (!property) {
    return {
      title: "Property Not Found | Homely",
    };
  }

  return {
    title: `${property.title} | Homely`,
    description:
      property.description || `View details for ${property.title}`,
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await client.fetch<PropertyDetailData>(
    queryPropertyBySlugData,
    { slug }
  );

  if (!property) {
    notFound();
  }

  const {
    title,
    subtitle,
    location,
    features,
    images,
    thumbnailImage,
    richText,
    highlights,
    amenities,
    budgetMin,
    budgetMax,
    carpetAreaMin,
    carpetAreaMax,
    purpose,
    brochures,
    videos,
    mapLink,
  } = property;

  // Format budget display
  const budgetDisplay = formatBudgetRange(budgetMin, budgetMax);

  // Format area display
  const areaDisplay =
    carpetAreaMin && carpetAreaMax && carpetAreaMax !== carpetAreaMin
      ? `${carpetAreaMin}-${carpetAreaMax}m²`
      : `${carpetAreaMin}m²`;

  const heroImage = thumbnailImage || images?.[0];

    return (
    <section className="pt-24 md:pt-32 pb-20 relative">
            <div className="container mx-auto max-w-8xl px-5 2xl:px-0">

              
                <div className="grid grid-cols-12 items-end gap-6">
                    <div className="lg:col-span-8 col-span-12">
            <h1 className="lg:text-52 text-40 font-semibold text-dark dark:text-white">
              {title}
            </h1>
                        {subtitle && (
              <p className="text-dark/50 dark:text-white/50 text-xm mt-2">
                {subtitle}
              </p>
            )}
                    </div>
                    <div className="lg:col-span-4 col-span-12">
            <div className="flex">
              {/* Dynamic Features */}
              {features && features.length > 0 && features.map((feature, index) => {
                const FeatureIcon = resolveTabler(feature.iconName || "IconCircle");
                const isLast = index === features.length - 1;
                return (
                  <div
                    key={`${feature.title}-${index}`}
                    className={`flex flex-col gap-2 ${
                      !isLast ? "border-e border-black/10 dark:border-white/20 pr-2 xs:pr-4 mobile:pr-8" : "pl-2 xs:pl-4 mobile:pr-8"
                    }`}
                  >
                    <FeatureIcon size={20} className="text-black dark:text-white" />
                    <p className="text-sm mobile:text-base font-normal text-black dark:text-white">
                      {feature.value} {feature.title}
                    </p>
                  </div>
                );
              })}
              {/* Always show area as last item */}
              <div className="flex flex-col gap-2 pl-2 xs:pl-4 mobile:pl-8">
                <Icon
                  icon="lineicons:arrow-all-direction"
                  width={20}
                  height={20}
                />
                <p className="text-sm mobile:text-base font-normal text-black dark:text-white">
                  {areaDisplay}
                </p>
              </div>
            </div>
                    </div>
                </div>

        {/* Image Gallery - Main Image + ViewgallaryCarousal Carousel */}
                <div className="grid grid-cols-12 mt-8 gap-8 items-stretch">
              {/* Main Hero Image - Left side on desktop, full width on mobile */}
              <div className="lg:col-span-8 col-span-12">
                 {heroImage && (
                  <div className="aspect-3/2 w-full overflow-hidden rounded-2xl">
                                <Image
                  src={urlFor(heroImage).width(800).height(600).url()}
                  alt={heroImage.alt || title}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                                    unoptimized={true}
                                />
                            </div>
                        )}
                    </div>
                    {/* ViewgallaryCarousal Carousel - Right side on desktop, full width on mobile */}
                    <div className="lg:col-span-4 col-span-12">
                      <div className="h-full">
                        <ViewgallaryCarousal images={images} propertyTitle={title} />
                      </div>
                    </div>
                  </div>
                <div className="grid grid-cols-12 gap-8 mt-10">
                    <div className="lg:col-span-8 col-span-12">
            <h3 className="text-xl font-medium">Property details</h3>
            <hr className="border-dark/10 dark:border-white/20 my-4"/>

            {/* Address Section - Conditionally shown */}
            {location && (location.address || location.city) && (
              <>
                <div className="flex items-start gap-2.5 mb-4">
                  <Icon
                    icon="ph:map-pin"
                    width={24}
                    height={24}
                    className="text-dark/50 dark:text-white/50 shrink-0 mt-0.5"
                  />
                  <p className="text-base text-dark/70 dark:text-white/70">
                    {location.address && `${location.address}, `}
                    {location.city}
                    {location.state && `, ${location.state}`}
                    {location.country && `, ${location.country}`}
                  </p>
                </div>
                {(richText || (highlights && highlights.length > 0) || (amenities && amenities.length > 0)) && (
                  <hr className="border-dark/10 dark:border-white/20 my-4"/>
                )}
              </>
            )}

            {/* Rich Text Description */}
            {richText && richText.length > 0 && (
              <>
                <RichText richText={richText} />
                {((highlights && highlights.length > 0) || (amenities && amenities.length > 0)) && (
                  <hr className="border-dark/10 dark:border-white/20 my-4"/>
                )}
              </>
            )}

            {/* Top Features */}
            {highlights && highlights.length > 0 && (
              <>
                <div className="flex flex-col gap-8">
                  {highlights.slice(0, 3).map(({ title: ht, description, iconName }, i) => {
                    const IconCmp = resolveTabler(iconName);
                    return (
                      <div key={`${iconName}-${i}`} className="flex items-center gap-6">
                        <div>
                          <IconCmp size={32} className="text-dark dark:text-white" aria-hidden />
                        </div>
                        <div>
                          <h3 className="text-dark dark:text-white text-xm">{ht}</h3>
                          {description && (
                            <p className="text-base text-dark/50 dark:text-white/50">{description}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {amenities && amenities.length > 0 && (
                  <hr className="border-dark/10 dark:border-white/20 my-4"/>
                )}
              </>
            )}

            {/* Amenities */}
            {amenities && amenities.length > 0 && (
              <div className="pt-8">
                <h3 className="text-xl font-medium">What this property offers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-6">
                  {amenities
                    .filter((a) => a && a.name)
                    .map((amenity) => {
                      const AmenityIcon = resolveTabler(amenity.iconName || "IconCircle");
                      return (
                        <div key={amenity._id || amenity.name} className="flex items-center gap-2.5">
                          <AmenityIcon
                            size={24}
                            className="text-dark dark:text-white shrink-0"
                          />
                          <p className="text-base dark:text-white text-dark">
                            {amenity.name}
                          </p>
                        </div>
                      );
                    })}
                                </div>
                            </div>
            )}

            {/* Map iframe removed: use mapLink button in sidebar */}
                    </div>

          {/* Sidebar */}
                    <div className="lg:col-span-4 col-span-12">
                        <div className="bg-primary/10 p-8 rounded-2xl relative z-10 overflow-hidden order-2 lg:order-0">
              {purpose && (
                <div className="mb-2">
                  <span className="text-sm font-medium text-dark/70 dark:text-white/70">
                    For {purpose.name}
                  </span>
                </div>
              )}
              <h4 className="text-dark text-3xl font-medium dark:text-white">
                {budgetDisplay}
                            </h4>
              <Link
                href="#"
                className="py-4 px-8 bg-primary text-white rounded-full w-full text-center hover:bg-dark duration-300 text-base mt-8 hover:cursor-pointer inline-flex items-center justify-center gap-2"
                aria-label="Get in touch"
              >
                <IconPhoneCall size={20} aria-hidden />
                <span>Get in touch</span>
              </Link>
              <div className="absolute right-0 top-4 -z-1">
                <Image
                  src="/images/properties/vector.svg"
                  width={400}
                  height={500}
                  alt="vector"
                  unoptimized={true}
                />
              </div>
            </div>

            {/* Brochures, Video, and Location actions */}
            {(brochures?.length || (videos?.length ?? 0) > 0 || mapLink) && (
              <div className="mt-6 flex flex-col gap-3 order-1 lg:order-0">
                {brochures && brochures.length > 0 && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        aria-controls="brochures-popover"
                        className="py-3 px-4 bg-dark/90 text-white rounded-full w-full text-center hover:bg-dark duration-300 inline-flex items-center justify-center gap-2"
                      >
                        <IconFileText size={18} aria-hidden />
                        <span>View brochures</span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      id="brochures-popover"
                      align="start"
                      side="bottom"
                      sideOffset={8}
                      className="w-80 max-h-64 overflow-y-auto p-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-lg"
                    >
                      <ul className="space-y-2">
                        {brochures.map((b, i) => (
                          <li key={`${b.url}-${i}`}>
                            <Link
                              href={b.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between gap-3 p-2.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 hover:border-primary/40 dark:hover:border-primary/40 transition-colors text-sm text-black dark:text-white group"
                            >
                              <span className="flex-1 truncate">
                                {b.title?.trim() ? b.title : `Link ${i + 1}`}
                              </span>
                              <IconExternalLink
                                size={16}
                                className="shrink-0 text-black/60 dark:text-white/60 group-hover:text-primary transition-colors"
                                aria-hidden
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </PopoverContent>
                  </Popover>
                )}

                {(videos?.length ?? 0) > 0 && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        aria-controls="videos-popover"
                        className="py-3 px-4 bg-white text-dark rounded-full w-full text-center border hover:bg-primary/10 duration-300 inline-flex items-center justify-center gap-2"
                      >
                        <IconPlayerPlay size={18} aria-hidden />
                        <span>Watch videos</span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      id="videos-popover"
                      align="start"
                      side="bottom"
                      sideOffset={8}
                      className="w-80 max-h-64 overflow-y-auto p-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-lg"
                    >
                      <ul className="space-y-2">
                        {videos!.map((v, i) => (
                          <li key={`${v.url}-${i}`}>
                            <Link
                              href={v.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between gap-3 p-2.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 hover:border-primary/40 dark:hover:border-primary/40 transition-colors text-sm text-black dark:text-white group"
                            >
                              <span className="flex-1 truncate">{v.title?.trim() || `Video ${i + 1}`}</span>
                              <IconExternalLink size={16} className="shrink-0 text-black/60 dark:text-white/60 group-hover:text-primary transition-colors" aria-hidden />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </PopoverContent>
                  </Popover>
                )}

                {mapLink && (
                  <Link
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 bg-white text-dark rounded-full w-full text-center border hover:bg-primary/10 duration-300 inline-flex items-center justify-center gap-2"
                  >
                    <IconMapPin size={18} aria-hidden />
                    <span>View on Map</span>
                  </Link>
                )}
              </div>
            )}
                    </div>
                </div>
            </div>
        </section>
    );
}
