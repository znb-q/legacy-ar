import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Search, Plus, Box, Cpu, Layers, Activity, ArrowUpRight, Zap, Sparkles, FlaskConical } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Dashboard — Legacy AR" }] }),
  component: Home,
});

function Home() {
  return (
    <MobileShell>
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-11 w-11 rounded-2xl bg-gradient-primary p-[2px] glow-primary">
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-background text-sm font-bold text-gradient">AL</div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-accent ring-2 ring-background" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Welcome back</p>
            <p className="text-sm font-semibold">Ada Lovelace</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="glass flex h-10 w-10 items-center justify-center rounded-xl"><Search className="h-4 w-4" /></button>
          <Link to="/notifications" className="glass relative flex h-10 w-10 items-center justify-center rounded-xl">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent glow-cyan" />
          </Link>
        </div>
      </header>

      <div className="glass-strong mt-6 overflow-hidden rounded-3xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-accent">AI Pulse</p>
            <h2 className="mt-1 text-xl font-bold">Prototype faster<br />with AR + AI</h2>
          </div>
          <Sparkles className="h-10 w-10 text-accent animate-float" />
        </div>
        <Link to="/ai-engine" className="mt-4 inline-flex items-center gap-1 rounded-full bg-white/10 px-4 py-1.5 text-xs">
          Generate Variants <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Stat icon={Box} label="Active Projects" value="24" delta="+3" />
        <Stat icon={Cpu} label="AI Renders" value="187" delta="+22" />
        <Stat icon={Layers} label="Versions" value="92" delta="+8" />
        <Stat icon={Activity} label="Simulations" value="13" delta="Live" />
      </div>

      <SectionTitle title="Quick Actions" />
      <div className="grid grid-cols-4 gap-3">
        {[
          { i: Plus, l: "New", to: "/projects" },
          { i: Box, l: "AR View", to: "/ar" },
          { i: FlaskConical, l: "Simulate", to: "/simulations" },
          { i: Zap, l: "Export", to: "/export" },
        ].map(({ i: Icon, l, to }) => (
          <Link key={l} to={to} className="glass flex flex-col items-center gap-1.5 rounded-2xl p-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary glow-primary">
              <Icon className="h-4 w-4 text-white" />
            </span>
            <span className="text-[10px] text-muted-foreground">{l}</span>
          </Link>
        ))}
      </div>

      <SectionTitle title="Recent Projects" link="/projects" />
      <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2">
        {[
          { n: "Aether Drone X1", t: "Aerospace", p: 78 },
          { n: "Helix Wearable", t: "Medical", p: 42 },
          { n: "Nova EV Chassis", t: "Automotive", p: 91 },
        ].map((p) => (
          <Link to="/collab" key={p.n} className="glass min-w-[200px] rounded-2xl p-4">
            <div className="mb-3 flex h-24 items-center justify-center rounded-xl bg-gradient-primary/20 border-glow">
              <Box className="h-10 w-10 text-accent" />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.t}</p>
            <p className="mt-0.5 text-sm font-semibold">{p.n}</p>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-gradient-primary" style={{ width: `${p.p}%` }} />
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">{p.p}% complete</p>
          </Link>
        ))}
      </div>

      <SectionTitle title="Activity" />
      <div className="glass space-y-3 rounded-2xl p-4">
        {[
          { u: "Ravi", a: "approved variant V3 on Aether Drone", t: "2m" },
          { u: "Mei", a: "added annotation on chassis weld", t: "18m" },
          { u: "AI", a: "generated 4 design variants", t: "1h" },
        ].map((x, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-primary p-[1.5px]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-background text-[10px] font-bold">{x.u[0]}</div>
            </div>
            <div className="flex-1">
              <p className="text-xs"><span className="font-semibold">{x.u}</span> <span className="text-muted-foreground">{x.a}</span></p>
            </div>
            <span className="text-[10px] text-muted-foreground">{x.t}</span>
          </div>
        ))}
      </div>
    </MobileShell>
  );
}

function Stat({ icon: Icon, label, value, delta }: any) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary/30 border-glow">
          <Icon className="h-4 w-4 text-accent" />
        </span>
        <span className="text-[10px] text-accent">{delta}</span>
      </div>
      <p className="mt-3 text-2xl font-bold">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}

function SectionTitle({ title, link }: { title: string; link?: string }) {
  return (
    <div className="mb-3 mt-6 flex items-center justify-between">
      <h3 className="text-sm font-semibold">{title}</h3>
      {link && <Link to={link} className="text-[11px] text-accent">See all →</Link>}
    </div>
  );
}