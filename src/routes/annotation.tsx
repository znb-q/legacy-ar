import { createFileRoute } from "@tanstack/react-router";
import { Box, MessageCircle, Highlighter, Plus, Tag, Send } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/annotation")({
  head: () => ({ meta: [{ title: "Annotations — Legacy AR" }] }),
  component: Annotation,
});

function Annotation() {
  const pins = [
    { x: 30, y: 30, n: 1, label: "Joint stress" },
    { x: 70, y: 45, n: 2, label: "Heat zone" },
    { x: 45, y: 70, n: 3, label: "Weld" },
  ];
  return (
    <MobileShell>
      <ScreenHeader title="Annotations" subtitle="Tap on model to add pins" />

      <div className="relative aspect-square w-full overflow-hidden rounded-3xl border-glow">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Box className="h-44 w-44 text-accent/70 animate-float" strokeWidth={0.8} />
        </div>
        {pins.map((p) => (
          <button key={p.n} className="absolute" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            <span className="absolute inset-0 -m-2 animate-ping rounded-full bg-accent/40" />
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gradient-primary text-[11px] font-bold text-white glow-primary">{p.n}</span>
          </button>
        ))}

        <div className="absolute right-3 top-3 flex flex-col gap-2">
          {[Plus, Highlighter, Tag, MessageCircle].map((I, i) => (
            <button key={i} className="glass-strong flex h-10 w-10 items-center justify-center rounded-full"><I className="h-4 w-4 text-accent" /></button>
          ))}
        </div>
      </div>

      <h3 className="mb-3 mt-6 text-sm font-semibold">Pinned Annotations</h3>
      <div className="space-y-3">
        {pins.map((p) => (
          <div key={p.n} className="glass flex items-start gap-3 rounded-2xl p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-[11px] font-bold text-white">{p.n}</span>
            <div className="flex-1">
              <p className="text-sm font-semibold">{p.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">Stress concentration exceeds 320 MPa under load case 2.</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] text-accent">structural</span>
                <span className="rounded-full bg-secondary/30 px-2 py-0.5 text-[10px]">priority: high</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass mt-5 flex items-center gap-2 rounded-2xl p-2">
        <input placeholder="Add comment to pin #3..." className="flex-1 bg-transparent px-3 py-2 text-xs outline-none placeholder:text-muted-foreground/60" />
        <button className="rounded-xl bg-gradient-primary p-2 glow-primary"><Send className="h-4 w-4 text-white" /></button>
      </div>
    </MobileShell>
  );
}