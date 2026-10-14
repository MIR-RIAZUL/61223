"use client";

import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PhysicsWorld } from "./PhysicsWorld";

interface AntiGravityCanvasProps {
  onSelectCapsule?: (id: string) => void;
  gravity?: [number, number, number];
}

export function AntiGravityCanvas({
  onSelectCapsule,
  gravity,
}: AntiGravityCanvasProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#050508] text-slate-400 gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
        <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase animate-pulse">
          Initializing Rapier WASM Physics Engine...
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[500px]">
      <Canvas
        camera={{ position: [0, 1.5, 9], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <PhysicsWorld onSelectCapsule={onSelectCapsule} gravity={gravity} />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={4}
            maxDistance={15}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 3.5}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
