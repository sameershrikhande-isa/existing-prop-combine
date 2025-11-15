import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Categories = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute left-0 top-0">
        <Image
          src="/images/categories/Vector.svg"
          alt="vector"
          width={800}
          height={1050}
          className="dark:hidden"
          unoptimized={true}
        />
        <Image
          src="/images/categories/Vector-dark.svg"
          alt="vector"
          width={800}
          height={1050}
          className="hidden dark:block"
          unoptimized={true}
        />
      </div>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0 relative z-10">
        <div className="grid grid-cols-12 items-center gap-10">
          <div className="lg:col-span-6 col-span-12">
            <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5">
              <Icon icon="ph:house-simple-fill" className="text-2xl text-primary " />
              Find your dream home in Thane.
            </p>
            <h2 className="lg:text-52 text-40 mt-4 mb-2 lg:max-w-full font-medium leading-[1.2] text-dark dark:text-white ">
              Explore best properties based on local knowledge.
            </h2>
            <p className="text-dark/50 dark:text-white/50 text-lg lg:max-w-full leading-[1.3] md:max-w-3/4">
              Discover a diverse range of properties, tailored to your needs
            </p>
            <Link href="/properties" className="py-4 px-8 bg-primary text-base leading-4 inline-flex items-center gap-2 w-fit text-white rounded-full font-semibold mt-8 hover:bg-dark duration-300 group">
              <span>View properties</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <div className="relative rounded-2xl overflow-hidden">
              {/* Removed 'group' class - no longer needed for hover overlay */}
              <Link href="/properties">
                <Image
                  src="/images/categories/skyscrapers.jpg"
                  alt="villas"
                  width={680}
                  height={386}
                  className="w-full"
                  unoptimized={true}
                />
              </Link>
              {/* OVERLAY COMMENTED OUT - Responsive overlay with title, description, and arrow icon */}
              {/* <Link href="/properties" className="absolute w-full h-full bg-linear-to-b from-black/0 to-black/80 top-full flex flex-col justify-between pl-10 pb-10 group-hover:top-0 duration-500">
                <div className="flex justify-end mt-6 mr-6">
                  <div className="bg-white text-dark rounded-full w-fit p-4">
                    <Icon icon="ph:arrow-right" width={24} height={24} />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-white text-2xl">
                    Residential Homes
                  </h3>
                  <p className="text-white/80 text-base leading-6">
                    Experience elegance and comfort with our exclusive luxury villas, designed  for sophisticated living.
                  </p>
                </div>
              </Link> */}
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <div className="relative rounded-2xl overflow-hidden">
              {/* Removed 'group' class - no longer needed for hover overlay */}
              <Link href="/properties">
                <Image
                  src="/images/categories/house-interior.jpg"
                  alt="villas"
                  width={680}
                  height={386}
                  className="w-full"
                  unoptimized={true}
                />
              </Link>
              {/* OVERLAY COMMENTED OUT - Responsive overlay with title, description, and arrow icon */}
              {/* <Link href="/properties" className="absolute w-full h-full bg-linear-to-b from-black/0 to-black/80 top-full flex flex-col justify-between pl-10 pb-10 group-hover:top-0 duration-500">
                <div className="flex justify-end mt-6 mr-6">
                  <div className="bg-white text-dark rounded-full w-fit p-4">
                    <Icon icon="ph:arrow-right" width={24} height={24} />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-white text-2xl">
                    Luxury villas
                  </h3>
                  <p className="text-white/80 text-base leading-6">
                    Experience elegance and comfort with our exclusive luxury villas, designed for sophisticated living.
                  </p>
                </div>
              </Link> */}
            </div>
          </div>
          <div className="lg:col-span-3 col-span-6">
            <div className="relative rounded-2xl overflow-hidden">
              {/* Removed 'group' class - no longer needed for hover overlay */}
              <Link href="/properties">
                <Image
                  src="/images/categories/tower.jpg"
                  alt="villas"
                  width={320}
                  height={386}
                  className="w-full"
                  unoptimized={true}
                />
              </Link>
              {/* OVERLAY COMMENTED OUT - Responsive overlay with title, description, and arrow icon */}
              {/* <Link href="/properties" className="absolute w-full h-full bg-linear-to-b from-black/0 to-black/80 top-full flex flex-col justify-between pl-10 pb-10 group-hover:top-0 duration-500">
                <div className="flex justify-end mt-6 mr-6">
                  <div className="bg-white text-dark rounded-full w-fit p-4">
                    <Icon icon="ph:arrow-right" width={24} height={24} />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-white text-2xl">
                    Appartment
                  </h3>
                  <p className="text-white/80 text-base leading-6">
                    Experience elegance and comfort with our exclusive luxury villas, designed  for sophisticated living.
                  </p>
                </div>
              </Link> */}
            </div>
          </div>
          <div className="lg:col-span-3 col-span-6">
            <div className="relative rounded-2xl overflow-hidden">
              {/* Removed 'group' class - no longer needed for hover overlay */}
              <Link href="/properties">
                <Image
                  src="/images/categories/bunglow.jpg"
                  alt="office"
                  width={320}
                  height={386}
                  className="w-full"
                  unoptimized={true}
                />
              </Link>
              {/* OVERLAY COMMENTED OUT - Responsive overlay with title, description, and arrow icon */}
              {/* <Link href="/properties" className="absolute w-full h-full bg-linear-to-b from-black/0 to-black/80 top-full flex flex-col justify-between pl-10 pb-10 group-hover:top-0 duration-500">
                <div className="flex justify-end mt-6 mr-6">
                  <div className="bg-white text-dark rounded-full w-fit p-4">
                    <Icon icon="ph:arrow-right" width={24} height={24} />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-white text-2xl">
                    Office Spaces
                  </h3>
                  <p className="text-white/80 text-base leading-6">
                    Experience elegance and comfort with our exclusive luxury villas, designed  for sophisticated living.
                  </p>
                </div>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
