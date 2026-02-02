"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    setError(null);
    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) {
      setError(signInError.message);
    } else {
      router.push("/");
    }
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (oauthError) {
      setError(oauthError.message);
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    setError(null);
    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (signUpError) {
      setError(signUpError.message);
    } else {
      setError("Check your email to confirm your account, then sign in.");
    }
    setLoading(false);
  };

  return (
    <div className="shell">
      <div className="mx-auto max-w-lg panel p-8">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-[var(--muted)]">Pick up where you left off.</p>

        <div className="mt-6 grid gap-3">
          <label className="text-sm font-semibold text-[var(--muted)]">Email</label>
          <input
            className="w-full rounded-2xl border border-[rgba(138,127,176,0.2)] bg-[var(--card)] px-4 py-3 shadow-[var(--shadow-inset)]"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />

          <label className="text-sm font-semibold text-[var(--muted)]">Password</label>
          <input
            className="w-full rounded-2xl border border-[rgba(138,127,176,0.2)] bg-[var(--card)] px-4 py-3 shadow-[var(--shadow-inset)]"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
          />
        </div>

        {error && <div className="mt-4 text-sm text-red-600">{error}</div>}

        <div className="mt-6 grid gap-3">
          <button className="btn-primary" onClick={signIn} disabled={loading}>
            Sign in
          </button>
          <button className="btn-ghost" onClick={signInWithGoogle} disabled={loading}>
            Continue with Google
          </button>
          <div className="text-sm text-[var(--muted)]">
            Don&apos;t have an account yet?{" "}
            <a className="link" href="/signup">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
