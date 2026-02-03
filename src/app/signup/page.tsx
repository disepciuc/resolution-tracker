"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setError(null);
    setMessage(null);
    if (!email || !confirmEmail || !password || !confirmPassword || !firstName || !lastName) {
      setError("Please fill in all fields.");
      return;
    }
    if (email !== confirmEmail) {
      setError("Emails do not match.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });
    if (signUpError) {
      setError(signUpError.message);
    } else {
      setMessage("Check your email and click the confirmation link to finish.");
      setTimeout(() => router.push("/login"), 1000);
    }
    setLoading(false);
  };

  return (
    <div className="shell auth-shell">
      <div className="mx-auto max-w-lg panel p-8 auth-panel">
        <h1 className="text-3xl font-bold">Create your account</h1>
        <p className="mt-2 text-[var(--muted)]">Set up your tracker in under a minute.</p>

        <div className="mt-6 grid gap-3">
          <label className="text-sm font-semibold text-[var(--muted)]">First name</label>
          <input
            className="input-field w-full rounded-2xl border border-[rgba(138,127,176,0.2)] bg-[var(--card)] px-4 py-3 shadow-[var(--shadow-inset)]"
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="Alex"
          />

          <label className="text-sm font-semibold text-[var(--muted)]">Last name</label>
          <input
            className="input-field w-full rounded-2xl border border-[rgba(138,127,176,0.2)] bg-[var(--card)] px-4 py-3 shadow-[var(--shadow-inset)]"
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Bars"
          />

          <label className="text-sm font-semibold text-[var(--muted)]">Email</label>
          <input
            className="input-field w-full rounded-2xl border border-[rgba(138,127,176,0.2)] bg-[var(--card)] px-4 py-3 shadow-[var(--shadow-inset)]"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />

          <label className="text-sm font-semibold text-[var(--muted)]">Confirm email</label>
          <input
            className="input-field w-full rounded-2xl border border-[rgba(138,127,176,0.2)] bg-[var(--card)] px-4 py-3 shadow-[var(--shadow-inset)]"
            type="email"
            value={confirmEmail}
            onChange={(event) => setConfirmEmail(event.target.value)}
            placeholder="you@example.com"
          />

          <label className="text-sm font-semibold text-[var(--muted)]">Password</label>
          <input
            className="input-field w-full rounded-2xl border border-[rgba(138,127,176,0.2)] bg-[var(--card)] px-4 py-3 shadow-[var(--shadow-inset)]"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
          />

          <label className="text-sm font-semibold text-[var(--muted)]">Confirm password</label>
          <input
            className="input-field w-full rounded-2xl border border-[rgba(138,127,176,0.2)] bg-[var(--card)] px-4 py-3 shadow-[var(--shadow-inset)]"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="••••••••"
          />
        </div>

        {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
        {message && <div className="mt-4 text-sm text-emerald-700">{message}</div>}

        <div className="mt-6 grid gap-3 auth-actions">
          <button className="btn-primary" onClick={signUp} disabled={loading}>
            Create account
          </button>
          <div className="text-sm text-[var(--muted)]">
            Already have an account?{" "}
            <a className="link" href="/login">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
