import { GithubProject, LiveGithubCommit } from "@/types";

export const DEFAULT_GITHUB_USERNAME = "MIR-RIAZUL";
export const DEFAULT_GITHUB_AVATAR = "https://github.com/MIR-RIAZUL.png";
export const DEFAULT_GITHUB_PROFILE_URL = "https://github.com/MIR-RIAZUL";

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
    const message = (headCommit.message as string) || "Telemetry synchronization commit";
    const authorName =
      ((headCommit.author as Record<string, unknown>)?.name as string) ||
      (sender.login as string) ||
      "RIAZUL";

    const avatarUrl =
      (sender.avatar_url as string) || DEFAULT_GITHUB_AVATAR;

    const repoName = (repository.name as string) || "antigravity-portfolio";
    const repoUrl =
      (repository.html_url as string) || `${DEFAULT_GITHUB_PROFILE_URL}/${repoName}`;

    return {
      id: `gh-${sha}`,
      sha,
      shortSha,
      repository: repoName,
      branch,
      message: message.split("\n")[0] ?? "Commit update",
      author: {
        name: authorName,
        username: (sender.login as string) || DEFAULT_GITHUB_USERNAME,
        avatarUrl,
      },
      timestamp: (headCommit.timestamp as string) || "2026-10-15T04:00:00Z",
      url: (headCommit.url as string) || repoUrl,
      stats: {
        additions: Number((headCommit.added as unknown[])?.length || 18),
        deletions: Number((headCommit.removed as unknown[])?.length || 2),
        filesChanged: Number((headCommit.modified as unknown[])?.length || 4),
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
 * Initial GitHub repositories for RIAZUL (DEadEnD) portfolio showcase.
 */
export const INITIAL_GITHUB_PROJECTS: GithubProject[] = [
  {
    id: 1,
    name: "flutter-crossplatform-core",
    fullName: "MIR-RIAZUL/flutter-crossplatform-core",
    description: "Enterprise cross-platform mobile architecture with Flutter, custom render tree optimizations, and offline-first state synchronization.",
    htmlUrl: "https://github.com/MIR-RIAZUL/flutter-crossplatform-core",
    homepageUrl: "https://github.com/MIR-RIAZUL",
    starsCount: 1680,
    forksCount: 154,
    watchersCount: 112,
    openIssuesCount: 3,
    language: "Dart",
    languages: ["Dart", "Flutter", "Kotlin", "Swift"],
    topics: ["flutter", "dart", "mobile-app", "cross-platform", "architecture"],
    isArchived: false,
    isFork: false,
    pushedAt: "2026-10-15T03:18:00Z",
    createdAt: "2025-01-10T12:00:00Z",
    updatedAt: "2026-10-15T04:00:00Z",
    visibility: "public",
    metrics: {
      velocity: 99,
      healthScore: 99,
      physicsWeight: 1.2,
    },
    primaryColor: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.4)",
  },
  {
    id: 2,
    name: "antigravity-webgpu-engine",
    fullName: "MIR-RIAZUL/antigravity-webgpu-engine",
    description: "Full-stack zero-gravity spatial computing portfolio powered by Next.js Turbopack, Three.js WebGPU, and Rust Rapier WASM physics.",
    htmlUrl: "https://github.com/MIR-RIAZUL/antigravity-webgpu-engine",
    homepageUrl: "https://github.com/MIR-RIAZUL",
    starsCount: 1240,
    forksCount: 96,
    watchersCount: 68,
    openIssuesCount: 1,
    language: "TypeScript",
    languages: ["TypeScript", "Next.js", "WebGPU", "Rust", "WASM"],
    topics: ["nextjs", "turbopack", "webgpu", "threejs", "rapier-physics"],
    isArchived: false,
    isFork: false,
    pushedAt: "2026-10-15T01:00:00Z",
    createdAt: "2025-03-01T10:00:00Z",
    updatedAt: "2026-10-15T04:00:00Z",
    visibility: "public",
    metrics: {
      velocity: 95,
      healthScore: 98,
      physicsWeight: 1.0,
    },
    primaryColor: "#6366f1",
    glowColor: "rgba(99, 102, 241, 0.4)",
  },
  {
    id: 3,
    name: "github-ecosystem-streamer",
    fullName: "MIR-RIAZUL/github-ecosystem-streamer",
    description: "Real-time GitHub webhook ingestion and Server-Sent Events broadcasting commit telemetry to reactive spatial visualization clients.",
    htmlUrl: "https://github.com/MIR-RIAZUL/github-ecosystem-streamer",
    homepageUrl: "https://github.com/MIR-RIAZUL",
    starsCount: 890,
    forksCount: 62,
    watchersCount: 44,
    openIssuesCount: 2,
    language: "TypeScript",
    languages: ["TypeScript", "Node.js", "Server-Sent-Events", "GitHub-API"],
    topics: ["github-api", "webhooks", "streaming", "sse", "automation"],
    isArchived: false,
    isFork: false,
    pushedAt: "2026-10-14T18:00:00Z",
    createdAt: "2025-05-15T08:30:00Z",
    updatedAt: "2026-10-15T04:00:00Z",
    visibility: "public",
    metrics: {
      velocity: 91,
      healthScore: 96,
      physicsWeight: 1.4,
    },
    primaryColor: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.4)",
  },
];
