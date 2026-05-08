import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageSquare, ThumbsUp, PenLine, Users, Circle, Send, Pin } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/collab")({
  head: () => ({ meta: [{ title: "Collaboration — Legacy AR" }] }),
  component: Collab,
});

function Collab() {
  return (
    <MobileShell>
      <ScreenHeader title="Workspace" subtitle="Aether Drone X1 — Live session"
        right={<div className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5">
          <Circle className="h-2 w-2 fill-accent text-accent" />
          <span className="text-[10px]">4 live</span>
        </div>}
      />

      <div className="glass-strong mb-5 flex items-center justify-between rounded-2xl p-4">
        <div className="flex -space-x-2">
          {["A", "R", "M", "K"].map((c, i) => (
            <div key={i} className="h-8 w-8 rounded-full bg-gradient-primary p-[1.5px] ring-2 ring-background">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-background text-[10px] font-bold">{c}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="glass rounded-xl px-3 py-2 text-[11px]"><PenLine className="inline h-3 w-3" /> Markup</button>
          <Link to="/ar" className="rounded-xl bg-gradient-primary px-3 py-2 text-[11px] font-semibold text-white glow-primary">Open AR</Link>
        </div>
      </div>

      <h3 className="mb-3 text-sm font-semibold">Shared Threads</h3>
      <div className="space-y-3">
        {[
          { u: "Ravi", t: "The wing-root joint stress is too high near 800N. Consider a fillet radius.", v: 12, c: 4, pin: true },
          { u: "Mei", t: "Battery housing clearance is tight. AR scan attached.", v: 7, c: 2 },
          { u: "Kenji", t: "Variant V3 looks great for manufacturability — let's vote.", v: 21, c: 9 },
        ].map((m, i) => (
          <div key={i} className="glass rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-primary p-[1.5px]">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-background text-[11px] font-bold">{m.u[0]}</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">{m.u}</p>
                  {m.pin && <Pin className="h-3 w-3 text-accent" />}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{m.t}</p>
                <div className="mt-3 flex items-center gap-3 text-[11px]">
                  <button className="flex items-center gap-1 text-accent"><ThumbsUp className="h-3.5 w-3.5" /> {m.v}</button>
                  <button className="flex items-center gap-1 text-muted-foreground"><MessageSquare className="h-3.5 w-3.5" /> {m.c}</button>
                  <span className="ml-auto text-muted-foreground">2m</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mb-3 mt-6 text-sm font-semibold">Activity Feed</h3>
      <div className="glass space-y-3 rounded-2xl p-4">
        {[
          "Ravi voted on Variant V3",
          "Mei placed 3 annotations",
          "AI engine completed thermal sim",
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-3 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-accent glow-cyan" />
            <span className="text-muted-foreground">{s}</span>
            <span className="ml-auto text-[10px] text-muted-foreground">{i + 1}m</span>
          </div>
        ))}
      </div>

      <div className="glass mt-5 flex items-center gap-2 rounded-2xl p-2">
        <Users className="ml-2 h-4 w-4 text-accent" />
        <input placeholder="Reply to thread..." className="flex-1 bg-transparent px-2 py-2 text-xs outline-none placeholder:text-muted-foreground/60" />
        <button className="rounded-xl bg-gradient-primary p-2 glow-primary"><Send className="h-4 w-4 text-white" /></button>
      </div>
    </MobileShell>
  );
}