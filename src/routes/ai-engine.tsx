import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Cpu, Sparkles, Wand2, Sliders, Zap, Loader2 } from "lucide-react";
import { useState } from "react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/ai-engine")({
  head: () => ({ meta: [{ title: "AI Design Engine — Legacy AR" }] }),
  component: AIEngine,
});

function AIEngine() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState<Record<string, boolean>>({
    Performance: true, Efficiency: true, Aesthetics: false, Innovation: true,
  });

  const handleGenerate = async () => {
    setLoading(true);
    const enabled = Object.entries(goals).filter(([, v]) => v).map(([k]) => k);
    // Simulated generation
    await new Promise((r) => setTimeout(r, 1400));
    const variants = Array.from({ length: 4 }).map((_, i) => ({
      n: `V${i + 1} · ${["Lightframe", "TitanCore", "AeroFlex", "Hybrid Mesh"][i]}`,
      w: `${(1.8 + Math.random() * 0.9).toFixed(1)} kg`,
      s: Math.round(85 + Math.random() * 13),
      c: `$ ${Math.round(280 + Math.random() * 150)}`,
      r: +(4.2 + Math.random() * 0.7).toFixed(1),
      sel: i === 1,
      goals: enabled,
    }));
    try { localStorage.setItem("legacy.variants", JSON.stringify({ created: Date.now(), variants })); } catch {}
    setLoading(false);
    navigate({ to: "/variants" });
  };

  return (
    <MobileShell>
      <ScreenHeader title="AI Design Engine" subtitle="Generative optimization" />

      <div className="glass-strong relative mb-5 overflow-hidden rounded-3xl p-5">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-primary opacity-30 blur-2xl animate-pulse-glow" />
        <div className="relative flex items-center gap-4">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-accent/60" />
            <div className="absolute inset-2 rounded-full bg-gradient-primary glow-primary flex items-center justify-center">
              <Cpu className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-xs text-accent">NEURAL CORE v4.2</p>
            <p className="text-sm font-bold">Ready to optimize</p>
            <p className="text-[10px] text-muted-foreground">12.8B params · GPU online</p>
          </div>
        </div>
      </div>

      <h3 className="mb-3 text-sm font-semibold">Design Constraints</h3>
      <div className="glass space-y-4 rounded-2xl p-5">
        {[
          { l: "Max Weight", v: "2.4 kg", p: 60 },
          { l: "Material Cost", v: "$ 320", p: 40 },
          { l: "Strength Factor", v: "1.6×", p: 75 },
          { l: "Aerodynamic Drag", v: "Low", p: 30 },
        ].map((c) => (
          <div key={c.l}>
            <div className="mb-2 flex justify-between text-xs">
              <span className="text-muted-foreground">{c.l}</span>
              <span className="font-semibold text-gradient">{c.v}</span>
            </div>
            <div className="relative h-2 rounded-full bg-muted">
              <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-primary" style={{ width: `${c.p}%` }} />
              <div className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white glow-cyan" style={{ left: `calc(${c.p}% - 8px)` }} />
            </div>
          </div>
        ))}
      </div>

      <h3 className="mb-3 mt-6 text-sm font-semibold">Optimization Goals</h3>
      <div className="grid grid-cols-2 gap-3">
        {[
          { i: Zap, l: "Performance", on: true },
          { i: Sliders, l: "Efficiency", on: true },
          { i: Wand2, l: "Aesthetics", on: false },
          { i: Sparkles, l: "Innovation", on: true },
        ].map(({ i: Icon, l }) => {
          const on = goals[l];
          return (
          <button type="button" onClick={() => setGoals((g) => ({ ...g, [l]: !g[l] }))} key={l} className={`glass flex items-center justify-between rounded-2xl p-4 ${on ? "border-glow" : ""}`}>
            <div className="flex items-center gap-2">
              <Icon className={`h-4 w-4 ${on ? "text-accent" : "text-muted-foreground"}`} />
              <span className="text-xs">{l}</span>
            </div>
            <span className={`h-4 w-7 rounded-full ${on ? "bg-gradient-primary" : "bg-muted"} relative`}>
              <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${on ? "left-3.5" : "left-0.5"}`} />
            </span>
          </button>
          );
        })}
      </div>

      <button onClick={handleGenerate} disabled={loading} className="mt-6 relative w-full overflow-hidden rounded-2xl bg-gradient-primary py-4 text-sm font-bold text-white glow-primary active:scale-[0.98] disabled:opacity-70">
        <span className="relative flex items-center justify-center gap-2">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? "Generating variants…" : "Generate Variants"}
        </span>
      </button>
    </MobileShell>
  );
}