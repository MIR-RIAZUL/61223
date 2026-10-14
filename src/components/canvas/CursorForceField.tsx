"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, BallCollider, RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useGravity } from "@/context/GravityContext";

export function CursorForceField() {
  const { cursorForceEnabled } = useGravity();
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const visualGroupRef = useRef<THREE.Group>(null);
  const currentPos = useRef(new THREE.Vector3(0, 0, -50));

  useFrame(({ pointer, viewport }, delta) => {
    if (cursorForceEnabled) {
      // Scale pointer [-1, 1] to Three.js camera viewport coordinates at z = 0
      const targetX = (pointer.x * viewport.width) / 2;
      const targetY = (pointer.y * viewport.height) / 2;
      const targetZ = 0;

      // Smooth frame-rate independent interpolation
      const alpha = 1 - Math.exp(-24 * delta);
      currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetX, alpha);
      currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, alpha);
      currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetZ, alpha);
    } else {
      // Park off-screen when disabled
      currentPos.current.set(0, 0, -50);
    }

    if (rigidBodyRef.current) {
      rigidBodyRef.current.setNextKinematicTranslation(currentPos.current);
    }

    if (visualGroupRef.current) {
      visualGroupRef.current.rotation.y += delta * 1.5;
      visualGroupRef.current.rotation.x += delta * 0.9;
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders={false}
      type="kinematicPosition"
      position={[0, 0, -50]}
    >
      <BallCollider args={[1.15]} />

      {cursorForceEnabled && (
        <group ref={visualGroupRef}>
          {/* Outer glowing cyan wireframe force-field sphere */}
          <mesh>
            <sphereGeometry args={[1.15, 20, 20]} />
            <meshBasicMaterial
              color="#00f0ff"
              wireframe
              transparent
              opacity={0.35}
            />
          </mesh>

          {/* Inner violet concentric resonance ring */}
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <ringGeometry args={[0.7, 0.78, 32]} />
            <meshBasicMaterial
              color="#8b5cf6"
              side={THREE.DoubleSide}
              transparent
              opacity={0.55}
            />
          </mesh>

          {/* Subtle kinetic point light illuminating nearby zero-g capsules */}
          <pointLight
            color="#00f0ff"
            intensity={2.8}
            distance={5.5}
            decay={2}
          />
        </group>
      )}
    </RigidBody>
  );
}
