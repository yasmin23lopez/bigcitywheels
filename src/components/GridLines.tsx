"use client";

export default function GridLines() {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none" aria-hidden="true">
      <div className="absolute top-0 h-full w-px bg-white/[0.05]" style={{ left: "25vw" }} />
      <div className="absolute top-0 h-full w-px bg-white/[0.05]" style={{ left: "50vw" }} />
      <div className="absolute top-0 h-full w-px bg-white/[0.05]" style={{ left: "75vw" }} />
    </div>
  );
}
