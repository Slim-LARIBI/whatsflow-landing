"use client";

export default function DashboardPage() {
  function logout() {
    document.cookie = "wf_session=; path=/; max-age=0";
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen bg-[#070A12] text-[#EAF0FF] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
          <button
            onClick={logout}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-semibold hover:bg-white/10"
          >
            Déconnexion
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm text-white/60">API Status</div>
            <div className="mt-1 text-xl font-extrabold">✅ Connected</div>
            <div className="mt-2 text-xs text-white/50">Step 3: on branchera au vrai endpoint.</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm text-white/60">Inbox</div>
            <div className="mt-1 text-xl font-extrabold">0 conversations</div>
            <div className="mt-2 text-xs text-white/50">Step 2: UI shell inbox.</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm text-white/60">Leads</div>
            <div className="mt-1 text-xl font-extrabold">📩 Ready</div>
            <div className="mt-2 text-xs text-white/50">Landing → /api/leads OK.</div>
          </div>
        </div>
      </div>
    </div>
  );
}