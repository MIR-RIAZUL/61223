"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { calculateRestoringForce } from "@/lib/physics";
import { useGravity } from "@/context/GravityContext";

interface FloatingCapsuleProps {
  id: string;
  title: string;
  category: string;
  color: string;
  position: [number, number, number];
  mass?: number;
  onSelect?: (id: string) => void;
}

export function FloatingCapsule({
  id,
  title,
  category,
  color,
  position,
  mass = 1.0,
  onSelect,
}: FloatingCapsuleProps) {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { isZeroGravity, shockwaveCount } = useGravity();
  const lastShockwaveRef = useRef(shockwaveCount);

  // Broadcast kinetic shockwave impulse across all capsules
  useEffect(() => {
    if (shockwaveCount > 0 && shockwaveCount !== lastShockwaveRef.current) {
      lastShockwaveRef.current = shockwaveCount;
      if (rigidBodyRef.current) {
        rigidBodyRef.current.wakeUp();
        const translation = rigidBodyRef.current.translation();
        const dist = Math.sqrt(
          translation.x ** 2 + translation.y ** 2 + translation.z ** 2
        ) || 1;
        const radialMultiplier = 6.0 + Math.random() * 3.0;

        rigidBodyRef.current.applyImpulse(
          {
            x: (translation.x / dist) * radialMultiplier + (Math.random() - 0.5) * 4,
            y: Math.random() * 5 + 3.5,
            z: (translation.z / dist) * radialMultiplier + (Math.random() - 0.5) * 4,
          },
          true
        );
        rigidBodyRef.current.applyTorqueImpulse(
          {
            x: (Math.random() - 0.5) * 3,
            y: (Math.random() - 0.5) * 3,
            z: (Math.random() - 0.5) * 3,
          },
          true
        );
      }
    } else {
      lastShockwaveRef.current = shockwaveCount;
    }
  }, [shockwaveCount]);

  useFrame(() => {
    if (!rigidBodyRef.current) return;

    // Apply zero-g restorative force if capsule floats too far away in zero-g mode
    if (isZeroGravity) {
      const translation = rigidBodyRef.current.translation();
      const [fx, fy, fz] = calculateRestoringForce([
        translation.x,
        translation.y,
        translation.z,
      ]);

      if (fx !== 0 || fy !== 0 || fz !== 0) {
        rigidBodyRef.current.applyImpulse(
          { x: fx * 0.05, y: fy * 0.05, z: fz * 0.05 },
          true
        );
      }
    }
  });

  const handlePointerDown = () => {
    if (rigidBodyRef.current) {
      // Apply random energetic impulse on click
      const impulseX = (Math.random() - 0.5) * 3;
      const impulseY = Math.random() * 2 + 1;
      const impulseZ = (Math.random() - 0.5) * 3;
      rigidBodyRef.current.applyImpulse(
        { x: impulseX, y: impulseY, z: impulseZ },
        true
      );
      rigidBodyRef.current.applyTorqueImpulse(
        {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5,
          z: (Math.random() - 0.5) * 0.5,
        },
        true
      );
    }
    onSelect?.(id);
  };

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      colliders="hull"
      linearDamping={0.4}
      angularDamping={0.5}
      restitution={0.85}
      friction={0.2}
      mass={mass}
    >
      <group
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={handlePointerDown}
      >
        {/* Physical 3D Capsule Geometry */}
        <mesh ref={meshRef} castShadow receiveShadow>
          <capsuleGeometry args={[0.45, 0.9, 16, 32]} />
          <meshStandardMaterial
            color={hovered ? "#ffffff" : color}
            roughness={0.25}
            metalness={0.8}
            emissive={color}
            emissiveIntensity={hovered ? 0.9 : 0.35}
          />
        </mesh>

        {/* Ambient Orbit Glow Rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.7, 0.75, 32]} />
          <meshBasicMaterial
            color={color}
            side={THREE.DoubleSide}
            transparent
            opacity={hovered ? 0.8 : 0.3}
          />
        </mesh>

        {/* Floating HTML Annotation */}
        <Html
          position={[0, 1.1, 0]}
          center
          distanceFactor={10}
          className="pointer-events-none select-none transition-all duration-300"
        >
          <div
            className={`flex flex-col items-center px-3 py-1.5 rounded-lg border backdrop-blur-md transition-all duration-300 ${
              hovered
                ? "hud-glass border-[#00f0ff] scale-110 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "bg-slate-950/70 border-slate-700/60 scale-95"
            }`}
          >
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#00f0ff]">
              {category}
            </span>
            <span className="text-xs font-semibold font-display text-slate-100 whitespace-nowrap">
              {title}
            </span>
          </div>
        </Html>
      </group>
    </RigidBody>
  );
}
