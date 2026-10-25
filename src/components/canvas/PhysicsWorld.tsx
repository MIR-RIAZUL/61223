"use client";

import { useFrame } from "@react-three/fiber";
import { Physics, CuboidCollider } from "@react-three/rapier";
import * as THREE from "three";
import { SpaceBackground } from "./SpaceBackground";
import { FloatingCapsule } from "./FloatingCapsule";
import { CursorForceField } from "./CursorForceField";
import { CentralCoreOrb } from "./CentralCoreOrb";
import { ShockwavePulseRing } from "./ShockwavePulseRing";
import { OrbitalTetherLines } from "./OrbitalTetherLines";
import { INITIAL_IDEA_CAPSULES } from "@/lib/db";
import { PHYSICS_BOUNDS } from "@/lib/physics";
import { useGravity } from "@/context/GravityContext";

interface PhysicsWorldProps {
  onSelectCapsule?: (id: string) => void;
  gravity?: [number, number, number];
}

/**
 * Lightweight camera rig providing gentle tilt & parallax based on pointer coordinates.
 * Automatically disabled when a capsule is being grabbed to maintain throw precision.
 */
function CameraParallaxRig() {
  const { isDraggingCapsule } = useGravity();

  useFrame(({ camera, pointer }, delta) => {
    if (isDraggingCapsule) return;

    // Base camera position: [0, 1.5, 9]
    const targetX = pointer.x * 0.8;
    const targetY = 1.5 + pointer.y * 0.5;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 2.2);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, delta * 2.2);
  });

  return null;
}

export function PhysicsWorld({
  onSelectCapsule,
  gravity,
}: PhysicsWorldProps) {
  const { physicsConfig } = useGravity();
  const effectiveGravity = gravity ?? physicsConfig.gravity;

  return (
    <>
      {/* Lighting Configuration for deep space aesthetic */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-10, -5, -5]} intensity={1.5} color="#38bdf8" />
      <pointLight position={[10, -5, 5]} intensity={1.5} color="#c084fc" />

      {/* Cosmic space starfield and dust particles */}
      <SpaceBackground />

      {/* Smooth Pointer Camera Parallax Rig */}
      <CameraParallaxRig />

      {/* Rapier WASM Physics Engine Provider */}
      <Physics gravity={effectiveGravity} timeStep={1 / 60}>
        {/* Invisible Zero-G Boundary Containment Colliders */}
        {/* Floor */}
        <CuboidCollider
          position={[0, PHYSICS_BOUNDS.minY - 1, 0]}
          args={[20, 1, 20]}
          restitution={0.9}
        />
        {/* Ceiling */}
        <CuboidCollider
          position={[0, PHYSICS_BOUNDS.maxY + 1, 0]}
          args={[20, 1, 20]}
          restitution={0.9}
        />
        {/* Left Wall */}
        <CuboidCollider
          position={[PHYSICS_BOUNDS.minX - 1, 0, 0]}
          args={[1, 20, 20]}
          restitution={0.9}
        />
        {/* Right Wall */}
        <CuboidCollider
          position={[PHYSICS_BOUNDS.maxX + 1, 0, 0]}
          args={[1, 20, 20]}
          restitution={0.9}
        />
        {/* Back Wall */}
        <CuboidCollider
          position={[0, 0, PHYSICS_BOUNDS.minZ - 1]}
          args={[20, 20, 1]}
          restitution={0.9}
        />
        {/* Front Wall */}
        <CuboidCollider
          position={[0, 0, PHYSICS_BOUNDS.maxZ + 1]}
          args={[20, 20, 1]}
          restitution={0.9}
        />

        {/* 3D DEadEnD Central Gravitational Core Orb Collider */}
        <CentralCoreOrb />

        {/* 3D Shockwave Pulse Ring & Holographic Radar Grid */}
        <ShockwavePulseRing />

        {/* 3D High-Contrast Orbital Energy Tether Beams */}
        <OrbitalTetherLines />

        {/* 3D Kinematic Cursor Force-Field */}
        <CursorForceField />

        {/* Floating zero-gravity idea capsules */}
        {INITIAL_IDEA_CAPSULES.map((capsule, index) => {
          const offsetX = (index - 1) * 2.8;
          const offsetY = ((index % 2) - 0.5) * 1.5;
          const offsetZ = ((index % 3) - 1) * 1.2;

          return (
            <FloatingCapsule
              key={capsule.id}
              id={capsule.id}
              title={capsule.title}
              category={capsule.category}
              color={capsule.colorTheme}
              position={[offsetX, offsetY, offsetZ]}
              mass={capsule.metrics.mass}
              index={index}
              total={INITIAL_IDEA_CAPSULES.length}
              onSelect={onSelectCapsule}
            />
          );
        })}
      </Physics>
    </>
  );
}
