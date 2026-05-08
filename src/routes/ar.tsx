import { createFileRoute, Link } from "@tanstack/react-router";
import { Box, RotateCw, ZoomIn, ZoomOut, Move3d, Maximize, Hand, Layers, Camera, Ruler, Scan, ChevronUp } from "lucide-react";
import { useState } from "react";
import { MobileShell, ScreenHeader, FAB, BottomSheet } from "@/components/MobileShell";

export const Route = createFileRoute("/ar")({
  head: () => ({ meta: [{ title: "AR Viewer — Legacy AR" }] }),
  component: AR,
});

function AR() {
  const [sheet, setSheet] = useState(false);
  return (
    <MobileShell>
      <ScreenHeader title="AR Viewer" subtitle="Aether Drone X1 · Live"
        right={<Link to="/annotation" className="glass rounded-full px-3 py-1.5 text-[10px]">Annotate</Link>}
      />

      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border-glow">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.2_0.1_290/0.3)] to-[oklch(0.1_0.04_280/0.6)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 -m-8 animate-spin-slow rounded-full border border-dashed border-[oklch(0.7_0.22_295/0.5)]" />
            <div className="absolute inset-0 -m-16 animate-spin-slow rounded-full border border-[oklch(0.85_0.18_195/0.3)]" style={{ animationDirection: "reverse" }} />
            <div className="relative flex h-40 w-40 items-center justify-center rounded-3xl bg-gradient-primary glow-primary animate-float">
              <Box className="h-20 w-20 text-white" strokeWidth={1.2} />
            </div>
          </div>
        </div>

        {/* Corner brackets */}
        {["top-3 left-3 border-t-2 border-l-2", "top-3 right-3 border-t-2 border-r-2", "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"].map((c) => (
          <span key={c} className={`absolute h-6 w-6 border-accent ${c}`} />
        ))}

        <div className="absolute left-3 top-3 glass rounded-lg px-2 py-1 text-[10px]">
          <span className="text-accent">●</span> AR · 60fps
        </div>
        <div className="absolute right-3 top-3 glass rounded-lg px-2 py-1 text-[10px]">x: 0.42  y: 1.18  z: -0.55</div>

        {/* Side controls */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {[ZoomIn, ZoomOut, RotateCw, Maximize].map((I, i) => (
            <button key={i} className="glass-strong flex h-11 w-11 items-center justify-center rounded-full"><I className="h-4 w-4 text-accent" /></button>
          ))}
        </div>

        {/* Bottom toolbar */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 glass-strong flex items-center gap-2 rounded-2xl px-3 py-2">
          {[Hand, Move3d, Ruler, Layers, Camera].map((I, i) => (
            <button key={i} className={`flex h-9 w-9 items-center justify-center rounded-xl ${i === 1 ? "bg-gradient-primary glow-primary" : ""}`}>
              <I className="h-4 w-4 text-white" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {[{ l: "Scale", v: "1.00x" }, { l: "Rotation", v: "42°" }, { l: "Tris", v: "184k" }].map((s) => (
          <div key={s.l} className="glass rounded-2xl p-3 text-center">
            <p className="text-[10px] text-muted-foreground">{s.l}</p>
            <p className="mt-1 text-sm font-bold text-gradient">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="glass mt-5 rounded-2xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold">Object Manipulation</p>
          <span className="text-[10px] text-accent">Linked</span>
        </div>
        {["Position", "Scale", "Rotation"].map((l, i) => (
          <div key={l} className="mb-3 last:mb-0">
            <div className="flex justify-between text-[10px] text-muted-foreground"><span>{l}</span><span>{[42, 78, 30][i]}%</span></div>
            <div className="mt-1 h-1.5 rounded-full bg-muted">
              <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${[42, 78, 30][i]}%` }} />
            </div>
          </div>
        ))}
      </div>

      <FAB icon={Scan} label="Scan" onClick={() => setSheet(true)} />

      <BottomSheet open={sheet} onClose={() => setSheet(false)} title="Scene Analytics" peek={56}>
        <div className="grid grid-cols-3 gap-3">
          {[{ l: "Verts", v: "92.1k" }, { l: "Mat", v: "12" }, { l: "Lights", v: "4" }, { l: "Anchors", v: "6" }, { l: "FPS", v: "60" }, { l: "Mem", v: "184MB" }].map((s) => (
            <div key={s.l} className="glass rounded-xl p-3 text-center">
              <p className="text-[10px] text-muted-foreground">{s.l}</p>
              <p className="mt-1 text-sm font-bold text-gradient">{s.v}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[10px] uppercase tracking-widest text-accent">Layers</p>
        <div className="mt-2 space-y-2">
          {["Frame", "Rotors", "Sensors", "Skin"].map((l) => (
            <div key={l} className="glass flex items-center justify-between rounded-xl px-3 py-2">
              <span className="text-xs">{l}</span>
              <span className="h-2 w-2 rounded-full bg-accent glow-cyan" />
            </div>
          ))}
        </div>
        <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-3 text-xs font-semibold text-white glow-primary">
          <ChevronUp className="h-4 w-4" /> Expand Full Report
        </button>
      </BottomSheet>
    </MobileShell>
  );
}