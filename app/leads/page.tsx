export const dynamic = "force-dynamic";

async function getLeads() {
  // appel interne côté serveur -> garde les cookies automatiquement
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/leads`, {
    cache: "no-store",
  });

  // si jamais middleware bloque, on affichera vide
  if (!res.ok) return [];
  return res.json();
}

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="min-h-screen bg-[#070A12] text-[#EAF0FF] p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Leads</h1>
            <p className="text-white/60 text-sm">
              Liste des demandes envoyées depuis le formulaire.
            </p>
          </div>

          <a
            href="/auth/logout"
            className="px-4 py-2 rounded-xl bg-white text-black font-bold"
          >
            Logout
          </a>
        </div>

        <div className="border border-white/10 bg-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-white/70">
                <tr>
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Nom</th>
                  <th className="text-left p-3">Société</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Téléphone</th>
                  <th className="text-left p-3">Use case</th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(leads) ? leads : []).map((l: any, idx: number) => (
                  <tr key={idx} className="border-t border-white/10">
                    <td className="p-3 text-white/70">
                      {l?.createdAt ? new Date(l.createdAt).toLocaleString() : "-"}
                    </td>
                    <td className="p-3">{l?.name || "-"}</td>
                    <td className="p-3">{l?.company || "-"}</td>
                    <td className="p-3">{l?.email || "-"}</td>
                    <td className="p-3">{l?.phone || "-"}</td>
                    <td className="p-3">{l?.useCase || "-"}</td>
                  </tr>
                ))}

                {(!leads || leads.length === 0) && (
                  <tr>
                    <td className="p-6 text-white/60" colSpan={6}>
                      Aucun lead pour le moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-white/50 mt-4">
          Accès protégé par cookie admin (wf_session).
        </p>
      </div>
    </div>
  );
}