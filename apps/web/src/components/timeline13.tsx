// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Progress } from "@/components/ui/progress";
// import { Button } from "@/components/ui/button";
import Link from "next/link";

const Timeline13 = () => {
  return (
    <section className="py-24">
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
            <h2 className="mt-4 text-2xl font-medium md:text-3xl text-dark dark:text-white tracking-tighter">
            Discover Your Dream Property Today 
            </h2>
            <Link href="/properties" className="order-last py-4 px-8 rounded-full text-base leading-4 font-semibold bg-primary text-white hover:bg-dark duration-300">Start Your Journey</Link>
          </div>
          <div className="mt-3 flex gap-4 sm:flex-col">
            <div className="relative">
              <div className="grid h-full w-4 justify-center gap-10 sm:h-4 sm:w-auto sm:grid-cols-3 sm:items-center">
                <div className="absolute inset-0 left-1/2 w-px -translate-x-1/2 bg-black/10 dark:bg-white/10 sm:inset-auto sm:left-auto sm:h-px sm:w-full sm:translate-x-0" />
                <span className="relative top-3 size-2 rounded-full bg-black/10 dark:bg-white/10 sm:top-0" />
                <span className="relative top-3 size-2 rounded-full bg-black/10 dark:bg-white/10 sm:top-0" />
                <span className="relative top-3 size-2 rounded-full bg-black/10 dark:bg-white/10 sm:top-0" />
              </div>
              <div className="animate-timeline-reveal absolute inset-0 grid h-full w-4 justify-center gap-10 sm:h-4 sm:w-auto sm:grid-cols-3 sm:items-center">
                <div className="absolute inset-0 left-1/2 w-px -translate-x-1/2 bg-primary sm:inset-auto sm:left-auto sm:h-px sm:w-full sm:translate-x-0" />
                <span className="relative top-3 size-2 rounded-full bg-primary sm:top-0" />
                <span className="relative top-3 size-2 rounded-full bg-primary sm:top-0" />
                <span className="relative top-3 size-2 rounded-full bg-primary sm:top-0" />
              </div>
            </div>
            <div className="grid gap-10 sm:grid-cols-3">
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex flex-col">
                  <div className="flex h-8 w-fit items-center gap-px overflow-hidden rounded-md border border-black/10 dark:border-white/10 text-sm font-medium">
                    <span className="grid h-full place-items-center px-2 bg-white dark:bg-black">
                      01
                    </span>
                    <span className="grid h-full place-items-center px-2 bg-white dark:bg-black">
                      Explore
                    </span>
                  </div>
                  <h3 className="mt-5 font-medium text-dark dark:text-white">
                    Browse Our Extensive Collection
                  </h3>
                  <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                    Browse through hundreds of carefully curated properties. Filter by location, budget, and more... to find your perfect match.
                  </p>
                </div>
                {/* Progress bar temporarily commented */}
                {/* <div>
                  <div className="flex items-center gap-2">
                    <Progress value={15} className="h-1 flex-1" />
                    <span className="w-8 text-right text-xs text-black/60 dark:text-white/60">
                      15%
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-black/60 dark:text-white/60">~2 weeks</p>
                </div> */}
              </div>
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex flex-col">
                  <div className="flex h-8 w-fit items-center gap-px overflow-hidden rounded-md border border-black/10 dark:border-white/10 text-sm font-medium">
                    <span className="grid h-full place-items-center px-2 bg-white dark:bg-black">
                      02
                    </span>
                    <span className="grid h-full place-items-center px-2 bg-white dark:bg-black">
                      Schedule
                    </span>
                  </div>
                  <h3 className="mt-5 font-medium text-dark dark:text-white">Connect With Our Expert Agents</h3>
                  <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                    Get in touch with our experienced real estate professionals. Schedule property viewings and personalized guidance tailored to your needs.
                  </p>
                </div>
                {/* Progress bar temporarily commented */}
                {/* <div>
                  <div className="flex items-center gap-2">
                    <Progress value={85} className="h-1 flex-1" />
                    <span className="w-8 text-right text-xs text-black/60 dark:text-white/60">
                      85%
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-black/60 dark:text-white/60">~6 weeks</p>
                </div> */}
              </div>
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex flex-col">
                  <div className="flex h-8 w-fit items-center gap-px overflow-hidden rounded-md border border-black/10 dark:border-white/10 text-sm font-medium">
                    <span className="grid h-full place-items-center px-2 bg-white dark:bg-black">
                      03
                    </span>
                    <span className="grid h-full place-items-center px-2 bg-white dark:bg-black">
                      Close the Deal
                    </span>
                  </div>
                  <h3 className="mt-5 font-medium text-dark dark:text-white">Close the Deal & Move In</h3>
                  <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                    Complete the purchase process with our dedicated support team. We handle all paperwork, negotiations, and ensure a smooth closing.
                  </p>
                </div>
                {/* Progress bar temporarily commented */}
                {/* <div>
                  <div className="flex items-center gap-2">
                    <Progress value={100} className="h-1 flex-1" />
                    <span className="w-8 text-right text-xs text-black/60 dark:text-white/60">
                      100%
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-black/60 dark:text-white/60">
                    Launch complete
                  </p>
                </div> */}
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
