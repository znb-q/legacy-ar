import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { User, Mail, Lock, ShieldCheck, Sparkles, Loader2 } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Register — Legacy AR" }] }),
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogle = async () => {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/projects`,
    });
    if (result.error) setError(result.error.message ?? "Google sign-in failed");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirm) { setError("Passwords do not match"); return; }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: name }, emailRedirectTo: `${window.location.origin}/projects` },
    });
    setLoading(false);
    if (error) { setError(error.message); return; }
    navigate({ to: "/projects" });
  };

  return (
    <MobileShell hideNav>
      <div className="flex flex-col items-center pt-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary glow-primary">
          <Sparkles className="h-7 w-7 text-white" />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-gradient">Create Account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Join the future of AR collaboration</p>
      </div>

      <form onSubmit={handleSubmit} className="glass mt-8 space-y-4 rounded-3xl p-6">
        <Field icon={User} label="Full Name" placeholder="Ada Lovelace" value={name} onChange={setName} />
        <Field icon={Mail} label="Email" placeholder="ada@legacy.ar" type="email" value={email} onChange={setEmail} />
        <Field icon={Lock} label="Password" placeholder="••••••••" type="password" value={password} onChange={setPassword} />
        <Field icon={ShieldCheck} label="Confirm Password" placeholder="••••••••" type="password" value={confirm} onChange={setConfirm} />
        {error && <p className="text-xs text-destructive">{error}</p>}
        <button type="submit" disabled={loading} className="w-full rounded-2xl bg-gradient-primary py-3.5 text-sm font-semibold text-white glow-primary active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Creating…" : "Create Account"}
        </button>

        <div className="flex items-center gap-3 pt-1">
          <div className="h-px flex-1 bg-[oklch(0.5_0.1_280/0.3)]" />
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-[oklch(0.5_0.1_280/0.3)]" />
        </div>

        <button type="button" onClick={handleGoogle} className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[oklch(0.5_0.1_280/0.3)] bg-[oklch(0.18_0.05_280/0.5)] py-3.5 text-sm font-semibold text-foreground hover:bg-[oklch(0.22_0.06_280/0.6)] active:scale-[0.98]">
          <GoogleIcon />
          Continue with Google
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-muted-foreground">
        Already a member? <Link to="/login" className="text-accent">Sign in</Link>
      </p>
    </MobileShell>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.66 4.1-5.5 4.1-3.31 0-6-2.74-6-6.1s2.69-6.1 6-6.1c1.88 0 3.14.8 3.86 1.49l2.63-2.53C16.83 3.4 14.66 2.4 12 2.4 6.92 2.4 2.8 6.52 2.8 11.6S6.92 20.8 12 20.8c6.93 0 9.2-4.85 9.2-7.34 0-.5-.05-.88-.12-1.26H12z"/>
    </svg>
  );
}

function Field({ icon: Icon, label, placeholder, type = "text", value, onChange }: any) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className="flex items-center gap-3 rounded-xl border border-[oklch(0.5_0.1_280/0.3)] bg-[oklch(0.18_0.05_280/0.5)] px-3 py-3 focus-within:border-glow">
        <Icon className="h-4 w-4 text-accent" />
        <input type={type} placeholder={placeholder} value={value ?? ""} onChange={(e) => onChange?.(e.target.value)} className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60" />
      </div>
    </div>
  );
}