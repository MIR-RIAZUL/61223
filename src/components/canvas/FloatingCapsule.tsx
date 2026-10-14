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
  index?: number;
  total?: number;
}

export function FloatingCapsule({
  id,
  title,
  category,
  color,
  position,
  mass = 1.0,
  onSelect,
  index = 0,
  total = 6,
}: FloatingCapsuleProps) {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [collisionFlash, setCollisionFlash] = useState(false);

  const lastShockwaveRef = useRef(0);
  const lastCollisionTimeRef = useRef(0);
  const lastPointerVelocity = useRef(new THREE.Vector3(0, 0, 0));
  const previousPointerPos = useRef(new THREE.Vector3(0, 0, 0));

  const {
    isZeroGravity,
    shockwaveCount,
    selectedCapsuleId,
    selectCapsule,
    formationMode,
    registerCollision,
    setIsDraggingCapsule,
  } = useGravity();

  const isSelected = selectedCapsuleId === id;

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

  // Main 3D frame update: Grab-and-throw spring physics & Orbital Formation Modes
  useFrame(({ pointer, viewport, clock }, delta) => {
    if (!rigidBodyRef.current) return;

    // 1. Interactive 3D Pointer Grab-and-Throw Mechanics
    if (isDragging) {
      const targetX = (pointer.x * viewport.width) / 2;
      const targetY = (pointer.y * viewport.height) / 2;
      const targetZ = 0;

      const translation = rigidBodyRef.current.translation();
      const dx = targetX - translation.x;
      const dy = targetY - translation.y;
      const dz = targetZ - translation.z;

      // Track velocity for sling-throw on release
      const safeDelta = delta > 0.001 ? delta : 0.016;
      lastPointerVelocity.current.set(
        (targetX - previousPointerPos.current.x) / safeDelta,
        (targetY - previousPointerPos.current.y) / safeDelta,
        0
      );
      previousPointerPos.current.set(targetX, targetY, targetZ);

      // Strong spring velocity pulling rigid body toward cursor
      const springK = 14.0;
      rigidBodyRef.current.setLinvel(
        {
          x: dx * springK,
          y: dy * springK,
          z: dz * springK,
        },
        true
      );
      return;
    }

    // 2. Orbital Formation Physics in Zero-G
    if (isZeroGravity) {
      const translation = rigidBodyRef.current.translation();

      if (formationMode === "orbital-ring") {
        // Compute animated orbital slot along satellite ring
        const elapsedTime = clock.getElapsedTime();
        const angle = (index / total) * Math.PI * 2 + elapsedTime * 0.4;
        const radius = 4.2;
        const targetX = Math.cos(angle) * radius;
        const targetY = Math.sin(angle * 1.5) * 0.6;
        const targetZ = Math.sin(angle) * (radius * 0.65);

        const steerK = 5.2;
        rigidBodyRef.current.applyImpulse(
          {
            x: (targetX - translation.x) * delta * steerK,
            y: (targetY - translation.y) * delta * steerK,
            z: (targetZ - translation.z) * delta * steerK,
          },
          true
        );
      } else if (formationMode === "vortex-well") {
        // Spiral inward attraction toward [0,0,0] with tangential spin
        const dist = Math.sqrt(translation.x ** 2 + translation.z ** 2) || 0.1;
        const radialPull = 3.4;
        const fx = (-translation.x / dist) * radialPull;
        const fz = (-translation.z / dist) * radialPull;
        const spinSpeed = 4.2;
        const tx = (-translation.z / dist) * spinSpeed;
        const tz = (translation.x / dist) * spinSpeed;
        const fy = -translation.y * 2.8;

        rigidBodyRef.current.applyImpulse(
          {
            x: (fx + tx) * delta * 2.4,
            y: fy * delta * 2.4,
            z: (fz + tz) * delta * 2.4,
          },
          true
        );
      } else {
        // 'free-drift': gentle weightless restoring force to boundary box
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
    }
  });

  // Handle pointer down (grab initiation & selection)
  const handlePointerDown = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsDragging(true);
    setIsDraggingCapsule(true);
    selectCapsule(id);
    onSelect?.(id);
    if (rigidBodyRef.current) {
      rigidBodyRef.current.wakeUp();
    }
  };

  // Handle pointer up (sling-throw release)
  const handlePointerUp = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (isDragging && rigidBodyRef.current) {
      rigidBodyRef.current.applyImpulse(
        {
          x: Math.max(-12, Math.min(12, lastPointerVelocity.current.x * 0.35)),
          y: Math.max(-12, Math.min(12, lastPointerVelocity.current.y * 0.35)),
          z: Math.max(-12, Math.min(12, lastPointerVelocity.current.z * 0.35)),
        },
        true
      );
      rigidBodyRef.current.applyTorqueImpulse(
        {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
          z: (Math.random() - 0.5) * 2,
        },
        true
      );
    }
    setIsDragging(false);
    setIsDraggingCapsule(false);
  };

  // Throttled Collision Impact Handler
  const handleCollisionEnter = () => {
    const now = performance.now();
    if (now - lastCollisionTimeRef.current > 350) {
      lastCollisionTimeRef.current = now;
      registerCollision();
      setCollisionFlash(true);
      setTimeout(() => setCollisionFlash(false), 240);
    }
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
      onCollisionEnter={handleCollisionEnter}
    >
      <group
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => {
          setHovered(false);
          if (isDragging) {
            setIsDragging(false);
            setIsDraggingCapsule(false);
          }
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {/* Physical 3D Capsule Geometry with Dynamic Emissive Glow */}
        <mesh ref={meshRef} castShadow receiveShadow>
          <capsuleGeometry args={[0.45, 0.9, 16, 32]} />
          <meshStandardMaterial
            color={
              collisionFlash
                ? "#f59e0b"
                : isDragging
                ? "#f59e0b"
                : isSelected
                ? "#00f0ff"
                : hovered
                ? "#ffffff"
                : color
            }
            roughness={0.22}
            metalness={0.85}
            emissive={
              collisionFlash
                ? "#f59e0b"
                : isDragging
                ? "#f59e0b"
                : isSelected
                ? "#00f0ff"
                : color
            }
            emissiveIntensity={
              collisionFlash
                ? 2.5
                : isDragging
                ? 1.8
                : isSelected
                ? 1.5
                : hovered
                ? 0.9
                : 0.35
            }
          />
        </mesh>

        {/* Ambient Orbit Glow Rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.7, 0.76, 32]} />
          <meshBasicMaterial
            color={isDragging ? "#f59e0b" : isSelected ? "#00f0ff" : color}
            side={THREE.DoubleSide}
            transparent
            opacity={isDragging ? 1.0 : isSelected ? 1.0 : hovered ? 0.8 : 0.3}
          />
        </mesh>

        {/* High-Contrast Cyan/Amber Grab Halo while dragging */}
        {isDragging && (
          <mesh rotation={[0, 0, 0]}>
            <sphereGeometry args={[0.72, 16, 16]} />
            <meshBasicMaterial
              color="#f59e0b"
              wireframe
              transparent
              opacity={0.85}
            />
          </mesh>
        )}

        {/* Selected Highlight Outer Resonance Halo */}
        {isSelected && !isDragging && (
          <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <ringGeometry args={[0.85, 0.92, 32]} />
            <meshBasicMaterial
              color="#00f0ff"
              side={THREE.DoubleSide}
              transparent
              opacity={0.85}
            />
          </mesh>
        )}

        {/* Floating HTML Annotation */}
        <Html
          position={[0, 1.15, 0]}
          center
          distanceFactor={10}
          className="pointer-events-none select-none transition-all duration-300"
        >
          <div
            className={`flex flex-col items-center px-3 py-1.5 rounded-lg border backdrop-blur-md transition-all duration-300 ${
              isDragging
                ? "hud-glass border-[#f59e0b] scale-125 shadow-[0_0_25px_rgba(245,158,11,0.8)] ring-1 ring-[#f59e0b]"
                : isSelected
                ? "hud-glass border-[#00f0ff] scale-125 shadow-[0_0_25px_rgba(0,240,255,0.7)] ring-1 ring-[#00f0ff]"
                : hovered
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
