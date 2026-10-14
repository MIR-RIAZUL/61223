import { NextRequest } from "next/server";
import { streamClients, webhookCommitHistory } from "../webhook/route";
import { LiveGithubCommit } from "@/types";

export async function GET(_req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // 1. Immediately send buffered recent commits if any
      if (webhookCommitHistory.length > 0) {
        for (const commit of webhookCommitHistory.slice(0, 3)) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(commit)}\n\n`)
          );
        }
      }

      // 2. Register callback for incoming webhook events
      const onCommit = (commit: LiveGithubCommit) => {
        try {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(commit)}\n\n`)
          );
        } catch {
          streamClients.delete(onCommit);
        }
      };

      streamClients.add(onCommit);

      // 3. Periodic heartbeat to prevent browser connection timeout
      const heartbeatInterval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": heartbeat\n\n"));
        } catch {
          clearInterval(heartbeatInterval);
          streamClients.delete(onCommit);
        }
      }, 15000);

      // Clean up on stream cancellation
      return () => {
        clearInterval(heartbeatInterval);
        streamClients.delete(onCommit);
      };
    },
    cancel() {
      // Client disconnected
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "Content-Encoding": "none",
    },
  });
}
