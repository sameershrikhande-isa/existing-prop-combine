import { Medal } from "lucide-react";
import { Icon } from "@iconify/react";

 

const Feature104 = () => {
  return (
    <section className="py-24">
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

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="placeholder"
            className="hidden h-full rounded-2xl object-cover shadow-(--shadow-3xl) lg:block"
          />
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
                <h3 className="font-medium text-dark dark:text-white">Interior designers</h3>
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
