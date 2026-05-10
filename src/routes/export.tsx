import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, DollarSign, FileBox, FileSpreadsheet, FileCode, Loader2, Check } from "lucide-react";
import { useState } from "react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/export")({
  head: () => ({ meta: [{ title: "Export & Reports — Legacy AR" }] }),
  component: Export,
});

function Export() {
  const [format, setFormat] = useState("STEP / CAD");
  const [busy, setBusy] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  const triggerDownload = (filename: string, content: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleExport = async (name: string) => {
    setBusy(name); setDone(null);
    await new Promise((r) => setTimeout(r, 900));
    if (name.endsWith(".xlsx") || name.endsWith(".csv")) {
      triggerDownload(name.replace(/\.xlsx$/, ".csv"), "Part,Qty,Cost\nFrame,1,$280\nRotor,4,$120\nSensor,6,$45\n", "text/csv");
    } else if (name.endsWith(".step") || name.endsWith(".json")) {
      triggerDownload(name, JSON.stringify({ project: "Aether Drone X1", format, generatedAt: new Date().toISOString() }, null, 2), "application/json");
    } else {
      triggerDownload(name + ".txt", `Legacy AR export\nFormat: ${format}\n${new Date().toISOString()}\n`, "text/plain");
    }
    setBusy(null); setDone(name);
    setTimeout(() => setDone(null), 1800);
  };

  return (
    <MobileShell>
      <ScreenHeader title="Export & Reports" subtitle="Choose format and download" />

      <h3 className="mb-3 text-sm font-semibold">Format</h3>
      <div className="grid grid-cols-3 gap-3">
        {[
          { i: FileBox, l: "STEP / CAD" },
          { i: FileSpreadsheet, l: "BOM" },
          { i: FileCode, l: "JSON" },
        ].map(({ i: Icon, l }) => {
          const a = format === l;
          return (
          <button onClick={() => setFormat(l)} key={l} className={`glass flex flex-col items-center gap-2 rounded-2xl p-4 transition ${a ? "border-glow" : ""}`}>
            <Icon className={`h-6 w-6 ${a ? "text-accent" : "text-muted-foreground"}`} />
            <span className="text-[11px]">{l}</span>
          </button>
          );
        })}
      </div>

      <button
        onClick={() => handleExport(`AetherDrone.${format === "BOM" ? "csv" : format === "JSON" ? "json" : "step"}`)}
        disabled={!!busy}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-3.5 text-sm font-semibold text-white glow-primary disabled:opacity-70"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {busy ? "Generating…" : `Export as ${format}`}
      </button>
      {done && <p className="mt-2 text-center text-[11px] text-accent flex items-center justify-center gap-1"><Check className="h-3 w-3" /> Downloaded {done}</p>}

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
            <button onClick={() => handleExport(f.n)} disabled={busy === f.n} className="rounded-xl bg-gradient-primary p-2 glow-primary disabled:opacity-60">
              {busy === f.n ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : <Download className="h-4 w-4 text-white" />}
            </button>
          </div>
        ))}
      </div>
    </MobileShell>
  );
}