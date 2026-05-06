"use client";

import { motion, useScroll, useTransform } from "framer-motion";
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

    // Assembly: 0-25% scroll
    const assemblyProgress = Math.min(scrollProgress / 0.25, 1);
    const explodeOffset = (1 - assemblyProgress) * 1.2;

    // Rotation: starts at 20%, 1 full rotation
    const rotationProgress = Math.max(0, (scrollProgress - 0.2) / 0.4);
    const rotation = rotationProgress * Math.PI * 2;

    groupRef.current.rotation.y = rotation;
    groupRef.current.scale.setScalar(5.5); // Always visible and big

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
    camera.position.x = Math.sin(scrollProgress * Math.PI) * 0.2;
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

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setScrollProgress(v);
    });
  }, [scrollYProgress]);

  // Text reveals in steps, synced with wheel assembly
  // "Big wheels" starts at 50% visible
  const line1Opacity = useTransform(scrollYProgress, [0, 0.03], [0.5, 1]);
  const line1Y = useTransform(scrollYProgress, [0, 0.04], [20, 0]);

  // Step 2: "start in a" (3-6%)
  const line2Opacity = useTransform(scrollYProgress, [0.03, 0.06], [0, 1]);
  const line2Y = useTransform(scrollYProgress, [0.03, 0.06], [30, 0]);

  // Step 3: "big city." (6-9%)
  const line3Opacity = useTransform(scrollYProgress, [0.06, 0.09], [0, 1]);
  const line3Y = useTransform(scrollYProgress, [0.06, 0.09], [30, 0]);

  // Step 4: Tagline + CTA (9-11%) - appears right after big city
  const ctaOpacity = useTransform(scrollYProgress, [0.09, 0.11], [0, 1]);

  // CTA also appears after a timed delay so it's visible before scrolling
  const [ctaVisible, setCtaVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setCtaVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

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
      className="relative h-[250vh] bg-[#3B3B3B]"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
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
          {/* Promo Banner - Above headline */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-6"
          >
            <div
              className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-red via-red-dark to-red px-4 sm:px-8 py-2.5 sm:py-3 border border-white/10 shadow-[0_0_30px_rgba(229,0,16,0.3)]"
              style={{
                clipPath: "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)",
              }}
            >
              <span className="text-lg sm:text-xl leading-none">🔥</span>
              <span className="font-condensed text-[11px] sm:text-sm font-bold tracking-[0.08em] sm:tracking-[0.12em] uppercase text-white">
                Buy 3 Tires, Get the 4th 50% Off
              </span>
              <span className="hidden sm:inline font-condensed text-xs tracking-[0.1em] uppercase text-white/60">
                — Limited Time
              </span>
            </div>
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
            animate={ctaVisible ? { opacity: 1, y: 0 } : undefined}
            initial={{ y: 15 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`mt-8 ${ctaVisible ? "!opacity-100" : ""}`}
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

        {/* Badge - Bottom left */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
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
