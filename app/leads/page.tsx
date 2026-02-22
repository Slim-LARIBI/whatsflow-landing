"use client";

import { useEffect, useMemo, useState } from "react";

type Lead = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  website?: string;
  useCase?: string;
  createdAt?: string;
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const total = useMemo(() => leads.length, [leads]);

  async function load() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/leads-api", {
        method: "GET",
        credentials: "include",
        headers: { "Accept": "application/json" },
        cache: "no-store",
      });

      // si pas loggé → redirect login
      if (res.status === 401 || res.status === 403) {
        window.location.href = `/login?next=${encodeURIComponent("/leads")}`;
        return;
      }

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status}${text ? ` - ${text.slice(0, 120)}` : ""}`);
      }

      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError(e?.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Leads</h1>

        <button
          onClick={load}
          disabled={loading}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #ddd",
            background: loading ? "#f5f5f5" : "white",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 600,
          }}
        >
          {loading ? "Loading…" : "Refresh"}
        </button>
      </div>

      {error && (
        <p style={{ color: "red", marginTop: 12 }}>
          Error: {error}
        </p>
      )}

      {!error && (
        <p style={{ marginTop: 12 }}>
          Total: <b>{total}</b>
        </p>
      )}

      {!loading && !error && total === 0 && (
        <p style={{ opacity: 0.8 }}>No leads yet.</p>
      )}

      {!loading && !error && total > 0 && (
        <>
          <div style={{ marginTop: 16, overflowX: "auto", border: "1px solid #eee", borderRadius: 12 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#fafafa" }}>
                  {["Name", "Company", "Email", "Phone", "Website", "Use case", "Created at"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: 12, borderBottom: "1px solid #eee" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((l, idx) => (
                  <tr key={idx}>
                    <td style={{ padding: 12, borderBottom: "1px solid #f2f2f2" }}>{l.name}</td>
                    <td style={{ padding: 12, borderBottom: "1px solid #f2f2f2" }}>{l.company || "-"}</td>
                    <td style={{ padding: 12, borderBottom: "1px solid #f2f2f2" }}>{l.email}</td>
                    <td style={{ padding: 12, borderBottom: "1px solid #f2f2f2" }}>{l.phone || "-"}</td>
                    <td style={{ padding: 12, borderBottom: "1px solid #f2f2f2" }}>
                      {l.website ? (
                        <a href={l.website} target="_blank" rel="noreferrer">
                          {l.website}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td style={{ padding: 12, borderBottom: "1px solid #f2f2f2" }}>{l.useCase || "-"}</td>
                    <td style={{ padding: 12, borderBottom: "1px solid #f2f2f2" }}>{l.createdAt || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* debug JSON */}
          <pre
            style={{
              marginTop: 16,
              background: "#111",
              color: "#0f0",
              padding: 12,
              borderRadius: 12,
              overflow: "auto",
              fontSize: 12,
            }}
          >
            {JSON.stringify(leads, null, 2)}
          </pre>
        </>
      )}
    </main>
  );
}