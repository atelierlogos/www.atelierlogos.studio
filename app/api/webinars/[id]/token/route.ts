import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getWebinarById, isWebinarHost, addParticipant, addToLobby } from "@/lib/webinar-db";
import { generateHostToken, generateGuestToken } from "@/lib/videosdk/token";
import { nanoid } from "nanoid";

/**
 * POST /api/webinars/[id]/token - Get VideoSDK token for joining webinar
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

    const webinar = await getWebinarById(id);
    if (!webinar) {
      return NextResponse.json(
        { error: "Webinar not found" },
        { status: 404 }
      );
    }

    if (!webinar.room_id) {
      console.error("Webinar room_id is null - VideoSDK may not be configured");
      return NextResponse.json(
        { error: "This webinar does not have live video enabled. VideoSDK credentials may not be configured." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, email } = body;

    // Check if user is a host
    const isHost = session?.user && (await isWebinarHost(session.user.id));
    const participantId = session?.user?.id || nanoid();
    const participantName = name || session?.user?.name || "Guest";
    const participantEmail = email || session?.user?.email;

    let token: string;
    let role: "host" | "guest";

    if (isHost) {
      // Host gets allow_join and allow_mod permissions
      token = generateHostToken({
        roomId: webinar.room_id,
        participantId,
      });
      role = "host";
      console.log("Generated host token for room:", webinar.room_id, "participant:", participantId);

      // Add host as participant with approved status
      await addParticipant({
        webinar_id: webinar.id,
        user_id: session?.user?.id,
        participant_id: participantId,
        name: participantName,
        email: participantEmail,
        role: "host",
      });
    } else {
      // Guest gets ask_join permission (lobby)
      token = generateGuestToken({
        roomId: webinar.room_id,
        participantId,
      });
      role = "guest";
      console.log("Generated guest token for room:", webinar.room_id, "participant:", participantId);

      // Add guest to lobby queue
      await addToLobby({
        webinar_id: webinar.id,
        participant_id: participantId,
        name: participantName,
        email: participantEmail,
      });

      // Also add as participant with pending status
      await addParticipant({
        webinar_id: webinar.id,
        user_id: session?.user?.id,
        participant_id: participantId,
        name: participantName,
        email: participantEmail,
        role: "guest",
      });
    }

    console.log("Returning token response:", {
      hasToken: !!token,
      meetingId: webinar.room_id,
      role,
      tokenLength: token.length
    });

    return NextResponse.json({
      token,
      meetingId: webinar.room_id,
      participantId,
      role,
      name: participantName,
    });
  } catch (error) {
    console.error("Error generating token:", error);
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    );
  }
}
