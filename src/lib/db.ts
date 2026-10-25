import { 
  ProfileBio, 
  LocationArea, 
  IdeaCapsule, 
  AdminTelemetry, 
  LiveGithubCommit, 
  GithubProject, 
  PhysicsConfig 
} from "@/types";
import { INITIAL_GITHUB_PROJECTS } from "./github";
import { DEFAULT_PHYSICS_CONFIG } from "./physics";

export { INITIAL_GITHUB_PROJECTS };

export const INITIAL_LOCATION: LocationArea = {
  id: "dhaka-badda-station",
  label: "Dhaka Orbit Station // Badda",
  city: "Badda, Dhaka",
  region: "Dhaka Division",
  country: "Bangladesh",
  countryCode: "BD",
  coordinates: {
    latitude: 23.7806,
    longitude: 90.4267,
    altitudeKm: 408.5,
  },
  timezone: "Asia/Dhaka (UTC+6)",
  orbitPhase: "equatorial",
  orbitalVelocityKmh: 27600,
  status: "active",
};

export const INITIAL_PROFILE_BIO: ProfileBio = {
  id: "riazul-deadend",
  name: "RIAZUL",
  handle: "MIR-RIAZUL",
  role: "DEadEnD — Full-Stack Web, App & Cross-Platform Flutter Architect",
  tagline: "DEadEnD // Architecting high-performance web systems, Flutter mobile engines, and 3D zero-gravity experiences",
  bio: "Architecting high-performance web systems, scalable cross-platform mobile apps with Flutter, and interactive 3D physics interfaces grounded in the GitHub ecosystem.",
  avatarUrl: "https://github.com/MIR-RIAZUL.png",
  status: "in-orbit",
  location: INITIAL_LOCATION,
  skills: [
    {
      category: "Web Development",
      items: ["Next.js (App Router)", "React 19", "TypeScript", "Tailwind CSS", "Three.js / WebGPU"],
    },
    {
      category: "App Development",
      items: ["Mobile App Architecture", "Native Integrations", "Offline-First Sync", "REST & GraphQL"],
    },
    {
      category: "Cross-Platform Flutter",
      items: ["Flutter & Dart", "State Management (Bloc/Riverpod)", "Platform Channels", "Custom RenderObjects"],
    },
    {
      category: "GitHub Ecosystem",
      items: ["Git Automation", "GitHub Webhooks & Actions", "CI/CD Pipelines", "Open Source Engineering"],
    },
  ],
  socialLinks: [
    { platform: "github", url: "https://github.com/MIR-RIAZUL", label: "GitHub" },
    { platform: "linkedin", url: "https://linkedin.com", label: "LinkedIn" },
    { platform: "discord", url: "https://discord.com", label: "Discord" },
    { platform: "email", url: "mailto:contact@mirriazul.dev", label: "Email" },
  ],
  stats: {
    totalCommits: 5240,
    publicRepos: 48,
    githubStars: 3120,
    experienceYears: 6,
    antigravityCapsules: 8,
  },
  updatedAt: "2026-10-15T04:00:00Z",
};

export const INITIAL_IDEA_CAPSULES: IdeaCapsule[] = [
  {
    id: "capsule-1",
    title: "Cross-Platform Flutter 3D Engine Interop",
    category: "wasm-physics",
    summary: "Bridging Flutter Impeller rendering pipelines with Rust WebAssembly physics bindings for mobile and web.",
    content: "Utilizing FFI and WebAssembly compilation targets to share a unified Rapier 3D physics simulation between Flutter mobile targets and Next.js web viewports.",
    tags: ["Flutter", "Dart", "Rust", "WASM", "Physics"],
    gravity: 0,
    state: "ignited",
    metrics: { resonance: 98, mass: 1.0, views: 512, ignitions: 64 },
    colorTheme: "#6366f1",
    author: "RIAZUL (DEadEnD)",
    createdAt: "2025-08-01T10:00:00Z",
    updatedAt: "2025-09-01T12:00:00Z",
  },
  {
    id: "capsule-2",
    title: "WebGPU Multi-Pass Compute Shaders",
    category: "webgpu-shaders",
    summary: "Simulating cosmic particle dust and gravitational lensing in native WGSL compute shaders.",
    content: "Utilizing modern WebGPU device features for parallel particle state updates directly on GPU buffers without CPU readback bottlenecks.",
    tags: ["WebGPU", "WGSL", "Compute", "Shaders"],
    gravity: -0.1,
    state: "floating",
    metrics: { resonance: 92, mass: 0.7, views: 345, ignitions: 42 },
    colorTheme: "#06b6d4",
    author: "RIAZUL (DEadEnD)",
    createdAt: "2025-08-15T14:30:00Z",
    updatedAt: "2025-09-10T16:00:00Z",
  },
  {
    id: "capsule-3",
    title: "Real-Time GitHub Telemetry Mesh",
    category: "distributed-mesh",
    summary: "Decentralized webhook ingestion and Server-Sent Events broadcasting commit telemetry to zero-g physics clients.",
    content: "Translating GitHub push payloads directly into zero-gravity impulse vectors in the Rapier 3D canvas.",
    tags: ["GitHub", "Webhooks", "SSE", "Mesh", "Real-Time"],
    gravity: 0.05,
    state: "anchored",
    metrics: { resonance: 95, mass: 1.4, views: 620, ignitions: 78 },
    colorTheme: "#a855f7",
    author: "RIAZUL (DEadEnD)",
    createdAt: "2025-09-01T09:15:00Z",
    updatedAt: "2025-09-20T11:45:00Z",
  },
];

export const INITIAL_COMMITS: LiveGithubCommit[] = [
  {
    id: "commit-m1a2b3",
    sha: "m1a2b3c4d5e6",
    shortSha: "m1a2b3c",
    repository: "flutter-antigravity-bridge",
    branch: "main",
    message: "feat(flutter): integrate zero-gravity cross-platform physics bridge",
    author: {
      name: "RIAZUL",
      username: "MIR-RIAZUL",
      avatarUrl: "https://github.com/MIR-RIAZUL.png",
    },
    timestamp: "2026-10-15T03:48:00Z",
    url: "https://github.com/MIR-RIAZUL",
    stats: { additions: 240, deletions: 14, filesChanged: 5 },
    event: "push",
    physicsImpulse: { x: 0.8, y: 1.5, z: -0.4 },
  },
  {
    id: "commit-f7e8d9",
    sha: "f7e8d9a0b1c2",
    shortSha: "f7e8d9a",
    repository: "nextjs-webgpu-portfolio",
    branch: "main",
    message: "perf(sse): synchronize RIAZUL identity telemetry with zero-g HUD",
    author: {
      name: "RIAZUL",
      username: "MIR-RIAZUL",
      avatarUrl: "https://github.com/MIR-RIAZUL.png",
    },
    timestamp: "2026-10-15T03:06:00Z",
    url: "https://github.com/MIR-RIAZUL",
    stats: { additions: 98, deletions: 6, filesChanged: 3 },
    event: "push",
    physicsImpulse: { x: -0.5, y: 2.1, z: 0.9 },
  },
];

export const INITIAL_ADMIN_TELEMETRY: AdminTelemetry = {
  serverStatus: "online",
  uptimeSeconds: 18450,
  memoryUsageMb: 86.2,
  activePhysicsBodies: 24,
  lastWebhookTimestamp: "2026-10-15T03:48:00Z",
  totalWebhooksReceived: 189,
  streamConnectionsCount: 12,
  fpsTarget: 60,
};

export interface OrbitalStoreData {
  bio: ProfileBio;
  projects: GithubProject[];
  capsules: IdeaCapsule[];
  commits: LiveGithubCommit[];
  physicsConfig: PhysicsConfig;
  updatedAt: string;
}

// In-memory cache holding active database state
let memoryStore: OrbitalStoreData | null = null;

/**
 * Dynamic resolution of Node fs and path modules.
 * Using eval("require") ensures client-side bundlers (Webpack/Turbopack)
 * do not try to bundle Node native modules into browser bundles.
 */
function getNodeModules(): { fs: typeof import("fs"); path: typeof import("path") } | null {
  if (typeof window === "undefined") {
    try {
      const nodeRequire = eval("require");
      const fs = nodeRequire("fs");
      const path = nodeRequire("path");
      return { fs, path };
    } catch {
      return null;
    }
  }
  return null;
}

function getStoreFilePath(): string | null {
  const mods = getNodeModules();
  if (!mods) return null;
  const dataDir = mods.path.join(process.cwd(), ".data");
  if (!mods.fs.existsSync(dataDir)) {
    try {
      mods.fs.mkdirSync(dataDir, { recursive: true });
    } catch {
      // directory creation handled
    }
  }
  return mods.path.join(dataDir, "orbital-store.json");
}

function createDefaultStoreData(): OrbitalStoreData {
  return {
    bio: JSON.parse(JSON.stringify(INITIAL_PROFILE_BIO)),
    projects: JSON.parse(JSON.stringify(INITIAL_GITHUB_PROJECTS)),
    capsules: JSON.parse(JSON.stringify(INITIAL_IDEA_CAPSULES)),
    commits: JSON.parse(JSON.stringify(INITIAL_COMMITS)),
    physicsConfig: JSON.parse(JSON.stringify(DEFAULT_PHYSICS_CONFIG)),
    updatedAt: new Date().toISOString(),
  };
}

function loadStore(): OrbitalStoreData {
  if (memoryStore) {
    return memoryStore;
  }

  const filePath = getStoreFilePath();
  const mods = getNodeModules();

  if (filePath && mods && mods.fs.existsSync(filePath)) {
    try {
      const raw = mods.fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(raw);
      memoryStore = {
        bio: parsed.bio || INITIAL_PROFILE_BIO,
        projects: parsed.projects || INITIAL_GITHUB_PROJECTS,
        capsules: parsed.capsules || INITIAL_IDEA_CAPSULES,
        commits: parsed.commits || INITIAL_COMMITS,
        physicsConfig: parsed.physicsConfig || DEFAULT_PHYSICS_CONFIG,
        updatedAt: parsed.updatedAt || new Date().toISOString(),
      };
      return memoryStore;
    } catch {
      // Fallback to defaults on read error
    }
  }

  memoryStore = createDefaultStoreData();
  saveStore(memoryStore);
  return memoryStore;
}

function saveStore(store: OrbitalStoreData): void {
  memoryStore = store;
  const filePath = getStoreFilePath();
  const mods = getNodeModules();

  if (filePath && mods) {
    try {
      mods.fs.writeFileSync(filePath, JSON.stringify(store, null, 2), "utf-8");
    } catch {
      // persistence write error handled
    }
  }
}

/** Get current profile bio snapshot */
export function getBio(): ProfileBio {
  return loadStore().bio;
}

/** Update profile bio with partial fields and persist to disk */
export function updateBio(partial: Partial<ProfileBio>): ProfileBio {
  const store = loadStore();
  store.bio = {
    ...store.bio,
    ...partial,
    location: partial.location ? { ...store.bio.location, ...partial.location } : store.bio.location,
    updatedAt: new Date().toISOString(),
  };
  store.updatedAt = new Date().toISOString();
  saveStore(store);
  return store.bio;
}

/** Update location within profile bio and persist to disk */
export function updateLocation(partial: Partial<LocationArea>): ProfileBio {
  const store = loadStore();
  store.bio.location = {
    ...store.bio.location,
    ...partial,
  };
  store.bio.updatedAt = new Date().toISOString();
  store.updatedAt = new Date().toISOString();
  saveStore(store);
  return store.bio;
}

/** Get all projects */
export function getProjects(): GithubProject[] {
  return loadStore().projects;
}

/** Upsert a project by id and persist to disk */
export function upsertProject(project: GithubProject): GithubProject {
  const store = loadStore();
  const index = store.projects.findIndex((p) => String(p.id) === String(project.id));
  const updatedProject = {
    ...project,
    updatedAt: new Date().toISOString(),
  };

  if (index >= 0) {
    store.projects[index] = { ...store.projects[index], ...updatedProject };
  } else {
    store.projects.push(updatedProject);
  }

  store.updatedAt = new Date().toISOString();
  saveStore(store);
  return updatedProject;
}

/** Delete a project by id and persist to disk */
export function deleteProject(id: string | number): boolean {
  const store = loadStore();
  const initialLen = store.projects.length;
  store.projects = store.projects.filter((p) => String(p.id) !== String(id));
  if (store.projects.length !== initialLen) {
    store.updatedAt = new Date().toISOString();
    saveStore(store);
    return true;
  }
  return false;
}

/** Get all idea capsules */
export function getCapsules(): IdeaCapsule[] {
  return loadStore().capsules;
}

/** Upsert an idea capsule by id and persist to disk */
export function upsertCapsule(capsule: IdeaCapsule): IdeaCapsule {
  const store = loadStore();
  const index = store.capsules.findIndex((c) => c.id === capsule.id);
  const updatedCapsule = {
    ...capsule,
    updatedAt: new Date().toISOString(),
  };

  if (index >= 0) {
    store.capsules[index] = { ...store.capsules[index], ...updatedCapsule };
  } else {
    store.capsules.push(updatedCapsule);
  }

  store.updatedAt = new Date().toISOString();
  saveStore(store);
  return updatedCapsule;
}

/** Delete an idea capsule by id and persist to disk */
export function deleteCapsule(id: string): boolean {
  const store = loadStore();
  const initialLen = store.capsules.length;
  store.capsules = store.capsules.filter((c) => c.id !== id);
  if (store.capsules.length !== initialLen) {
    store.updatedAt = new Date().toISOString();
    saveStore(store);
    return true;
  }
  return false;
}

/** Get physics configuration */
export function getPhysicsConfig(): PhysicsConfig {
  return loadStore().physicsConfig;
}

/** Update physics configuration and persist to disk */
export function updatePhysicsConfigState(partial: Partial<PhysicsConfig>): PhysicsConfig {
  const store = loadStore();
  store.physicsConfig = {
    ...store.physicsConfig,
    ...partial,
  };
  store.updatedAt = new Date().toISOString();
  saveStore(store);
  return store.physicsConfig;
}

/** Get all live commits */
export function getCommits(): LiveGithubCommit[] {
  return loadStore().commits;
}

/** Add a new live commit and persist to disk (capped at 50) */
export function addCommit(commit: LiveGithubCommit): LiveGithubCommit {
  const store = loadStore();
  store.commits.unshift(commit);
  if (store.commits.length > 50) {
    store.commits = store.commits.slice(0, 50);
  }
  store.updatedAt = new Date().toISOString();
  saveStore(store);
  return commit;
}

/** Reset store to original RIAZUL // DEadEnD seed defaults and persist to disk */
export function resetStoreToDefaults(): OrbitalStoreData {
  const fresh = createDefaultStoreData();
  saveStore(fresh);
  return fresh;
}

/** Get full snapshot of store state */
export function getStoreSnapshot(): OrbitalStoreData {
  return loadStore();
}
