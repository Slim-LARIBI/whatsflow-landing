"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const nextUrl = useMemo(
    () => searchParams.get("next") || "/dashboard",
    [searchParams]
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.error || "Login failed");
        return;
      }

      router.push(nextUrl);
    } catch {
      setError("Network error");
    }
  }

  return (
    <div className="min-h-screen bg-[#070A12] text-[#EAF0FF] flex items-center justify-center p-6">
      <div className="w-full max-w-md border border-white/10 bg-white/5 rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
        <p className="text-white/70 mb-6">
          Enter your admin credentials to access dashboard.
        </p>

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin Email"
            className="w-full rounded-xl px-4 py-3 bg-black/30 border border-white/10 outline-none"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl px-4 py-3 bg-black/30 border border-white/10 outline-none"
            required
          />

          {error ? (
            <div className="text-red-300 text-sm">{error}</div>
          ) : null}

          <button className="w-full rounded-xl px-4 py-3 font-bold bg-white text-black">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}