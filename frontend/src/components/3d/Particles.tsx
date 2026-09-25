"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points } from "three";

export default function Particles() {
  const pointsRef = useRef<Points>(null);

  const positions = useMemo(() => {
    const count = 700;
    const data = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      data[i] = (Math.random() - 0.5) * 25;
    }

    return data;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y += delta * 0.025;
    pointsRef.current.rotation.x += delta * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.035}
        color="#a78bfa"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}