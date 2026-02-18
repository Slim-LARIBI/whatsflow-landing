"use client";

import { useState } from "react";

export default function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      website: formData.get("website"),
      useCase: formData.get("useCase"),
    };

    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);
    setSuccess(true);
    form.reset();
  }

 return (
  <div style={{ width: "100%" }}>
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gap: 12,
      }}
    >
      <input name="name" placeholder="Nom complet" required />
      <input name="company" placeholder="Entreprise" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="phone" placeholder="Téléphone" />
      <input name="website" placeholder="Site web (optionnel)" />

      <select name="useCase">
        <option>Vente / Conversion</option>
        <option>Support client</option>
        <option>Multi-agents</option>
        <option>Agence / Multi-clients</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: 8,
          padding: "12px",
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,.12)",
          background:
            "linear-gradient(135deg, rgba(91,140,255,.95), rgba(77,230,200,.85))",
          color: "#061024",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {loading ? "Envoi..." : "🚀 Demander une démo"}
      </button>
    </form>

    {success && (
      <div
        style={{
          marginTop: 16,
          padding: 12,
          borderRadius: 12,
          background: "rgba(77,230,200,.12)",
          border: "1px solid rgba(77,230,200,.25)",
          color: "#BFFFE0",
          fontWeight: 600,
        }}
      >
        ✅ Merci ! On te contacte très vite.
      </div>
    )}

    <style jsx>{`
      input,
      select {
        padding: 12px 14px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(255, 255, 255, 0.05);
        color: #eaf0ff;
        font-size: 14px;
        outline: none;
        transition: all 0.2s ease;
      }

      input::placeholder {
        color: rgba(234, 240, 255, 0.5);
      }

      input:focus,
      select:focus {
        border-color: rgba(91, 140, 255, 0.6);
        box-shadow: 0 0 0 3px rgba(91, 140, 255, 0.2);
      }
    `}</style>
  </div>
);
}