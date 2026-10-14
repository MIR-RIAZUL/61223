"use client";

import { Physics, CuboidCollider } from "@react-three/rapier";
import { SpaceBackground } from "./SpaceBackground";
import { FloatingCapsule } from "./FloatingCapsule";
import { CursorForceField } from "./CursorForceField";
import { INITIAL_IDEA_CAPSULES } from "@/lib/db";
import { PHYSICS_BOUNDS } from "@/lib/physics";
import { useGravity } from "@/context/GravityContext";

interface PhysicsWorldProps {
  onSelectCapsule?: (id: string) => void;
  gravity?: [number, number, number];
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
              onSelect={onSelectCapsule}
            />
          );
        })}
      </Physics>
    </>
  );
}
