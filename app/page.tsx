import LeadForm from "./components/LeadForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070A12] text-[#EAF0FF] overflow-x-hidden">
      <style>{`
        :root{
          --bg:#070A12;
          --panel:#0C1022;
          --panel2:#0B1430;
          --text:#EAF0FF;
          --muted:rgba(234,240,255,.72);
          --line:rgba(234,240,255,.12);
          --brand:#5B8CFF;
          --brand2:#4DE6C8;
          --ok:#3EE67B;
          --shadow: 0 20px 80px rgba(0,0,0,.55);
          --radius:24px;
          --radius2:18px;
          --max:1120px;
        }
        body{
          background:
            radial-gradient(900px 450px at 15% 15%, rgba(91,140,255,.22), transparent 60%),
            radial-gradient(900px 450px at 85% 10%, rgba(77,230,200,.18), transparent 55%),
            radial-gradient(900px 520px at 50% 90%, rgba(91,140,255,.12), transparent 60%),
            linear-gradient(180deg, #050711, #070A12 50%, #060813);
        }
        a{color:inherit;text-decoration:none}
        .container{max-width:var(--max);margin:0 auto;padding:24px}
        .nav{
          display:flex;align-items:center;justify-content:space-between;
          padding:14px 18px;border:1px solid var(--line);
          background:rgba(12,16,34,.55);
          backdrop-filter: blur(12px);
          border-radius:999px;
          box-shadow: 0 10px 40px rgba(0,0,0,.35);
          position:sticky;top:16px;z-index:50;
        }
        .brand{display:flex;align-items:center;gap:10px;font-weight:800;letter-spacing:.2px;}
        .logo{
          width:34px;height:34px;border-radius:10px;
          background: linear-gradient(135deg, var(--brand), var(--brand2));
          box-shadow: 0 12px 30px rgba(91,140,255,.25);
          position:relative;
        }
        .logo:after{
          content:""; position:absolute; inset:9px;
          border-radius:7px; background:rgba(7,10,18,.55);
          border:1px solid rgba(255,255,255,.14);
        }
        .navlinks{display:flex;gap:18px;align-items:center;color:var(--muted);font-weight:600;font-size:14px}
        .navlinks a{padding:10px 10px;border-radius:10px}
        .navlinks a:hover{background:rgba(255,255,255,.06);color:var(--text)}
        .cta{display:flex;gap:10px;align-items:center}
        .btn{
          display:inline-flex;align-items:center;justify-content:center;gap:10px;
          padding:11px 14px;border-radius:14px;border:1px solid var(--line);
          background:rgba(255,255,255,.05);
          color:var(--text); font-weight:750; font-size:14px;
          transition: transform .15s ease, background .15s ease, border-color .15s ease;
          cursor:pointer;
        }
        .btn:hover{transform: translateY(-1px); background:rgba(255,255,255,.07); border-color: rgba(255,255,255,.18)}
        .btn.primary{
          background: linear-gradient(135deg, rgba(91,140,255,.95), rgba(77,230,200,.85));
          border:1px solid rgba(255,255,255,.12);
          color:#061024;
          box-shadow: 0 18px 60px rgba(91,140,255,.22);
        }
        .btn.primary:hover{transform: translateY(-2px)}
        .hero{
          display:grid;grid-template-columns: 1.1fr .9fr; gap:22px;
          align-items:center; padding:54px 0 10px;
        }
        .kicker{
          display:inline-flex;gap:10px;align-items:center;
          padding:8px 12px;border-radius:999px;border:1px solid var(--line);
          background: rgba(255,255,255,.04);
          color:var(--muted); font-weight:700; font-size:13px;
        }
        .dot{width:8px;height:8px;border-radius:99px;background:var(--ok);box-shadow:0 0 0 6px rgba(62,230,123,.12)}
        h1{
          margin:16px 0 12px;
          font-size: clamp(34px, 4.3vw, 54px);
          line-height:1.04;
          letter-spacing:-.8px;
        }
        .sub{color:var(--muted); font-size:16px; line-height:1.55; max-width:58ch;}
        .heroActions{display:flex;gap:12px;flex-wrap:wrap;margin-top:22px}
        .mini{margin-top:14px;display:flex; gap:10px; flex-wrap:wrap; color:var(--muted); font-size:13px;}
        .pill{
          display:inline-flex;align-items:center;gap:8px;
          padding:8px 10px;border-radius:999px;
          background:rgba(255,255,255,.04); border:1px solid var(--line);
        }
        .gridCard{
          border:1px solid var(--line);
          background: linear-gradient(180deg, rgba(12,16,34,.65), rgba(11,20,48,.45));
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          overflow:hidden;
          position:relative;
        }
        .gridCard:before{
          content:""; position:absolute; inset:-1px;
          background: radial-gradient(500px 220px at 30% 0%, rgba(91,140,255,.22), transparent 60%),
                    radial-gradient(500px 240px at 80% 10%, rgba(77,230,200,.18), transparent 60%);
          pointer-events:none;
        }
        .mock{position:relative;padding:18px;}
        .mockTop{
          display:flex;align-items:center;justify-content:space-between;
          gap:12px; padding:14px;
          border-radius:18px;
          background:rgba(255,255,255,.05);
          border:1px solid rgba(255,255,255,.10);
        }
        .mockTitle{display:flex;flex-direction:column;gap:4px}
        .mockTitle b{font-size:14px}
        .mockTitle span{font-size:12px;color:var(--muted)}
        .status{
          display:inline-flex;align-items:center;gap:8px;
          padding:8px 10px;border-radius:999px;
          background: rgba(62,230,123,.10);
          border:1px solid rgba(62,230,123,.25);
          color:#BFFFE0; font-weight:800; font-size:12px;
        }
        .mockBody{margin-top:14px;display:grid; grid-template-columns: .9fr 1.1fr; gap:12px;}
        .col{
          border:1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.04);
          border-radius:18px;
          padding:12px;
          min-height:320px;
        }
        .row{
          display:flex;align-items:center;justify-content:space-between;
          gap:10px; padding:10px 10px;
          border-radius:14px;
          background: rgba(0,0,0,.18);
          border:1px solid rgba(255,255,255,.08);
          margin-bottom:10px;
        }
        .avatar{
          width:34px;height:34px;border-radius:12px;
          background: linear-gradient(135deg, rgba(91,140,255,.8), rgba(255,255,255,.08));
          border:1px solid rgba(255,255,255,.12);
        }
        .meta{display:flex;align-items:center;gap:10px}
        .meta b{font-size:13px}
        .meta span{font-size:12px;color:var(--muted)}
        .tag{
          font-size:11px;font-weight:900;letter-spacing:.2px;
          padding:7px 9px;border-radius:999px;
          background: rgba(91,140,255,.12);
          border:1px solid rgba(91,140,255,.25);
          color:#CFE0FF;
        }
        .chat{display:flex;flex-direction:column;gap:10px;}
        .bubble{
          max-width:86%;
          padding:10px 12px;border-radius:16px;
          border:1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.04);
          font-size:13px; line-height:1.35;
        }
        .bubble.me{align-self:flex-end;background: rgba(77,230,200,.12);border-color: rgba(77,230,200,.22);}
        .input{
          margin-top:auto;
          display:flex;gap:10px;
          padding:10px;border-radius:16px;
          border:1px solid rgba(255,255,255,.10);
          background: rgba(0,0,0,.18);
        }
        .input span{
          flex:1; color:rgba(234,240,255,.55);
          font-size:13px; padding:9px 10px;
          border-radius:12px; border:1px dashed rgba(255,255,255,.14);
        }
        .send{
          width:44px;height:40px;border-radius:14px;
          background: linear-gradient(135deg, var(--brand), var(--brand2));
          border:1px solid rgba(255,255,255,.14);
          box-shadow: 0 14px 40px rgba(91,140,255,.18);
        }

        .section{padding:54px 0}
        .section h2{margin:0 0 10px;font-size: clamp(22px, 2.4vw, 30px);letter-spacing:-.3px;}
        .section p{margin:0;color:var(--muted);line-height:1.6}

        .features{margin-top:18px;display:grid; grid-template-columns: repeat(3, 1fr);gap:14px;}
        .card{
          padding:16px;border-radius: var(--radius2);
          border:1px solid var(--line);
          background: rgba(255,255,255,.04);
          box-shadow: 0 10px 40px rgba(0,0,0,.25);
        }
        .ico{
          width:38px;height:38px;border-radius:14px;
          background: rgba(91,140,255,.14);
          border:1px solid rgba(91,140,255,.25);
          display:grid;place-items:center;margin-bottom:12px;
        }
        .card b{display:block;margin-bottom:6px}
        .card span{color:var(--muted);font-size:14px;line-height:1.5}

        .how{margin-top:18px;display:grid; grid-template-columns: 1fr 1fr;gap:14px;}
        .step{
          padding:16px;border-radius: var(--radius2);
          border:1px solid var(--line);
          background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.03));
        }
        .num{
          width:34px;height:34px;border-radius:14px;
          background: rgba(77,230,200,.12);
          border:1px solid rgba(77,230,200,.25);
          display:grid;place-items:center;
          font-weight:900;margin-bottom:10px;
        }

        .ctaBox{
          padding:20px;border-radius: var(--radius);
          border:1px solid rgba(255,255,255,.12);
          background: radial-gradient(600px 240px at 20% 0%, rgba(91,140,255,.22), transparent 60%),
                    radial-gradient(600px 240px at 90% 20%, rgba(77,230,200,.18), transparent 60%),
                    rgba(255,255,255,.03);
          box-shadow: var(--shadow);
          display:flex; align-items:center; justify-content:space-between;
          gap:14px; flex-wrap:wrap;
        }
        .footer{
          padding:26px 0 50px;color:rgba(234,240,255,.55);font-size:13px;
          display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap;
          border-top:1px solid rgba(255,255,255,.10);
          margin-top:30px;
        }
        .smalllinks{display:flex;gap:14px;flex-wrap:wrap}
        .smalllinks a:hover{color:var(--text)}

        /* Lead form styles */
        .leadForm{
          display:flex;
          flex-direction:column;
          gap:10px;
          min-width:min(520px, 100%);
        }
        .leadGrid{
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap:10px;
        }
        .leadInput{
          width:100%;
          padding:12px 12px;
          border-radius:14px;
          border:1px solid rgba(255,255,255,.12);
          background: rgba(0,0,0,.18);
          color: var(--text);
          outline: none;
          font-weight:650;
        }
        .leadInput::placeholder{color: rgba(234,240,255,.45)}
        .leadHint{
          margin-top:8px;
          color: rgba(234,240,255,.62);
          font-size: 13px;
          line-height: 1.5;
        }

        @media (max-width: 980px){
          .hero{grid-template-columns:1fr; padding-top:34px}
          .mockBody{grid-template-columns:1fr}
          .features{grid-template-columns:1fr}
          .how{grid-template-columns:1fr}
          .navlinks{display:none}
          .leadGrid{grid-template-columns:1fr}
          .leadForm{min-width: 100%}
        }
      `}</style>

      <div className="container">
        <header className="nav">
          <div className="brand">
            <div className="logo" aria-hidden="true" />
            <div>WhatsFlow</div>
          </div>

          <nav className="navlinks">
            <a href="#features">Fonctionnalités</a>
            <a href="#how">Comment ça marche</a>
            <a href="#roadmap">Roadmap</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="cta">
            <a className="btn" href="#contact">Demander une démo</a>
            <a className="btn primary" href="#contact">Rejoindre la bêta</a>
          </div>
        </header>

        <section className="hero">
          <div>
            <div className="kicker">
              <span className="dot" /> MVP en cours • API & infra prêtes • Prochaine étape : onboarding client
            </div>
            <h1>
              Votre Inbox WhatsApp pro
              <br />
              pour vendre, répondre et gérer une équipe.
            </h1>
            <p className="sub">
              WhatsFlow centralise les messages WhatsApp, assigne des conversations, accélère les réponses et prépare un vrai{" "}
              <b>SaaS multi-clients</b> (WordPress d’abord, puis PrestaShop).
            </p>

            <div className="heroActions">
              <a className="btn primary" href="#contact">
                ✅ Je veux tester la bêta
              </a>
              <a className="btn" href="#how">
                Voir le flow client → agent
              </a>
            </div>

            <div className="mini">
              <span className="pill">⚡ Réponse rapide</span>
              <span className="pill">👥 Multi-agents</span>
              <span className="pill">🧩 Plugin WordPress</span>
              <span className="pill">🔐 Sécurisé</span>
            </div>
          </div>

          <div className="gridCard">
            <div className="mock">
              <div className="mockTop">
                <div className="mockTitle">
                  <b>Inbox — Support & Ventes</b>
                  <span>Messages entrants • assignation • historique</span>
                </div>
                <div className="status">● Online</div>
              </div>

              <div className="mockBody">
                <div className="col">
                  <div className="row">
                    <div className="meta">
                      <div className="avatar" />
                      <div>
                        <b>Client: Amine</b>
                        <br />
                        <span>“Bonjour, dispo ?”</span>
                      </div>
                    </div>
                    <div className="tag">Nouveau</div>
                  </div>

                  <div className="row">
                    <div className="meta">
                      <div className="avatar" />
                      <div>
                        <b>Client: Sarah</b>
                        <br />
                        <span>“Prix & livraison ?”</span>
                      </div>
                    </div>
                    <div className="tag">Vente</div>
                  </div>

                  <div className="row" style={{ opacity: 0.78 }}>
                    <div className="meta">
                      <div className="avatar" />
                      <div>
                        <b>Client: Mehdi</b>
                        <br />
                        <span>“Commande #218 ?”</span>
                      </div>
                    </div>
                    <div
                      className="tag"
                      style={{
                        background: "rgba(255,176,32,.10)",
                        borderColor: "rgba(255,176,32,.25)",
                        color: "#FFE1A8",
                      }}
                    >
                      Support
                    </div>
                  </div>
                </div>

                <div className="col chat">
                  <div className="bubble">Bonjour 👋 je voudrais un conseil pour choisir le bon produit.</div>
                  <div className="bubble me">Hello ! Bien sûr 😊 Tu cherches plutôt performance ou confort ?</div>
                  <div className="bubble">Plutôt confort + budget raisonnable.</div>
                  <div className="bubble me">Parfait. Je te propose 2 options + une promo du moment ✅</div>
                  <div className="input">
                    <span>Écrire une réponse…</span>
                    <div className="send" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROOF / LOGOS */}
        <section className="section" id="proof">
          <h2>Adopté par les équipes support & vente</h2>
          <p>Pensé pour e-commerce, SAV, agences, retail — dès le MVP.</p>

          <div className="features">
            <div className="card">
              <div className="ico">🏪</div>
              <b>E-commerce</b>
              <span>Réponses rapides, questions produit, suivi commande, relances.</span>
            </div>
            <div className="card">
              <div className="ico">🎧</div>
              <b>Support / SAV</b>
              <span>Assignation, tags, historique, qualité de service.</span>
            </div>
            <div className="card">
              <div className="ico">🧠</div>
              <b>Agences</b>
              <span>Multi-clients, multi-sites, une seule inbox centralisée.</span>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="section" id="pricing">
          <h2>Tarifs simples (beta)</h2>
          <p>Tu peux ajuster après. L’objectif : “vendable SaaS”.</p>

          <div className="features">
            <div className="card">
              <div className="ico">🚀</div>
              <b>Starter</b>
              <span>1 numéro • 1 agent • Inbox + tags • Widget WordPress</span>
              <div style={{ marginTop: 12, color: "rgba(234,240,255,.72)" }}>≈ 19€/mois</div>
            </div>

            <div className="card" style={{ borderColor: "rgba(77,230,200,.35)" }}>
              <div className="ico">⭐</div>
              <b>Pro</b>
              <span>1 numéro • 3 agents • Assignation • Templates • Stats</span>
              <div style={{ marginTop: 12, color: "rgba(234,240,255,.72)" }}>≈ 49€/mois</div>
            </div>

            <div className="card">
              <div className="ico">👥</div>
              <b>Team</b>
              <span>Multi-agents • Multi-sites • Rôles • SLA • API access</span>
              <div style={{ marginTop: 12, color: "rgba(234,240,255,.72)" }}>≈ 99€/mois</div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq">
          <h2>FAQ</h2>
          <p>Les questions que tes futurs clients vont te poser.</p>

          <div className="how">
            <div className="step">
              <div className="num">?</div>
              <b>Le client parle sur WhatsApp, moi je réponds où ?</b>
              <p>Dans WhatsFlow (inbox web). Le client reçoit la réponse sur son WhatsApp.</p>
            </div>
            <div className="step">
              <div className="num">?</div>
              <b>Est-ce que ça marche avec WordPress ?</b>
              <p>Oui. On met un widget + configuration webhook. Ensuite, ça devient plug & play.</p>
            </div>
            <div className="step">
              <div className="num">?</div>
              <b>Et PrestaShop / Shopify ?</b>
              <p>Roadmap : connecteurs dédiés. Même logique : widget + config + mapping client.</p>
            </div>
            <div className="step">
              <div className="num">?</div>
              <b>Est-ce que WhatsApp est payant ?</b>
              <p>Oui, WhatsApp Cloud API facture par conversation (selon pays/catégorie). Toi tu factures le SaaS.</p>
            </div>
          </div>
        </section>

        <section className="section" id="features">
          <h2>Ce que WhatsFlow apporte (vraiment)</h2>
          <p>Une expérience “support & sales” moderne, pensée pour équipes et e-commerce.</p>

          <div className="features">
            <div className="card">
              <div className="ico">⚡</div>
              <b>Inbox centralisée</b>
              <span>Plus de WhatsApp perso. Tout arrive au même endroit, avec historique et contexte.</span>
            </div>
            <div className="card">
              <div className="ico">👥</div>
              <b>Multi-agents</b>
              <span>Assignation, statut, suivi. Chaque agent sait quoi traiter et quand.</span>
            </div>
            <div className="card">
              <div className="ico">🧩</div>
              <b>Plugin WordPress</b>
              <span>Un widget WhatsApp sur ton site. Un clic client → message → inbox.</span>
            </div>
          </div>
        </section>

        <section className="section" id="how">
          <h2>Comment ça marche (flow simple)</h2>
          <p>Client parle sur WhatsApp → toi tu réponds dans l’interface.</p>

          <div className="how">
            <div className="step">
              <div className="num">1</div>
              <b>Le client clique sur le bouton WhatsApp</b>
              <p>Sur ton site WordPress, le bouton ouvre WhatsApp (message pré-rempli optionnel).</p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <b>Le message arrive via WhatsApp Cloud API</b>
              <p>WhatsApp envoie un webhook vers ton serveur (API WhatsFlow).</p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <b>Tu vois la conversation dans la plateforme</b>
              <p>Inbox + assignation + tags. Tu réponds depuis l’interface.</p>
            </div>
            <div className="step">
              <div className="num">4</div>
              <b>Le client reçoit la réponse sur son WhatsApp</b>
              <p>Ta réponse repart via l’API, et le client continue la discussion.</p>
            </div>
          </div>
        </section>

        <section className="section" id="roadmap">
          <h2>Roadmap (prochaines étapes)</h2>
          <p>On construit une base solide pour un SaaS vendable.</p>

          <div className="features">
            <div className="card">
              <div className="ico">✅</div>
              <b>Infra & API</b>
              <span>Docker + Nginx + Redis + healthcheck + endpoints → déjà OK.</span>
            </div>
            <div className="card">
              <div className="ico">🎨</div>
              <b>Frontend SaaS</b>
              <span>Login, dashboard, inbox UI, multi-tenant, onboarding client.</span>
            </div>
            <div className="card">
              <div className="ico">💳</div>
              <b>Paiement & packages</b>
              <span>Starter / Pro / Team + limite de conversations, agents, templates.</span>
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="ctaBox">
            <div style={{ flex: "1 1 360px" }}>
              <h2 style={{ margin: "0 0 8px" }}>Prêt à tester WhatsFlow ?</h2>
              <p style={{ margin: 0, color: "rgba(234,240,255,.72)" }}>
                Laisse ton email et je t’envoie l’accès bêta + le guide d’installation WordPress.
              </p>
            </div>

            {/* ✅ FORMULAIRE = composant client */}
            <LeadForm />
          </div>

          <footer className="footer">
            <div>
              <b>WhatsFlow</b> — WhatsApp Inbox SaaS • © {new Date().getFullYear()}
            </div>
            <div className="smalllinks">
              <a href="#features">Fonctionnalités</a>
              <a href="#how">Flow</a>
              <a href="#roadmap">Roadmap</a>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}