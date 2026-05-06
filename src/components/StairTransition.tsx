"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Badge from "@/components/Badge";

const categories = [
  {
    brand: "Tires",
    name: "1,000+ In Stock",
    image: "/img/llantas.jpg",
    href: "/tires",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    brand: "Wheels",
    name: "2,400+ In Stock",
    image: "/img/yash-savla-IXV_wQLoqbc-unsplash.jpg",
    href: "/wheels",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    ),
  },
  {
    brand: "Lift Kits",
    name: "Chevy · Ford · Dodge",
    image: "/img/ronney-salazar-VF7rb-_SRiI-unsplash.jpg",
    href: "/services/lift-kits",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 3v18M8 7l4-4 4 4" /><path d="M5 12h14" />
      </svg>
    ),
  },
  {
    brand: "Accessories",
    name: "Wheel Weights & More",
    image: "/img/3.jpg",
    href: "/accessories",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
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
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4">
        {categories.map((cat, i) => (
          <a
            href={cat.href}
            key={i}
            className="relative group cursor-pointer bg-white border-r border-black/[0.06] last:border-r-0 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Hover image with dark overlay */}
            <Image
              src={cat.image}
              alt={cat.brand}
              fill
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 rounded-full border-2 border-black/10 group-hover:border-white/30 transition-all duration-300 flex items-center justify-center text-black/30 group-hover:text-white">
                {cat.icon}
              </div>
              <div className="text-center px-4">
                <p className="font-display text-base sm:text-lg font-bold text-black group-hover:text-white uppercase tracking-wide transition-colors duration-300">{cat.brand}</p>
                <p className="font-condensed text-xs tracking-[0.2em] uppercase text-black/40 group-hover:text-white/60 mt-2 transition-colors duration-300">{cat.name}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Stair bars */}
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 pointer-events-none" style={{ zIndex: 10 }}>
        <StairBar scrollYProgress={scrollYProgress} index={0} />
        <StairBar scrollYProgress={scrollYProgress} index={1} />
        <StairBar scrollYProgress={scrollYProgress} index={2} />
        <StairBar scrollYProgress={scrollYProgress} index={3} />
      </div>
    </div>
  );
}
