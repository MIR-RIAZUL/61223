"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { PhysicsConfig } from "@/types";
import { DEFAULT_PHYSICS_CONFIG } from "@/lib/physics";

export interface GravityContextType {
  physicsConfig: PhysicsConfig;
  isZeroGravity: boolean;
  toggleZeroGravity: () => void;
  updatePhysicsConfig: (partial: Partial<PhysicsConfig>) => void;
  shockwaveCount: number;
  triggerShockwave: () => void;
}

const GravityContext = createContext<GravityContextType | null>(null);

export function GravityProvider({ children }: { children: React.ReactNode }) {
  const [physicsConfig, setPhysicsConfig] = useState<PhysicsConfig>(DEFAULT_PHYSICS_CONFIG);
  const [shockwaveCount, setShockwaveCount] = useState<number>(0);

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

  const value = useMemo(
    () => ({
      physicsConfig,
      isZeroGravity,
      toggleZeroGravity,
      updatePhysicsConfig,
      shockwaveCount,
      triggerShockwave,
    }),
    [
      physicsConfig,
      isZeroGravity,
      toggleZeroGravity,
      updatePhysicsConfig,
      shockwaveCount,
      triggerShockwave,
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
