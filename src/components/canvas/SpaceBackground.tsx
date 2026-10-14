"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";

export function SpaceBackground() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
      groupRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Deep distant cosmos stars */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0.5}
        fade
        speed={1}
      />

      {/* Near field cosmic glowing dust particles */}
      <Sparkles
        count={200}
        scale={20}
        size={2.5}
        speed={0.4}
        color="#38bdf8"
        opacity={0.6}
      />
      <Sparkles
        count={120}
        scale={18}
        size={3}
        speed={0.3}
        color="#c084fc"
        opacity={0.5}
      />
      <Sparkles
        count={80}
        scale={15}
        size={2}
        speed={0.5}
        color="#34d399"
        opacity={0.4}
      />
    </group>
  );
}
