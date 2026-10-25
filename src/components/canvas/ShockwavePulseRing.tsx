"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGravity } from "@/context/GravityContext";

/** Maximum number of concurrent shockwave blast rings. */
const MAX_WAVES = 4;

/** Number of concentric radar rings rendered in the holographic floor plane. */
const RADAR_RING_COUNT = 6;

interface WaveState {
  active: boolean;
  scale: number;
  opacity: number;
}

/**
 * ShockwavePulseRing
 * ──────────────────
 * 1. Expanding 3D energy blast-wave torus triggered whenever shockwaveCount increments.
 * 2. Holographic polar-radar floor plane that transitions between y=0 (0G) and y=-5.2 (1G).
 */
export function ShockwavePulseRing() {
  const { shockwaveCount, isZeroGravity } = useGravity();

  // ── Shockwave blast-wave refs ──
  const wavesRef = useRef<WaveState[]>(
    Array.from({ length: MAX_WAVES }, () => ({ active: false, scale: 1, opacity: 0 }))
  );
  const waveGroupRefs = useRef<(THREE.Group | null)[]>(Array(MAX_WAVES).fill(null));
  const lastShockwaveRef = useRef(0);

  // ── Holographic radar floor ref ──
  const radarGroupRef = useRef<THREE.Group>(null);

  // Detect new shockwave events and activate the next available wave slot
  useEffect(() => {
    if (shockwaveCount > 0 && shockwaveCount !== lastShockwaveRef.current) {
      lastShockwaveRef.current = shockwaveCount;
      const waves = wavesRef.current;
      const slot = waves.findIndex((w) => !w.active);
      if (slot !== -1) {
        waves[slot] = { active: true, scale: 1, opacity: 0.85 };
      }
    } else {
      lastShockwaveRef.current = shockwaveCount;
    }
  }, [shockwaveCount]);

  // Per-frame animation: expand blast waves, fade opacity, and transition radar plane
  useFrame((_state, delta) => {
    const waves = wavesRef.current;

    // ── Animate expanding shockwave blast rings ──
    for (let i = 0; i < MAX_WAVES; i++) {
      const w = waves[i];
      const group = waveGroupRefs.current[i];
      if (!group) continue;

      if (w.active) {
        w.scale += delta * 12.0;
        w.opacity = Math.max(0, w.opacity - delta * 0.7);

        group.scale.set(w.scale, w.scale, w.scale);
        // Set opacity on all child mesh materials
        group.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            (child.material as THREE.MeshBasicMaterial).opacity = w.opacity;
          }
        });
        group.visible = true;

        // Deactivate once fully expanded and faded
        if (w.scale > 16 || w.opacity <= 0) {
          w.active = false;
          w.scale = 1;
          w.opacity = 0;
          group.visible = false;
        }
      } else {
        group.visible = false;
      }
    }

    // ── Animate holographic radar floor plane position ──
    if (radarGroupRef.current) {
      const targetY = isZeroGravity ? 0 : -5.2;
      radarGroupRef.current.position.y = THREE.MathUtils.lerp(
        radarGroupRef.current.position.y,
        targetY,
        delta * 3.0
      );
    }
  });

  return (
    <group>
      {/* ── Expanding Shockwave Blast-Wave Rings ── */}
      {Array.from({ length: MAX_WAVES }).map((_, i) => (
        <group
          key={`wave-${i}`}
          ref={(el) => {
            waveGroupRefs.current[i] = el;
          }}
          visible={false}
          position={[0, 0, 0]}
        >
          {/* Primary energy torus ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1, 0.04, 16, 64]} />
            <meshBasicMaterial
              color="#00f0ff"
              transparent
              opacity={0.85}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Secondary violet energy torus */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.85, 0.025, 12, 48]} />
            <meshBasicMaterial
              color="#8b5cf6"
              transparent
              opacity={0.65}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Wireframe blast sphere */}
          <mesh>
            <sphereGeometry args={[0.9, 16, 16]} />
            <meshBasicMaterial
              color="#00f0ff"
              wireframe
              transparent
              opacity={0.4}
            />
          </mesh>
        </group>
      ))}

      {/* ── Holographic Radar Floor / Polar Grid ── */}
      <group ref={radarGroupRef} position={[0, 0, 0]}>
        {/* Concentric radar rings with decreasing opacity */}
        {Array.from({ length: RADAR_RING_COUNT }).map((_, i) => {
          const innerRadius = 1.5 + i * 2.0;
          const outerRadius = innerRadius + 0.04;
          const ringOpacity = 0.22 - i * 0.028;
          return (
            <mesh
              key={`radar-ring-${i}`}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <ringGeometry args={[innerRadius, outerRadius, 64]} />
              <meshBasicMaterial
                color="#00f0ff"
                side={THREE.DoubleSide}
                transparent
                opacity={Math.max(0.04, ringOpacity)}
              />
            </mesh>
          );
        })}

        {/* Cross-hair radial scan lines (4 axes) */}
        {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4].map((angle, i) => (
          <mesh
            key={`scan-line-${i}`}
            rotation={[Math.PI / 2, angle, 0]}
            position={[0, 0, 0]}
          >
            <planeGeometry args={[0.015, 14]} />
            <meshBasicMaterial
              color="#00f0ff"
              transparent
              opacity={0.12}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}

        {/* Subtle centre glow disc */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.5, 32]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.06}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}
