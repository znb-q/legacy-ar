import { createFileRoute } from "@tanstack/react-router";
import { Download, AlertTriangle, TrendingUp } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/simulation-results")({
  head: () => ({ meta: [{ title: "Results — Legacy AR" }] }),
  component: Results,
});

function Results() {
  const bars = [40, 65, 50, 80, 72, 90, 85, 60, 75, 88, 70, 95];
  return (
    <MobileShell>
      <ScreenHeader title="Results" subtitle="Structural · V2 TitanCore"
        right={<button className="glass flex items-center gap-1 rounded-full px-3 py-1.5 text-[10px]"><Download className="h-3 w-3" /> PDF</button>}
      />

      <div className="grid grid-cols-3 gap-3">
        {[
          { l: "Max Stress", v: "284", u: "MPa" },
          { l: "Safety", v: "2.4", u: "FoS" },
          { l: "Mass", v: "2.61", u: "kg" },
        ].map((s) => (
          <div key={s.l} className="glass rounded-2xl p-3 text-center">
            <p className="text-[10px] text-muted-foreground">{s.l}</p>
            <p className="mt-1 text-xl font-bold text-gradient">{s.v}</p>
            <p className="text-[9px] text-muted-foreground">{s.u}</p>
          </div>
        ))}
      </div>

      <div className="glass mt-5 rounded-3xl p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold">Stress over time</p>
          <span className="flex items-center gap-1 text-[10px] text-accent"><TrendingUp className="h-3 w-3" /> +12%</span>
        </div>
        <div className="flex h-32 items-end gap-1.5">
          {bars.map((b, i) => (
            <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-[oklch(0.65_0.22_250)] to-[oklch(0.85_0.18_195)]" style={{ height: `${b}%`, boxShadow: "0 0 8px oklch(0.7 0.22 295 / 0.4)" }} />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[9px] text-muted-foreground"><span>0s</span><span>5s</span><span>10s</span></div>
      </div>

      <div className="glass mt-5 rounded-3xl p-5">
        <p className="mb-4 text-sm font-semibold">Stress visualization</p>
        <div className="relative h-40 overflow-hidden rounded-2xl border-glow">
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 50%, oklch(0.65 0.25 20 / 0.7), oklch(0.78 0.18 65 / 0.5) 30%, oklch(0.85 0.18 195 / 0.5) 60%, oklch(0.65 0.22 250 / 0.5))" }} />
          <div className="absolute inset-0 grid-bg opacity-30" />
        </div>
        <div className="mt-3 flex items-center gap-2 text-[10px]">
          <span className="h-2 w-12 rounded-full" style={{ background: "linear-gradient(90deg, oklch(0.65 0.22 250), oklch(0.85 0.18 195), oklch(0.78 0.18 65), oklch(0.65 0.25 20))" }} />
          <span className="text-muted-foreground">0 → 320 MPa</span>
        </div>
      </div>

      <div className="glass mt-5 flex items-start gap-3 rounded-2xl p-4">
        <AlertTriangle className="h-5 w-5 text-accent" />
        <div>
          <p className="text-xs font-semibold">2 hotspots detected</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">Wing root joint exceeds yield in load case 3. Suggest fillet radius +1.5mm.</p>
        </div>
      </div>
    </MobileShell>
  );
}