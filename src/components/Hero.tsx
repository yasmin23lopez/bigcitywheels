"use client";

import { motion, useScroll, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import TireIcon from "@/components/TireIcon";
import * as THREE from "three";

const WheelModel = ({ scrollProgress }: { scrollProgress: number }) => {
  const { scene } = useGLTF("/wheel.glb");
  const groupRef = useRef<THREE.Group>(null);
  const [meshes, setMeshes] = useState<THREE.Mesh[]>([]);

  useEffect(() => {
    const foundMeshes: THREE.Mesh[] = [];
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        foundMeshes.push(child);
      }
    });
    setMeshes(foundMeshes);
  }, [scene]);

  useFrame(() => {
    if (!groupRef.current) return;

    // Assembly: 0-50% of animation
    const assemblyProgress = Math.min(scrollProgress / 0.5, 1);
    const explodeOffset = (1 - assemblyProgress) * 1.2;

    // Rotation: does ~1.75 rotations, ends slightly before full turn (showing rim face)
    const rotationProgress = Math.min(1, Math.max(0, (scrollProgress - 0.3) / 0.7));
    const rotation = rotationProgress * Math.PI * 3.6;

    groupRef.current.rotation.y = rotation;
    groupRef.current.scale.setScalar(6.2); // Always visible and big

    meshes.forEach((mesh, index) => {
      const direction = index === 0 ? -1 : 1;
      mesh.position.x = direction * explodeOffset;
      mesh.rotation.y = direction * (1 - assemblyProgress) * 0.25;
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
};

const Scene = ({ scrollProgress }: { scrollProgress: number }) => {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.z = 4;
    camera.position.y = 0.3;
    camera.position.x = 0;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#ff4400" />
      <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.5} penumbra={1} />
      <pointLight position={[5, 0, 5]} intensity={0.3} color="#ff6600" />
      <WheelModel scrollProgress={scrollProgress} />
      <Environment preset="night" />
    </>
  );
};

export default function Hero({ promos }: { promos?: any[] | null }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [animProgress, setAnimProgress] = useState(0);
  const [animDone, setAnimDone] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Auto-play animation on mount (after preloader)
  useEffect(() => {
    const delay = sessionStorage.getItem("preloaderShown") ? 500 : 3000; // wait for preloader
    const startTime = Date.now() + delay;
    const duration = 3500; // 3.5s animation

    const animate = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      setAnimProgress(progress);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimDone(true);
      }
    };
    requestAnimationFrame(animate);
  }, []);

  // Use animProgress for the wheel (time-based, auto)
  // scrollProgress is only used after animation is done (for the scroll-away effect)
  const scrollProgress = animProgress;

  // Text reveals based on animation progress
  const line1Opacity = useMotionValue(0);
  const line1Y = useMotionValue(30);
  const line2Opacity = useMotionValue(0);
  const line2Y = useMotionValue(30);
  const line3Opacity = useMotionValue(0);
  const line3Y = useMotionValue(30);
  const ctaOpacity = useMotionValue(0);

  useEffect(() => {
    const p = animProgress;
    // Line 1: "Big wheels" — 0-30%
    line1Opacity.set(Math.min(1, p / 0.3));
    line1Y.set(Math.max(0, 30 - (p / 0.3) * 30));
    // Line 2: "start in a" — 25-55%
    line2Opacity.set(p < 0.25 ? 0 : Math.min(1, (p - 0.25) / 0.3));
    line2Y.set(p < 0.25 ? 30 : Math.max(0, 30 - ((p - 0.25) / 0.3) * 30));
    // Line 3: "big city." — 50-80%
    line3Opacity.set(p < 0.5 ? 0 : Math.min(1, (p - 0.5) / 0.3));
    line3Y.set(p < 0.5 ? 30 : Math.max(0, 30 - ((p - 0.5) / 0.3) * 30));
    // CTA + other elements — 80-100%
    ctaOpacity.set(p < 0.8 ? 0 : Math.min(1, (p - 0.8) / 0.2));
  }, [animProgress, line1Opacity, line1Y, line2Opacity, line2Y, line3Opacity, line3Y, ctaOpacity]);
  // CTA visibility handled by animProgress above
  const ctaVisible = animDone;

  const [badgeText, setBadgeText] = useState("Crosby, TX — Now Open");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const checkHours = () => {
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }));
      const day = now.getDay();
      const hour = now.getHours();
      const minute = now.getMinutes();

      if (day === 0) {
        setIsOpen(false);
        setBadgeText("Crosby, TX — Open Mon 9AM");
      } else if (day === 6) {
        if (hour < 9) {
          setIsOpen(false);
          setBadgeText("Crosby, TX — Open Today 9AM");
        } else if (hour >= 15) {
          setIsOpen(false);
          setBadgeText("Crosby, TX — Open Mon 9AM");
        } else {
          setIsOpen(true);
          const closeMin = 60 * (15 - hour) - minute;
          setBadgeText(`Crosby, TX — Open · Closes in ${Math.floor(closeMin / 60)}h ${closeMin % 60}m`);
        }
      } else {
        if (hour < 9) {
          setIsOpen(false);
          setBadgeText("Crosby, TX — Open Today 9AM");
        } else if (hour >= 18) {
          setIsOpen(false);
          if (day === 5) {
            setBadgeText("Crosby, TX — Open Sat 9AM");
          } else {
            setBadgeText("Crosby, TX — Open Tomorrow 9AM");
          }
        } else {
          setIsOpen(true);
          const closeMin = 60 * (18 - hour) - minute;
          setBadgeText(`Crosby, TX — Open · Closes in ${Math.floor(closeMin / 60)}h ${closeMin % 60}m`);
        }
      }
    };

    checkHours();
    const interval = setInterval(checkHours, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[100vh] bg-[#2142A1]"
    >
      <div className="h-screen flex flex-col items-center justify-center">
        {/* 3D Wheel - Behind everything */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0.3, 4], fov: 45 }}>
            <Suspense fallback={null}>
              <Scene scrollProgress={scrollProgress} />
            </Suspense>
          </Canvas>
        </div>

        {/* Main Content - On top */}
        <div className="relative z-10 text-center px-4">
          {/* Promo Banner - appears after animation */}
          <motion.div
            style={{ opacity: ctaOpacity }}
            className="mb-6"
          >
            <span className="font-condensed text-[36px] font-bold tracking-[0.25em] uppercase text-white">
              Quality tires for every budget
            </span>
          </motion.div>

          {/* Headline - "Big wheels start in a big city." */}
          <motion.div style={{ opacity: line1Opacity, y: line1Y }}>
            <span className="block font-display text-[clamp(2.8rem,10vw,8rem)] uppercase leading-[0.9] tracking-[-0.03em] text-white">
              <span className="font-black">Big </span>
              <span className="italic text-red" style={{ fontFamily: "var(--font-accent)" }}>wheels</span>
            </span>
          </motion.div>

          <motion.div style={{ opacity: line2Opacity, y: line2Y }}>
            <span className="block font-display text-[clamp(1.8rem,5vw,4rem)] font-bold uppercase leading-[1.1] tracking-[0.02em] text-white/80 mt-2">
              start in a
            </span>
          </motion.div>

          <motion.div style={{ opacity: line3Opacity, y: line3Y }}>
            <span className="block font-display text-[clamp(3rem,11vw,9rem)] font-black uppercase leading-[0.85] tracking-[-0.03em] text-white">
              big city.
            </span>
          </motion.div>

          {/* CTA */}
          <motion.div
            style={{ opacity: ctaOpacity }}
            className="mt-8"
          >
            <a
              href="/wheels"
              className="group inline-flex items-center gap-3 bg-red text-white font-display font-bold text-sm sm:text-base tracking-[0.1em] uppercase px-8 py-4 hover:bg-red-dark transition-all duration-300"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
              }}
            >
              <span>Shop Now</span>
              <TireIcon className="w-5 h-5 transition-transform duration-1000 group-hover:rotate-[360deg]" />
            </a>
          </motion.div>
        </div>

        {/* Badge - Bottom left - appears after animation */}
        <motion.div
          style={{ opacity: ctaOpacity }}
          className="absolute bottom-8 left-6 sm:left-10 z-20"
        >
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-condensed text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold px-4 py-2 border border-white/20">
            <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-green-500 animate-pulse" : "bg-red animate-pulse"}`} />
            {badgeText}
          </span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-white/40 text-xs tracking-[0.2em] uppercase">Scroll</span>
            <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

useGLTF.preload("/wheel.glb");
