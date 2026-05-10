import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Hexagon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Legacy AR — Collaborative Prototyping" }] }),
  component: Splash,
});

function Splash() {
  const nav = useNavigate();
  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (cancelled) return;
        nav({ to: data.session ? "/home" : "/login" });
      } catch {
        if (!cancelled) nav({ to: "/login" });
      }
    }, 2200);
    return () => { cancelled = true; clearTimeout(t); };
  }, [nav]);
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute -top-20 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[oklch(0.65_0.25_290/0.45)] blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-[oklch(0.7_0.22_220/0.35)] blur-3xl" />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-[oklch(0.7_0.22_295/0.6)]" style={{ width: 160, height: 160 }} />
          <div className="absolute inset-2 animate-spin-slow rounded-full border border-[oklch(0.85_0.18_195/0.4)]" style={{ animationDirection: "reverse", width: 144, height: 144 }} />
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-primary glow-primary animate-float">
            <Hexagon className="h-16 w-16 text-white" strokeWidth={1.5} />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gradient">LEGACY AR</h1>
          <p className="mt-2 text-xs uppercase tracking-[0.4em] text-muted-foreground">Collaborative Platform</p>
        </div>
        <div className="mt-8 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <Link to="/login" className="mt-4 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent">Skip →</Link>
      </div>
    </div>
  );
}
