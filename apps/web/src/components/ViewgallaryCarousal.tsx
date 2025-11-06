"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import type { PropertyImage } from "@/types/property";
import { urlFor } from "@/lib/sanity/client";

// Import lightGallery CSS
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

type ViewgallaryCarousalProps = {
  images?: PropertyImage[];
  propertyTitle?: string;
};

const ViewgallaryCarousal = ({ images, propertyTitle = "Property" }: ViewgallaryCarousalProps) => {
  const lightGalleryRef = useRef<any>(null);
  const rows: string[][] = (() => {
    if (!images || images.length === 0) return [[], []];
    const mid = Math.ceil(images.length / 2);
    const rowA = images.slice(0, mid).map((img) => urlFor(img).width(600).height(450).url());
    const rowB = images.slice(mid).map((img) => urlFor(img).width(600).height(450).url());
    return [rowA, rowB.length > 0 ? rowB : rowA];
  })();
  return (
    <section className="bg-background relative overflow-hidden h-full rounded-2xl">
    {/* <section className="bg-background relative min-h-screen overflow-hidden"> */}
      <div className="absolute inset-0 flex flex-col justify-center gap-4">
        {rows.map((row, rowIndex) => (
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
                {image && (
                  <img
                    src={image}
                    alt={`Gallery image ${imageIndex + 1}`}
                    className="h-full w-full object-cover"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Left side masks */}
      <div className="from-background absolute left-0 top-0 z-10 h-full w-[160px] bg-gradient-to-r to-transparent md:w-[200px]" />

      {/* Right side masks */}
      <div className="from-background absolute right-0 top-0 z-10 h-full w-[160px] bg-gradient-to-l to-transparent md:w-[200px]" />

      <div className="relative z-20 flex h-full items-center justify-center">
        <motion.div
          className="rounded-full bg-black/15 p-4 backdrop-blur-md flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {images && images.length > 0 ? (
            <>
              <button
                type="button"
                onClick={() => {
                  if (lightGalleryRef.current) {
                    lightGalleryRef.current.openGallery(0);
                  }
                }}
                className="group inline-flex items-center justify-center gap-2 bg-white py-3 px-8 rounded-full text-base font-semibold text-dark hover:bg-dark hover:text-white duration-300 transition-all whitespace-nowrap border-muted border-[0.5px] cursor-pointer"
              >
                View Gallery
                <IconArrowRight size={20} stroke={2} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* lightGallery component - visually hidden but in DOM for initialization */}
              <div className="sr-only">
                <LightGallery
                  onInit={(detail) => {
                    if (detail) {
                      lightGalleryRef.current = detail.instance;
                    }
                  }}
                  plugins={[lgThumbnail, lgZoom]}
                  speed={500}
                  thumbnail={true}
                  zoom={true}
                  mode="lg-fade"
                  showCloseIcon={true}
                  closable={true}
                  mobileSettings={{
                    controls: true,
                    showCloseIcon: true,
                    download: false,
                    rotate: false,
                  }}
                >
                  {images.map((image, index) => {
                    const fullImageUrl = urlFor(image).width(1920).height(1080).url();
                    const thumbImageUrl = urlFor(image).width(400).height(300).url();
                    const imageSize = "1920-1080"; // Default size, can be adjusted

                    return (
                      <a
                        key={image.id || index}
                        data-lg-size={imageSize}
                        className="gallery-item"
                        data-src={fullImageUrl}
                      >
                        <img
                          alt={image.alt || `${propertyTitle} - Image ${index + 1}`}
                          src={thumbImageUrl}
                          className="sr-only"
                        />
                      </a>
                    );
                  })}
                </LightGallery>
              </div>
            </>
          ) : (
            <button
              type="button"
              disabled
              className="group inline-flex items-center justify-center gap-2 bg-white/50 py-3 px-8 rounded-full text-base font-semibold text-dark/50 cursor-not-allowed whitespace-nowrap border-muted border-[0.5px]"
            >
              View Gallery
              <IconArrowRight size={20} stroke={2} />
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export { ViewgallaryCarousal };
