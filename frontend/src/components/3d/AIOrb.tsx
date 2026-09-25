"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export default function AIOrb() {
  const orbRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!orbRef.current) return;

    orbRef.current.rotation.x = state.clock.elapsedTime * 0.25;
    orbRef.current.rotation.y = state.clock.elapsedTime * 0.35;

    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.04;
    orbRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={orbRef}>
      <icosahedronGeometry args={[1.8, 4]} />
      <meshStandardMaterial
        color="#7c3aed"
        emissive="#4c1d95"
        emissiveIntensity={2}
        roughness={0.2}
        metalness={0.7}
        wireframe
      />
    </mesh>
  );
}