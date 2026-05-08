import { Link, useLocation } from "@tanstack/react-router";
import { Home, Users, Box, Bell, User } from "lucide-react";
import type { ReactNode } from "react";

export function MobileShell({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) {
  return (
    <div className="relative mx-auto min-h-screen w-full max-w-md overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute -top-32 -left-20 h-72 w-72 rounded-full bg-[oklch(0.6_0.25_300/0.35)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-[oklch(0.65_0.22_240/0.3)] blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-[oklch(0.85_0.18_195/0.2)] blur-3xl" />
      <div className={`relative z-10 ${hideNav ? "pb-6" : "pb-28"} pt-6 px-5`}>{children}</div>
      {!hideNav && <BottomNav />}
    </div>
  );
}

function BottomNav() {
  const loc = useLocation();
  const items = [
    { to: "/home", icon: Home, label: "Home" },
    { to: "/collab", icon: Users, label: "Collab" },
    { to: "/ar", icon: Box, label: "AR" },
    { to: "/notifications", icon: Bell, label: "Alerts" },
    { to: "/profile", icon: User, label: "Profile" },
  ];
  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2">
      <div className="glass-strong flex items-center justify-around rounded-3xl px-2 py-2">
        {items.map(({ to, icon: Icon, label }) => {
          const active = loc.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`relative flex flex-1 flex-col items-center gap-0.5 rounded-2xl px-2 py-2 text-[10px] transition-all ${
                active ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {active && <span className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-30 blur-md" />}
              <Icon className={`relative h-5 w-5 ${active ? "text-accent" : ""}`} strokeWidth={active ? 2.4 : 1.8} />
              <span className="relative font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function ScreenHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <header className="mb-5 flex items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gradient">{title}</h1>
        {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {right}
    </header>
  );
}