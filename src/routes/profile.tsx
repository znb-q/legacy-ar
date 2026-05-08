import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings, Shield, Moon, Smartphone, LogOut, ChevronRight, Crown, Pencil } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Legacy AR" }] }),
  component: Profile,
});

function Profile() {
  return (
    <MobileShell>
      <ScreenHeader title="Profile" />

      <div className="glass-strong relative overflow-hidden rounded-3xl p-5">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-primary opacity-30 blur-2xl" />
        <div className="relative flex items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-2xl bg-gradient-primary p-[2px] glow-primary">
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-background text-lg font-bold text-gradient">AL</div>
            </div>
            <button className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent">
              <Pencil className="h-3 w-3 text-background" />
            </button>
          </div>
          <div className="flex-1">
            <p className="text-base font-bold">Ada Lovelace</p>
            <p className="text-[11px] text-muted-foreground">ada@legacy.ar</p>
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-gradient-primary px-2 py-0.5 text-[9px] font-bold text-white"><Crown className="h-3 w-3" /> PRO</span>
          </div>
        </div>
        <div className="relative mt-5 grid grid-cols-3 gap-3 text-center">
          {[["24", "Projects"], ["187", "AI Renders"], ["92", "Versions"]].map(([v, l]) => (
            <div key={l}>
              <p className="text-lg font-bold text-gradient">{v}</p>
              <p className="text-[10px] text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <SettingsGroup title="Account">
        <Row icon={Settings} label="Account Settings" />
        <Row icon={Shield} label="Security & 2FA" badge="On" />
      </SettingsGroup>

      <SettingsGroup title="Preferences">
        <Row icon={Moon} label="Theme" right={<ThemePill />} />
        <Row icon={Smartphone} label="Connected Devices" badge="3" />
      </SettingsGroup>

      <Link to="/login" className="glass mt-6 flex w-full items-center justify-center gap-2 rounded-2xl p-4 text-sm font-semibold text-destructive">
        <LogOut className="h-4 w-4" /> Sign out
      </Link>

      <p className="mt-6 text-center text-[10px] text-muted-foreground">Legacy AR · v4.2.0</p>
    </MobileShell>
  );
}

function SettingsGroup({ title, children }: any) {
  return (
    <div className="mt-6">
      <p className="mb-2 px-1 text-[10px] uppercase tracking-widest text-muted-foreground">{title}</p>
      <div className="glass divide-y divide-[oklch(0.4_0.1_280/0.2)] rounded-2xl">{children}</div>
    </div>
  );
}

function Row({ icon: Icon, label, badge, right }: any) {
  return (
    <button className="flex w-full items-center gap-3 px-4 py-3.5 text-left">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary/30 border-glow"><Icon className="h-4 w-4 text-accent" /></span>
      <span className="flex-1 text-sm">{label}</span>
      {badge && <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] text-accent">{badge}</span>}
      {right || <ChevronRight className="h-4 w-4 text-muted-foreground" />}
    </button>
  );
}

function ThemePill() {
  return (
    <div className="glass flex items-center gap-1 rounded-full p-0.5">
      {["Dark", "Neon", "Auto"].map((t, i) => (
        <span key={t} className={`rounded-full px-2 py-0.5 text-[10px] ${i === 1 ? "bg-gradient-primary text-white" : "text-muted-foreground"}`}>{t}</span>
      ))}
    </div>
  );
}