"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  color?: "red" | "blue";
}

export default function Badge({ children, className = "", color = "red" }: Props) {
  const borderColor = color === "red" ? "#FE3830" : "#2a5298";
  const textColor = color === "red" ? "text-red" : "text-blue-light";

  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 120 40"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Top border - full width with slight rounded corners */}
        <path
          d="M4 2 L116 2 Q118 2 118 4"
          stroke={borderColor}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M2 4 Q2 2 4 2"
          stroke={borderColor}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* Left side - gap in the middle (taller gap) */}
        <path
          d="M2 4 L2 10"
          stroke={borderColor}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M2 30 L2 36"
          stroke={borderColor}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* Right side - gap in the middle (taller gap) */}
        <path
          d="M118 4 L118 10"
          stroke={borderColor}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M118 30 L118 36"
          stroke={borderColor}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* Bottom border - full width with slight rounded corners */}
        <path
          d="M2 36 Q2 38 4 38"
          stroke={borderColor}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M4 38 L116 38 Q118 38 118 36"
          stroke={borderColor}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className={`relative px-6 py-2 font-condensed text-sm tracking-[0.3em] uppercase font-semibold ${textColor}`}>
        {children}
      </span>
    </span>
  );
}
