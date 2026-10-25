"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, useRef } from "react";
import { PhysicsConfig } from "@/types";
import { DEFAULT_PHYSICS_CONFIG } from "@/lib/physics";

export type FormationMode = 'free-drift' | 'orbital-ring' | 'vortex-well';

export interface GravityContextType {
  physicsConfig: PhysicsConfig;
  isZeroGravity: boolean;
  toggleZeroGravity: () => void;
  updatePhysicsConfig: (partial: Partial<PhysicsConfig>) => void;
  shockwaveCount: number;
  triggerShockwave: () => void;
  cursorForceEnabled: boolean;
  toggleCursorForce: () => void;
  selectedCapsuleId: string | null;
  selectCapsule: (id: string | null) => void;
  formationMode: FormationMode;
  setFormationMode: (mode: FormationMode) => void;
  collisionCount: number;
  registerCollision: () => void;
  isDraggingCapsule: boolean;
  setIsDraggingCapsule: (val: boolean) => void;
  resetCount: number;
  resetSimulation: () => void;
  tethersEnabled: boolean;
  toggleTethers: () => void;
  capsulePositionsRef: React.RefObject<Record<string, [number, number, number]>>;
  updateCapsulePosition: (id: string, pos: [number, number, number]) => void;
}

const GravityContext = createContext<GravityContextType | null>(null);

export function GravityProvider({ children }: { children: React.ReactNode }) {
  const [physicsConfig, setPhysicsConfig] = useState<PhysicsConfig>(DEFAULT_PHYSICS_CONFIG);
  const [shockwaveCount, setShockwaveCount] = useState<number>(0);
  const [cursorForceEnabled, setCursorForceEnabled] = useState<boolean>(true);
  const [selectedCapsuleId, setSelectedCapsuleId] = useState<string | null>(null);
  const [formationMode, setFormationMode] = useState<FormationMode>('free-drift');
  const [collisionCount, setCollisionCount] = useState<number>(0);
  const [isDraggingCapsule, setIsDraggingCapsuleState] = useState<boolean>(false);
  const [resetCount, setResetCount] = useState<number>(0);
  const [tethersEnabled, setTethersEnabled] = useState<boolean>(true);
  const capsulePositionsRef = useRef<Record<string, [number, number, number]>>({});

  const isZeroGravity = useMemo(
    () => physicsConfig.gravity[1] === 0,
    [physicsConfig.gravity]
  );

  const toggleZeroGravity = useCallback(() => {
    setPhysicsConfig((prev) => {
      const willBeZeroG = prev.gravity[1] !== 0;
      return {
        ...prev,
        zeroGravity: willBeZeroG,
        gravity: willBeZeroG ? [0, 0, 0] : [0, -9.81, 0],
      };
    });
  }, []);

  const updatePhysicsConfig = useCallback((partial: Partial<PhysicsConfig>) => {
    setPhysicsConfig((prev) => {
      const next = { ...prev, ...partial };
      if (partial.gravity) {
        next.zeroGravity = partial.gravity[1] === 0;
      }
      return next;
    });
  }, []);

  const triggerShockwave = useCallback(() => {
    setShockwaveCount((prev) => prev + 1);
  }, []);

  const toggleCursorForce = useCallback(() => {
    setCursorForceEnabled((prev) => !prev);
  }, []);

  const selectCapsule = useCallback((id: string | null) => {
    setSelectedCapsuleId(id);
  }, []);

  const registerCollision = useCallback(() => {
    setCollisionCount((prev) => prev + 1);
  }, []);

  const setIsDraggingCapsule = useCallback((val: boolean) => {
    setIsDraggingCapsuleState(val);
  }, []);

  const resetSimulation = useCallback(() => {
    setResetCount((prev) => prev + 1);
    setSelectedCapsuleId(null);
    setFormationMode('free-drift');
  }, []);

  const toggleTethers = useCallback(() => {
    setTethersEnabled((prev) => !prev);
  }, []);

  const updateCapsulePosition = useCallback((id: string, pos: [number, number, number]) => {
    capsulePositionsRef.current[id] = pos;
  }, []);

  const value = useMemo(
    () => ({
      physicsConfig,
      isZeroGravity,
      toggleZeroGravity,
      updatePhysicsConfig,
      shockwaveCount,
      triggerShockwave,
      cursorForceEnabled,
      toggleCursorForce,
      selectedCapsuleId,
      selectCapsule,
      formationMode,
      setFormationMode,
      collisionCount,
      registerCollision,
      isDraggingCapsule,
      setIsDraggingCapsule,
      resetCount,
      resetSimulation,
      tethersEnabled,
      toggleTethers,
      capsulePositionsRef,
      updateCapsulePosition,
    }),
    [
      physicsConfig,
      isZeroGravity,
      toggleZeroGravity,
      updatePhysicsConfig,
      shockwaveCount,
      triggerShockwave,
      cursorForceEnabled,
      toggleCursorForce,
      selectedCapsuleId,
      selectCapsule,
      formationMode,
      collisionCount,
      registerCollision,
      isDraggingCapsule,
      setIsDraggingCapsule,
      resetCount,
      resetSimulation,
      tethersEnabled,
      toggleTethers,
      capsulePositionsRef,
      updateCapsulePosition,
    ]
  );

  return (
    <GravityContext.Provider value={value}>
      {children}
    </GravityContext.Provider>
  );
}

export function useGravity(): GravityContextType {
  const context = useContext(GravityContext);
  if (!context) {
    throw new Error("useGravity must be used within a GravityProvider");
  }
  return context;
}
