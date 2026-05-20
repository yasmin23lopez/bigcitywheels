"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import TireIcon from "@/components/TireIcon";
import ScrollReveal from "@/components/ScrollReveal";

export default function GrandOpening({ promos }: { promos?: any[] | null }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section className="relative py-32 sm:py-40 overflow-hidden bg-red" ref={ref}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.05) 40px, rgba(255,255,255,0.05) 41px)"
        }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <motion.div style={{ scale, opacity }}>
            <div className="text-center">
              {/* Overline */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="font-condensed text-base sm:text-lg font-bold tracking-[0.3em] uppercase text-white/80 mb-6"
              >
                🔥 Limited Time Offer
              </motion.p>

              {/* Main headline */}
              <h2 className="font-display text-5xl sm:text-7xl lg:text-[6rem] font-black uppercase tracking-tight leading-[0.85] text-white">
                Free
                <br />
                <span className="italic" style={{ fontFamily: "var(--font-accent)" }}>
                  Alignment
                </span>
              </h2>

              {/* Sub headline */}
              <p className="mt-6 font-display text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-wider text-white/90">
                with every rim or suspension purchase
              </p>

              {/* Divider */}
              <div className="mt-8 w-24 h-[3px] bg-white/30 mx-auto" />

              {/* Details */}
              <p className="mt-8 font-condensed text-base sm:text-lg tracking-[0.2em] uppercase text-white">
                Grand Opening · Crosby, TX · June 2026
              </p>

              {/* CTA buttons */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:7135615519"
                  className="group bg-white text-red font-display font-bold text-base sm:text-lg tracking-[0.1em] uppercase px-10 py-4 hover:bg-white/90 transition-all duration-300 inline-flex items-center justify-center gap-3 w-full sm:w-auto"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
                  }}
                >
                  Claim This Offer
                  <TireIcon className="w-5 h-5 transition-transform duration-1000 group-hover:rotate-[360deg]" />
                </a>
                <a
                  href="/wheels"
                  className="group bg-white/15 hover:bg-white/25 text-white font-display font-bold text-base sm:text-lg tracking-[0.1em] uppercase px-10 py-4 transition-all duration-300 inline-flex items-center justify-center gap-3 w-full sm:w-auto border border-white/20"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
                  }}
                >
                  Shop Now
                  <TireIcon className="w-5 h-5 transition-transform duration-1000 group-hover:rotate-[360deg]" />
                </a>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
