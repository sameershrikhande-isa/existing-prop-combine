import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IconChevronsRight } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "404 Page | Property ",
};

const ErrorPage = () => {
  return (
    <>
      <section className="flex justify-center pb-0!">
        <Image
          src="/images/404.png"
          alt="404"
          width={300}
          height={275}
          className="w-auto h-auto max-w-[300px]"
          unoptimized={true}
        />
      </section>
      <section className="text-center bg-cover relative overflow-x-hidden" >
        <div className='flex gap-2.5 items-center justify-center'>
          <span>
            <Icon
              icon={'ph:house-simple-fill'}
              width={20}
              height={20}
              className='text-primary'
            />
          </span>
          <p className='text-base font-semibold text-dark/75 dark:text-white/75'>
            Error 404
          </p>
        </div>
        <h2 className="font-bold text-black dark:text-white text-center text-2xl sm:text-3xl mb-4 md:mb-6">
          Lost? Let's Help You Find Home.
        </h2>
        <p className="text-base text-dark/50 dark:text-white/50 font-normal max-w-sm mx-auto">
          Looks like you've hit a dead end — but don't worry, we'll help you get back on track
        </p>
        <div className="flex justify-center mt-6">
          <Link 
            href="/properties" 
            className="flex items-center gap-2 py-4 px-8 rounded-full text-base leading-4 font-semibold bg-primary text-white hover:bg-dark duration-300"
          >
            Explore Properties
            <IconChevronsRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default ErrorPage;