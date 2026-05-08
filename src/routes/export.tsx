import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, DollarSign, FileBox, FileSpreadsheet, FileCode } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/export")({
  head: () => ({ meta: [{ title: "Export & Reports — Legacy AR" }] }),
  component: Export,
});

function Export() {
  return (
    <MobileShell>
      <ScreenHeader title="Export & Reports" subtitle="Choose format and download" />

      <h3 className="mb-3 text-sm font-semibold">Format</h3>
      <div className="grid grid-cols-3 gap-3">
        {[
          { i: FileBox, l: "STEP / CAD", a: true },
          { i: FileSpreadsheet, l: "BOM", a: false },
          { i: FileCode, l: "JSON", a: false },
        ].map(({ i: Icon, l, a }) => (
          <button key={l} className={`glass flex flex-col items-center gap-2 rounded-2xl p-4 ${a ? "border-glow" : ""}`}>
            <Icon className={`h-6 w-6 ${a ? "text-accent" : "text-muted-foreground"}`} />
            <span className="text-[11px]">{l}</span>
          </button>
        ))}
      </div>

      <h3 className="mb-3 mt-6 text-sm font-semibold">Cost Estimate</h3>
      <div className="glass-strong rounded-3xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-accent">Total</p>
            <p className="mt-1 text-3xl font-bold text-gradient">$ 4,820</p>
            <p className="mt-1 text-[11px] text-muted-foreground">Production-ready · 100 units</p>
          </div>
          <DollarSign className="h-12 w-12 text-accent/60" />
        </div>
        <div className="mt-4 space-y-2 text-xs">
          {[["Materials", "$ 2,180"], ["Manufacturing", "$ 1,640"], ["Assembly", "$ 720"], ["Logistics", "$ 280"]].map(([l, v]) => (
            <div key={l} className="flex justify-between">
              <span className="text-muted-foreground">{l}</span>
              <span className="font-semibold">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <h3 className="mb-3 mt-6 text-sm font-semibold">Analytics</h3>
      <div className="glass rounded-3xl p-5">
        <div className="flex h-28 items-end gap-2">
          {[35, 60, 45, 80, 55, 90, 70].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-secondary to-accent" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[9px] text-muted-foreground">
          {["M","T","W","T","F","S","S"].map((d, i) => <span key={i}>{d}</span>)}
        </div>
      </div>

      <h3 className="mb-3 mt-6 text-sm font-semibold">Recent Files</h3>
      <div className="space-y-3">
        {[
          { n: "AetherDrone_v3.2.step", s: "12.4 MB" },
          { n: "BOM_AetherDrone.xlsx", s: "284 KB" },
          { n: "Sim_Report_V2.pdf", s: "4.1 MB" },
        ].map((f) => (
          <div key={f.n} className="glass flex items-center gap-3 rounded-2xl p-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary/30 border-glow"><FileText className="h-4 w-4 text-accent" /></span>
            <div className="flex-1">
              <p className="text-xs font-semibold">{f.n}</p>
              <p className="text-[10px] text-muted-foreground">{f.s}</p>
            </div>
            <button className="rounded-xl bg-gradient-primary p-2 glow-primary"><Download className="h-4 w-4 text-white" /></button>
          </div>
        ))}
      </div>
    </MobileShell>
  );
}