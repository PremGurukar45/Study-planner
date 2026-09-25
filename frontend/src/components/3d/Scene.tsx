"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import AIOrb from "./AIOrb";
import Particles from "./Particles";

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#050510]">
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 60,
        }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />

          <pointLight
            position={[4, 4, 4]}
            intensity={15}
            distance={20}
          />

          <pointLight
            position={[-4, -2, 2]}
            intensity={10}
            distance={15}
          />

          <AIOrb />
          <Particles />
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,16,0.35)_45%,rgba(5,5,16,0.9)_100%)]" />
    </div>
  );
}