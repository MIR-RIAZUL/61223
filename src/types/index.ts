/**
 * Strict TypeScript Domain Interfaces
 * Core domain entities for Anti-Gravity Portfolio, Physics System, Admin, and GitHub Stream
 */

export interface ProfileBio {
  id: string;
  name: string;
  handle: string;
  role: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  status: 'in-orbit' | 'deep-focus' | 'coding' | 'experimenting';
  location: LocationArea;
  skills: {
    category: string;
    items: string[];
  }[];
  socialLinks: {
    platform: 'github' | 'x' | 'discord' | 'linkedin' | 'email';
    url: string;
    label: string;
    icon?: string;
  }[];
  stats: {
    totalCommits: number;
    publicRepos: number;
    githubStars: number;
    experienceYears: number;
    antigravityCapsules: number;
  };
  updatedAt: string;
}

export interface LocationArea {
  id: string;
  label: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  coordinates: {
    latitude: number;
    longitude: number;
    altitudeKm?: number;
  };
  timezone: string;
  orbitPhase: 'apogee' | 'perigee' | 'equatorial' | 'synchronous';
  orbitalVelocityKmh: number;
  status: 'active' | 'docked' | 'transiting';
}

export interface GithubProject {
  id: string | number;
  name: string;
  fullName: string;
  description: string;
  htmlUrl: string;
  homepageUrl: string | null;
  starsCount: number;
  forksCount: number;
  watchersCount: number;
  openIssuesCount: number;
  language: string;
  languages: string[];
  topics: string[];
  isArchived: boolean;
  isFork: boolean;
  pushedAt: string;
  createdAt: string;
  updatedAt: string;
  visibility: 'public' | 'private';
  metrics: {
    velocity: number;
    healthScore: number;
    physicsWeight: number;
  };
  primaryColor: string;
  glowColor: string;
}

export interface LiveGithubCommit {
  id: string;
  sha: string;
  shortSha: string;
  repository: string;
  branch: string;
  message: string;
  author: {
    name: string;
    username: string;
    avatarUrl: string;
    email?: string;
  };
  timestamp: string;
  url: string;
  stats: {
    additions: number;
    deletions: number;
    filesChanged: number;
  };
  event: 'push' | 'pull_request' | 'commit' | 'stream' | 'sync';
  physicsImpulse?: {
    x: number;
    y: number;
    z: number;
  };
}

export interface IdeaCapsule {
  id: string;
  title: string;
  category: 
    | 'architecture' 
    | 'wasm-physics' 
    | 'webgpu-shaders' 
    | 'ai-agents' 
    | 'distributed-mesh' 
    | 'quantum-crypto';
  summary: string;
  content: string;
  tags: string[];
  gravity: number; // 0 for pure zero-g, negative for buoyant lift
  state: 'floating' | 'anchored' | 'ignited' | 'archived';
  metrics: {
    resonance: number;
    mass: number;
    views: number;
    ignitions: number;
  };
  colorTheme: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface PhysicsConfig {
  gravity: [number, number, number];
  restitution: number;
  friction: number;
  linearDamping: number;
  angularDamping: number;
  zeroGravity: boolean;
  timeStep: number;
  collisionPrecision: 'fast' | 'accurate' | 'continuous';
  boundaryWalls: boolean;
  repulsionForce: number;
  interactionRadius: number;
  webGpuEnabled: boolean;
  renderQuality: 'ultra' | 'high' | 'medium';
  spaceFieldDensity: number;
}

export interface PhysicsBodyState {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number, number];
  velocity: [number, number, number];
  isHovered: boolean;
  isSelected: boolean;
}

export interface AdminTelemetry {
  serverStatus: 'online' | 'degraded' | 'syncing';
  uptimeSeconds: number;
  memoryUsageMb: number;
  activePhysicsBodies: number;
  lastWebhookTimestamp: string | null;
  totalWebhooksReceived: number;
  streamConnectionsCount: number;
  fpsTarget: number;
}
