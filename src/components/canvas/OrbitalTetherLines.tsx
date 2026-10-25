"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGravity } from "@/context/GravityContext";
import { INITIAL_IDEA_CAPSULES } from "@/lib/db";

/**
 * OrbitalTetherLines
 * ──────────────────
 * 1. High-contrast pulsing cyan/violet laser tether lines from the central core [0, 0, 0]
 *    to all active capsules' live [x, y, z] rigid-body coordinates.
 * 2. Constellation polygonal ring connecting adjacent capsules in 'orbital-ring' formation.
 * 3. Primary lock-on beam and billboarded targeting reticle ring around selectedCapsuleId.
 */
export function OrbitalTetherLines() {
  const {
    capsulePositionsRef,
    selectedCapsuleId,
    formationMode,
    tethersEnabled,
  } = useGravity();

  const coreTethersRef = useRef<THREE.LineSegments>(null);
  const coreMaterialRef = useRef<THREE.LineBasicMaterial>(null);

  const constellationRef = useRef<THREE.LineSegments>(null);
  const constellationMaterialRef = useRef<THREE.LineBasicMaterial>(null);

  const lockBeamRef = useRef<THREE.LineSegments>(null);
  const lockMaterialRef = useRef<THREE.LineBasicMaterial>(null);

  const reticleRef = useRef<THREE.Group>(null);
  const reticleOuterRef = useRef<THREE.Group>(null);
  const reticleInnerRef = useRef<THREE.Group>(null);

  const capsuleCount = INITIAL_IDEA_CAPSULES.length;

  // 1. Core-to-Capsule Geometry with gradient vertex colors
  const coreGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(capsuleCount * 2 * 3);
    const colors = new Float32Array(capsuleCount * 2 * 3);

    const cyan = new THREE.Color("#00f0ff");
    const violet = new THREE.Color("#c084fc");

    for (let i = 0; i < capsuleCount; i++) {
      // Core origin vertex (cyan)
      colors[i * 6 + 0] = cyan.r;
      colors[i * 6 + 1] = cyan.g;
      colors[i * 6 + 2] = cyan.b;

      // Capsule target vertex (violet)
      colors[i * 6 + 3] = violet.r;
      colors[i * 6 + 4] = violet.g;
      colors[i * 6 + 5] = violet.b;
    }

    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geom;
  }, [capsuleCount]);

  // 2. Constellation Ring Geometry (connect adjacent capsules)
  const constellationGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(capsuleCount * 2 * 3);
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [capsuleCount]);

  // 3. Primary Selected Lock-On Beam Geometry
  const lockBeamGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(6);
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geom;
  }, []);

  // Update line buffers on every animation frame at 60–120 FPS
  useFrame(({ clock, camera }) => {
    if (!tethersEnabled) return;

    const positionsRecord = capsulePositionsRef.current;
    if (!positionsRecord) return;

    const elapsedTime = clock.getElapsedTime();

    // ── Update Core Tethers ──
    const corePosAttr = coreGeometry.attributes.position as THREE.BufferAttribute;
    const corePositions = corePosAttr.array as Float32Array;

    for (let i = 0; i < capsuleCount; i++) {
      const capsule = INITIAL_IDEA_CAPSULES[i];
      const pos = positionsRecord[capsule.id];

      if (pos) {
        // [0, 0, 0] core origin
        corePositions[i * 6 + 0] = 0;
        corePositions[i * 6 + 1] = 0;
        corePositions[i * 6 + 2] = 0;

        // live capsule coordinates
        corePositions[i * 6 + 3] = pos[0];
        corePositions[i * 6 + 4] = pos[1];
        corePositions[i * 6 + 5] = pos[2];
      }
    }
    corePosAttr.needsUpdate = true;

    // Pulse core tethers opacity
    if (coreMaterialRef.current) {
      coreMaterialRef.current.opacity = 0.5 + Math.sin(elapsedTime * 4.0) * 0.22;
    }

    // ── Update Constellation Polygon (orbital-ring mode) ──
    if (constellationRef.current && constellationGeometry) {
      if (formationMode === "orbital-ring") {
        const ringPosAttr = constellationGeometry.attributes.position as THREE.BufferAttribute;
        const ringPositions = ringPosAttr.array as Float32Array;

        for (let i = 0; i < capsuleCount; i++) {
          const nextIndex = (i + 1) % capsuleCount;
          const posA = positionsRecord[INITIAL_IDEA_CAPSULES[i].id];
          const posB = positionsRecord[INITIAL_IDEA_CAPSULES[nextIndex].id];

          if (posA && posB) {
            ringPositions[i * 6 + 0] = posA[0];
            ringPositions[i * 6 + 1] = posA[1];
            ringPositions[i * 6 + 2] = posA[2];

            ringPositions[i * 6 + 3] = posB[0];
            ringPositions[i * 6 + 4] = posB[1];
            ringPositions[i * 6 + 5] = posB[2];
          }
        }
        ringPosAttr.needsUpdate = true;
        constellationRef.current.visible = true;

        if (constellationMaterialRef.current) {
          constellationMaterialRef.current.opacity = 0.65 + Math.sin(elapsedTime * 3.0) * 0.2;
        }
      } else {
        constellationRef.current.visible = false;
      }
    }

    // ── Update Selected Capsule Lock-On Beam & Reticle ──
    const selectedPos = selectedCapsuleId ? positionsRecord[selectedCapsuleId] : null;

    if (selectedPos && lockBeamRef.current && reticleRef.current) {
      // Primary lock-on beam: [0, 0, 0] -> selected capsule
      const lockPosAttr = lockBeamGeometry.attributes.position as THREE.BufferAttribute;
      const lockPositions = lockPosAttr.array as Float32Array;

      lockPositions[0] = 0;
      lockPositions[1] = 0;
      lockPositions[2] = 0;

      lockPositions[3] = selectedPos[0];
      lockPositions[4] = selectedPos[1];
      lockPositions[5] = selectedPos[2];

      lockPosAttr.needsUpdate = true;
      lockBeamRef.current.visible = true;

      if (lockMaterialRef.current) {
        lockMaterialRef.current.opacity = 0.85 + Math.sin(elapsedTime * 8.0) * 0.15;
      }

      // Billboarded Holographic Reticle Ring
      reticleRef.current.visible = true;
      reticleRef.current.position.set(selectedPos[0], selectedPos[1], selectedPos[2]);
      reticleRef.current.quaternion.copy(camera.quaternion);

      if (reticleOuterRef.current) {
        reticleOuterRef.current.rotation.z = elapsedTime * 1.5;
      }
      if (reticleInnerRef.current) {
        reticleInnerRef.current.rotation.z = -elapsedTime * 2.2;
      }
    } else {
      if (lockBeamRef.current) lockBeamRef.current.visible = false;
      if (reticleRef.current) reticleRef.current.visible = false;
    }
  });

  if (!tethersEnabled) return null;

  return (
    <group>
      {/* 1. Core-to-Capsule Laser Tethers */}
      <lineSegments ref={coreTethersRef} geometry={coreGeometry}>
        <lineBasicMaterial
          ref={coreMaterialRef}
          vertexColors
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* 2. Constellation Ring Connecting Adjacent Capsules */}
      <lineSegments ref={constellationRef} geometry={constellationGeometry} visible={false}>
        <lineBasicMaterial
          ref={constellationMaterialRef}
          color="#c084fc"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* 3. Extra-Bright Primary Lock-On Beam */}
      <lineSegments ref={lockBeamRef} geometry={lockBeamGeometry} visible={false}>
        <lineBasicMaterial
          ref={lockMaterialRef}
          color="#00f0ff"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* 4. Target Reticle Ring Around Selected Capsule */}
      <group ref={reticleRef} visible={false}>
        {/* Outer rotating reticle ring with brackets */}
        <group ref={reticleOuterRef}>
          <mesh>
            <ringGeometry args={[0.72, 0.77, 32]} />
            <meshBasicMaterial
              color="#00f0ff"
              side={THREE.DoubleSide}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* 4 crosshair tick brackets */}
          <mesh position={[0, 0.86, 0]}>
            <planeGeometry args={[0.03, 0.16]} />
            <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.9} />
          </mesh>
          <mesh position={[0, -0.86, 0]}>
            <planeGeometry args={[0.03, 0.16]} />
            <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.9} />
          </mesh>
          <mesh position={[0.86, 0, 0]}>
            <planeGeometry args={[0.16, 0.03]} />
            <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.9} />
          </mesh>
          <mesh position={[-0.86, 0, 0]}>
            <planeGeometry args={[0.16, 0.03]} />
            <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.9} />
          </mesh>
        </group>

        {/* Inner counter-rotating ring */}
        <group ref={reticleInnerRef}>
          <mesh>
            <ringGeometry args={[0.5, 0.54, 24]} />
            <meshBasicMaterial
              color="#c084fc"
              side={THREE.DoubleSide}
              transparent
              opacity={0.65}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
