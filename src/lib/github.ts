import { GithubProject, LiveGithubCommit } from "@/types";

/**
 * Format raw GitHub webhook payload into standardized LiveGithubCommit domain model.
 */
export function parseGithubWebhookCommit(
  payload: Record<string, unknown>
): LiveGithubCommit | null {
  try {
    const headCommit = (payload.head_commit || {}) as Record<string, unknown>;
    const repository = (payload.repository || {}) as Record<string, unknown>;
    const sender = (payload.sender || {}) as Record<string, unknown>;
    const ref = (payload.ref as string) || "refs/heads/main";
    const branch = ref.replace("refs/heads/", "");

    const sha = (headCommit.id as string) || `commit-${Date.now().toString(16)}`;
    const shortSha = sha.substring(0, 7);
    const message = (headCommit.message as string) || "Manual telemetry sync commit";
    const authorName =
      ((headCommit.author as Record<string, unknown>)?.name as string) ||
      (sender.login as string) ||
      "Antigravity Architect";

    const avatarUrl =
      (sender.avatar_url as string) ||
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80";

    return {
      id: `gh-${sha}`,
      sha,
      shortSha,
      repository: (repository.name as string) || "antigravity-spacecraft",
      branch,
      message: message.split("\n")[0] ?? "Commit update",
      author: {
        name: authorName,
        username: (sender.login as string) || "cosmic-dev",
        avatarUrl,
      },
      timestamp: (headCommit.timestamp as string) || "2026-10-15T04:00:00Z",
      url: (headCommit.url as string) || (repository.html_url as string) || "https://github.com",
      stats: {
        additions: Number((headCommit.added as unknown[])?.length || 12),
        deletions: Number((headCommit.removed as unknown[])?.length || 2),
        filesChanged: Number((headCommit.modified as unknown[])?.length || 3),
      },
      event: "push",
      physicsImpulse: {
        x: (Math.random() - 0.5) * 4,
        y: Math.random() * 3 + 1,
        z: (Math.random() - 0.5) * 4,
      },
    };
  } catch {
    return null;
  }
}

/**
 * Initial GitHub repositories for portfolio showcase.
 */
export const INITIAL_GITHUB_PROJECTS: GithubProject[] = [
  {
    id: 1,
    name: "antigravity-engine",
    fullName: "core/antigravity-engine",
    description: "Rust WASM zero-gravity physics runtime with WebGPU shader pipelines and reactive React fiber bindings.",
    htmlUrl: "https://github.com/stellar-core/antigravity-engine",
    homepageUrl: "https://antigravity.space",
    starsCount: 1420,
    forksCount: 132,
    watchersCount: 94,
    openIssuesCount: 4,
    language: "Rust",
    languages: ["Rust", "TypeScript", "WGSL", "WebAssembly"],
    topics: ["webgpu", "wasm", "rapier", "physics", "threejs"],
    isArchived: false,
    isFork: false,
    pushedAt: "2026-10-15T03:18:00Z",
    createdAt: "2025-01-10T12:00:00Z",
    updatedAt: "2026-10-15T04:00:00Z",
    visibility: "public",
    metrics: {
      velocity: 98,
      healthScore: 99,
      physicsWeight: 1.2,
    },
    primaryColor: "#6366f1",
    glowColor: "rgba(99, 102, 241, 0.4)",
  },
  {
    id: 2,
    name: "meshlink-quic-stream",
    fullName: "core/meshlink-quic-stream",
    description: "Multipath QUIC and WebTransport distributed mesh streaming with sub-millisecond chunk acknowledge latency.",
    htmlUrl: "https://github.com/stellar-core/meshlink-quic-stream",
    homepageUrl: null,
    starsCount: 890,
    forksCount: 78,
    watchersCount: 45,
    openIssuesCount: 2,
    language: "TypeScript",
    languages: ["TypeScript", "Go", "ProtocolBuffers"],
    topics: ["quic", "webtransport", "distributed-systems", "streaming"],
    isArchived: false,
    isFork: false,
    pushedAt: "2026-10-15T01:00:00Z",
    createdAt: "2025-03-01T10:00:00Z",
    updatedAt: "2026-10-15T04:00:00Z",
    visibility: "public",
    metrics: {
      velocity: 92,
      healthScore: 96,
      physicsWeight: 0.9,
    },
    primaryColor: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.4)",
  },
  {
    id: 3,
    name: "quantum-capsule-store",
    fullName: "core/quantum-capsule-store",
    description: "Decentralized immutable knowledge capsules anchored by post-quantum lattice cryptography and local vector search.",
    htmlUrl: "https://github.com/stellar-core/quantum-capsule-store",
    homepageUrl: null,
    starsCount: 654,
    forksCount: 41,
    watchersCount: 38,
    openIssuesCount: 1,
    language: "TypeScript",
    languages: ["TypeScript", "Rust", "SQLite"],
    topics: ["cryptography", "knowledge-base", "vector-db", "pqc"],
    isArchived: false,
    isFork: false,
    pushedAt: "2026-10-14T18:00:00Z",
    createdAt: "2025-05-15T08:30:00Z",
    updatedAt: "2026-10-15T04:00:00Z",
    visibility: "public",
    metrics: {
      velocity: 86,
      healthScore: 94,
      physicsWeight: 1.5,
    },
    primaryColor: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.4)",
  },
];
