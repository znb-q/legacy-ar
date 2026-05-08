import { createFileRoute } from "@tanstack/react-router";
import { Folder, GitBranch, RotateCcw, Save, Plus } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Projects — Legacy AR" }] }),
  component: Projects,
});

function Projects() {
  const versions = [
    { v: "v3.2", t: "Optimized wing root", a: "Mei", d: "2h ago", c: true },
    { v: "v3.1", t: "Adjusted weight target", a: "Ravi", d: "1d ago" },
    { v: "v3.0", t: "AI variant V3 merged", a: "AI", d: "2d ago" },
    { v: "v2.4", t: "Initial topology", a: "Ada", d: "5d ago" },
  ];
  return (
    <MobileShell>
      <ScreenHeader title="Projects" subtitle="Folders & version history"
        right={<button className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary glow-primary"><Plus className="h-4 w-4 text-white" /></button>}
      />

      <div className="-mx-5 mb-5 flex gap-3 overflow-x-auto px-5">
        {[
          { n: "Aether Drone", c: 12 },
          { n: "Helix Wearable", c: 8 },
          { n: "Nova EV", c: 21 },
        ].map((f) => (
          <div key={f.n} className="glass min-w-[140px] rounded-2xl p-4">
            <Folder className="h-8 w-8 text-accent" />
            <p className="mt-2 text-sm font-semibold">{f.n}</p>
            <p className="text-[10px] text-muted-foreground">{f.c} files</p>
          </div>
        ))}
      </div>

      <h3 className="mb-3 text-sm font-semibold">Version Timeline</h3>
      <div className="relative pl-6">
        <span className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-accent via-secondary to-transparent" />
        {versions.map((v) => (
          <div key={v.v} className="relative mb-4">
            <span className={`absolute -left-[18px] top-3 h-3 w-3 rounded-full ${v.c ? "bg-gradient-primary glow-primary" : "bg-muted ring-2 ring-background"}`} />
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitBranch className="h-3.5 w-3.5 text-accent" />
                  <span className="text-xs font-bold text-gradient">{v.v}</span>
                  {v.c && <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[9px] text-accent">current</span>}
                </div>
                <span className="text-[10px] text-muted-foreground">{v.d}</span>
              </div>
              <p className="mt-2 text-xs">{v.t}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">by {v.a}</p>
              <div className="mt-3 flex gap-2">
                <button className="glass flex flex-1 items-center justify-center gap-1 rounded-xl py-1.5 text-[10px]"><RotateCcw className="h-3 w-3" /> Rollback</button>
                <button className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-gradient-primary py-1.5 text-[10px] text-white"><Save className="h-3 w-3" /> Load</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MobileShell>
  );
}