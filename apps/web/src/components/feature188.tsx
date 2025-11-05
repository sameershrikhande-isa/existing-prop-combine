import { ArrowRight } from "lucide-react";
import { Icon } from "@iconify/react";

const Feature188 = () => {
  const resources = [
    {
      title: "Excellent knowledge of property laws",
      description:
        "We have more than 10 years of expertise into real estate licensing industry",
      href: "#",
      imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg",
    },
    {
      title: "Transparency and honesty is our motto",
      description:
        "We believe in transparency and honesty in all our dealings with clients",
      href: "#",
      imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg",
    },
    {
      title: "Professional and experienced team",
      description:
        "We have a team of professionals who are experienced in the real estate licensing industry",
      href: "#",
      imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg",
    },
  ];

  return (
    <section className="py-24">
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div className="mx-auto max-w-3xl flex flex-col items-center gap-3 mb-10">
          <div className="flex gap-2.5 items-center justify-center">
            <span>
              <Icon
                icon={"ph:house-simple-fill"}
                width={20}
                height={20}
                className="text-primary"
              />
            </span>
            <p className="text-base font-semibold text-dark/75 dark:text-white/75">
              Resources
            </p>
          </div>
          <h2 className="text-40 lg:text-52 font-medium text-black dark:text-white text-center tracking-tight leading-11">
            Kickstart your journey with us
          </h2>
          <p className="text-xm font-normal text-black/50 dark:text-white/50 text-center">
            Curated resources to help you explore, learn, and get expert support.
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-5xl rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/80 shadow-(--shadow-3xl) backdrop-blur">
          {resources.map((resource, index) => (
            <div
              key={index}
              className={`${index !== resources.length - 1 ? "border-b border-black/10 dark:border-white/10" : ""}`}
            >
              <a
                href={resource.href}
                className="flex flex-col p-4 md:flex-row md:items-center md:justify-between lg:p-6 hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl md:rounded-none transition-colors"
              >
                <div className="flex items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full p-2 lg:h-12 lg:w-12 bg-black/5 dark:bg-white/10">
                    <ArrowRight className="h-6 w-6 text-black/70 dark:text-white/70" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-medium lg:text-xl text-dark dark:text-white">
                      {resource.title}
                    </h3>
                    <p className="text-sm lg:text-base text-black/60 dark:text-white/60">
                      {resource.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 shrink-0 md:mt-0 md:w-60">
                  <div className="aspect-w-16 aspect-h-9 rounded-lg bg-black/5 dark:bg-white/10 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resource.imageSrc}
                      alt={resource.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature188 };
