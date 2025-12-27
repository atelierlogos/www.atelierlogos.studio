import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db/init";

/**
 * GET /api/webinars/health - Health check endpoint
 * Verifies database connectivity and VideoSDK configuration
 */
export async function GET() {
  const health = {
    status: "ok",
    timestamp: new Date().toISOString(),
    checks: {
      database: false,
      videosdk: false,
      auth: false,
    },
    errors: [] as string[],
  };

  // Check database
  try {
    const db = getDatabase();
    const result = db.prepare("SELECT 1 as test").get() as { test: number };
    health.checks.database = result.test === 1;
  } catch (error) {
    health.checks.database = false;
    health.errors.push(`Database error: ${error instanceof Error ? error.message : "Unknown error"}`);
  }

  // Check VideoSDK configuration
  try {
    const hasApiKey = !!process.env.VIDEOSDK_API_KEY;
    const hasSecret = !!process.env.VIDEOSDK_SECRET;
    health.checks.videosdk = hasApiKey && hasSecret;

    if (!hasApiKey) {
      health.errors.push("VIDEOSDK_API_KEY not configured");
    }
    if (!hasSecret) {
      health.errors.push("VIDEOSDK_SECRET not configured");
    }
  } catch (error) {
    health.checks.videosdk = false;
    health.errors.push(`VideoSDK config error: ${error instanceof Error ? error.message : "Unknown error"}`);
  }

  // Check BetterAuth configuration
  try {
    const hasSecret = !!process.env.BETTER_AUTH_SECRET;
    const hasUrl = !!process.env.BETTER_AUTH_URL;
    health.checks.auth = hasSecret && hasUrl;

    if (!hasSecret) {
      health.errors.push("BETTER_AUTH_SECRET not configured");
    }
    if (!hasUrl) {
      health.errors.push("BETTER_AUTH_URL not configured");
    }
  } catch (error) {
    health.checks.auth = false;
    health.errors.push(`Auth config error: ${error instanceof Error ? error.message : "Unknown error"}`);
  }

  // Determine overall status
  const allHealthy = Object.values(health.checks).every((check) => check);
  health.status = allHealthy ? "healthy" : "degraded";

  const statusCode = allHealthy ? 200 : 503;

  return NextResponse.json(health, { status: statusCode });
}
