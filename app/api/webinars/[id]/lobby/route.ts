import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getWebinarById,
  isWebinarHost,
  getLobbyQueue,
  approveLobbyEntry,
  denyLobbyEntry,
  updateParticipantStatus,
} from "@/lib/webinar-db";

/**
 * GET /api/webinars/[id]/lobby - Get lobby queue (host only)
 */
export async function GET(
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
        { error: "Only hosts can view lobby" },
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

    const queue = await getLobbyQueue(id);
    return NextResponse.json({ queue });
  } catch (error) {
    console.error("Error fetching lobby queue:", error);
    return NextResponse.json(
      { error: "Failed to fetch lobby queue" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/webinars/[id]/lobby - Approve or deny lobby entry (host only)
 */
export async function POST(
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
        { error: "Only hosts can manage lobby" },
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
    const { entryId, participantId, action } = body;

    if (!entryId || !participantId || !action) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (action === "approve") {
      await approveLobbyEntry(entryId, session.user.id);
      await updateParticipantStatus(participantId, "approved");
    } else if (action === "deny") {
      await denyLobbyEntry(entryId, session.user.id);
      await updateParticipantStatus(participantId, "denied");
    } else {
      return NextResponse.json(
        { error: "Invalid action" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error managing lobby entry:", error);
    return NextResponse.json(
      { error: "Failed to manage lobby entry" },
      { status: 500 }
    );
  }
}
