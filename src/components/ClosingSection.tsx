'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { useScroll, useTransform, motion, MotionValue, useMotionValueEvent } from 'framer-motion';
import * as THREE from 'three';

const WheelInstance = ({ scrollProgress, offset, position }: { 
  scrollProgress: number; offset: number; position: [number, number, number] 
}) => {
  const { scene } = useGLTF('/wheel.glb');
  const groupRef = useRef<THREE.Group>(null);
  const cloned = useRef<THREE.Group>(scene.clone());

  useFrame(() => {
    if (!groupRef.current) return;
    const raw = Math.max(0, scrollProgress - offset);
    groupRef.current.rotation.y = raw * Math.PI * 2;
    groupRef.current.scale.setScalar(5.5);
  });

  return (
    <group ref={groupRef} position={position}>
      <primitive object={cloned.current} />
    </group>
  );
};

const Scene = ({ scrollProgress }: { scrollProgress: number }) => {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.set(0, 0.3, 6);
    camera.lookAt(0, 0, 0);
  });
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#ff4400" />
      <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.5} penumbra={1} />
      <pointLight position={[5, 0, 5]} intensity={0.3} color="#ff6600" />
      {/* Wheels stacked in depth — like tires leaning against each other */}
      <WheelInstance scrollProgress={scrollProgress} offset={0.00} position={[0, 0, -2.4]} />
      <WheelInstance scrollProgress={scrollProgress} offset={0.05} position={[0, 0, -1.2]} />
      <WheelInstance scrollProgress={scrollProgress} offset={0.10} position={[0, 0, 0]} />
      <WheelInstance scrollProgress={scrollProgress} offset={0.15} position={[0, 0, 1.2]} />
      <WheelInstance scrollProgress={scrollProgress} offset={0.20} position={[0, 0, 2.4]} />
      <Environment preset="night" />
    </>
  );
};

function FillWord({
  children,
  progress,
  filledClass = 'text-white',
  dimClass = 'text-white/15',
}: {
  children: string;
  progress: MotionValue<number>;
  filledClass?: string;
  dimClass?: string;
}) {
  const [fill, setFill] = useState(0);
  useMotionValueEvent(progress, 'change', (v) => setFill(v));
  return (
    <span className="relative inline-block" style={{ paddingRight: '0.25em' }}>
      <span className={dimClass}>{children}</span>
      <span
        className="absolute top-0 left-0 bottom-0 overflow-hidden pointer-events-none"
        style={{ width: `${fill * 100}%` }}
        aria-hidden="true"
      >
        <span className={filledClass} style={{ whiteSpace: 'nowrap' }}>{children}</span>
      </span>
    </span>
  );
}

export default function ClosingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    return scrollYProgress.on('change', (v) => setScrollProgress(v));
  }, [scrollYProgress]);

  const w1 = useTransform(scrollYProgress, [0.30, 0.40], [0, 1]);
  const w2 = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const w3 = useTransform(scrollYProgress, [0.40, 0.52], [0, 1]);
  const w4 = useTransform(scrollYProgress, [0.50, 0.60], [0, 1]);
  const w5 = useTransform(scrollYProgress, [0.55, 0.67], [0, 1]);
  const w6 = useTransform(scrollYProgress, [0.60, 0.74], [0, 1]);
  const w7 = useTransform(scrollYProgress, [0.72, 0.82], [0, 1]);
  const w8 = useTransform(scrollYProgress, [0.78, 0.92], [0, 1]);

  return (
    <section ref={sectionRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 3D Wheels */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0.3, 6], fov: 45 }}>
            <Suspense fallback={null}>
              <Scene scrollProgress={scrollProgress} />
            </Suspense>
          </Canvas>
        </div>

        {/* Text on top — dim always visible, fill on scroll */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 space-y-2">
            <p className="font-display text-[clamp(1.6rem,4vw,3.2rem)] font-black uppercase leading-[1] tracking-[-0.02em]">
              <FillWord progress={w1}>Your</FillWord>{' '}
              <FillWord progress={w2}>ride</FillWord>{' '}
              <FillWord progress={w3}>deserves</FillWord>
            </p>
            <p className="font-accent text-[clamp(2.8rem,9vw,7rem)] italic uppercase leading-[0.9] tracking-[-0.01em]">
              <FillWord progress={w4} filledClass="text-red" dimClass="text-red/15">the</FillWord>{' '}
              <FillWord progress={w5} filledClass="text-red" dimClass="text-red/15">best</FillWord>{' '}
              <FillWord progress={w6} filledClass="text-red" dimClass="text-red/15">wheels</FillWord>
            </p>
            <p className="font-display text-[clamp(2.2rem,6vw,5rem)] font-black uppercase leading-[0.95] tracking-[-0.02em]">
              <FillWord progress={w7}>in</FillWord>{' '}
              <FillWord progress={w8}>Texas.</FillWord>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

useGLTF.preload('/wheel.glb');
