"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  Poppins,
  Comfortaa,
  Sora,
  Space_Grotesk,
} from "next/font/google";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["700"],
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const spacegrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const providesData = [
  {
    title: "Out Campus Learning",
    para: "School trips take learning beyond the classroom, fostering experiential education, independence, and strong peer bonds.",
    video: "/videos/outcampus.mp4",
    image: "/images/ttl2/4.png",
    points: [
      "Guided educational trips to museums, heritage sites, and nature reserves",
      "Builds independence and responsibility away from the classroom",
      "Encourages strong peer bonds through shared experiences",
      "Hands-on, experiential learning that complements the curriculum",
    ],
  },
  {
    title: "Sports & Fitness",
    para: "Students participate in various sports activities that promote teamwork and discipline.",
    video: "/videos/sports.mp4",
    image: "/images/gallery/19.png",
    points: [
      "Access to a wide range of indoor and outdoor sports",
      "Trained coaches focused on skill-building and safety",
      "Promotes discipline, teamwork, and healthy competition",
      "Regular inter-house and inter-school tournaments",
    ],
  },
  {
    title: "Creative Arts",
    para: "Art, music, dance, and cultural activities help students explore creativity.",
    video: "/videos/dance.mp4",
    image: "/images/gallery/20.png",
    points: [
      "Dedicated studios for art, music, and dance",
      "Exposure to classical and contemporary art forms",
      "Regular showcases and cultural performances",
      "Encourages self-expression and confidence on stage",
    ],
  },
  {
    title: "Clubs as Skill Development",
    para: "From Science to Arts and Music, clubs give students a chance to explore interests, learn teamwork, and build new skills.",
    video: "/videos/club.mp4",
    image: "/images/gallery/21.png",
    points: [
      "Science, robotics, art, music, and literary clubs",
      "Student-led sessions that build leadership skills",
      "Space to explore interests outside the core curriculum",
      "Culminates in inter-club showcases and competitions",
    ],
  },
  {
    title: "Festivals & Celebrations",
    para: "We celebrate festivals and special days to help children understand traditions, values, and the joy of togetherness.",
    video: "/videos/festival.mp4",
    image: "/images/gallery/22.png",
    points: [
      "Celebration of national, cultural, and religious festivals",
      "Helps students understand traditions and shared values",
      "Builds a sense of community and togetherness",
      "Student-organised events encourage ownership and pride",
    ],
  },
  {
    title: "Co Curricular Activities",
    para: "A joyful celebration where students express themselves through dance, music, art, and performances, celebrating our rich culture.",
    video: "/videos/arts2.mp4",
    image: "/images/gallery/23.png",
    points: [
      "Dance, music, art, and drama performances",
      "Celebrates the school's rich cultural heritage",
      "Builds confidence through public performance",
      "Open platform for every student to participate",
    ],
  },
];

const PvmProvides = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Prevent background scroll when modal is open.
  // Locking only `overflow` on the body isn't enough on some browsers/iOS
  // (touch scroll and scroll-chaining still leak through to the page
  // behind), so we also pin the body in place with `position: fixed` and
  // restore the exact scroll offset when the modal closes.
  useEffect(() => {
    if (activeIndex !== null) {
      const scrollY = window.scrollY;
      const body = document.body;
      const originalStyles = {
        position: body.style.position,
        top: body.style.top,
        left: body.style.left,
        right: body.style.right,
        width: body.style.width,
        overflow: body.style.overflow,
      };

      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";

      return () => {
        body.style.position = originalStyles.position;
        body.style.top = originalStyles.top;
        body.style.left = originalStyles.left;
        body.style.right = originalStyles.right;
        body.style.width = originalStyles.width;
        body.style.overflow = originalStyles.overflow;
        window.scrollTo(0, scrollY);
      };
    }
  }, [activeIndex]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const activeItem = activeIndex !== null ? providesData[activeIndex] : null;

  return (
    <section className="bg-white">

      {/* Cards */}
      <div className="grid grid-cols-1">
        {providesData.map((item, index) => (
          <div key={index} className="relative h-[42rem] overflow-hidden py-5">
            {/* Background Video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={item.video} type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div
              className={`relative z-10 flex h-full flex-col justify-end p-8 ${sora.className}`}
            >
              <h2
                className={`absolute top-8 left-8 ${spacegrotesk.className} text-lg font-light text-white`}
              >
                LifeCherishingExperience@pvm
              </h2>

              <h2 className="mb-3 text-5xl text-white">{item.title}</h2>

              <p
                className={`${comfortaa.className} text-[14px] font-thin text-gray-200 max-w-xl`}
              >
                {item.para}
              </p>

              <button
                onClick={() => setActiveIndex(index)}
                className="mt-4 w-fit rounded-full bg-white px-7 py-3 text-[15px] font-medium tracking-wide text-black transition-all duration-300 hover:bg-gray-100"
              >
                Know More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal — rendered at section root, NOT inside any
          overflow-hidden card wrapper, and uses `fixed` positioning
          so it always sits above the full viewport regardless of
          which card triggered it. */}
      {activeItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
            onClick={() => setActiveIndex(null)}
          />

          {/* Modal Panel */}
          <div
            className="no-scrollbar relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto overscroll-contain rounded-3xl bg-white shadow-2xl animate-[modalIn_0.25s_ease-out]"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveIndex(null)}
              aria-label="Close"
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black shadow-md transition-colors hover:bg-gray-100"
            >
              <X size={20} />
            </button>

            {/* 1. Image */}
            <div className="relative h-64 w-full overflow-hidden rounded-t-3xl md:h-72">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <h3
                className={`${spacegrotesk.className} absolute bottom-5 left-6 text-3xl font-light text-white md:text-4xl`}
              >
                {activeItem.title}
              </h3>
            </div>

            {/* 2. Points & Details */}
            <div className="px-6 py-8 md:px-8">
              <p
                className={`${sora.className} mb-6 text-base leading-relaxed text-gray-700 md:text-lg`}
              >
                {activeItem.para}
              </p>

              <ul className="space-y-3">
                {activeItem.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black" />
                    <span
                      className={`${comfortaa.className} text-sm leading-relaxed text-gray-800 md:text-[15px]`}
                    >
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              {/* 3. Close Button (in-flow) */}
              <button
                onClick={() => setActiveIndex(null)}
                className={`${spacegrotesk.className} mt-8 w-full rounded-full bg-black px-7 py-3 text-[15px] font-medium tracking-wide text-white transition-all duration-300 hover:bg-gray-800 md:w-auto`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .no-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE/Edge */
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome/Safari/WebKit */
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default PvmProvides;