'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { useScroll, useTransform, motion } from 'framer-motion';
import * as THREE from 'three';

interface WheelModelProps {
  scrollProgress: number;
}

const WheelModel = ({ scrollProgress }: WheelModelProps) => {
  const { scene } = useGLTF('/wheel.glb');
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

    // Assembly animation (0-0.3 scroll)
    const assemblyProgress = Math.min(scrollProgress / 0.3, 1);
    const explodeOffset = (1 - assemblyProgress) * 1.5;

    // Rotation (0.3-1 scroll)
    const rotationProgress = Math.max(0, (scrollProgress - 0.3) / 0.7);
    const rotation = rotationProgress * Math.PI * 4;

    groupRef.current.rotation.y = rotation;
    groupRef.current.scale.setScalar(2.5 + assemblyProgress * 0.5);

    // Animate meshes for exploded view
    meshes.forEach((mesh, index) => {
      const direction = index === 0 ? -1 : 1;
      mesh.position.x = direction * explodeOffset;
      mesh.rotation.y = direction * (1 - assemblyProgress) * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
};

const Scene = ({ scrollProgress }: { scrollProgress: number }) => {
  const { camera } = useThree();

  useFrame(() => {
    const cameraZ = 5 - scrollProgress * 1;
    camera.position.z = cameraZ;
    camera.position.y = 0.3;
    camera.position.x = Math.sin(scrollProgress * Math.PI) * 0.5;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <directionalLight position={[-10, 5, -5]} intensity={0.8} color="#6688ff" />
      <spotLight position={[0, 10, 0]} intensity={1.2} angle={0.4} penumbra={1} />

      <WheelModel scrollProgress={scrollProgress} />

      <ContactShadows position={[0, -1, 0]} opacity={0.5} scale={8} blur={2} />
      <Environment preset="studio" />
    </>
  );
};

export default function Wheel3DScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setScrollProgress(v);
    });
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen w-full">
        <Canvas camera={{ position: [0, 0.3, 5], fov: 40 }}>
          <Suspense fallback={null}>
            <Scene scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>

        {/* Overlay text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white text-center">
            Premium Alloy Wheels
          </h2>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: useTransform(scrollYProgress, [0.4, 0.6, 0.8, 1], [0, 1, 1, 0]) }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white text-center">
            Precision Engineering
          </h2>
        </motion.div>
      </div>
    </div>
  );
}

useGLTF.preload('/wheel.glb');
