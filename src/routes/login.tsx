import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Lock, Eye, Fingerprint, Github, Chrome, Apple } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Legacy AR" }] }),
  component: Login,
});

function Login() {
  return (
    <MobileShell hideNav>
      <div className="flex flex-col items-center pt-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary glow-primary">
          <Fingerprint className="h-8 w-8 text-white" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-gradient">Welcome Back</h1>
        <p className="mt-2 text-sm text-muted-foreground">Sign in to continue prototyping</p>
      </div>

      <div className="glass mt-10 space-y-5 rounded-3xl p-6">
        <Field icon={Mail} label="Email" placeholder="you@legacy.ar" type="email" />
        <Field icon={Lock} label="Password" placeholder="••••••••" type="password" trailing={<Eye className="h-4 w-4 text-muted-foreground" />} />
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-muted-foreground">
            <span className="relative inline-flex h-4 w-4 items-center justify-center rounded border border-glow">
              <span className="h-2 w-2 rounded-sm bg-gradient-primary" />
            </span>
            Remember me
          </label>
          <a className="text-accent hover:underline">Forgot password?</a>
        </div>
        <Link to="/home" className="block">
          <button className="relative w-full overflow-hidden rounded-2xl bg-gradient-primary py-3.5 text-sm font-semibold text-white glow-primary transition-transform active:scale-[0.98]">
            Sign In
          </button>
        </Link>

        <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> or continue with <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[Chrome, Apple, Github].map((I, i) => (
            <button key={i} className="glass flex h-12 items-center justify-center rounded-xl hover:border-glow">
              <I className="h-5 w-5 text-accent" />
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        New here? <Link to="/register" className="text-accent">Create account</Link>
      </p>
    </MobileShell>
  );
}

function Field({ icon: Icon, label, placeholder, type, trailing }: any) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className="flex items-center gap-3 rounded-xl border border-[oklch(0.5_0.1_280/0.3)] bg-[oklch(0.18_0.05_280/0.5)] px-3 py-3 focus-within:border-glow">
        <Icon className="h-4 w-4 text-accent" />
        <input type={type} placeholder={placeholder} className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none" />
        {trailing}
      </div>
    </div>
  );
}