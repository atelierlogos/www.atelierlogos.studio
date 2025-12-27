import { sql } from "./db/postgres";
import { nanoid } from "nanoid";
import { createVideoSDKRoom } from "./videosdk/token";

export interface Webinar {
  id: string;
  title: string;
  description: string | null;
  slug: string;
  scheduled_start: number;
  scheduled_end: number | null;
  duration_minutes: number;
  status: "scheduled" | "live" | "ended" | "cancelled";
  meeting_id: string | null;
  room_id: string | null;
  max_participants: number;
  created_by: string;
  created_at: number;
  updated_at: number;
}

export interface WebinarParticipant {
  id: string;
  webinar_id: string;
  user_id: string | null;
  participant_id: string;
  name: string;
  email: string | null;
  role: "host" | "guest";
  join_status: "pending" | "approved" | "denied" | "joined" | "left";
  joined_at: number | null;
  left_at: number | null;
  created_at: number;
  updated_at: number;
}

export interface WebinarState {
  id: string;
  webinar_id: string;
  is_recording: boolean;
  is_streaming: boolean;
  active_presenter_id: string | null;
  participant_count: number;
  started_at: number | null;
  ended_at: number | null;
  updated_at: number;
}

export interface LobbyEntry {
  id: string;
  webinar_id: string;
  participant_id: string;
  name: string;
  email: string | null;
  requested_at: number;
  status: "waiting" | "approved" | "denied";
  responded_at: number | null;
  responded_by: string | null;
}

/**
 * Create a new webinar
 */
export async function createWebinar(data: {
  title: string;
  description?: string;
  slug: string;
  scheduled_start: Date;
  duration_minutes?: number;
  created_by: string;
  max_participants?: number;
}): Promise<Webinar> {
  const now = Date.now();
  const id = nanoid();

  // Create VideoSDK room - REQUIRED for webinar functionality
  const result = await createVideoSDKRoom();
  const roomId = result.roomId;

  const webinar: Webinar = {
    id,
    title: data.title,
    description: data.description || null,
    slug: data.slug,
    scheduled_start: data.scheduled_start.getTime(),
    scheduled_end: null,
    duration_minutes: data.duration_minutes || 60,
    status: "scheduled",
    meeting_id: roomId,
    room_id: roomId,
    max_participants: data.max_participants || 100,
    created_by: data.created_by,
    created_at: now,
    updated_at: now,
  };

  await sql`
    INSERT INTO webinar (
      id, title, description, slug, scheduled_start, scheduled_end,
      duration_minutes, status, meeting_id, room_id, max_participants,
      created_by, created_at, updated_at
    ) VALUES (
      ${webinar.id}, ${webinar.title}, ${webinar.description}, ${webinar.slug},
      ${webinar.scheduled_start}, ${webinar.scheduled_end}, ${webinar.duration_minutes},
      ${webinar.status}, ${webinar.meeting_id}, ${webinar.room_id},
      ${webinar.max_participants}, ${webinar.created_by}, ${webinar.created_at},
      ${webinar.updated_at}
    )
  `;

  // Initialize webinar state
  await sql`
    INSERT INTO webinar_state (
      id, webinar_id, is_recording, is_streaming, participant_count, updated_at
    ) VALUES (${nanoid()}, ${webinar.id}, false, false, 0, ${now})
  `;

  return webinar;
}

/**
 * Get webinar by ID
 */
export async function getWebinarById(id: string): Promise<Webinar | null> {
  const result = await sql<Webinar[]>`
    SELECT * FROM webinar WHERE id = ${id}
  `;
  if (!result[0]) return null;

  // Convert string timestamps to numbers
  return {
    ...result[0],
    scheduled_start: Number(result[0].scheduled_start),
    scheduled_end: result[0].scheduled_end ? Number(result[0].scheduled_end) : null,
    created_at: Number(result[0].created_at),
    updated_at: Number(result[0].updated_at),
  };
}

/**
 * Get webinar by slug
 */
export async function getWebinarBySlug(slug: string): Promise<Webinar | null> {
  const result = await sql<Webinar[]>`
    SELECT * FROM webinar WHERE slug = ${slug}
  `;
  if (!result[0]) return null;

  // Convert string timestamps to numbers
  return {
    ...result[0],
    scheduled_start: Number(result[0].scheduled_start),
    scheduled_end: result[0].scheduled_end ? Number(result[0].scheduled_end) : null,
    created_at: Number(result[0].created_at),
    updated_at: Number(result[0].updated_at),
  };
}

/**
 * Update webinar status
 */
export async function updateWebinarStatus(
  id: string,
  status: Webinar["status"]
): Promise<void> {
  await sql`
    UPDATE webinar
    SET status = ${status}, updated_at = ${Date.now()}
    WHERE id = ${id}
  `;
}

/**
 * Start webinar (change status to live)
 */
export async function startWebinar(id: string): Promise<void> {
  const now = Date.now();

  await sql`
    UPDATE webinar
    SET status = 'live', updated_at = ${now}
    WHERE id = ${id}
  `;

  await sql`
    UPDATE webinar_state
    SET started_at = ${now}, updated_at = ${now}
    WHERE webinar_id = ${id}
  `;
}

/**
 * End webinar
 */
export async function endWebinar(id: string): Promise<void> {
  const now = Date.now();

  await sql`
    UPDATE webinar
    SET status = 'ended', updated_at = ${now}
    WHERE id = ${id}
  `;

  await sql`
    UPDATE webinar_state
    SET ended_at = ${now}, updated_at = ${now}
    WHERE webinar_id = ${id}
  `;
}

/**
 * Add participant to webinar
 */
export async function addParticipant(data: {
  webinar_id: string;
  user_id?: string;
  participant_id: string;
  name: string;
  email?: string;
  role: "host" | "guest";
}): Promise<WebinarParticipant> {
  const now = Date.now();
  const id = nanoid();

  const participant: WebinarParticipant = {
    id,
    webinar_id: data.webinar_id,
    user_id: data.user_id || null,
    participant_id: data.participant_id,
    name: data.name,
    email: data.email || null,
    role: data.role,
    join_status: data.role === "host" ? "approved" : "pending",
    joined_at: null,
    left_at: null,
    created_at: now,
    updated_at: now,
  };

  await sql`
    INSERT INTO webinar_participant (
      id, webinar_id, user_id, participant_id, name, email,
      role, join_status, joined_at, left_at, created_at, updated_at
    ) VALUES (
      ${participant.id}, ${participant.webinar_id}, ${participant.user_id},
      ${participant.participant_id}, ${participant.name}, ${participant.email},
      ${participant.role}, ${participant.join_status}, ${participant.joined_at},
      ${participant.left_at}, ${participant.created_at}, ${participant.updated_at}
    )
  `;

  return participant;
}

/**
 * Get all participants for a webinar
 */
export async function getWebinarParticipants(
  webinarId: string
): Promise<WebinarParticipant[]> {
  return await sql<WebinarParticipant[]>`
    SELECT * FROM webinar_participant
    WHERE webinar_id = ${webinarId}
    ORDER BY created_at DESC
  `;
}

/**
 * Update participant join status
 */
export async function updateParticipantStatus(
  participantId: string,
  status: WebinarParticipant["join_status"]
): Promise<void> {
  await sql`
    UPDATE webinar_participant
    SET join_status = ${status}, updated_at = ${Date.now()}
    WHERE participant_id = ${participantId}
  `;
}

/**
 * Mark participant as joined
 */
export async function markParticipantJoined(participantId: string): Promise<void> {
  const now = Date.now();
  await sql`
    UPDATE webinar_participant
    SET join_status = 'joined', joined_at = ${now}, updated_at = ${now}
    WHERE participant_id = ${participantId}
  `;
}

/**
 * Add to lobby queue
 */
export async function addToLobby(data: {
  webinar_id: string;
  participant_id: string;
  name: string;
  email?: string;
}): Promise<LobbyEntry> {
  const now = Date.now();
  const id = nanoid();

  const entry: LobbyEntry = {
    id,
    webinar_id: data.webinar_id,
    participant_id: data.participant_id,
    name: data.name,
    email: data.email || null,
    requested_at: now,
    status: "waiting",
    responded_at: null,
    responded_by: null,
  };

  await sql`
    INSERT INTO webinar_lobby (
      id, webinar_id, participant_id, name, email,
      requested_at, status, responded_at, responded_by
    ) VALUES (
      ${entry.id}, ${entry.webinar_id}, ${entry.participant_id},
      ${entry.name}, ${entry.email}, ${entry.requested_at},
      ${entry.status}, ${entry.responded_at}, ${entry.responded_by}
    )
  `;

  return entry;
}

/**
 * Get waiting lobby entries
 */
export async function getLobbyQueue(webinarId: string): Promise<LobbyEntry[]> {
  return await sql<LobbyEntry[]>`
    SELECT * FROM webinar_lobby
    WHERE webinar_id = ${webinarId} AND status = 'waiting'
    ORDER BY requested_at ASC
  `;
}

/**
 * Approve lobby entry
 */
export async function approveLobbyEntry(
  entryId: string,
  respondedBy: string
): Promise<void> {
  await sql`
    UPDATE webinar_lobby
    SET status = 'approved', responded_at = ${Date.now()}, responded_by = ${respondedBy}
    WHERE id = ${entryId}
  `;
}

/**
 * Deny lobby entry
 */
export async function denyLobbyEntry(
  entryId: string,
  respondedBy: string
): Promise<void> {
  await sql`
    UPDATE webinar_lobby
    SET status = 'denied', responded_at = ${Date.now()}, responded_by = ${respondedBy}
    WHERE id = ${entryId}
  `;
}

/**
 * Get webinar state
 */
export async function getWebinarState(webinarId: string): Promise<WebinarState | null> {
  const result = await sql<WebinarState[]>`
    SELECT * FROM webinar_state WHERE webinar_id = ${webinarId}
  `;
  return result[0] || null;
}

/**
 * Update participant count
 */
export async function updateParticipantCount(
  webinarId: string,
  count: number
): Promise<void> {
  await sql`
    UPDATE webinar_state
    SET participant_count = ${count}, updated_at = ${Date.now()}
    WHERE webinar_id = ${webinarId}
  `;
}

/**
 * Convert database timestamps to numbers
 */
function normalizeWebinar(webinar: any): Webinar {
  return {
    ...webinar,
    scheduled_start: Number(webinar.scheduled_start),
    scheduled_end: webinar.scheduled_end ? Number(webinar.scheduled_end) : null,
    created_at: Number(webinar.created_at),
    updated_at: Number(webinar.updated_at),
    duration_minutes: Number(webinar.duration_minutes),
    max_participants: Number(webinar.max_participants),
  };
}

/**
 * Get all upcoming webinars
 */
export async function getUpcomingWebinars(): Promise<Webinar[]> {
  const now = Date.now();
  const result = await sql<Webinar[]>`
    SELECT * FROM webinar
    WHERE scheduled_start > ${now} AND status IN ('scheduled', 'live')
    ORDER BY scheduled_start ASC
  `;
  return result.map(normalizeWebinar);
}

/**
 * Get all past webinars
 */
export async function getPastWebinars(): Promise<Webinar[]> {
  const now = Date.now();
  const result = await sql<Webinar[]>`
    SELECT * FROM webinar
    WHERE scheduled_start <= ${now} OR status = 'ended'
    ORDER BY scheduled_start DESC
  `;
  return result.map(normalizeWebinar);
}

/**
 * Get all webinars (public - both upcoming and past)
 */
export async function getAllWebinars(): Promise<Webinar[]> {
  const result = await sql<Webinar[]>`
    SELECT * FROM webinar
    WHERE status != 'cancelled'
    ORDER BY
      CASE
        WHEN scheduled_start > ${Date.now()} THEN 0
        ELSE 1
      END,
      scheduled_start DESC
  `;
  return result.map(normalizeWebinar);
}

/**
 * Get all webinars (for admin)
 */
export async function getAllWebinarsForAdmin(): Promise<Webinar[]> {
  const result = await sql<Webinar[]>`
    SELECT * FROM webinar ORDER BY scheduled_start DESC
  `;
  return result.map(normalizeWebinar);
}

/**
 * Check if user is a host
 */
export async function isWebinarHost(userId: string): Promise<boolean> {
  const result = await sql<{ count: number }[]>`
    SELECT COUNT(*)::int as count
    FROM webinar_host
    WHERE user_id = ${userId} AND is_active = true
  `;
  return result[0].count > 0;
}

/**
 * Add host
 */
export async function addHost(userId: string): Promise<void> {
  const now = Date.now();
  await sql`
    INSERT INTO webinar_host (id, user_id, is_active, created_at, updated_at)
    VALUES (${nanoid()}, ${userId}, true, ${now}, ${now})
    ON CONFLICT (user_id)
    DO UPDATE SET is_active = true, updated_at = ${now}
  `;
}

/**
 * Remove host
 */
export async function removeHost(userId: string): Promise<void> {
  await sql`
    UPDATE webinar_host
    SET is_active = false, updated_at = ${Date.now()}
    WHERE user_id = ${userId}
  `;
}
