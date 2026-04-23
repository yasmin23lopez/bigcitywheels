"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Badge from "@/components/Badge";

const categories = [
  {
    brand: "All-Terrain",
    name: "Adventure Ready",
    image: "/img/1.jpg",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    brand: "Mud-Terrain",
    name: "Off-Road Beast",
    image: "/img/2.jpg",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    brand: "Highway",
    name: "Smooth Ride",
    image: "/img/3.jpg",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    brand: "Performance",
    name: "Speed & Grip",
    image: "/img/4.jpg",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

function StairBar({ scrollYProgress, index }: { scrollYProgress: MotionValue<number>; index: number }) {
  const start = index * 0.08;
  const end = start + 0.35;
  const y = useTransform(scrollYProgress, [start, end], ["0%", "-100%"]);

  return (
    <motion.div className="bg-black" style={{ y }} />
  );
}

export default function StairTransition() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });

  return (
    <div ref={ref} className="relative h-[70vh] overflow-hidden bg-white">
      {/* Badge floating on top */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20">
        <Badge color="red">Our Products</Badge>
      </div>

      {/* Cards */}
      <div className="absolute inset-0 grid grid-cols-4">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="relative group cursor-pointer bg-white border-r border-black/[0.06] last:border-r-0 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Hover image with dark overlay */}
            <Image
              src={cat.image}
              alt={cat.brand}
              fill
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              sizes="25vw"
            />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 rounded-full border-2 border-black/10 group-hover:border-white/30 transition-all duration-300 flex items-center justify-center text-black/30 group-hover:text-white">
                {cat.icon}
              </div>
              <div className="text-center px-4">
                <p className="font-condensed text-xs tracking-[0.3em] uppercase text-red group-hover:text-red mb-2">{cat.brand}</p>
                <p className="font-display text-base sm:text-lg font-bold text-black group-hover:text-white uppercase tracking-wide transition-colors duration-300">{cat.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stair bars */}
      <div className="absolute inset-0 grid grid-cols-4 pointer-events-none" style={{ zIndex: 10 }}>
        <StairBar scrollYProgress={scrollYProgress} index={0} />
        <StairBar scrollYProgress={scrollYProgress} index={1} />
        <StairBar scrollYProgress={scrollYProgress} index={2} />
        <StairBar scrollYProgress={scrollYProgress} index={3} />
      </div>
    </div>
  );
}
