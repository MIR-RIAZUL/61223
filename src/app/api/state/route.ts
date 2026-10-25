import { NextRequest, NextResponse } from "next/server";
import { 
  getStoreSnapshot, 
  updateBio, 
  updateLocation, 
  updatePhysicsConfigState, 
  resetStoreToDefaults 
} from "@/lib/db";

/**
 * GET /api/state
 * Returns full snapshot of current orbital database state.
 */
export async function GET() {
  try {
    const snapshot = getStoreSnapshot();
    return NextResponse.json({
      bio: snapshot.bio,
      projects: snapshot.projects,
      capsules: snapshot.capsules,
      commits: snapshot.commits,
      physicsConfig: snapshot.physicsConfig,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to load database state";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

/**
 * PATCH /api/state
 * Applies partial updates { bio?, location?, physicsConfig?, reset?: boolean }
 * and atomically persists them to disk (.data/orbital-store.json).
 */
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.reset === true) {
      resetStoreToDefaults();
    } else {
      if (body.bio && typeof body.bio === "object") {
        updateBio(body.bio);
      }
      if (body.location && typeof body.location === "object") {
        updateLocation(body.location);
      }
      if (body.physicsConfig && typeof body.physicsConfig === "object") {
        updatePhysicsConfigState(body.physicsConfig);
      }
    }

    const updated = getStoreSnapshot();
    return NextResponse.json({
      success: true,
      data: {
        bio: updated.bio,
        projects: updated.projects,
        capsules: updated.capsules,
        commits: updated.commits,
        physicsConfig: updated.physicsConfig,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Invalid PATCH request payload";
    return NextResponse.json({ error: errorMsg }, { status: 400 });
  }
}
