import { createFileRoute, Link } from "@tanstack/react-router";
import { Box, Star, GitCompare, Check } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/variants")({
  head: () => ({ meta: [{ title: "Design Variants — Legacy AR" }] }),
  component: Variants,
});

const data = [
  { n: "V1 · Lightframe", w: "1.9 kg", s: 92, c: "$ 280", r: 4.6, sel: false },
  { n: "V2 · TitanCore", w: "2.6 kg", s: 98, c: "$ 410", r: 4.4, sel: true },
  { n: "V3 · AeroFlex", w: "2.1 kg", s: 88, c: "$ 320", r: 4.8, sel: false },
  { n: "V4 · Hybrid Mesh", w: "2.0 kg", s: 90, c: "$ 350", r: 4.5, sel: false },
];

function Variants() {
  return (
    <MobileShell>
      <ScreenHeader title="Design Variants" subtitle="4 generated · ranked by score"
        right={<button className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px]"><GitCompare className="h-3 w-3" /> Compare</button>}
      />

      <div className="space-y-4">
        {data.map((v) => (
          <div key={v.n} className={`glass rounded-3xl p-4 ${v.sel ? "border-glow" : ""}`}>
            <div className="flex gap-3">
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-primary/20 border-glow">
                <Box className="h-12 w-12 text-accent" />
                {v.sel && (
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-primary glow-primary">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold">{v.n}</p>
                    <div className="mt-0.5 flex items-center gap-1 text-[11px]">
                      <Star className="h-3 w-3 fill-accent text-accent" /><span>{v.r}</span>
                    </div>
                  </div>
                  <span className="rounded-full bg-gradient-primary px-2 py-0.5 text-[10px] font-bold text-white">{v.s}</span>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-[10px]">
                  <Metric l="Weight" v={v.w} />
                  <Metric l="Cost" v={v.c} />
                  <Metric l="Score" v={`${v.s}%`} />
                </div>
                <div className="mt-2 h-1 rounded-full bg-muted">
                  <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${v.s}%` }} />
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="glass flex-1 rounded-xl py-2 text-[11px]">Preview</button>
              <Link to="/simulations" className="flex-1 rounded-xl bg-gradient-primary py-2 text-center text-[11px] font-semibold text-white glow-primary">Simulate</Link>
            </div>
          </div>
        ))}
      </div>
    </MobileShell>
  );
}

function Metric({ l, v }: any) {
  return (
    <div className="rounded-lg bg-muted/40 px-2 py-1.5">
      <p className="text-muted-foreground">{l}</p>
      <p className="font-semibold text-gradient">{v}</p>
    </div>
  );
}