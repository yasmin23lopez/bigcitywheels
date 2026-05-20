"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [speed, setSpeed] = useState(0);
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only show preloader on first visit
    if (sessionStorage.getItem("preloaderShown")) {
      setVisible(false);
      setDone(true);
      return;
    }
    setMounted(true);
    sessionStorage.setItem("preloaderShown", "true");
  }, []);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 2200;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      setSpeed(Math.round(eased * 100));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setDone(true);
          setTimeout(() => setVisible(false), 600);
        }, 400);
      }
    };

    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(animate);
    }, 300);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Gauge config
  const cx = 200;
  const cy = 200;
  const r = 140;
  const startAngle = 180;
  const endAngle = 360;
  const totalAngle = endAngle - startAngle;

  const polarToCartesian = useCallback(
    (angle: number, radius: number) => {
      const rad = (angle * Math.PI) / 180;
      return {
        x: cx + radius * Math.cos(rad),
        y: cy + radius * Math.sin(rad),
      };
    },
    [cx, cy]
  );

  const describeArc = useCallback(
    (startA: number, endA: number, radius: number) => {
      const start = polarToCartesian(startA, radius);
      const end = polarToCartesian(endA, radius);
      const largeArc = endA - startA > 180 ? 1 : 0;
      return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
    },
    [polarToCartesian]
  );

  const majorTicks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const minorTickCount = 50;
  const progressAngle = startAngle + (speed / 100) * totalAngle;

  if (!visible || !mounted) return null;

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center"
        >
          <motion.div className="relative w-[240px] h-[150px] sm:w-[300px] sm:h-[180px]">
            <svg
              viewBox="40 50 320 170"
              className="w-full h-full overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={describeArc(startAngle, endAngle, r + 12)}
                fill="none"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d={describeArc(startAngle, endAngle, r)}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF8C00" />
                  <stop offset="60%" stopColor="#FE3830" />
                  <stop offset="100%" stopColor="#FF2020" />
                </linearGradient>
              </defs>
              {speed > 0 && (
                <path
                  d={describeArc(startAngle, progressAngle, r)}
                  fill="none"
                  stroke="url(#gaugeGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              )}
              {Array.from({ length: 40 }).map((_, i) => {
                const angle = startAngle + (i / 40) * totalAngle;
                const segProgress = i / 40;
                const isActive = segProgress <= speed / 100;
                const inner = polarToCartesian(angle, r + 8);
                const outer = polarToCartesian(angle, r + 18);
                return (
                  <line
                    key={`seg-${i}`}
                    x1={inner.x}
                    y1={inner.y}
                    x2={outer.x}
                    y2={outer.y}
                    stroke={isActive ? (segProgress > 0.8 ? "#FF2020" : "#FF8C00") : "rgba(255,255,255,0.08)"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity={isActive ? 1 : 0.4}
                  />
                );
              })}
              {majorTicks.map((tick) => {
                const angle = startAngle + (tick / 100) * totalAngle;
                const inner = polarToCartesian(angle, r - 8);
                const outer = polarToCartesian(angle, r - 2);
                return (
                  <line
                    key={`major-${tick}`}
                    x1={inner.x}
                    y1={inner.y}
                    x2={outer.x}
                    y2={outer.y}
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                );
              })}
              {Array.from({ length: minorTickCount }).map((_, i) => {
                const angle = startAngle + (i / minorTickCount) * totalAngle;
                const inner = polarToCartesian(angle, r - 5);
                const outer = polarToCartesian(angle, r - 2);
                return (
                  <line
                    key={`minor-${i}`}
                    x1={inner.x}
                    y1={inner.y}
                    x2={outer.x}
                    y2={outer.y}
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="0.5"
                  />
                );
              })}
              {majorTicks.map((tick) => {
                const angle = startAngle + (tick / 100) * totalAngle;
                const pos = polarToCartesian(angle, r - 22);
                return (
                  <text
                    key={`label-${tick}`}
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="rgba(255,255,255,0.4)"
                    fontSize="9"
                    fontFamily="'Blender', 'Oswald', sans-serif"
                    fontWeight="500"
                  >
                    {tick}
                  </text>
                );
              })}
              <text
                x={cx}
                y={cy - 8}
                textAnchor="middle"
                dominantBaseline="central"
                fill="white"
                fontSize="34"
                fontFamily="'Blender', 'Oswald', sans-serif"
                fontWeight="700"
                letterSpacing="2"
              >
                {speed}
              </text>
              <text
                x={cx + 24}
                y={cy - 18}
                textAnchor="start"
                dominantBaseline="central"
                fill="rgba(255,255,255,0.4)"
                fontSize="8"
                fontFamily="'Blender', 'Oswald', sans-serif"
                fontWeight="500"
                letterSpacing="1"
              >
                MPH
              </text>
            </svg>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="preloader-exit"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
}
