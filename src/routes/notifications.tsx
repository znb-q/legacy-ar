import { createFileRoute } from "@tanstack/react-router";
import { Users, GitBranch, Sparkles, FlaskConical, Check } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Legacy AR" }] }),
  component: Notifications,
});

const items = [
  { i: Users, t: "Ravi commented on Aether Drone", d: "Looks great — let's vote V3", time: "2m", new: true, c: "from-[oklch(0.7_0.25_300)] to-[oklch(0.65_0.22_250)]" },
  { i: Sparkles, t: "AI generated 4 new variants", d: "Engine completed in 38s", time: "12m", new: true, c: "from-[oklch(0.65_0.22_250)] to-[oklch(0.85_0.18_195)]" },
  { i: FlaskConical, t: "Thermal simulation completed", d: "Max temp 84°C — within bounds", time: "1h", new: false, c: "from-[oklch(0.85_0.18_195)] to-[oklch(0.7_0.25_300)]" },
  { i: GitBranch, t: "New version v3.2 published", d: "by Mei · 12 changes", time: "2h", new: false, c: "from-[oklch(0.78_0.2_320)] to-[oklch(0.65_0.22_250)]" },
];

function Notifications() {
  return (
    <MobileShell>
      <ScreenHeader title="Notifications" subtitle="Updates, alerts and pings"
        right={<button className="glass flex items-center gap-1 rounded-full px-3 py-1.5 text-[10px]"><Check className="h-3 w-3" /> Mark all</button>}
      />

      <div className="mb-5 flex gap-2">
        {["All", "Collab", "AI", "Sims"].map((t, i) => (
          <button key={t} className={`rounded-full px-3 py-1.5 text-[11px] ${i === 0 ? "bg-gradient-primary text-white glow-primary" : "glass"}`}>{t}</button>
        ))}
      </div>

      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className={`glass relative flex items-start gap-3 rounded-2xl p-4 ${it.new ? "border-glow" : ""}`}>
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${it.c}`}>
              <it.i className="h-5 w-5 text-white" />
            </span>
            <div className="flex-1">
              <p className="text-xs font-semibold">{it.t}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{it.d}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-muted-foreground">{it.time}</span>
              {it.new && <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-accent glow-cyan" />}
            </div>
          </div>
        ))}
      </div>
    </MobileShell>
  );
}