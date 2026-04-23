"use client";

// Pre-computed tread marks (10 marks, 36° apart)
const treads = Array.from({ length: 10 }).map((_, i) => {
  const angle = (i * 36 * Math.PI) / 180;
  return {
    x1: +(12 + 9 * Math.cos(angle)).toFixed(4),
    y1: +(12 + 9 * Math.sin(angle)).toFixed(4),
    x2: +(12 + 11 * Math.cos(angle)).toFixed(4),
    y2: +(12 + 11 * Math.sin(angle)).toFixed(4),
  };
});

// Pre-computed spokes (5 spokes, 72° apart)
const spokes = Array.from({ length: 5 }).map((_, i) => {
  const angle = (i * 72 * Math.PI) / 180;
  return {
    x1: +(12 + 2 * Math.cos(angle)).toFixed(4),
    y1: +(12 + 2 * Math.sin(angle)).toFixed(4),
    x2: +(12 + 5 * Math.cos(angle)).toFixed(4),
    y2: +(12 + 5 * Math.sin(angle)).toFixed(4),
  };
});

export default function TireIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
      {treads.map((t, i) => (
        <line key={`t${i}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      ))}
      <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1" />
      {spokes.map((s, i) => (
        <line key={`s${i}`} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="currentColor" strokeWidth="0.8" />
      ))}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity={0.3} />
    </svg>
  );
}
