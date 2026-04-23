'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { useScroll, useTransform, motion } from 'framer-motion';
import * as THREE from 'three';

const WheelModel = ({ scrollProgress }: { scrollProgress: number }) => {
  const { scene } = useGLTF('/super_car_wheel.glb');
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;

    // Wheel enters from right
    const enterProgress = Math.min(scrollProgress / 0.3, 1);
    const startX = 3;
    const endX = 0.5;
    const currentX = startX - (startX - endX) * enterProgress;

    // Spin continuously
    const rotation = -scrollProgress * Math.PI * 10;

    // Face camera and spin
    groupRef.current.rotation.x = Math.PI * 0.5;
    groupRef.current.rotation.y = rotation;
    groupRef.current.rotation.z = 0.15;

    groupRef.current.scale.setScalar(150);
    groupRef.current.position.x = currentX;
    groupRef.current.position.y = 0;
    groupRef.current.position.z = 0;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
};

const Scene = ({ scrollProgress }: { scrollProgress: number }) => {
  return (
    <>
      <ambientLight intensity={3} />
      <directionalLight position={[10, 10, 10]} intensity={5} />
      <directionalLight position={[-5, 8, 10]} intensity={4} color="#ffffff" />
      <directionalLight position={[-10, 5, -5]} intensity={3} color="#E50010" />
      <directionalLight position={[5, -5, 10]} intensity={2.5} color="#ff6600" />
      <spotLight position={[10, 15, 10]} intensity={6} angle={0.6} penumbra={0.3} />
      <pointLight position={[8, 0, 8]} intensity={5} color="#ffffff" />
      <pointLight position={[-3, 3, 5]} intensity={2.5} color="#E50010" />
      <WheelModel scrollProgress={scrollProgress} />
      <Environment preset="studio" />
    </>
  );
};

// Word component with isolated fill effect
const Word = ({
  children,
  fillPercent,
  fillColor = '#ffffff',
  baseColor = 'rgba(255,255,255,0.2)'
}: {
  children: string;
  fillPercent: number;
  fillColor?: string;
  baseColor?: string;
}) => {
  return (
    <span
      style={{
        display: 'inline-block',
        background: `linear-gradient(90deg, ${fillColor} ${fillPercent}%, ${baseColor} ${fillPercent}%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {children}
    </span>
  );
};

export default function FooterWheel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setScrollProgress(v);
    });
  }, [scrollYProgress]);

  const textOpacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.02], [10, 0]);

  // Sequential word fill - one word at a time, NO OVERLAP
  // Each word: start% to end% (word must finish before next starts)
  const getFill = (wordStart: number, wordEnd: number): number => {
    if (scrollProgress < wordStart) return 0;
    if (scrollProgress >= wordEnd) return 100;
    return ((scrollProgress - wordStart) / (wordEnd - wordStart)) * 100;
  };

  // Staggered timing - each word fills completely before next begins
  const fills = {
    your:     getFill(0.02, 0.07),
    ride:     getFill(0.07, 0.12),
    deserves: getFill(0.12, 0.17),
    the:      getFill(0.17, 0.24),
    best:     getFill(0.24, 0.31),
    wheels:   getFill(0.31, 0.40),
    in:       getFill(0.40, 0.45),
    texas:    getFill(0.45, 0.52),
  };

  return (
    <div ref={containerRef} className="relative h-[80vh] bg-black overflow-hidden">
      {/* 3D Wheel */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 4], fov: 75 }}>
          <Suspense fallback={null}>
            <Scene scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </div>

      {/* Text overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <motion.div style={{ opacity: textOpacity, y: textY }} className="max-w-3xl">
          <p className="font-condensed text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-[0.15em] leading-tight mb-3">
            <Word fillPercent={fills.your}>Your</Word>{' '}
            <Word fillPercent={fills.ride}>ride</Word>{' '}
            <Word fillPercent={fills.deserves}>deserves</Word>
          </p>
          <p className="font-accent text-5xl sm:text-6xl lg:text-8xl italic uppercase tracking-wide leading-[0.9]">
            <Word fillPercent={fills.the} fillColor="#E50010" baseColor="rgba(229,0,16,0.15)">The</Word>{' '}
            <Word fillPercent={fills.best} fillColor="#E50010" baseColor="rgba(229,0,16,0.15)">Best</Word>
            <br />
            <Word fillPercent={fills.wheels} fillColor="#E50010" baseColor="rgba(229,0,16,0.15)">Wheels</Word>
          </p>
          <p className="font-condensed text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-[0.15em] leading-tight mt-3">
            <Word fillPercent={fills.in} fillColor="rgba(255,255,255,0.6)" baseColor="rgba(255,255,255,0.15)">in</Word>{' '}
            <Word fillPercent={fills.texas} fillColor="rgba(255,255,255,0.6)" baseColor="rgba(255,255,255,0.15)">Texas.</Word>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

useGLTF.preload('/super_car_wheel.glb');
