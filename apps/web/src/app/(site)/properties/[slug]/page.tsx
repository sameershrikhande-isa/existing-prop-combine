import { Icon } from "@iconify/react";
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
import { Hero234 } from "@/components/hero234";

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

// Allow dynamic params for paths not generated at build time
export const dynamicParams = true;

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
    location,
    features,
    images,
    richText,
    amenities,
    price,
    agent,
    brochures,
    mapLink,
  } = property;

    return (
    <section className="!pt-44 pb-20 relative">
            <div className="container mx-auto max-w-8xl px-5 2xl:px-0">

              
                <div className="grid grid-cols-12 items-end gap-6">
                    <div className="lg:col-span-8 col-span-12">
            <h1 className="lg:text-52 text-40 font-semibold text-dark dark:text-white">
              {title}
            </h1>
                        <div className="flex gap-2.5">
              <Icon
                icon="ph:map-pin"
                width={24}
                height={24}
                className="text-dark/50 dark:text-white/50"
              />
              <p className="text-dark/50 dark:text-white/50 text-xm">
                {location.address}, {location.city}
                {location.state && `, ${location.state}`}
              </p>
                        </div>
                    </div>
                    <div className="lg:col-span-4 col-span-12">
            <div className="flex">
              <div className="flex flex-col gap-2 border-e border-black/10 dark:border-white/20 pr-2 xs:pr-4 mobile:pr-8">
                <Icon icon="solar:bed-linear" width={20} height={20} />
                <p className="text-sm mobile:text-base font-normal text-black dark:text-white">
                  {features.bedrooms} Bedrooms
                                </p>
                            </div>
              <div className="flex flex-col gap-2 border-e border-black/10 dark:border-white/20 px-2 xs:px-4 mobile:px-8">
                <Icon icon="solar:bath-linear" width={20} height={20} />
                <p className="text-sm mobile:text-base font-normal text-black dark:text-white">
                  {features.bathrooms} Bathrooms
                                </p>
                            </div>
              <div className="flex flex-col gap-2 pl-2 xs:pl-4 mobile:pl-8">
                                <Icon
                  icon="lineicons:arrow-all-direction"
                                    width={20}
                                    height={20}
                                />
                <p className="text-sm mobile:text-base font-normal text-black dark:text-white">
                  {features.areaSqM}m<sup>2</sup>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

        {/* Image Gallery */}
                <div className="grid grid-cols-12 mt-8 gap-8">
              <div className="lg:col-span-8 col-span-12 row-span-2">
                 {images && images[0] && (
                          <div>
                                <Image
                  src={urlFor(images[0]).width(800).height(600).url()}
                  alt={images[0].alt || title}
                  width={800}
                  height={600}
                  className="rounded-2xl w-full h-540 object-cover"
                                    unoptimized={true}
                                />
                            </div>
                        )}
                    </div>
                    <div className="lg:col-span-4 lg:block hidden">
                    {images && images[1] && (
              <Image
                src={urlFor(images[1]).width(400).height(500).url()}
                alt={images[1].alt || title}
                width={400}
                height={500}
                className="rounded-2xl w-full h-full object-cover"
                unoptimized={true}
              />
                        )}
                    </div>
                    <div className="lg:col-span-2 col-span-6">
                     {images && images[2] && (
              <Image
                src={urlFor(images[2]).width(400).height(500).url()}
                alt={images[2].alt || title}
                width={400}
                height={500}
                className="rounded-2xl w-full h-full object-cover"
                unoptimized={true}
              />
                        )}
                    </div>
                    <div className="lg:col-span-2 col-span-6">
                     {images && images[3] && (
              <Image
                src={urlFor(images[3]).width(400).height(500).url()}
                alt={images[3].alt || title}
                width={400}
                height={500}
                className="rounded-2xl w-full h-full object-cover"
                unoptimized={true}
              />
                        )}
                    </div>
                  </div>

                  <Hero234 />

                  <div className="grid grid-cols-12 mt-8 gap-8">
                    <div className="lg:col-span-8 col-span-12 row-span-2">
                        <div>
                          <Image
                            src="/images/properties/property1/property1.jpg"
                            alt="Main Property Image"
                            width={400}
                            height={500}
                            className="rounded-2xl w-full h-540"
                            unoptimized={true}
                          />
                        </div>
                    </div>
                    <div className="lg:col-span-4 lg:block hidden">
                      <Image
                        src="/images/properties/property1/image-2.jpg"
                        alt="Property Image 2"
                        width={400}
                        height={500}
                        className="rounded-2xl w-full h-full"
                        unoptimized={true}
                      />
                    </div>
                    <div className="lg:col-span-2 col-span-6">
                      <Image
                        src="/images/properties/property1/image-3.jpg"
                        alt="Property Image 3"
                        width={400}
                        height={500}
                        className="rounded-2xl w-full h-full"
                        unoptimized={true}
                      />
                    </div>
                    <div className="lg:col-span-2 col-span-6">
                      <Image
                        src="/images/properties/property1/image-4.jpg"
                        alt="Property Image 4"
                        width={400}
                        height={500}
                        className="rounded-2xl w-full h-full"
                        unoptimized={true}
                      />
                    </div>
                  </div>
                <div className="grid grid-cols-12 gap-8 mt-10">
                    <div className="lg:col-span-8 col-span-12">
            <h3 className="text-xl font-medium">Property details</h3>
                        <div className="py-8 my-8 border-y border-dark/10 dark:border-white/20 flex flex-col gap-8">
                            <div className="flex items-center gap-6">
                                <div>
                  <Image
                    src="/images/SVGs/property-details.svg"
                    width={32}
                    height={32}
                    alt=""
                    className="w-8 h-8 dark:hidden"
                    unoptimized={true}
                  />
                  <Image
                    src="/images/SVGs/property-details-white.svg"
                    width={32}
                    height={32}
                    alt=""
                    className="w-8 h-8 dark:block hidden"
                    unoptimized={true}
                  />
                                </div>
                                <div>
                  <h3 className="text-dark dark:text-white text-xm">
                    Property details
                  </h3>
                  <p className="text-base text-dark/50 dark:text-white/50">
                                        One of the few homes in the area with a private pool.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div>
                  <Image
                    src="/images/SVGs/smart-home-access.svg"
                    width={32}
                    height={32}
                    alt=""
                    className="w-8 h-8 dark:hidden"
                    unoptimized={true}
                  />
                  <Image
                    src="/images/SVGs/smart-home-access-white.svg"
                    width={32}
                    height={32}
                    alt=""
                    className="w-8 h-8 dark:block hidden"
                    unoptimized={true}
                  />
                                </div>
                                <div>
                  <h3 className="text-dark dark:text-white text-xm">
                    Smart home access
                  </h3>
                  <p className="text-base text-dark/50 dark:text-white/50">
                                        Easily check yourself in with a modern keypad system.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div>
                  <Image
                    src="/images/SVGs/energyefficient.svg"
                    width={32}
                    height={32}
                    alt=""
                    className="w-8 h-8 dark:hidden"
                    unoptimized={true}
                  />
                  <Image
                    src="/images/SVGs/energyefficient-white.svg"
                    width={32}
                    height={32}
                    alt=""
                    className="w-8 h-8 dark:block hidden"
                    unoptimized={true}
                  />
                                </div>
                                <div>
                  <h3 className="text-dark dark:text-white text-xm">
                    Energy efficient
                  </h3>
                  <p className="text-base text-dark/50 dark:text-white/50">
                                        Built in 2025 with sustainable and smart-home features.
                                    </p>
                                </div>
                            </div>
                        </div>

            {/* Rich Text Description */}
            <RichText richText={richText} />

            {/* Amenities */}
            {amenities && amenities.length > 0 && (
              <div className="py-8 mt-8 border-t border-dark/5 dark:border-white/15">
                <h3 className="text-xl font-medium">What this property offers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-6">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2.5">
                      <Icon
                        icon="ph:check-circle"
                        width={24}
                        height={24}
                        className="text-dark dark:text-white flex-shrink-0"
                      />
                      <p className="text-base dark:text-white text-dark">
                        {amenity}
                            </p>
                        </div>
                  ))}
                                </div>
                            </div>
            )}

            {/* Map */}
            {location.latitude && location.longitude && (
                        <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3!2d${location.longitude}!3d${location.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sin!4v1715676641521!5m2!1sen!2sin`}
                width="1114"
                height="400"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl w-full mt-8"
                title="Property location map"
              />
            )}
                    </div>

          {/* Sidebar */}
                    <div className="lg:col-span-4 col-span-12">
                        <div className="bg-primary/10 p-8 rounded-2xl relative z-10 overflow-hidden">
              <h4 className="text-dark text-3xl font-medium dark:text-white">
                {price}
                            </h4>
              <Link
                href="#"
                className="py-4 px-8 bg-primary text-white rounded-full w-full block text-center hover:bg-dark duration-300 text-base mt-8 hover:cursor-pointer"
              >
                                Get in touch
                            </Link>
                            <div className="absolute right-0 top-4 -z-[1]">
                <Image
                  src="/images/properties/vector.svg"
                  width={400}
                  height={500}
                  alt="vector"
                  unoptimized={true}
                />
              </div>
            </div>

            {/* Brochures and Location actions */}
            {(brochures?.length || mapLink) && (
              <div className="mt-6 flex flex-col gap-3">
                {brochures && brochures.length > 0 && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        aria-controls="brochures-popover"
                        className="py-3 px-4 bg-dark/90 text-white rounded-full w-full text-center hover:bg-dark duration-300"
                      >
                        View brochures
                      </button>
                    </PopoverTrigger>
                    <PopoverContent id="brochures-popover" className="w-80 max-h-64 overflow-y-auto">
                      <ul className="space-y-2">
                        {brochures.map((b, i) => (
                          <li key={`${b.url}-${i}`} className="text-sm">
                            <Link
                              href={b.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary underline hover:text-primary/80"
                            >
                              {b.title?.trim() ? b.title : `Link ${i + 1}`}
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
                    className="py-3 px-4 bg-white text-dark rounded-full w-full text-center border hover:bg-primary/10 duration-300"
                  >
                    View location
                  </Link>
                )}
              </div>
            )}

            {/* Agent Card */}
            {agent && (
              <div className="border p-10 rounded-2xl border-dark/10 dark:border-white/20 mt-10 flex flex-col gap-6">
                <Icon
                  icon="ph:user"
                  width={44}
                  height={44}
                  className="text-primary"
                />
                <div>
                  <h3 className="text-xm text-dark dark:text-white font-semibold mb-2">
                    Contact Agent
                  </h3>
                  {agent.bio && (
                    <p className="text-base text-dark/70 dark:text-white/70 mb-4">
                      {agent.bio}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-6">
                  {agent.image && (
                    <Image
                      src={urlFor(agent.image).width(80).height(80).url()}
                      alt={agent.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-2xl object-cover"
                      unoptimized={true}
                    />
                  )}
                  <div>
                    <h3 className="text-xm text-dark dark:text-white">
                      {agent.name}
                    </h3>
                    <h4 className="text-base text-dark/50 dark:text-white/50">
                      {agent.position}
                    </h4>
                    {agent.email && (
                      <p className="text-sm text-dark/50 dark:text-white/50 mt-1">
                        {agent.email}
                      </p>
                    )}
                    {agent.phone && (
                      <p className="text-sm text-dark/50 dark:text-white/50">
                        {agent.phone}
                      </p>
                    )}
                  </div>
                            </div>
                        </div>
            )}

            {/* Testimonial - Keep static for now */}
                        {testimonials.slice(0, 1).map((item, index) => (
              <div
                key={index}
                className="border p-10 rounded-2xl border-dark/10 dark:border-white/20 mt-10 flex flex-col gap-6"
              >
                <Icon
                  icon="ph:house-simple"
                  width={44}
                  height={44}
                  className="text-primary"
                />
                <p className="text-xm text-dark dark:text-white">
                  {item.review}
                </p>
                                <div className="flex items-center gap-6">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-2xl"
                    unoptimized={true}
                  />
                  <div>
                    <h3 className="text-xm text-dark dark:text-white">
                      {item.name}
                    </h3>
                    <h4 className="text-base text-dark/50 dark:text-white/50">
                      {item.position}
                    </h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
