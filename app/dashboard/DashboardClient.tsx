"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Lead = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  website?: string;
  useCase?: string;
  createdAt?: string;
};

export default function DashboardClient() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads", { credentials: "include" });
      if (res.status === 401) {
        router.replace("/login?next=/dashboard");
        return;
      }
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch {
      setError("Erreur chargement leads");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return leads;
    return leads.filter((l) =>
      [
        l.name,
        l.company,
        l.email,
        l.phone,
        l.website,
        l.useCase,
        l.createdAt,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(s)
    );
  }, [leads, q]);

  async function logout() {
    await fetch("/auth/logout", { method: "GET", credentials: "include" });
    router.replace("/login");
  }

  return (
    <div className="min-h-screen bg-[#070A12] text-[#EAF0FF] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Leads</h1>
            <p className="text-white/60 text-sm">
              Total: <span className="text-white">{filtered.length}</span>
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={load}
              className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15"
            >
              Refresh
            </button>
            <button
              onClick={logout}
              className="rounded-xl px-4 py-2 bg-white text-black font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mb-4">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher (nom, email, company, useCase...)"
            className="w-full rounded-xl px-4 py-3 bg-black/30 border border-white/10 outline-none"
          />
        </div>

        {loading ? (
          <div className="text-white/70">Chargement...</div>
        ) : error ? (
          <div className="text-red-300">{error}</div>
        ) : (
          <div className="overflow-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-white/80">
                <tr>
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Nom</th>
                  <th className="text-left p-3">Company</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Phone</th>
                  <th className="text-left p-3">Use case</th>
                  <th className="text-left p-3">Website</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l, i) => (
                  <tr key={i} className="border-t border-white/10">
                    <td className="p-3 text-white/70">
                      {l.createdAt ? new Date(l.createdAt).toLocaleString() : "-"}
                    </td>
                    <td className="p-3 font-medium">{l.name}</td>
                    <td className="p-3 text-white/80">{l.company || "-"}</td>
                    <td className="p-3">
                      <a className="underline" href={`mailto:${l.email}`}>
                        {l.email}
                      </a>
                    </td>
                    <td className="p-3 text-white/80">{l.phone || "-"}</td>
                    <td className="p-3 text-white/80">{l.useCase || "-"}</td>
                    <td className="p-3">
                      {l.website ? (
                        <a className="underline" href={l.website} target="_blank" rel="noreferrer">
                          {l.website}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 ? (
                  <tr>
                    <td className="p-4 text-white/60" colSpan={7}>
                      Aucun lead
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}