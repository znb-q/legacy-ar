import { createFileRoute, Link } from "@tanstack/react-router";
import { Folder, Plus, Loader2, X, AlertCircle, Inbox } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Projects — Legacy AR" }] }),
  component: Projects,
});

type Project = Tables<"projects">;

function Projects() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    const { data: sess } = await supabase.auth.getUser();
    setUserId(sess.user?.id ?? null);
    if (!sess.user) {
      setLoading(false);
      setProjects([]);
      return;
    }
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) setError(error.message);
    setProjects(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    const { data: sub } = supabase.auth.onAuthStateChange(() => load());
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <MobileShell>
      <ScreenHeader
        title="Projects"
        subtitle={projects ? `${projects.length} project${projects.length === 1 ? "" : "s"}` : "Loading…"}
        right={
          <button onClick={() => setShowForm(true)} className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary glow-primary">
            <Plus className="h-4 w-4 text-white" />
          </button>
        }
      />

      {!userId && !loading && (
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-sm text-muted-foreground">Sign in to view your projects.</p>
          <Link to="/login" className="mt-3 inline-block rounded-xl bg-gradient-primary px-4 py-2 text-xs font-semibold text-white glow-primary">Go to Sign In</Link>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-20 text-accent"><Loader2 className="h-6 w-6 animate-spin" /></div>
      )}

      {error && (
        <div className="glass flex items-start gap-2 rounded-2xl p-4 text-xs text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}

      {!loading && userId && projects && projects.length === 0 && !error && (
        <div className="glass rounded-2xl p-8 text-center">
          <Inbox className="mx-auto h-10 w-10 text-accent" />
          <p className="mt-3 text-sm font-semibold">No projects yet</p>
          <p className="mt-1 text-xs text-muted-foreground">Tap + to create your first project.</p>
        </div>
      )}

      {!loading && projects && projects.length > 0 && (
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p.id} className="glass rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary glow-primary">
                  <Folder className="h-6 w-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold">{p.name}</p>
                    <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[9px] text-accent">{p.version}</span>
                  </div>
                  {p.description && <p className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">{p.description}</p>}
                  <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span>{p.file_count} files</span>
                    <span>•</span>
                    <span className="capitalize">{p.status}</span>
                    <span>•</span>
                    <span>{new Date(p.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && userId && (
        <CreateProjectModal userId={userId} onClose={() => setShowForm(false)} onCreated={load} />
      )}
    </MobileShell>
  );
}

function CreateProjectModal({ userId, onClose, onCreated }: { userId: string; onClose: () => void; onCreated: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    setErr(null);
    const { error } = await supabase
      .from("projects")
      .insert({ name: name.trim(), description: description.trim() || null, user_id: userId });
    setSaving(false);
    if (error) { setErr(error.message); return; }
    onCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={submit} className="glass-strong w-full max-w-md rounded-t-3xl border-glow p-6 animate-fade-in">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gradient">New Project</h3>
          <button type="button" onClick={onClose} className="text-muted-foreground"><X className="h-5 w-5" /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[10px] uppercase tracking-widest text-muted-foreground">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Aether Drone" className="w-full rounded-xl border border-[oklch(0.5_0.1_280/0.3)] bg-[oklch(0.18_0.05_280/0.5)] px-3 py-3 text-sm outline-none focus:border-glow" />
          </div>
          <div>
            <label className="mb-1.5 block text-[10px] uppercase tracking-widest text-muted-foreground">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Brief description…" className="w-full resize-none rounded-xl border border-[oklch(0.5_0.1_280/0.3)] bg-[oklch(0.18_0.05_280/0.5)] px-3 py-3 text-sm outline-none focus:border-glow" />
          </div>
          {err && <p className="text-xs text-destructive">{err}</p>}
          <button type="submit" disabled={saving} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-3.5 text-sm font-semibold text-white glow-primary disabled:opacity-60">
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {saving ? "Creating…" : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}