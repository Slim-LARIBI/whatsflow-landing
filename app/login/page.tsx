"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/dashboard";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Auth TEMP (hardcoded) — on fera mieux à l'étape C
    const ok = email.toLowerCase() === "admin@whatsflow.tech" && pwd === "admin123";

    if (!ok) {
      setLoading(false);
      alert("Identifiants incorrects.");
      return;
    }

    // cookie session
    document.cookie = `wf_session=1; path=/; max-age=${60 * 60 * 24 * 7}`;
    router.push(next);
  }

  return (
    <div className="min-h-screen bg-[#070A12] text-[#EAF0FF] flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,.55)]">
        <h1 className="text-2xl font-extrabold tracking-tight">Connexion</h1>
        <p className="mt-1 text-sm text-white/60">Accès dashboard WhatsFlow (temporaire).</p>

        <form className="mt-6 space-y-3" onSubmit={onSubmit}>
          <input
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-white/25"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-white/25"
            placeholder="Mot de passe"
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />

          <button
            className="w-full rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#4DE6C8] py-3 font-extrabold text-[#061024] hover:opacity-95"
            disabled={loading}
          >
            {loading ? "..." : "Se connecter"}
          </button>

          <div className="text-xs text-white/50">
            Test: <b>admin@whatsflow.tech</b> / <b>admin123</b>
          </div>
        </form>
      </div>
    </div>
  );
}