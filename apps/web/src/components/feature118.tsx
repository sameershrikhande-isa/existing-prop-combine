import {
  CheckCircle2,
  LucideGitGraph,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  MessageSquare,
  Star,
  Zap,
} from "lucide-react";
import { Icon } from "@iconify/react";
import Link from 'next/link';

const Feature118 = () => {
  return (
    <section>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                        <div className='flex justify-between md:items-end items-start mb-10 md:flex-row flex-col'>
                    <div>
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2">
                            <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" aria-label="Home icon" />
                            Our Expertise
                        </p>
                        <h2 className="lg:text-52 text-40 font-medium dark:text-white">
                            Why Choose Us?
                        </h2>
                        <p className='text-dark/50 dark:text-white/50 text-xm'>
                            Stay ahead in the property market with expert advice and updates
                        </p>
                    </div>
                    <Link href="/blogs" className='bg-dark dark:bg-white text-white dark:text-dark py-4 px-8 rounded-full hover:bg-primary duration-300' aria-label="Read all blog articles">
                        Find your dream property
                    </Link>
                </div>


        <div className="flex flex-col gap-10">
          {/* <div className="mx-auto flex max-w-3xl flex-col gap-2.5 text-center">
            <h2 className="text-40 lg:text-52 font-medium text-dark dark:text-white">
              Key Features That Save You Time
            </h2>
            <p className="text-xm text-dark/50 dark:text-white/50">
              Explore tools specifically built to enhance your workflow and boost efficiency.
            </p>
          </div> */}
          <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:gap-10">
            <div className="col-span-2 grid gap-7 md:grid-cols-2 rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/80 shadow-(--shadow-3xl) backdrop-blur p-8 md:p-10">
              <div className="flex h-full flex-col justify-between gap-3">
                <div>
                  <span className="flex size-14 items-center justify-center rounded-full bg-black/5 dark:bg-white/10">
                    <LucideGitGraph className="h-auto w-5 text-dark dark:text-white" />
                  </span>
                  <h3 className="mt-5 text-2xl lg:text-3xl font-medium text-dark dark:text-white">
                    Excellent knowledge of property laws
                  </h3>
                </div>
                <p className="text-dark/60 dark:text-white/60">
                  Over 10 years of expertise into real estate licensing industry
                  </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                alt="placeholder"
                className="hidden sm:block aspect-video h-full w-full rounded-2xl object-cover md:aspect-auto"
              />
            </div>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/80 shadow-(--shadow-3xl) backdrop-blur p-8 md:p-10">
              <div className="flex h-full flex-col justify-between gap-6">
                <div>
                  <span className="flex size-14 items-center justify-center rounded-full bg-black/5 dark:bg-white/10">
                    <Zap className="h-auto w-5 text-dark dark:text-white" />
                  </span>
                  <h3 className="mt-5 text-2xl lg:text-3xl font-medium text-dark dark:text-white">
                  Convinient & Easy Documentations
                  </h3>
                </div>
                <ul className="flex flex-col gap-4 text-dark dark:text-white">
                  <li className="flex gap-2 items-center text-dark/80 dark:text-white/80">
                    <CheckCircle2 className="shrink-0 text-primary" />
                    <span>Your suitable timings</span>
                  </li>
                  <li className="flex gap-2 items-center text-dark/80 dark:text-white/80">
                    <CheckCircle2 className="shrink-0 text-primary" />
                    <span>Transparent and honest</span>
                  </li>
                  <li className="flex gap-2 items-center text-dark/80 dark:text-white/80">
                    <CheckCircle2 className="shrink-0 text-primary" />
                    <span>Professional and experienced team</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="grid items-center gap-8 rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/80 shadow-(--shadow-3xl) backdrop-blur p-8 md:p-10 lg:grid-cols-3">
            <h3 className="text-2xl lg:text-3xl font-medium text-dark dark:text-white">
            MahaRERA-Registered Real Estate Agent
            </h3>
            <div className="flex items-center gap-5">
              <span className="text-4xl md:text-5xl font-semibold text-dark dark:text-white">98%</span>
              <p className="text-dark/60 dark:text-white/60">Satisfacted customers with our services</p>
            </div>
            <div className="flex items-center gap-5">
              <span className="text-4xl md:text-5xl font-semibold text-dark dark:text-white">4.9</span>
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <Star className="text-primary fill-primary" />
                  <Star className="text-primary fill-primary" />
                  <Star className="text-primary fill-primary" />
                  <Star className="text-primary fill-primary" />
                  <Star className="text-primary fill-primary" />
                </div>
                <p className="text-dark/60 dark:text-white/60">Reviews by our customers</p>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-wrap items-center justify-center gap-3 text-dark dark:text-white">
            <MessageSquare className="h-auto w-4" />
            <p className="text-center text-dark/80 dark:text-white/80">Need more info? Reach out to our team.</p>
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Let&apos;s chat
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export { Feature118 };
