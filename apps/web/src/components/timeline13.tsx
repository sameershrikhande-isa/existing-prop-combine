// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Progress } from "@/components/ui/progress";
// import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconChevronsRight, IconHomeSearch, IconKey } from "@tabler/icons-react";

const Timeline13 = () => {
  return (
    <section className="pt-0 pb-24">
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div className="flex flex-col">
          {/* <h1 className="mb-2 text-3xl font-semibold md:text-5xl text-dark dark:text-white tracking-tighter">
            Journey to Product Launch
          </h1> */}
          {/* <p className="max-w-2xl text-black/60 dark:text-white/60">
            Follow the essential steps to bring your innovative idea to market
            and ensure a successful product debut.
          </p> */}
        </div>
        <div className="relative mt-8 flex flex-col gap-6 rounded-2xl bg-white/90 dark:bg-black/80 shadow-(--shadow-3xl) backdrop-blur p-4 sm:p-8 lg:p-11">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl p-px content-['']
            [background:linear-gradient(135deg,rgba(0,0,0,0.08),rgba(0,0,0,0)_35%),linear-gradient(315deg,rgba(0,0,0,0.06),rgba(0,0,0,0)_35%)]
            dark:[background:linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0)_35%),linear-gradient(315deg,rgba(255,255,255,0.12),rgba(255,255,255,0)_35%)]
            [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] mask-exclude
            [-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [-webkit-mask-composite:xor]"
          />
          <div className="contents items-center justify-between sm:flex">
            <h2 className="mt-4 flex items-center gap-2 text-2xl font-medium md:text-3xl text-dark dark:text-white tracking-tighter">
              <span>From</span>
              <IconHomeSearch className="w-5 h-5 md:w-6 md:h-6 text-primary shrink-0" />
              <span>Discovery to Possession</span>
              <IconKey className="w-5 h-5 md:w-6 md:h-6 text-primary shrink-0" />
            </h2>
            <Link href="/properties" className="order-last flex items-center gap-2 py-4 px-8 rounded-full text-base leading-4 font-semibold bg-primary text-white hover:bg-dark duration-300">
              Chat Now with an Expert
              <IconChevronsRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="mt-3 flex gap-4 sm:flex-col">
            <div className="relative">
              <div className="grid h-full w-4 justify-center gap-10 sm:h-4 sm:w-auto sm:grid-cols-4 sm:items-center">
                <div className="absolute inset-0 left-1/2 w-px -translate-x-1/2 bg-black/10 dark:bg-white/10 sm:inset-auto sm:left-auto sm:h-px sm:w-full sm:translate-x-0" />
                <span className="relative top-3 size-2 rounded-full bg-black/10 dark:bg-white/10 sm:top-0" />
                <span className="relative top-3 size-2 rounded-full bg-black/10 dark:bg-white/10 sm:top-0" />
                <span className="relative top-3 size-2 rounded-full bg-black/10 dark:bg-white/10 sm:top-0" />
                <span className="relative top-3 size-2 rounded-full bg-black/10 dark:bg-white/10 sm:top-0" />
              </div>
              <div className="animate-timeline-reveal absolute inset-0 grid h-full w-4 justify-center gap-10 sm:h-4 sm:w-auto sm:grid-cols-4 sm:items-center">
                <div className="absolute inset-0 left-1/2 w-px -translate-x-1/2 bg-primary sm:inset-auto sm:left-auto sm:h-px sm:w-full sm:translate-x-0" />
                <span className="relative top-3 size-2 rounded-full bg-primary sm:top-0" />
                <span className="relative top-3 size-2 rounded-full bg-primary sm:top-0" />
                <span className="relative top-3 size-2 rounded-full bg-primary sm:top-0" />
                <span className="relative top-3 size-2 rounded-full bg-primary sm:top-0" />
              </div>
            </div>
            <div className="grid gap-10 sm:grid-cols-4">
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex flex-col">
                  <div className="flex h-8 w-fit items-center gap-px overflow-hidden rounded-md border border-black/10 dark:border-white/10 text-sm font-medium">
                    <span className="grid h-full place-items-center px-2 bg-white dark:bg-black">
                      01
                    </span>
                    <span className="grid h-full place-items-center px-2 bg-white dark:bg-black">
                      Analyze
                    </span>
                  </div>
                  <h3 className="mt-5 font-medium text-dark dark:text-white">
                    Understand Your Requirements
                  </h3>
                  <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                    We assess your needs, budget, and preferences to create a personalized property search strategy.
                  </p>
                </div>
              </div>
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex flex-col">
                  <div className="flex h-8 w-fit items-center gap-px overflow-hidden rounded-md border border-black/10 dark:border-white/10 text-sm font-medium">
                    <span className="grid h-full place-items-center px-2 bg-white dark:bg-black">
                      02
                    </span>
                    <span className="grid h-full place-items-center px-2 bg-white dark:bg-black">
                      Match
                    </span>
                  </div>
                  <h3 className="mt-5 font-medium text-dark dark:text-white">
                    Find Your Perfect Property
                  </h3>
                  <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                    Browse curated listings that match your criteria. Schedule viewings with expert guidance.
                  </p>
                </div>
              </div>
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex flex-col">
                  <div className="flex h-8 w-fit items-center gap-px overflow-hidden rounded-md border border-black/10 dark:border-white/10 text-sm font-medium">
                    <span className="grid h-full place-items-center px-2 bg-white dark:bg-black">
                      03
                    </span>
                    <span className="grid h-full place-items-center px-2 bg-white dark:bg-black">
                      Negotiate
                    </span>
                  </div>
                  <h3 className="mt-5 font-medium text-dark dark:text-white">
                    Secure the Best Deal
                  </h3>
                  <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                    Our experts negotiate on your behalf to get the best price and terms for maximum value.
                  </p>
                </div>
              </div>
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex flex-col">
                  <div className="flex h-8 w-fit items-center gap-px overflow-hidden rounded-md border border-black/10 dark:border-white/10 text-sm font-medium">
                    <span className="grid h-full place-items-center px-2 bg-white dark:bg-black">
                      04
                    </span>
                    <span className="grid h-full place-items-center px-2 bg-white dark:bg-black">
                      Possession
                    </span>
                  </div>
                  <h3 className="mt-5 font-medium text-dark dark:text-white">
                    Support Till You Move In
                  </h3>
                  <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                    We handle all paperwork, legal formalities, and provide ongoing assistance until possession.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
        /* Mobile: Top to bottom animation */
        @keyframes timeline-reveal-mobile {
          from {
            clip-path: inset(0 0 100% 0);
          }
          to {
            clip-path: inset(0% 0 0 0);
          }
        }
        
        /* Desktop: Left to right animation */
        @keyframes timeline-reveal-desktop {
          from {
            clip-path: inset(0 100% 0 0);
          }
          to {
            clip-path: inset(0 0% 0 0);
          }
        }
        
        .animate-timeline-reveal {
          animation: timeline-reveal-mobile 5s linear;
        }
        
        @media (min-width: 640px) {
          .animate-timeline-reveal {
            animation: timeline-reveal-desktop 5s linear;
          }
        }
        `}
      </style>
    </section>
  );
};

export { Timeline13 };
