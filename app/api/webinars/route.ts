import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  createWebinar,
  getAllWebinarsForAdmin,
  getUpcomingWebinars,
  isWebinarHost,
} from "@/lib/webinar-db";

/**
 * GET /api/webinars - Get all webinars (public: upcoming only, admin: all)
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    // If user is authenticated and is a host, return all webinars
    if (session?.user && (await isWebinarHost(session.user.id))) {
      const webinars = await getAllWebinarsForAdmin();
      return NextResponse.json({ webinars });
    }

    // Otherwise, return only upcoming webinars
    const webinars = await getUpcomingWebinars();
    return NextResponse.json({ webinars });
  } catch (error) {
    console.error("Error fetching webinars:", error);
    return NextResponse.json(
      { error: "Failed to fetch webinars" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/webinars - Create a new webinar (host only)
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is a host
    if (!(await isWebinarHost(session.user.id))) {
      return NextResponse.json(
        { error: "Only hosts can create webinars" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, description, slug, scheduled_start, duration_minutes, max_participants } = body;

    if (!title || !slug || !scheduled_start) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const webinar = await createWebinar({
      title,
      description,
      slug,
      scheduled_start: new Date(scheduled_start),
      duration_minutes,
      created_by: session.user.id,
      max_participants,
    });

    return NextResponse.json({ webinar }, { status: 201 });
  } catch (error) {
    console.error("Error creating webinar:", error);
    return NextResponse.json(
      { error: "Failed to create webinar" },
      { status: 500 }
    );
  }
}
