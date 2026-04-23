"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
}

export default function ScrollReveal({ children, className = "", direction = "up", delay = 0 }: Props) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.4"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [60, 0] : [0, 0]
  );
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" ? [-60, 0] : direction === "right" ? [60, 0] : [0, 0]
  );
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, x, opacity, scale }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
