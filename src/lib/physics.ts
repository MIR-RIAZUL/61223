import { PhysicsConfig } from "@/types";

/**
 * Default zero-gravity Rapier physics configuration.
 */
export const DEFAULT_PHYSICS_CONFIG: PhysicsConfig = {
  gravity: [0, 0, 0],
  restitution: 0.85,
  friction: 0.15,
  linearDamping: 0.4,
  angularDamping: 0.5,
  zeroGravity: true,
  timeStep: 1 / 60,
  collisionPrecision: "accurate",
  boundaryWalls: true,
  repulsionForce: 18.0,
  interactionRadius: 3.5,
  webGpuEnabled: true,
  renderQuality: "ultra",
  spaceFieldDensity: 120,
};

export const PHYSICS_BOUNDS = {
  minX: -8,
  maxX: 8,
  minY: -5,
  maxY: 5,
  minZ: -6,
  maxZ: 6,
};

/**
 * Calculates a gentle centering force vector to keep floating objects within viewport bounds in zero-g.
 */
export function calculateRestoringForce(
  position: [number, number, number],
  bounds = PHYSICS_BOUNDS,
  strength = 0.8
): [number, number, number] {
  let fx = 0;
  let fy = 0;
  let fz = 0;

  if (position[0] < bounds.minX) fx = (bounds.minX - position[0]) * strength;
  else if (position[0] > bounds.maxX) fx = (bounds.maxX - position[0]) * strength;

  if (position[1] < bounds.minY) fy = (bounds.minY - position[1]) * strength;
  else if (position[1] > bounds.maxY) fy = (bounds.maxY - position[1]) * strength;

  if (position[2] < bounds.minZ) fz = (bounds.minZ - position[2]) * strength;
  else if (position[2] > bounds.maxZ) fz = (bounds.maxZ - position[2]) * strength;

  return [fx, fy, fz];
}
