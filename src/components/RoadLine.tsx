"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function RoadLine() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();

  const dashOffset = useTransform(scrollYProgress, [0, 1], [0, -2000]);

  return (
    <div ref={ref} className="fixed left-1/2 top-0 bottom-0 -translate-x-1/2 z-[1] pointer-events-none hidden lg:block">
      {/* Road edge lines */}
      <div className="absolute left-[-12px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />
      <div className="absolute left-[12px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />

      {/* Center dashed line */}
      <motion.svg
        className="absolute left-[-1px] top-0 w-[2px] h-full"
        style={{ strokeDashoffset: dashOffset }}
      >
        <line
          x1="1"
          y1="0"
          x2="1"
          y2="100%"
          stroke="rgba(254, 56, 48, 0.15)"
          strokeWidth="2"
          strokeDasharray="12 18"
        />
      </motion.svg>

      {/* Glow dot that follows scroll */}
      <motion.div
        className="absolute left-[-4px] w-[8px] h-[8px] rounded-full bg-red/40"
        style={{
          top: useTransform(scrollYProgress, [0, 1], ["5%", "95%"]),
          boxShadow: "0 0 12px rgba(254,56,48,0.5), 0 0 30px rgba(254,56,48,0.2)",
        }}
      />
    </div>
  );
}
