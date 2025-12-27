import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getWebinarById,
  updateWebinarStatus,
  startWebinar,
  endWebinar,
  isWebinarHost,
} from "@/lib/webinar-db";

/**
 * GET /api/webinars/[id] - Get webinar by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const webinar = await getWebinarById(id);

    if (!webinar) {
      return NextResponse.json(
        { error: "Webinar not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ webinar });
  } catch (error) {
    console.error("Error fetching webinar:", error);
    return NextResponse.json(
      { error: "Failed to fetch webinar" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/webinars/[id] - Update webinar status (host only)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!(await isWebinarHost(session.user.id))) {
      return NextResponse.json(
        { error: "Only hosts can update webinars" },
        { status: 403 }
      );
    }

    const webinar = await getWebinarById(id);
    if (!webinar) {
      return NextResponse.json(
        { error: "Webinar not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { action } = body;

    switch (action) {
      case "start":
        await startWebinar(id);
        break;
      case "end":
        await endWebinar(id);
        break;
      case "cancel":
        await updateWebinarStatus(id, "cancelled");
        break;
      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }

    const updatedWebinar = await getWebinarById(id);
    return NextResponse.json({ webinar: updatedWebinar });
  } catch (error) {
    console.error("Error updating webinar:", error);
    return NextResponse.json(
      { error: "Failed to update webinar" },
      { status: 500 }
    );
  }
}
