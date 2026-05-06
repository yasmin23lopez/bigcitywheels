"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Badge from "@/components/Badge";

const services = [
  {
    title: "Tire Installation",
    description: "Professional mounting and balancing for all vehicle types.",
    image: "/img/1_service.jpg",
    href: "/services/tires",
    icon: (
      <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
        <line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" />
        <line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
  {
    title: "Rim Installation",
    description: "Custom rim fitting and installation for the perfect look.",
    image: "/img/2_service.jpg",
    href: "/services/rims",
    icon: (
      <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: "Lift Kits",
    description: "Level up your truck with professional suspension work.",
    image: "/img/3_service.jpg",
    href: "/services/lift-kits",
    icon: (
      <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path d="M12 3v18M8 7l4-4 4 4" /><path d="M5 12h14" />
        <path d="M3 17h4v4H3zM17 17h4v4h-4z" /><path d="M7 19h10" />
      </svg>
    ),
  },
  {
    title: "Alignment",
    description: "Precision alignment for straight tracking and even wear.",
    image: "/img/4_service.jpg",
    href: "/services/alignment",
    icon: (
      <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <circle cx="12" cy="12" r="10" /><path d="M12 2v20M2 12h20" />
        <circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Services() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });

  const y1 = useTransform(scrollYProgress, [0, 0.4], ["0%", "-100%"]);
  const y2 = useTransform(scrollYProgress, [0.08, 0.52], ["0%", "-100%"]);
  const y3 = useTransform(scrollYProgress, [0.16, 0.64], ["0%", "-100%"]);
  const y4 = useTransform(scrollYProgress, [0.24, 0.76], ["0%", "-100%"]);

  const columns = [y1, y2, y3, y4];

  return (
    <section id="services" ref={ref} className="relative h-[70vh] overflow-hidden bg-background">
      {/* Cards layer */}
      <div className="absolute inset-0 grid grid-cols-4">
        {services.map((service, i) => (
          <a
            href={service.href}
            key={i}
            className="relative group cursor-pointer bg-background border-r border-white/[0.06] last:border-r-0 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Hover image with dark overlay */}
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              sizes="25vw"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col items-center justify-center">
              {/* Icon */}
              <div className="text-white/20 group-hover:text-red transition-all duration-300 mb-5 group-hover:scale-110">
                {service.icon}
              </div>

              {/* Text */}
              <div className="text-center px-4">
                <p className="font-display text-lg sm:text-xl font-bold text-white uppercase tracking-wide mb-2">
                  {service.title}
                </p>
                <p className="font-body text-xs sm:text-sm text-white/40 group-hover:text-white/60 max-w-[180px] transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </div>
          </a>
        ))}

        {/* Badge inside cards layer so it's behind stair columns */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2">
          <Badge>Our Services</Badge>
        </div>
      </div>

      {/* Stair columns */}
      <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">
        {columns.map((y, i) => (
          <motion.div key={i} style={{ y }} className="bg-white" />
        ))}
      </div>
    </section>
  );
}
