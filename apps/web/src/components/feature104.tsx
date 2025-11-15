"use client";

import { Medal } from "lucide-react";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";

const Feature104 = () => {
  const carouselImages = [
    {
      src: "/images/temp/value-added-services-carousal/legal-assistance.jpg",
      alt: "Legal assistance service",
    },
    {
      src: "/images/temp/value-added-services-carousal/Interior-consulting.jpg",
      alt: "Interior consulting service",
    },
    {
      src: "/images/temp/value-added-services-carousal/packers-and-movers.jpg",
      alt: "Packers and movers service",
    },
    {
      src: "/images/temp/value-added-services-carousal/paper-work.jpg",
      alt: "Paperwork assistance service",
    },
    {
      src: "/images/temp/value-added-services-carousal/possession.jpg",
      alt: "Possession assistance service",
    },
    {
      src: "/images/temp/value-added-services-carousal/vastu-assistance.jpg",
      alt: "Vastu assistance service",
    },
  ];

  const css = `
    .feature104-swiper {
      height: 100%;
      border-radius: 1rem;
    }

    .feature104-swiper .swiper-slide {
      border-radius: 1rem;
    }

    .feature104-swiper .swiper-pagination-bullet {
      background-color: #fff;
      opacity: 0.5;
    }

    .feature104-swiper .swiper-pagination-bullet-active {
      opacity: 1;
    }
  `;

  return (
    <section id="value-added-services" className="!pt-8 !pb-8">
      <style>{css}</style>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div className="mx-auto flex flex-col items-center gap-3 mb-10">
          <div className="flex gap-2.5 items-center justify-center">
            <span>
              <Medal className="w-5 h-5 text-primary" />
            </span>
            <p className="text-base font-semibold text-dark/75 dark:text-white/75">Our Services</p>
          </div>
          <h2 className="text-40 lg:text-52 font-medium text-black dark:text-white text-center tracking-tight leading-11 mb-2">
      Value Added Services
          </h2>
          <p className="text-xm font-normal text-black/50 dark:text-white/50 text-center">
            Make your property buying experience seamless & stress-free.
          </p>
        </div>
        <div className="gap mt-14 grid gap-4 lg:grid-cols-3">
          <div className="flex flex-col gap-2.5">
            <div className="relative flex flex-col gap-3 rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/80 p-6 shadow-(--shadow-3xl) backdrop-blur">
              <div className="flex items-center gap-2.5">
                <span className="flex size-10 items-center justify-center rounded-md bg-black/5 dark:bg-white/10">
                  <Icon icon="tabler:gavel" className="h-6 w-6" />
                </span>
                <h3 className="font-medium text-dark dark:text-white">Legal assistance</h3>
              </div>
              <p className="text-sm md:text-base text-black/60 dark:text-white/60">
                Expert guidance for agreements, RERA, registration, and due diligence.
              </p>
            </div>
            <div className="relative flex flex-col gap-3 rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/80 p-6 shadow-(--shadow-3xl) backdrop-blur">
              <div className="flex items-center gap-2.5">
                <span className="flex size-10 items-center justify-center rounded-md bg-black/5 dark:bg-white/10">
                  <Icon icon="tabler:building-bank" className="h-6 w-6" />
                </span>
                <h3 className="font-medium text-dark dark:text-white">Property loans assistance</h3>
              </div>
              <p className="text-sm md:text-base text-black/60 dark:text-white/60">
                End-to-end home loan support with top banks and best interest rates.
              </p>
            </div>
            <div className="relative flex flex-col gap-3 rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/80 p-6 shadow-(--shadow-3xl) backdrop-blur">
              <div className="flex items-center gap-2.5">
                <span className="flex size-10 items-center justify-center rounded-md bg-black/5 dark:bg-white/10">
                  <Icon icon="tabler:home-shield" className="h-6 w-6" />
                </span>
                <h3 className="font-medium text-dark dark:text-white">Property insurance</h3>
              </div>
              <p className="text-sm md:text-base text-black/60 dark:text-white/60">
                Protect your investment with tailored plans and quick onboarding.
              </p>
            </div>
          </div>

          <div className="hidden h-full rounded-2xl shadow-(--shadow-3xl) lg:block">
            <Swiper
              loop={true}
              grabCursor={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              effect="creative"
              pagination={{
                clickable: true,
              }}
              creativeEffect={{
                prev: {
                  shadow: true,
                  origin: "left center",
                  translate: ["-5%", 0, -200],
                  rotate: [0, 100, 0],
                },
                next: {
                  origin: "right center",
                  translate: ["5%", 0, -200],
                  rotate: [0, -100, 0],
                },
              }}
              modules={[EffectCreative, Pagination, Autoplay]}
              className="feature104-swiper h-full"
            >
              {carouselImages.map((image, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative h-full w-full rounded-2xl">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover rounded-2xl"
                      sizes="(max-width: 1024px) 0vw, 33vw"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="relative flex flex-col gap-3 rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/80 p-6 shadow-(--shadow-3xl) backdrop-blur">
              <div className="flex items-center gap-2.5">
                <span className="flex size-10 items-center justify-center rounded-md bg-black/5 dark:bg-white/10">
                  <Icon icon="tabler:compass" className="h-6 w-6" />
                </span>
                <h3 className="font-medium text-dark dark:text-white">Vastu consultancy/remedies</h3>
              </div>
              <p className="text-sm md:text-base text-black/60 dark:text-white/60">
                Vastu-aligned consultations with practical, effective remedies.
              </p>
            </div>
            <div className="relative flex flex-col gap-3 rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/80 p-6 shadow-(--shadow-3xl) backdrop-blur">
              <div className="flex items-center gap-2.5">
                <span className="flex size-10 items-center justify-center rounded-md bg-black/5 dark:bg-white/10">
                  <Icon icon="tabler:truck-delivery" className="h-6 w-6" />
                </span>
                <h3 className="font-medium text-dark dark:text-white">Packers and movers</h3>
              </div>
              <p className="text-sm md:text-base text-black/60 dark:text-white/60">
                Trusted relocation partners for safe, on-time moves.
              </p>
            </div>
            <div className="relative flex flex-col gap-3 rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/80 p-6 shadow-(--shadow-3xl) backdrop-blur">
              <div className="flex items-center gap-2.5">
                <span className="flex size-10 items-center justify-center rounded-md bg-black/5 dark:bg-white/10">
                  <Icon icon="tabler:armchair-2" className="h-6 w-6" />
                </span>
                <h3 className="font-medium text-dark dark:text-white">Interior consulting</h3>
              </div>
              <p className="text-sm md:text-base text-black/60 dark:text-white/60">
                Curated experts to design functional, beautiful spaces that fit your lifestyle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature104 };
