"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { JoinForm } from "@/components/webinar/join-form";
import { useSession } from "@/lib/auth-client";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

// Dynamically import VideoSDK components to avoid SSR issues
const MeetingView = dynamic(
  () => import("@/components/webinar/meeting-view").then(mod => ({ default: mod.MeetingView })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    ),
  }
);

const LobbyManager = dynamic(
  () => import("@/components/webinar/lobby-manager").then(mod => ({ default: mod.LobbyManager })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    ),
  }
);

interface WebinarData {
  id: string;
  title: string;
  description: string | null;
  scheduled_start: number;
  status: string;
  room_id: string | null;
}

interface TokenData {
  token: string;
  meetingId: string;
  participantId: string;
  role: "host" | "guest";
  name: string;
}

export default function LiveWebinarPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [webinar, setWebinar] = useState<WebinarData | null>(null);
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasJoined, setHasJoined] = useState(false);

  const webinarId = params.id as string;

  useEffect(() => {
    fetchWebinar();
  }, [webinarId]);

  const fetchWebinar = async () => {
    try {
      const response = await fetch(`/api/webinars/${webinarId}`);
      if (!response.ok) {
        throw new Error("Webinar not found");
      }
      const data = await response.json();
      setWebinar(data.webinar);
    } catch (error) {
      console.error("Error fetching webinar:", error);
      setError("Failed to load webinar");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoin = async (data: { name: string; email?: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/webinars/${webinarId}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to get access token");
      }

      const tokenData: TokenData = await response.json();
      setTokenData(tokenData);
      setHasJoined(true);
    } catch (error) {
      console.error("Error joining webinar:", error);
      setError("Failed to join webinar. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeave = () => {
    setHasJoined(false);
    setTokenData(null);
    // Stay on the live page - this will show the join form again
  };

  if (isLoading && !webinar) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading webinar...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!webinar) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Webinar Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The webinar you're looking for doesn't exist.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if webinar is live
  if (webinar.status !== "live" && webinar.status !== "scheduled") {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center p-4 pt-24">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Webinar Not Available</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This webinar is not currently live.
                {webinar.status === "ended" && " The webinar has ended."}
                {webinar.status === "cancelled" && " The webinar has been cancelled."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show join form if not joined yet
  if (!hasJoined || !tokenData) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <JoinForm
          webinarId={webinarId}
          webinarTitle={webinar.title}
          onJoin={handleJoin}
          isAuthenticated={!!session?.user}
          userName={session?.user?.name}
          userEmail={session?.user?.email}
        />
      </div>
    );
  }

  // Show meeting view
  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="border-b border-border p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-lg font-semibold">{webinar.title}</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-500 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 relative">
        <MeetingView
          meetingId={tokenData.meetingId}
          token={tokenData.token}
          participantName={tokenData.name}
          isHost={tokenData.role === "host"}
          onLeave={handleLeave}
        />

        {/* Lobby Manager for hosts */}
        {tokenData.role === "host" && <LobbyManager webinarId={webinarId} />}
      </div>
    </div>
  );
}
