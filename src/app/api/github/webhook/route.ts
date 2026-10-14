import { NextRequest, NextResponse } from "next/server";
import { parseGithubWebhookCommit } from "@/lib/github";
import { LiveGithubCommit } from "@/types";

// In-memory ring buffer for latest webhook commits
export const webhookCommitHistory: LiveGithubCommit[] = [];
export const streamClients = new Set<(commit: LiveGithubCommit) => void>();

export async function POST(req: NextRequest) {
  try {
    const event = req.headers.get("x-github-event") || "push";
    const body = await req.json();

    if (event === "ping") {
      return NextResponse.json({
        message: "Pong! GitHub webhook listener is operational.",
        timestamp: new Date().toISOString(),
      });
    }

    const commit = parseGithubWebhookCommit(body);

    if (commit) {
      webhookCommitHistory.unshift(commit);
      if (webhookCommitHistory.length > 20) {
        webhookCommitHistory.pop();
      }

      // Notify any connected SSE stream clients
      streamClients.forEach((callback) => {
        try {
          callback(commit);
        } catch {
          // ignore dead clients
        }
      });

      return NextResponse.json({
        success: true,
        receivedEvent: event,
        commit,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      { success: false, message: "Payload parsed with no commit data" },
      { status: 400 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error parsing webhook";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "online",
    service: "github-webhook-receiver",
    recentCommitsCount: webhookCommitHistory.length,
    activeSubscribers: streamClients.size,
    timestamp: new Date().toISOString(),
  });
}
