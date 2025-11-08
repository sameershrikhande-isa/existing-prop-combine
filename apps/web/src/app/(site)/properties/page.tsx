import HeroSub from "@/components/shared/HeroSub";
import PropertyCard from "@/components/Home/Properties/Card/Card";
import { client } from "@/lib/sanity/client";
import {
  queryAllPropertiesData,
  queryFilteredProperties,
} from "@/lib/sanity/queries";
import type { PropertyCardData } from "@/types/property";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Property List | Homely",
};

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

type PropertiesPageProps = {
  searchParams: Promise<{
    propertyTypeId?: string;
    purposeId?: string;
    budgetMin?: string;
    budgetMax?: string;
    carpetAreaMin?: string;
    carpetAreaMax?: string;
    amenityIds?: string;
  }>;
};

const PropertiesPage = async ({ searchParams }: PropertiesPageProps) => {
  const params = await searchParams;

  // Parse search params for filtering
  // IMPORTANT: GROQ requires all parameters to be defined (use null instead of undefined)
  const filters = {
    propertyTypeId: params.propertyTypeId || null,
    purposeId: params.purposeId || null,
    budgetMin: params.budgetMin ? Number.parseInt(params.budgetMin, 10) : null,
    budgetMax: params.budgetMax ? Number.parseInt(params.budgetMax, 10) : null,
    carpetAreaMin: params.carpetAreaMin
      ? Number.parseInt(params.carpetAreaMin, 10)
      : null,
    carpetAreaMax: params.carpetAreaMax
      ? Number.parseInt(params.carpetAreaMax, 10)
      : null,
    amenityIds: params.amenityIds ? params.amenityIds.split(",") : null,
  };

  // Check if any filters are applied
  const hasFilters = Object.values(filters).some((value) => value !== null);

  // Fetch properties from Sanity
  const properties = hasFilters
    ? await client.fetch<PropertyCardData[]>(queryFilteredProperties, filters)
    : await client.fetch<PropertyCardData[]>(queryAllPropertiesData);

    return (
        <>
            <HeroSub
                title="Discover inspiring designed homes."
        description="Experience elegance and comfort with our exclusive luxury villas, designed for sophisticated living."
                badge="Properties"
                showSearch
                searchClassName="max-w-6xl mx-auto"
            />
      <section className="pt-0!">
        <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
          {/* Results count - only show when there are results to avoid duplicate empty states */}
          {properties.length > 0 && (
            <div className="mb-6">
              <p className="text-dark/70 dark:text-white/70">
                {`${properties.length} ${properties.length === 1 ? "property" : "properties"} found`}
                {hasFilters && " matching your criteria"}
              </p>
            </div>
          )}

          {properties.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-dark/50 dark:text-white/50 text-xl">
                {hasFilters
                  ? "No properties match your search criteria. Try adjusting your filters."
                  : "No properties available at the moment."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {properties.map((property) => (
                <div key={property._id}>
                  <PropertyCard item={property} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
        </>
    );
};

export default PropertiesPage;
