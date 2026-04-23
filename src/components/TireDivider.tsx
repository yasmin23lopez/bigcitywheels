"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function TireDivider() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Tire rolls from left (-10%) to right (100%) as you scroll
  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "100%"]);
  // Rotate as it moves
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 720]);

  return (
    <div ref={ref} className="relative w-full h-16 sm:h-20 overflow-hidden">
      {/* Track line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-y-1/2" />

      {/* Rolling tire */}
      <motion.div
        style={{ x, rotate }}
        className="absolute top-1/2 -translate-y-1/2"
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          className="w-8 h-8 sm:w-9 sm:h-9"
        >
          {/* Outer tire */}
          <circle cx="18" cy="18" r="17" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
          {/* Tread marks */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 18 + 14 * Math.cos(angle);
            const y1 = 18 + 14 * Math.sin(angle);
            const x2 = 18 + 17 * Math.cos(angle);
            const y2 = 18 + 17 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            );
          })}
          {/* Rim */}
          <circle cx="18" cy="18" r="8" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
          {/* Rim spokes */}
          {Array.from({ length: 5 }).map((_, i) => {
            const angle = (i * 72 * Math.PI) / 180;
            const x1 = 18 + 3 * Math.cos(angle);
            const y1 = 18 + 3 * Math.sin(angle);
            const x2 = 18 + 7.5 * Math.cos(angle);
            const y2 = 18 + 7.5 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
            );
          })}
          {/* Center hub */}
          <circle cx="18" cy="18" r="2.5" fill="rgba(255,255,255,0.06)" />
        </svg>
      </motion.div>
    </div>
  );
}
