"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Play, Square, Trash2, Video } from "lucide-react";
import { toast } from "sonner";

interface Webinar {
  id: string;
  title: string;
  description: string | null;
  slug: string;
  scheduled_start: number;
  status: "scheduled" | "live" | "ended" | "cancelled";
  created_at: number;
}

export default function WebinarAdminPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const [newWebinar, setNewWebinar] = useState({
    title: "",
    description: "",
    slug: "",
    scheduled_start: "",
    duration_minutes: 60,
  });

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/");
      return;
    }

    if (session) {
      fetchWebinars();
    }
  }, [session, isPending, router]);

  const fetchWebinars = async () => {
    try {
      const response = await fetch("/api/webinars");
      if (response.ok) {
        const data = await response.json();
        setWebinars(data.webinars || []);
      }
    } catch (error) {
      console.error("Error fetching webinars:", error);
      toast.error("Failed to load webinars");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateWebinar = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const response = await fetch("/api/webinars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWebinar),
      });

      if (!response.ok) {
        throw new Error("Failed to create webinar");
      }

      toast.success("Webinar created successfully");
      setShowCreateDialog(false);
      setNewWebinar({
        title: "",
        description: "",
        slug: "",
        scheduled_start: "",
        duration_minutes: 60,
      });
      await fetchWebinars();
    } catch (error) {
      console.error("Error creating webinar:", error);
      toast.error("Failed to create webinar");
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateStatus = async (
    webinarId: string,
    action: "start" | "end" | "cancel"
  ) => {
    try {
      const response = await fetch(`/api/webinars/${webinarId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        throw new Error("Failed to update webinar");
      }

      toast.success(`Webinar ${action === "start" ? "started" : action === "end" ? "ended" : "cancelled"}`);
      await fetchWebinars();
    } catch (error) {
      console.error("Error updating webinar:", error);
      toast.error("Failed to update webinar");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge variant="outline">Scheduled</Badge>;
      case "live":
        return <Badge className="bg-red-500">Live</Badge>;
      case "ended":
        return <Badge variant="secondary">Ended</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (isPending || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container max-w-6xl px-4 md:px-6 py-12 pt-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Webinar Admin</h1>
            <p className="text-muted-foreground mt-2">
              Manage your webinars and live sessions
            </p>
          </div>

          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Webinar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <form onSubmit={handleCreateWebinar}>
                <DialogHeader>
                  <DialogTitle>Create New Webinar</DialogTitle>
                  <DialogDescription>
                    Schedule a new webinar session
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newWebinar.title}
                      onChange={(e) =>
                        setNewWebinar({ ...newWebinar, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={newWebinar.slug}
                      onChange={(e) =>
                        setNewWebinar({ ...newWebinar, slug: e.target.value })
                      }
                      placeholder="webinar-slug"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newWebinar.description}
                      onChange={(e) =>
                        setNewWebinar({
                          ...newWebinar,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="scheduled_start">Start Date & Time</Label>
                      <Input
                        id="scheduled_start"
                        type="datetime-local"
                        value={newWebinar.scheduled_start}
                        onChange={(e) =>
                          setNewWebinar({
                            ...newWebinar,
                            scheduled_start: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={newWebinar.duration_minutes}
                        onChange={(e) =>
                          setNewWebinar({
                            ...newWebinar,
                            duration_minutes: parseInt(e.target.value),
                          })
                        }
                        min={15}
                        max={240}
                        required
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isCreating}>
                    {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Webinars</CardTitle>
            <CardDescription>
              View and manage all scheduled and past webinars
            </CardDescription>
          </CardHeader>
          <CardContent>
            {webinars.length === 0 ? (
              <div className="text-center py-12">
                <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No webinars yet. Create your first webinar to get started.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Scheduled</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {webinars.map((webinar) => (
                    <TableRow key={webinar.id}>
                      <TableCell className="font-medium">
                        {webinar.title}
                      </TableCell>
                      <TableCell>
                        {new Date(webinar.scheduled_start).toLocaleString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(webinar.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {webinar.status === "scheduled" && (
                            <Button
                              size="sm"
                              onClick={() =>
                                handleUpdateStatus(webinar.id, "start")
                              }
                            >
                              <Play className="mr-1 h-3 w-3" />
                              Start
                            </Button>
                          )}
                          {webinar.status === "live" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  router.push(`/webinars/live/${webinar.id}`)
                                }
                              >
                                Join
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() =>
                                  handleUpdateStatus(webinar.id, "end")
                                }
                              >
                                <Square className="mr-1 h-3 w-3" />
                                End
                              </Button>
                            </>
                          )}
                          {webinar.status === "scheduled" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                handleUpdateStatus(webinar.id, "cancel")
                              }
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </main>
  );
}
