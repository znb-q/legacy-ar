import { createFileRoute, Link } from "@tanstack/react-router";
import { User, Mail, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Register — Legacy AR" }] }),
  component: Register,
});

function Register() {
  return (
    <MobileShell hideNav>
      <div className="flex flex-col items-center pt-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary glow-primary">
          <Sparkles className="h-7 w-7 text-white" />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-gradient">Create Account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Join the future of AR collaboration</p>
      </div>

      <div className="glass mt-8 space-y-4 rounded-3xl p-6">
        <Field icon={User} label="Full Name" placeholder="Ada Lovelace" />
        <Field icon={Mail} label="Email" placeholder="ada@legacy.ar" type="email" />
        <Field icon={Lock} label="Password" placeholder="••••••••" type="password" />
        <Field icon={ShieldCheck} label="Confirm Password" placeholder="••••••••" type="password" />

        <div className="flex gap-1">
          <div className="h-1 flex-1 rounded-full bg-gradient-primary" />
          <div className="h-1 flex-1 rounded-full bg-gradient-primary opacity-70" />
          <div className="h-1 flex-1 rounded-full bg-gradient-primary opacity-40" />
          <div className="h-1 flex-1 rounded-full bg-muted" />
        </div>

        <label className="flex items-start gap-2 text-[11px] text-muted-foreground">
          <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded border border-glow">
            <span className="h-2 w-2 rounded-sm bg-gradient-primary" />
          </span>
          I agree to the <span className="text-accent">Terms</span> & <span className="text-accent">Privacy Policy</span>
        </label>

        <Link to="/home" className="block">
          <button className="w-full rounded-2xl bg-gradient-primary py-3.5 text-sm font-semibold text-white glow-primary active:scale-[0.98]">
            Create Account
          </button>
        </Link>
      </div>

      <p className="mt-5 text-center text-xs text-muted-foreground">
        Already a member? <Link to="/login" className="text-accent">Sign in</Link>
      </p>
    </MobileShell>
  );
}

function Field({ icon: Icon, label, placeholder, type = "text" }: any) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className="flex items-center gap-3 rounded-xl border border-[oklch(0.5_0.1_280/0.3)] bg-[oklch(0.18_0.05_280/0.5)] px-3 py-3 focus-within:border-glow">
        <Icon className="h-4 w-4 text-accent" />
        <input type={type} placeholder={placeholder} className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60" />
      </div>
    </div>
  );
}