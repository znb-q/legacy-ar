import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Thermometer, Wrench, Play, Pause } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/simulations")({
  head: () => ({ meta: [{ title: "Simulations — Legacy AR" }] }),
  component: Sims,
});

const sims = [
  { i: Activity, t: "Structural", d: "FEA · Load case 2", p: 78, s: "Running" },
  { i: Thermometer, t: "Thermal", d: "CFD · Steady state", p: 42, s: "Running" },
  { i: Wrench, t: "Manufacturability", d: "DFM analysis", p: 100, s: "Done" },
];

function Sims() {
  return (
    <MobileShell>
      <ScreenHeader title="Simulations" subtitle="Multi-physics queue" />

      <div className="glass-strong mb-5 rounded-3xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-accent">Cluster</p>
            <p className="text-lg font-bold">8 GPUs · 64 cores</p>
          </div>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary glow-primary">
            <Pause className="h-5 w-5 text-white" />
          </button>
        </div>
        <div className="mt-4 flex gap-1">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="h-6 flex-1 rounded-sm" style={{ background: `oklch(${0.3 + (i % 5) * 0.1} 0.2 ${280 + i * 4})`, opacity: 0.3 + (i % 7) * 0.1 }} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {sims.map((s) => (
          <div key={s.t} className="glass rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary/30 border-glow">
                <s.i className="h-5 w-5 text-accent" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold">{s.t}</p>
                <p className="text-[11px] text-muted-foreground">{s.d}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] ${s.s === "Done" ? "bg-accent/20 text-accent" : "bg-gradient-primary text-white"}`}>{s.s}</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-gradient-primary" style={{ width: `${s.p}%` }} />
              </div>
              <span className="text-[10px] text-muted-foreground">{s.p}%</span>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="glass flex-1 rounded-xl py-2 text-[11px]"><Play className="mr-1 inline h-3 w-3" /> Logs</button>
              <Link to="/simulation-results" className="flex-1 rounded-xl bg-gradient-primary py-2 text-center text-[11px] font-semibold text-white">Results</Link>
            </div>
          </div>
        ))}
      </div>
    </MobileShell>
  );
}