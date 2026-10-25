"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, useRef, useEffect } from "react";
import { PhysicsConfig } from "@/types";
import { DEFAULT_PHYSICS_CONFIG } from "@/lib/physics";
import { 
  playShockwaveSound, 
  playCollisionTick, 
  playToggleSound, 
  playRecallSound 
} from "@/lib/sound-engine";

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
  soundEnabled: boolean;
  toggleSound: () => void;
}

const GravityContext = createContext<GravityContextType | null>(null);

export function GravityProvider({ children }: { children: React.ReactNode }) {
  const [physicsConfig, setPhysicsConfig] = useState<PhysicsConfig>(DEFAULT_PHYSICS_CONFIG);
  const [shockwaveCount, setShockwaveCount] = useState<number>(0);
  const [cursorForceEnabled, setCursorForceEnabled] = useState<boolean>(true);
  const [selectedCapsuleId, setSelectedCapsuleId] = useState<string | null>(null);
  const [formationMode, setFormationModeState] = useState<FormationMode>('free-drift');
  const [collisionCount, setCollisionCount] = useState<number>(0);
  const [isDraggingCapsule, setIsDraggingCapsuleState] = useState<boolean>(false);
  const [resetCount, setResetCount] = useState<number>(0);
  const [tethersEnabled, setTethersEnabled] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const capsulePositionsRef = useRef<Record<string, [number, number, number]>>({});

  const soundEnabledRef = useRef(soundEnabled);
  soundEnabledRef.current = soundEnabled;

  const isZeroGravity = useMemo(
    () => physicsConfig.gravity[1] === 0,
    [physicsConfig.gravity]
  );

  const toggleZeroGravity = useCallback(() => {
    setPhysicsConfig((prev) => {
      const willBeZeroG = prev.gravity[1] !== 0;
      if (soundEnabledRef.current) {
        playToggleSound(willBeZeroG);
      }
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
    if (soundEnabledRef.current) {
      playShockwaveSound();
    }
    setShockwaveCount((prev) => prev + 1);
  }, []);

  const toggleCursorForce = useCallback(() => {
    setCursorForceEnabled((prev) => {
      const next = !prev;
      if (soundEnabledRef.current) {
        playToggleSound(next);
      }
      return next;
    });
  }, []);

  const selectCapsule = useCallback((id: string | null) => {
    if (id && soundEnabledRef.current) {
      playToggleSound(true);
    }
    setSelectedCapsuleId(id);
  }, []);

  const setFormationMode = useCallback((mode: FormationMode) => {
    if (soundEnabledRef.current) {
      playToggleSound(true);
    }
    setFormationModeState(mode);
  }, []);

  const registerCollision = useCallback(() => {
    if (soundEnabledRef.current) {
      playCollisionTick();
    }
    setCollisionCount((prev) => prev + 1);
  }, []);

  const setIsDraggingCapsule = useCallback((val: boolean) => {
    setIsDraggingCapsuleState(val);
  }, []);

  const resetSimulation = useCallback(() => {
    if (soundEnabledRef.current) {
      playRecallSound();
    }
    setResetCount((prev) => prev + 1);
    setSelectedCapsuleId(null);
    setFormationModeState('free-drift');
  }, []);

  const toggleTethers = useCallback(() => {
    setTethersEnabled((prev) => {
      const next = !prev;
      if (soundEnabledRef.current) {
        playToggleSound(next);
      }
      return next;
    });
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) {
        playToggleSound(true);
      }
      return next;
    });
  }, []);

  const updateCapsulePosition = useCallback((id: string, pos: [number, number, number]) => {
    capsulePositionsRef.current[id] = pos;
  }, []);

  // Global spacecraft keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        triggerShockwave();
      } else if (e.code === "KeyG") {
        toggleZeroGravity();
      } else if (e.code === "KeyR") {
        resetSimulation();
      } else if (e.code === "KeyT") {
        toggleTethers();
      } else if (e.code === "KeyF") {
        toggleCursorForce();
      } else if (e.code === "KeyM") {
        toggleSound();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    triggerShockwave,
    toggleZeroGravity,
    resetSimulation,
    toggleTethers,
    toggleCursorForce,
    toggleSound,
  ]);

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
      soundEnabled,
      toggleSound,
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
      soundEnabled,
      toggleSound,
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
