"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import TireIcon from "@/components/TireIcon";
import Badge from "@/components/Badge";
import ScrollReveal from "@/components/ScrollReveal";

export default function GrandOpening() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#050505]" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(254,56,48,0.08)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <motion.div style={{ scale }}>
            {/* Main card with diagonal cuts */}
            <div
              className="relative bg-white/[0.02] border border-white/[0.08] p-10 sm:p-16"
              style={{
                clipPath: "polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)",
              }}
            >
              <div className="text-center">
                <Badge>Limited Time</Badge>

                <h2 className="mt-6 font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-tight">
                  Grand{" "}
                  <span className="italic text-red" style={{ fontFamily: "var(--font-accent)" }}>
                    Opening
                  </span>
                </h2>

                <div className="mt-6 w-20 h-[2px] bg-red mx-auto" />

                <p className="mt-8 font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
                  Free Alignment
                </p>
                <p className="mt-2 font-body text-lg sm:text-xl text-white/40">
                  with every rim or suspension purchase
                </p>

                <p className="mt-8 font-condensed text-sm tracking-[0.3em] uppercase text-white/30">
                  Opening May 2025 · Crosby, TX
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="tel:7135615519"
                    className="group bg-red hover:bg-red-dark text-white font-condensed font-semibold text-sm tracking-[0.2em] uppercase px-10 py-4 transition-all duration-300 hover:shadow-[0_0_40px_rgba(254,56,48,0.3)] w-full sm:w-auto text-center inline-flex items-center justify-center gap-2"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
                    }}
                  >
                    Claim This Offer
                    <TireIcon className="w-4 h-4 transition-transform duration-1000 group-hover:rotate-[360deg]" />
                  </a>
                  <a
                    href="#contact"
                    className="group bg-white/[0.06] hover:bg-white/[0.1] text-white font-condensed font-semibold text-sm tracking-[0.2em] uppercase px-10 py-4 transition-all duration-300 w-full sm:w-auto text-center inline-flex items-center justify-center gap-2"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
                    }}
                  >
                    Get a Quote
                    <TireIcon className="w-4 h-4 transition-transform duration-1000 group-hover:rotate-[360deg]" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
