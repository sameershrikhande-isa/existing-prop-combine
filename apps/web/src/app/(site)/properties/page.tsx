import HeroSub from "@/components/shared/HeroSub";
import PropertyCard from "@/components/Home/Properties/Card/Card";
import { client } from "@/lib/sanity/client";
import { queryAllPropertiesData } from "@/lib/sanity/queries";
import type { PropertyCardData } from "@/types/property";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property List | Homely",
};

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

const PropertiesPage = async () => {
  // Fetch properties from Sanity
  const properties = await client.fetch<PropertyCardData[]>(
    queryAllPropertiesData
  );

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
          {properties.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-dark/50 dark:text-white/50 text-xl">
                No properties available at the moment.
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
