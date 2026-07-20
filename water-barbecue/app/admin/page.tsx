"use client";

import { useEffect, useState, useRef } from "react";

interface Category {
  id: number;
  name: string;
}

interface Contestant {
  id: number;
  pseudo: string;
  prenom: string;
  age: number;
  popularite: number;
}

interface Juror {
  id: number;
  pseudo: string;
  email: string;
  type: string;
  coeff: number;
  validated: boolean;
}

interface RatingItem {
  id: number;
  contestantId: number;
  jurorId: number;
  categoryId: number;
  value: number;
  photoUrl: string | null;
  contestant: { pseudo: string };
  juror: { pseudo: string; type: string };
  category: { name: string };
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [editCategory, setEditCategory] = useState<{ id: number; name: string } | null>(null);

  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [jurors, setJurors] = useState<Juror[]>([]);
  const [ratings, setRatings] = useState<RatingItem[]>([]);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [baseUrl, setBaseUrl] = useState("");

  const printRef = useRef<HTMLDivElement>(null);

  const ADMIN_USER = "ben";
  const ADMIN_PASS = "7595";

  const handleLogin = () => {
    if (login === ADMIN_USER && password === ADMIN_PASS) {
      setLoggedIn(true);
      setAuthError("");
      setBaseUrl(window.location.origin);
    } else {
      setAuthError("Identifiants incorrects");
    }
  };

  const fetchAll = async () => {
    try {
      const [catRes, conRes, jurRes, ratRes] = await Promise.all([
        fetch("/api/admin/categories"),
        fetch("/api/contestants/dashboard"),
        fetch("/api/jurors/register"),
        fetch("/api/ratings"),
      ]);
      const catData = await catRes.json();
      const conData = await conRes.json();
      const jurData = await jurRes.json();
      const ratData = await ratRes.json();
      setCategories(catData.categories || []);
      setContestants(conData.contestants || []);
      setJurors(jurData.jurors || []);
      setRatings(ratData.ratings || []);
    } catch {}
  };

  useEffect(() => {
    if (loggedIn) fetchAll();
  }, [loggedIn]);

  // --- Catégories CRUD ---
  const addCategory = async () => {
    if (!newCategory.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password, name: newCategory.trim() }),
      });
      const data = await res.json();
      if (res.ok) { setMessage(`✅ Catégorie ajoutée`); setNewCategory(""); fetchAll(); }
      else { setMessage(`❌ ${data.error}`); }
    } catch { setMessage("❌ Erreur"); }
    setStatus("idle");
    setTimeout(() => setMessage(""), 3000);
  };

  const updateCategory = async () => {
    if (!editCategory) return;
    setStatus("loading");
    await fetch("/api/admin/categories", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ login, password, id: editCategory.id, name: editCategory.name.trim() }) });
    setMessage("✅ Modifiée"); setEditCategory(null); fetchAll();
    setStatus("idle");
    setTimeout(() => setMessage(""), 3000);
  };

  const deleteCategory = async (id: number) => {
    if (!confirm("Supprimer cette catégorie ?")) return;
    await fetch("/api/admin/categories", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ login, password, id }) });
    setMessage("✅ Supprimée"); fetchAll();
    setTimeout(() => setMessage(""), 3000);
  };

  const deleteContestants = async () => {
    if (!confirm("⚠️ Supprimer TOUS les concurrents ?")) return;
    const res = await fetch("/api/admin/cleanup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ login, password, action: "delete_contestants" }) });
    const d = await res.json();
    setMessage(res.ok ? `✅ ${d.message}` : `❌ ${d.error}`);
    fetchAll();
    setTimeout(() => setMessage(""), 3000);
  };

  const deleteJurors = async () => {
    if (!confirm("⚠️ Supprimer TOUS les jurys ?")) return;
    const res = await fetch("/api/admin/cleanup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ login, password, action: "delete_jurors" }) });
    const d = await res.json();
    setMessage(res.ok ? `✅ ${d.message}` : `❌ ${d.error}`);
    fetchAll();
    setTimeout(() => setMessage(""), 3000);
  };

  // --- Impression ---
  const handlePrint = (section: string) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    let content = `
      <html><head>
      <title>Water-Barbecue - Impression</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
        h1 { text-align: center; color: #1e3a5f; }
        h2 { color: #1e3a5f; border-bottom: 2px solid #f59e0b; padding-bottom: 5px; margin-top: 30px; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th { background: #1e3a5f; color: white; padding: 8px 10px; text-align: left; font-size: 13px; }
        td { padding: 6px 10px; border-bottom: 1px solid #eee; font-size: 12px; }
        tr:nth-child(even) { background: #f9f9f9; }
        .qr-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
        .qr-card { border: 1px solid #ddd; border-radius: 8px; padding: 15px; text-align: center; page-break-inside: avoid; }
        .qr-card h3 { margin: 5px 0; font-size: 14px; }
        .qr-card img { width: 150px; height: 150px; }
        .qr-card .pseudo { font-size: 18px; font-weight: bold; color: #1e3a5f; }
        .program { background: #fffbe6; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .program h2 { border: none; margin-top: 0; }
        .program-item { padding: 8px 0; border-bottom: 1px dashed #fde68a; font-size: 14px; }
        .program-item:last-child { border: none; }
        .program-item strong { color: #1e3a5f; }
        .footer { text-align: center; margin-top: 30px; font-size: 11px; color: #999; }
        .stats { display: flex; gap: 15px; justify-content: center; margin: 15px 0; flex-wrap: wrap; }
        .stat-card { background: #f0f7ff; border: 1px solid #bdd7ee; border-radius: 8px; padding: 12px 20px; text-align: center; }
        .stat-card .num { font-size: 24px; font-weight: bold; color: #1e3a5f; }
        .stat-card .label { font-size: 11px; color: #666; }
        @media print { body { padding: 10px; } .no-print { display: none; } }
      </style>
      </head><body>
      <h1>🚤🔥 Water-Barbecue 2026</h1>
    `;

    if (section === "qr") {
      content += `<h2>📱 QR Codes des concurrents</h2><p class="no-print" style="text-align:center;color:#999;">
      Chaque QR code ajoute +1 point de popularité quand on le scanne.</p><div class="qr-grid">`;
      for (const c of contestants) {
        const qrUrl = `${baseUrl}/popularite/${c.id}`;
        content += `
          <div class="qr-card">
            <div class="pseudo">${c.pseudo}</div>
            <div style="font-size:12px;color:#666;margin-bottom:8px;">${c.prenom}</div>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrUrl)}" alt="QR ${c.pseudo}" />
            <div style="font-size:10px;color:#999;margin-top:5px;">Popularité: ${c.popularite}</div>
          </div>`;
      }
      content += `</div>`;
    }

    if (section === "contestants") {
      content += `<h2>🏄 Liste des concurrents</h2><table>
      <tr><th>#</th><th>Pseudo</th><th>Prénom</th><th>Âge</th><th>Popularité</th></tr>`;
      contestants.forEach((c, i) => {
        content += `<tr><td>${i + 1}</td><td><strong>${c.pseudo}</strong></td><td>${c.prenom}</td><td>${c.age}</td><td>${c.popularite}</td></tr>`;
      });
      content += `</table>`;
    }

    if (section === "jurors") {
      content += `<h2>⚖️ Liste des jurys</h2><table>
      <tr><th>Pseudo</th><th>Email</th><th>Type</th><th>Coeff</th><th>Statut</th></tr>`;
      jurors.forEach((j) => {
        const status = j.type === "CURIEUX" ? "✅ Auto" : j.validated ? "✅ Validé" : "⏳ En attente";
        content += `<tr><td><strong>${j.pseudo}</strong></td><td>${j.email}</td><td>${j.type}</td><td>×${j.coeff}</td><td>${status}</td></tr>`;
      });
      content += `</table>`;
    }

    if (section === "votes") {
      content += `<h2>📊 Détail des votes</h2><table>
      <tr><th>Jury</th><th>Type</th><th>Concurrent</th><th>Catégorie</th><th>Note</th><th>Photo</th></tr>`;
      ratings.forEach((r) => {
        content += `<tr><td>${r.juror.pseudo}</td><td>${r.juror.type}</td><td>${r.contestant.pseudo}</td><td>${r.category.name}</td><td style="text-align:center;font-weight:bold;">${r.value}/9</td><td style="text-align:center;">${r.photoUrl ? "📸 Oui" : "-"}</td></tr>`;
      });
      content += `</table>`;
    }

    if (section === "program") {
      content += `
      <div class="program">
        <h2 style="text-align:center;">📅 Programme de la course</h2>
        <p style="text-align:center;color:#666;font-size:13px;">23 — 25 Juillet 2026</p>
        <div class="program-item"><strong>🗓️ 23 Juillet</strong> — Fin des inscriptions à <strong>16h00</strong></div>
        <div class="program-item"><strong>🗓️ 24 Juillet</strong> — Début de la fabrication des embarcations à <strong>8h30</strong></div>
        <div class="program-item"><strong>🗓️ 25 Juillet</strong> — Mise à l'eau à <strong>16h00</strong></div>
        <div class="program-item"><strong>🗓️ 25 Juillet</strong> — Largage des amarres à <strong>20h30</strong></div>
      </div>`;
    }

    // Stats
    const totalVotes = ratings.length;
    const totalContestants = contestants.length;
    const totalJurors = jurors.length;
    const totalPhotos = ratings.filter(r => r.photoUrl).length;

    content += `
      <h2>📊 Résumé de la course</h2>
      <div class="stats">
        <div class="stat-card"><div class="num">${totalContestants}</div><div class="label">Concurrents</div></div>
        <div class="stat-card"><div class="num">${totalJurors}</div><div class="label">Jurys</div></div>
        <div class="stat-card"><div class="num">${totalVotes}</div><div class="label">Votes</div></div>
        <div class="stat-card"><div class="num">${totalPhotos}</div><div class="label">Photos</div></div>
      </div>
      <div class="footer">Water-Barbecue 2026 — Document imprimé depuis l'interface d'administration</div>
      </body></html>`;

    printWindow.document.write(content);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  const getJurorTypeStyle = (type: string) => {
    switch (type) {
      case "DONNATEUR": return { label: "Donnateur", coeff: "×6", color: "from-yellow-500 to-amber-600" };
      case "FAMILY": return { label: "Family", coeff: "×4", color: "from-cyan-500 to-blue-600" };
      default: return { label: "Curieux", coeff: "×2", color: "from-purple-500 to-pink-600" };
    }
  };

  // --- Login Screen ---
  if (!loggedIn) {
    return (
      <div className="space-y-6">
        <a href="/" className="text-blue-300 hover:text-blue-200 text-sm">← Accueil</a>
        <div className="bg-white/5 backdrop-blur-lg border border-red-500/20 rounded-3xl p-6 text-center space-y-4">
          <div className="text-4xl">🔐</div>
          <h1 className="text-2xl font-bold text-white">Administration</h1>
          <p className="text-red-300 text-sm">Accès réservé</p>
          <input value={login} onChange={(e) => setLogin(e.target.value)} className="w-full bg-white/10 border border-red-500/30 rounded-xl px-4 py-3 text-white placeholder-red-300/50 focus:outline-none focus:border-red-400 text-center" placeholder="Identifiant" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} className="w-full bg-white/10 border border-red-500/30 rounded-xl px-4 py-3 text-white placeholder-red-300/50 focus:outline-none focus:border-red-400 text-center" placeholder="Mot de passe" />
          {authError && <p className="text-red-400 text-sm">{authError}</p>}
          <button onClick={handleLogin} className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white font-bold py-3 rounded-2xl hover:from-red-500 hover:to-red-400 transition-all">🔑 Connexion</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <a href="/" className="text-blue-300 hover:text-blue-200 text-sm">← Accueil</a>
        <span className="text-green-400 text-xs bg-green-500/10 px-3 py-1 rounded-full">Admin</span>
      </div>

      <div className="text-center">
        <div className="text-4xl mb-2">🔧</div>
        <h1 className="text-2xl font-bold text-white">Administration</h1>
        <p className="text-red-300 text-sm">Water-Barbecue 2026 · 23-25 Juillet</p>
      </div>

      {message && (
        <div className={`text-center py-2 px-4 rounded-2xl text-sm font-medium ${message.startsWith("✅") ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
          {message}
        </div>
      )}

      {/* ====== PROGRAMME DE LA COURSE ====== */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/5 border border-yellow-500/30 rounded-3xl p-5 space-y-3">
        <h2 className="text-lg font-bold text-yellow-300 flex items-center gap-2">📅 Programme Water-Barbecue 2026</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2.5">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-300 font-bold">23</div>
            <div className="flex-1 text-blue-200">Fin des inscriptions</div>
            <div className="text-white font-bold">16h00</div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2.5">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-300 font-bold">24</div>
            <div className="flex-1 text-blue-200">Début fabrication embarcations</div>
            <div className="text-white font-bold">8h30</div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2.5">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-300 font-bold">25</div>
            <div className="flex-1 text-blue-200">Mise à l'eau</div>
            <div className="text-white font-bold">16h00</div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2.5">
            <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center text-red-300 font-bold">25</div>
            <div className="flex-1 text-orange-200 font-semibold">🔥 Largage des amarres</div>
            <div className="text-white font-bold text-lg">20h30</div>
          </div>
        </div>
      </div>

      {/* ====== IMPRESSION ====== */}
      <div className="bg-white/5 backdrop-blur-lg border border-green-500/20 rounded-3xl p-5 space-y-3">
        <h2 className="text-lg font-bold text-green-300 flex items-center gap-2">🖨️ Impression</h2>
        <p className="text-blue-300/50 text-xs">Imprime les documents pour affichage pendant la course</p>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => handlePrint("qr")} className="bg-blue-600/20 border border-blue-500/30 text-blue-300 font-bold py-3 rounded-2xl hover:bg-blue-600/40 transition-all text-sm">
            📱 QR Codes<br/><span className="text-[10px] font-normal">PopularitÉ</span>
          </button>
          <button onClick={() => handlePrint("contestants")} className="bg-cyan-600/20 border border-cyan-500/30 text-cyan-300 font-bold py-3 rounded-2xl hover:bg-cyan-600/40 transition-all text-sm">
            🏄 Concurrents
          </button>
          <button onClick={() => handlePrint("jurors")} className="bg-purple-600/20 border border-purple-500/30 text-purple-300 font-bold py-3 rounded-2xl hover:bg-purple-600/40 transition-all text-sm">
            ⚖️ Jurys
          </button>
          <button onClick={() => handlePrint("votes")} className="bg-orange-600/20 border border-orange-500/30 text-orange-300 font-bold py-3 rounded-2xl hover:bg-orange-600/40 transition-all text-sm">
            📊 Votes
          </button>
        </div>
        <button onClick={() => handlePrint("program")} className="w-full bg-gradient-to-r from-yellow-600/30 to-amber-600/30 border border-yellow-500/30 text-yellow-300 font-bold py-3 rounded-2xl hover:from-yellow-600/50 hover:to-amber-600/50 transition-all text-sm">
          📅 Résumé + Programme complet
        </button>
      </div>

      {/* ====== CATÉGORIES ====== */}
      <div className="bg-white/5 backdrop-blur-lg border border-blue-500/20 rounded-3xl p-5 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">📋 Catégories</h2>
        <div className="flex gap-2">
          <input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCategory()} className="flex-1 bg-white/10 border border-blue-500/30 rounded-xl px-4 py-2 text-white placeholder-blue-300/50 text-sm focus:outline-none focus:border-blue-400" placeholder="Nouvelle catégorie..." />
          <button onClick={addCategory} disabled={!newCategory.trim() || status === "loading"} className="bg-blue-600 text-white px-4 rounded-xl hover:bg-blue-500 transition-all disabled:opacity-50 text-sm font-bold">+</button>
        </div>
        <div className="space-y-1">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2">
              {editCategory?.id === cat.id ? (
                <>
                  <input value={editCategory.name} onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })} onKeyDown={(e) => e.key === "Enter" && updateCategory()} className="flex-1 bg-white/10 border border-orange-500/30 rounded-lg px-3 py-1.5 text-white text-sm" autoFocus />
                  <button onClick={updateCategory} className="text-green-400 text-sm font-bold">✅</button>
                  <button onClick={() => setEditCategory(null)} className="text-red-400 text-sm">❌</button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-white text-sm">{cat.name}</span>
                  <button onClick={() => setEditCategory({ id: cat.id, name: cat.name })} className="text-blue-300 text-xs">✏️</button>
                  <button onClick={() => deleteCategory(cat.id)} className="text-red-400 text-xs">🗑️</button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ====== ACTIONS DANGEREUSES ====== */}
      <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-5 space-y-3">
        <h2 className="text-lg font-bold text-red-300 flex items-center gap-2">⚠️ Actions dangereuses</h2>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={deleteContestants} disabled={status === "loading"} className="bg-red-600/30 border border-red-500/40 text-red-300 font-bold py-3 rounded-2xl hover:bg-red-600/50 transition-all disabled:opacity-50 text-sm">🗑️ Concurrents</button>
          <button onClick={deleteJurors} disabled={status === "loading"} className="bg-red-600/30 border border-red-500/40 text-red-300 font-bold py-3 rounded-2xl hover:bg-red-600/50 transition-all disabled:opacity-50 text-sm">🗑️ Jurys</button>
        </div>
      </div>
    </div>
  );
}
