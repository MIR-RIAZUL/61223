"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, BallCollider } from "@react-three/rapier";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useGravity } from "@/context/GravityContext";

export function CentralCoreOrb() {
  const { isZeroGravity, formationMode, shockwaveCount, triggerShockwave } = useGravity();

  const coreMeshRef = useRef<THREE.Mesh>(null);
  const outerWireframeRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const shockwaveBoostRef = useRef(0);
  const lastShockwaveCountRef = useRef(shockwaveCount);

  // Boost ring rotational velocity on shockwave trigger
  if (shockwaveCount !== lastShockwaveCountRef.current) {
    lastShockwaveCountRef.current = shockwaveCount;
    shockwaveBoostRef.current = 6.0;
  }

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    // Decay shockwave kinetic spin boost
    if (shockwaveBoostRef.current > 0.05) {
      shockwaveBoostRef.current = THREE.MathUtils.lerp(shockwaveBoostRef.current, 0, delta * 3.0);
    }

    // Dynamic rotation speeds based on formation mode and kinetic boost
    const modeMultiplier = formationMode === "vortex-well" ? 3.2 : formationMode === "orbital-ring" ? 1.8 : 1.0;
    const currentSpeed = (1.2 * modeMultiplier) + shockwaveBoostRef.current;

    // Inner glowing core rotation & breathing pulse
    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.x += delta * 0.45;
      coreMeshRef.current.rotation.y += delta * 0.65;
      const pulse = 1.0 + Math.sin(elapsed * 2.8) * 0.06;
      coreMeshRef.current.scale.set(pulse, pulse, pulse);
    }

    // Outer wireframe core shell counter-rotation
    if (outerWireframeRef.current) {
      outerWireframeRef.current.rotation.y -= delta * 0.35;
      outerWireframeRef.current.rotation.z += delta * 0.25;
    }

    // Two counter-rotating gyroscopic rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * currentSpeed;
      ring1Ref.current.rotation.y += delta * (currentSpeed * 0.7);
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * (currentSpeed * 1.15);
      ring2Ref.current.rotation.z += delta * (currentSpeed * 0.85);
    }
  });

  return (
    <RigidBody
      colliders={false}
      position={[0, 0, 0]}
      type="fixed"
    >
      {/* Physical Collider: Floating capsules rebound off this core */}
      <BallCollider args={[1.1]} restitution={0.9} friction={0.15} />

      <group onClick={triggerShockwave}>
        {/* Core Point Lights */}
        <pointLight color="#00f0ff" intensity={3.8} distance={8} decay={2} />
        <pointLight color="#8b5cf6" intensity={2.6} distance={6} decay={2} />

        {/* Inner Glowing Pulsing Icosahedron Core */}
        <mesh ref={coreMeshRef} castShadow receiveShadow>
          <icosahedronGeometry args={[0.75, 2]} />
          <meshStandardMaterial
            color="#00f0ff"
            roughness={0.15}
            metalness={0.9}
            emissive="#8b5cf6"
            emissiveIntensity={1.4}
            wireframe={false}
          />
        </mesh>

        {/* Outer Hexagonal Wireframe Hologram Shell */}
        <mesh ref={outerWireframeRef}>
          <icosahedronGeometry args={[0.95, 1]} />
          <meshBasicMaterial
            color="#00f0ff"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Gyroscopic Wireframe Ring 1: Neon Cyan */}
        <group ref={ring1Ref}>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[1.32, 0.022, 16, 64]} />
            <meshStandardMaterial
              color="#00f0ff"
              emissive="#00f0ff"
              emissiveIntensity={1.8}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <ringGeometry args={[1.28, 1.35, 48]} />
            <meshBasicMaterial
              color="#00f0ff"
              side={THREE.DoubleSide}
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>

        {/* Gyroscopic Wireframe Ring 2: Neon Violet */}
        <group ref={ring2Ref}>
          <mesh rotation={[0, Math.PI / 3, Math.PI / 4]}>
            <torusGeometry args={[1.5, 0.02, 16, 64]} />
            <meshStandardMaterial
              color="#8b5cf6"
              emissive="#8b5cf6"
              emissiveIntensity={1.8}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
          <mesh rotation={[0, Math.PI / 3, Math.PI / 4]}>
            <ringGeometry args={[1.46, 1.54, 48]} />
            <meshBasicMaterial
              color="#8b5cf6"
              side={THREE.DoubleSide}
              transparent
              opacity={0.25}
            />
          </mesh>
        </group>

        {/* Floating 3D HUD Telemetry Label */}
        <Html
          position={[0, 1.45, 0]}
          center
          distanceFactor={10}
          className="pointer-events-none select-none transition-all duration-300"
        >
          <div className="flex flex-col items-center px-3 py-1.5 rounded-xl hud-glass border-[#00f0ff]/40 shadow-[0_0_20px_rgba(0,240,255,0.35)] whitespace-nowrap">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#00f0ff] uppercase text-glow-cyan">
                DEadEnD // CORE
              </span>
            </div>
            <span className="text-[9px] font-mono text-slate-300 tracking-wider">
              MODE: {isZeroGravity ? "0G WEIGHTLESS" : "1G ARTIFICIAL"}
            </span>
          </div>
        </Html>
      </group>
    </RigidBody>
  );
}
