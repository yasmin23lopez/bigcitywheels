"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import TireIcon from "@/components/TireIcon";
import ScrollReveal from "@/components/ScrollReveal";
import Badge from "@/components/Badge";

const products = [
  {
    title: "New Tires",
    subtitle: "All Sizes & Brands",
    description: "From all-terrain to highway, we carry tires for every vehicle and driving style.",
    tag: "Most Popular",
  },
  {
    title: "Custom Rims",
    subtitle: "Style Meets Performance",
    description: "Upgrade your look with custom wheels. Wide selection of styles, sizes, and finishes.",
    tag: "Trending",
  },
  {
    title: "Suspension Kits",
    subtitle: "Lift & Level",
    description: "Complete suspension and lift kit packages for trucks and SUVs. Go big or go home.",
    tag: "Specialty",
  },
  {
    title: "Accessories",
    subtitle: "Finish the Build",
    description: "Lug nuts, spacers, TPMS sensors, and everything else to complete your setup.",
    tag: "Add-On",
  },
];

export default function Products() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section id="products" className="relative py-24 sm:py-32 overflow-hidden" ref={ref}>
      <motion.div style={{ y: bgY }} className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(26,58,107,0.08)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16 sm:mb-20">
          <Badge color="blue">What We Carry</Badge>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight">
            Our Products
          </h2>
          <div className="mt-4 w-16 h-[2px] bg-blue-light mx-auto" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {products.map((product, i) => (
            <ScrollReveal
              key={product.title}
              direction={i % 2 === 0 ? "left" : "right"}
            >
              <div className="group relative bg-card-bg border border-card-border overflow-hidden transition-all duration-500 hover:border-blue-light/30 h-full">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue/0 via-blue-light/50 to-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="p-8 sm:p-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge color="blue" className="mb-4 text-xs">{product.tag}</Badge>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wider">
                        {product.title}
                      </h3>
                      <p className="font-condensed text-sm tracking-wider text-white/40 mt-1">
                        {product.subtitle}
                      </p>
                    </div>
                    <div className="text-white/10 group-hover:text-blue-light/30 transition-colors duration-500">
                      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                        <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>

                  <p className="font-body text-sm text-white/40 leading-relaxed font-light mt-4">
                    {product.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-white/5">
                    <a
                      href="#contact"
                      className="font-condensed text-sm tracking-[0.2em] uppercase text-white/40 group-hover:text-blue-light transition-colors duration-300 flex items-center gap-2"
                    >
                      Request a Quote <TireIcon className="w-3.5 h-3.5 transition-transform duration-1000 group-hover:rotate-[360deg]" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
