"use client";

import { useEffect, useRef } from "react";

export default function GlowingRoad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const onScroll = () => {
      const maxScroll = window.innerHeight;
      scrollRef.current = Math.min(window.scrollY / maxScroll, 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const getPathPoints = (w: number, h: number, scroll: number, timeOffset: number) => {
      const segments = 300;
      const points: { x: number; y: number }[] = [];
      const spread = 1 + scroll * 1.2;

      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const x = t * w;
        const baseY = h * 0.5 - scroll * h * 0.3;
        const snake =
          Math.sin(t * 2.5 + (time + timeOffset) * 1.2) * h * 0.18 * spread +
          Math.sin(t * 4.5 - (time + timeOffset) * 0.8) * h * 0.08 * spread +
          Math.sin(t * 1.2 + (time + timeOffset) * 0.5) * h * 0.1 * spread;
        points.push({ x, y: baseY + snake });
      }
      return points;
    };

    const draw = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;

      ctx.clearRect(0, 0, w, h);
      time += 0.003;

      const scroll = scrollRef.current;
      const roadWidth = 50 + scroll * 30;

      const center = getPathPoints(w, h, scroll, 0);

      // Road surface — filled shape between left and right edges
      ctx.beginPath();
      // Top edge (left to right)
      for (let i = 0; i < center.length; i++) {
        const p = center[i];
        const nextP = center[Math.min(i + 1, center.length - 1)];
        const dx = nextP.x - p.x;
        const dy = nextP.y - p.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;
        const x = p.x + nx * roadWidth * 0.5;
        const y = p.y + ny * roadWidth * 0.5;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      // Bottom edge (right to left)
      for (let i = center.length - 1; i >= 0; i--) {
        const p = center[i];
        const nextP = center[Math.min(i + 1, center.length - 1)];
        const dx = nextP.x - p.x;
        const dy = nextP.y - p.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;
        const x = p.x - nx * roadWidth * 0.5;
        const y = p.y - ny * roadWidth * 0.5;
        ctx.lineTo(x, y);
      }
      ctx.closePath();

      // Road fill — dark with subtle glow
      const roadGrad = ctx.createLinearGradient(0, 0, w, 0);
      roadGrad.addColorStop(0, "rgba(254, 56, 48, 0.02)");
      roadGrad.addColorStop(0.5, "rgba(254, 56, 48, 0.06)");
      roadGrad.addColorStop(1, "rgba(254, 56, 48, 0.02)");
      ctx.fillStyle = roadGrad;
      ctx.fill();

      // Road surface texture
      ctx.save();
      ctx.clip();
      ctx.fillStyle = "rgba(20, 20, 20, 0.4)";
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // Edge lines (left and right)
      for (const side of [-1, 1]) {
        ctx.beginPath();
        for (let i = 0; i < center.length; i++) {
          const p = center[i];
          const nextP = center[Math.min(i + 1, center.length - 1)];
          const dx = nextP.x - p.x;
          const dy = nextP.y - p.y;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const nx = -dy / len;
          const ny = dx / len;
          const x = p.x + nx * roadWidth * 0.5 * side;
          const y = p.y + ny * roadWidth * 0.5 * side;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // Outer glow
        ctx.save();
        ctx.shadowColor = "rgba(254, 56, 48, 0.6)";
        ctx.shadowBlur = 20;
        ctx.strokeStyle = "rgba(254, 56, 48, 0.15)";
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.restore();

        // Edge line
        ctx.save();
        ctx.shadowColor = "rgba(254, 56, 48, 0.8)";
        ctx.shadowBlur = 8;
        ctx.strokeStyle = "rgba(254, 56, 48, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

        // Bright core
        ctx.strokeStyle = "rgba(255, 180, 170, 0.3)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Center dashed line
      ctx.save();
      ctx.setLineDash([16, 20]);
      ctx.lineDashOffset = -time * 300;
      ctx.beginPath();
      for (let i = 0; i < center.length; i++) {
        if (i === 0) ctx.moveTo(center[i].x, center[i].y);
        else ctx.lineTo(center[i].x, center[i].y);
      }
      ctx.shadowColor = "rgba(250, 204, 21, 0.6)";
      ctx.shadowBlur = 10;
      ctx.strokeStyle = "rgba(250, 204, 21, 0.35)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.strokeStyle = "rgba(255, 240, 180, 0.25)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();

      // Traveling light along the road
      const sparkT = ((time * 0.5) % 1);
      const sparkIdx = Math.floor(sparkT * (center.length - 1));
      const sp = center[sparkIdx];
      if (sp) {
        ctx.save();
        const grad = ctx.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, roadWidth * 0.8);
        grad.addColorStop(0, "rgba(254, 56, 48, 0.25)");
        grad.addColorStop(0.5, "rgba(254, 56, 48, 0.05)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(sp.x - roadWidth, sp.y - roadWidth, roadWidth * 2, roadWidth * 2);

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.shadowColor = "rgba(254, 56, 48, 1)";
        ctx.shadowBlur = 30;
        ctx.fill();
        ctx.restore();
      }

      // Second light, opposite direction
      const spark2T = ((time * 0.4 + 0.5) % 1);
      const spark2Idx = Math.floor((1 - spark2T) * (center.length - 1));
      const sp2 = center[spark2Idx];
      if (sp2) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(sp2.x, sp2.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 200, 180, 0.6)";
        ctx.shadowColor = "rgba(254, 56, 48, 0.8)";
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.restore();
      }

      // Subtle particles drifting off the road
      for (let i = 0; i < 30; i++) {
        const pTime = (time * 0.2 + i * 0.091) % 1;
        const idx = Math.floor(pTime * (center.length - 1));
        const p = center[idx];
        if (!p) continue;

        const drift = (roadWidth * 0.6 + Math.sin(i * 2.3) * 20) * (i % 2 === 0 ? 1 : -1);
        const nextP = center[Math.min(idx + 1, center.length - 1)];
        const dx = nextP.x - p.x;
        const dy = nextP.y - p.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;

        const px = p.x + nx * drift + Math.sin(time * 2 + i) * 10;
        const py = p.y + ny * drift + Math.cos(time * 1.5 + i) * 8;
        const alpha = Math.sin(pTime * Math.PI) * 0.35;
        const size = 0.8 + Math.sin(time + i) * 0.5;

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(254, 56, 48, ${alpha})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 w-full h-[300px] pointer-events-none z-[1]"
    />
  );
}
