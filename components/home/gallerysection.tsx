"use client";

import { Space_Grotesk, Comfortaa } from "next/font/google";
import { gallerysectiondata1, gallerysectiondata2 } from "@/data/gallerysection";
import Image from "next/image";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spacegrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const GallerySection = () => {
  return (
    <section className="min-h-screen bg-white overflow-hidden py-12 md:py-20">
      <div className="px-5 md:px-10 mb-10 md:mb-16">
        <h2 className={`text-black ${spacegrotesk.className} text-[36px] md:text-[80px] leading-tight`}>
          Student achievements
        </h2>

        <p className={`text-black/50 ${comfortaa.className} max-w-sm md:max-w-2xl text-sm md:text-base mt-2`}>
          Moments that matter. Explore our campus life, student achievements,
          and unforgettable memories through our curated photo and video
          collections.
        </p>

        {/* <button
          className={`bg-black text-white ${comfortaa.className} px-6 md:px-10 py-2.5 md:py-3 mt-5 md:mt-6 rounded text-sm md:text-base font-bold`}
        >
          View Gallery
        </button> */}
      </div>

      {/* Row 1 */}
      <div
        className="overflow-visible ml-[-20%]"
        style={{ transform: "rotate(-10deg)", width: "140%" }}
      >
        <div
          className="flex gap-1 w-max animate-scroll-left"
          style={{ willChange: "transform" }}
        >
          {[...gallerysectiondata1, ...gallerysectiondata1].map((image, index) => (
            <div key={`${image.id}-${index}`} className="flex-shrink-0">
              <Image
                src={image.path}
                alt={image.id}
                width={280}
                height={280}
                loading="eager"
                className="h-[110px] md:h-[180px] w-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div
        className="mt-6 md:mt-12 overflow-visible ml-[-20%]"
        style={{ transform: "rotate(5deg)", width: "140%" }}
      >
        <div
          className="flex gap-1 w-max animate-scroll-right"
          style={{ willChange: "transform" }}
        >
          {[...gallerysectiondata2, ...gallerysectiondata2].map((image, index) => (
            <div key={`${image.id}-${index}`} className="flex-shrink-0">
              <Image
                src={image.path}
                alt={image.id}
                width={280}
                height={280}
                loading="eager"
                className="h-[120px] md:h-[200px] w-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;