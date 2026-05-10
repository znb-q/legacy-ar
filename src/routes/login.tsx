import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail, Lock, Eye, Fingerprint, Loader2 } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Legacy AR" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    navigate({ to: "/projects" });
  };

  return (
    <MobileShell hideNav>
      <div className="flex flex-col items-center pt-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary glow-primary">
          <Fingerprint className="h-8 w-8 text-white" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-gradient">Welcome Back</h1>
        <p className="mt-2 text-sm text-muted-foreground">Sign in to continue prototyping</p>
      </div>

      <form onSubmit={handleSubmit} className="glass mt-10 space-y-5 rounded-3xl p-6">
        <Field icon={Mail} label="Email" placeholder="you@legacy.ar" type="email" value={email} onChange={setEmail} />
        <Field icon={Lock} label="Password" placeholder="••••••••" type="password" value={password} onChange={setPassword} trailing={<Eye className="h-4 w-4 text-muted-foreground" />} />
        {error && <p className="text-xs text-destructive">{error}</p>}
        <button type="submit" disabled={loading} className="relative w-full overflow-hidden rounded-2xl bg-gradient-primary py-3.5 text-sm font-semibold text-white glow-primary transition-transform active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        New here? <Link to="/register" className="text-accent">Create account</Link>
      </p>
    </MobileShell>
  );
}

function Field({ icon: Icon, label, placeholder, type, trailing, value, onChange }: any) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className="flex items-center gap-3 rounded-xl border border-[oklch(0.5_0.1_280/0.3)] bg-[oklch(0.18_0.05_280/0.5)] px-3 py-3 focus-within:border-glow">
        <Icon className="h-4 w-4 text-accent" />
        <input type={type} placeholder={placeholder} value={value ?? ""} onChange={(e) => onChange?.(e.target.value)} className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none" />
        {trailing}
      </div>
    </div>
  );
}