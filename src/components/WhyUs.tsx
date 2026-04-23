"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import Badge from "@/components/Badge";

const reasons = [
  {
    number: "01",
    title: "Competitive Pricing",
    description: "Quality products at fair prices. We work with you to find the best option for your budget.",
  },
  {
    number: "02",
    title: "Expert Installation",
    description: "Experienced technicians who know trucks, SUVs, and cars inside and out. Done right the first time.",
  },
  {
    number: "03",
    title: "Quality Brands",
    description: "We carry trusted names in tires, rims, and suspension. No off-brand shortcuts.",
  },
  {
    number: "04",
    title: "Se Habla Español",
    description: "Bilingual service so every customer feels welcome and understood. Your language, your way.",
  },
];

export default function WhyUs() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section id="why-us" className="relative py-24 sm:py-32 overflow-hidden diagonal-lines" ref={ref}>
      <motion.div style={{ y: bgY }} className="absolute inset-0 bg-gradient-to-b from-[#050505] via-surface to-[#050505]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(196,30,42,0.05)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16 sm:mb-20">
          <Badge>The Difference</Badge>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight">
            Why Big City
          </h2>
          <div className="mt-4 w-16 h-[2px] bg-red mx-auto" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-card-border">
          {reasons.map((reason, i) => (
            <ScrollReveal
              key={reason.number}
              direction={i % 2 === 0 ? "left" : "right"}
            >
              <div
                className={`group relative p-8 sm:p-12 transition-all duration-500 hover:bg-white/[0.02] ${
                  i < 2 ? "border-b border-card-border" : ""
                } ${i % 2 === 0 ? "md:border-r border-card-border" : ""}`}
              >
                <span className="font-display text-5xl sm:text-6xl font-bold text-white/[0.04] absolute top-4 right-6 group-hover:text-red/10 transition-colors duration-500">
                  {reason.number}
                </span>

                <div className="relative">
                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider mb-3">
                    {reason.title}
                  </h3>
                  <p className="font-body text-sm text-white/40 leading-relaxed font-light max-w-sm">
                    {reason.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
