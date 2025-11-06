"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

const galleryImages = [
  [
    "/images/temp/prop1.jpeg",
    "/images/temp/prop2.jpeg",
    "/images/temp/prop3.jpeg",
    "/images/temp/prop4.jpeg",
    "/images/temp/prop5.jpeg",
  ],
  [
    "/images/temp/prop5.jpeg",
    "/images/temp/prop4.jpeg",
    "/images/temp/prop3.jpeg",
    "/images/temp/prop2.jpeg",
    "/images/temp/prop1.jpeg",
  ],
];

const Hero234 = () => {
  return (
    <section className="bg-background relative overflow-hidden h-full rounded-2xl">
    {/* <section className="bg-background relative min-h-screen overflow-hidden"> */}
      <div className="absolute inset-0 flex flex-col justify-center gap-4">
        {galleryImages.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            className="flex gap-4 will-change-transform"
            animate={{
              x: rowIndex === 1 ? [-1920, 0] : [0, -1920],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...row, ...row, ...row].map((image, imageIndex) => (
              <motion.div
                key={`${rowIndex}-${imageIndex}`}
                className="relative flex-shrink-0 overflow-hidden rounded-lg"
                style={{
                  width: rowIndex === 1 ? "280px" : "240px",
                  height: rowIndex === 1 ? "350px" : "300px",
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={image}
                  alt={`Gallery image ${imageIndex + 1}`}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Left side masks */}
      <div className="from-background absolute left-0 top-0 z-10 h-full w-[160px] bg-gradient-to-r to-transparent md:w-[200px]" />

      {/* Right side masks */}
      <div className="from-background absolute right-0 top-0 z-10 h-full w-[160px] bg-gradient-to-l to-transparent md:w-[200px]" />

      <div className="relative z-20 flex items-center justify-center">
      {/* <div className="relative z-20 flex min-h-screen items-center justify-center"> */}
        <motion.div
          className="rounded-lg bg-black/60 p-8 backdrop-blur-md md:p-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h1
            className="text-3xl leading-tight text-white md:text-xl lg:text-xl  text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Explore <br />
            this Property's <br />
            Gallery
          
          </motion.h1>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Button size="lg" variant="secondary">
              View Projects
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export { Hero234 };
