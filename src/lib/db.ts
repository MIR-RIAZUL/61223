import { ProfileBio, LocationArea, IdeaCapsule, AdminTelemetry, LiveGithubCommit } from "@/types";
import { INITIAL_GITHUB_PROJECTS } from "./github";

export { INITIAL_GITHUB_PROJECTS };

export const INITIAL_LOCATION: LocationArea = {
  id: "orbit-station-alpha",
  label: "Orbital Habitat LEO-8",
  city: "San Francisco / Virtual Station",
  region: "California",
  country: "United States",
  countryCode: "US",
  coordinates: {
    latitude: 37.7749,
    longitude: -122.4194,
    altitudeKm: 408.5,
  },
  timezone: "UTC-7 (Pacific Time)",
  orbitPhase: "equatorial",
  orbitalVelocityKmh: 27600,
  status: "active",
};

export const INITIAL_PROFILE_BIO: ProfileBio = {
  id: "pilot-01",
  name: "Antigravity Systems Architect",
  handle: "anti-gravity-core",
  role: "Principal 3D Graphics & Rust WASM Engineer",
  tagline: "Bending browser physics with Rust WebAssembly and WebGPU compute pipelines",
  bio: "Engineering zero-gravity spatial computing interfaces, real-time distributed mesh streams, and high-performance WebGPU physics simulations.",
  avatarUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80",
  status: "in-orbit",
  location: INITIAL_LOCATION,
  skills: [
    {
      category: "Physics & 3D Core",
      items: ["Three.js", "WebGPU", "Rapier WASM", "WGSL Shaders", "React Three Fiber"],
    },
    {
      category: "Systems & Backend",
      items: ["Rust", "TypeScript", "Next.js App Router", "Server-Sent Events", "Tailwind CSS"],
    },
    {
      category: "Distributed & Mesh",
      items: ["QUIC", "WebSockets", "Lattice Cryptography", "Turbopack", "Node.js"],
    },
  ],
  socialLinks: [
    { platform: "github", url: "https://github.com", label: "GitHub" },
    { platform: "x", url: "https://x.com", label: "X (Twitter)" },
    { platform: "discord", url: "https://discord.com", label: "Discord" },
    { platform: "linkedin", url: "https://linkedin.com", label: "LinkedIn" },
  ],
  stats: {
    totalCommits: 4892,
    publicRepos: 36,
    githubStars: 2964,
    experienceYears: 8,
    antigravityCapsules: 6,
  },
  updatedAt: "2026-10-15T04:00:00Z",
};

export const INITIAL_IDEA_CAPSULES: IdeaCapsule[] = [
  {
    id: "capsule-1",
    title: "Rust Rapier WASM in Zero-G",
    category: "wasm-physics",
    summary: "Decoupled rigid-body physics stepping compiled directly to WebAssembly with zero memory copy over SharedArrayBuffer.",
    content: "By compiling the Rapier3D physics engine with SIMD extensions, we achieve 60fps across thousands of floating capsules in a browser canvas.",
    tags: ["Rust", "WASM", "Physics", "Rapier"],
    gravity: 0,
    state: "ignited",
    metrics: { resonance: 96, mass: 1.0, views: 320, ignitions: 45 },
    colorTheme: "#6366f1",
    author: "Antigravity Architect",
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
    metrics: { resonance: 88, mass: 0.7, views: 245, ignitions: 29 },
    colorTheme: "#06b6d4",
    author: "Antigravity Architect",
    createdAt: "2025-08-15T14:30:00Z",
    updatedAt: "2025-09-10T16:00:00Z",
  },
  {
    id: "capsule-3",
    title: "Autonomous Mesh Consensus Engine",
    category: "distributed-mesh",
    summary: "Decentralized state vector synchronization across browser tabs and edge nodes via WebRTC datachannels.",
    content: "CRDT-backed state vector exchange providing real-time physics synchronicity across distributed viewer sessions.",
    tags: ["Mesh", "WebRTC", "CRDT", "Distributed"],
    gravity: 0.05,
    state: "anchored",
    metrics: { resonance: 91, mass: 1.4, views: 410, ignitions: 52 },
    colorTheme: "#a855f7",
    author: "Antigravity Architect",
    createdAt: "2025-09-01T09:15:00Z",
    updatedAt: "2025-09-20T11:45:00Z",
  },
];

export const INITIAL_COMMITS: LiveGithubCommit[] = [
  {
    id: "commit-c89a01",
    sha: "c89a01f8271e",
    shortSha: "c89a01f",
    repository: "antigravity-engine",
    branch: "main",
    message: "feat(rapier): integrate SIMD zero-gravity impulse damping matrix",
    author: {
      name: "Cosmic Architect",
      username: "anti-gravity-core",
      avatarUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=150&auto=format&fit=crop&q=80",
    },
    timestamp: "2026-10-15T03:48:00Z",
    url: "https://github.com",
    stats: { additions: 184, deletions: 12, filesChanged: 4 },
    event: "push",
    physicsImpulse: { x: 0.8, y: 1.5, z: -0.4 },
  },
  {
    id: "commit-7d4e32",
    sha: "7d4e32901cba",
    shortSha: "7d4e329",
    repository: "meshlink-quic-stream",
    branch: "streaming-v2",
    message: "perf(sse): ultra-low latency chunk buffer flushing with Turbopack",
    author: {
      name: "Cosmic Architect",
      username: "anti-gravity-core",
      avatarUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=150&auto=format&fit=crop&q=80",
    },
    timestamp: "2026-10-15T03:06:00Z",
    url: "https://github.com",
    stats: { additions: 62, deletions: 8, filesChanged: 2 },
    event: "push",
    physicsImpulse: { x: -0.5, y: 2.1, z: 0.9 },
  },
];

export const INITIAL_ADMIN_TELEMETRY: AdminTelemetry = {
  serverStatus: "online",
  uptimeSeconds: 14820,
  memoryUsageMb: 84.6,
  activePhysicsBodies: 18,
  lastWebhookTimestamp: "2026-10-15T03:48:00Z",
  totalWebhooksReceived: 142,
  streamConnectionsCount: 7,
  fpsTarget: 60,
};
