"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Contestant {
  id: number;
  pseudo: string;
  prenom: string;
  age: number;
}

interface Juror {
  id: number;
  pseudo: string;
  type: string;
  coeff: number;
  validated: boolean;
  validationsCount?: number;
}

export default function ContestantDashboard() {
  const router = useRouter();
  const [me, setMe] = useState<{ id: number; pseudo: string; prenom: string } | null>(null);
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [jurors, setJurors] = useState<Juror[]>([]);
  const [loading, setLoading] = useState(true);
  const [validatingId, setValidatingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("contestant");
    if (!stored) {
      router.push("/contestant/login");
      return;
    }
    setMe(JSON.parse(stored));
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/contestants/dashboard");
      const data = await res.json();
      setContestants(data.contestants || []);
      setJurors(data.jurors || []);
    } catch {} finally {
      setLoading(false);
    }
  };

  const validateJuror = async (jurorId: number) => {
    if (!me) return;
    setValidatingId(jurorId);
    try {
      const res = await fetch("/api/contestants/validate-juror", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contestantId: me.id, jurorId }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ ${data.message}`);
        fetchData();
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch {
      setMessage("❌ Erreur");
    }
    setValidatingId(null);
    setTimeout(() => setMessage(""), 3000);
  };

  const logout = () => {
    sessionStorage.removeItem("contestant");
    router.push("/");
  };

  const getJurorTypeStyle = (type: string) => {
    switch (type) {
      case "DONNATEUR": return { label: "Donnateur", coeff: "×6", color: "from-yellow-500 to-amber-600" };
      case "FAMILY": return { label: "Family", coeff: "×4", color: "from-cyan-500 to-blue-600" };
      default: return { label: "Curieux", coeff: "×2", color: "from-purple-500 to-pink-600" };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-blue-200">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <a href="/" className="text-blue-300 hover:text-blue-200 text-sm">← Accueil</a>
        <button onClick={logout} className="text-red-300 hover:text-red-200 text-sm bg-red-500/10 px-3 py-1.5 rounded-xl">Déconnexion</button>
      </div>

      <div className="text-center">
        <div className="text-4xl mb-2">🏄</div>
        <h1 className="text-2xl font-bold text-white">Espace Concurrent</h1>
        <p className="text-blue-300 text-sm">Bienvenue {me?.prenom} 👋</p>
      </div>

      {message && (
        <div className={`text-center py-2 px-4 rounded-2xl text-sm font-medium ${
          message.startsWith("✅") ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
        }`}>
          {message}
        </div>
      )}

      {/* Liste des concurrents */}
      <div className="bg-white/5 backdrop-blur-lg border border-blue-500/20 rounded-3xl p-5 space-y-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">🏄 Concurrents ({contestants.length})</h2>
        <div className="space-y-2">
          {contestants.map((c) => (
            <div key={c.id} className="flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-lg font-bold text-white shrink-0">
                {c.pseudo.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">{c.pseudo}</div>
                <div className="text-blue-300 text-xs">{c.prenom}, {c.age} ans</div>
              </div>
              {me?.id === c.id && (
                <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">C'est toi !</span>
              )}
            </div>
          ))}
          {contestants.length === 0 && (
            <p className="text-blue-300/40 text-xs text-center">Aucun concurrent</p>
          )}
        </div>
      </div>

      {/* Liste des jurys */}
      <div className="bg-white/5 backdrop-blur-lg border border-orange-500/20 rounded-3xl p-5 space-y-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">⚖️ Jurys ({jurors.length})</h2>
        <div className="space-y-2">
          {jurors.map((j) => {
            const style = getJurorTypeStyle(j.type);
            return (
              <div key={j.id} className="flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${style.color} rounded-xl flex items-center justify-center text-lg font-bold text-white shrink-0`}>
                  {j.pseudo.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm">{j.pseudo}</div>
                  <div className="text-blue-300 text-xs">
                    {style.label} <span className="text-orange-300">({style.coeff})</span>
                  </div>
                </div>
                {j.type === "CURIEUX" ? (
                  <span className="text-xs text-green-400">✅ Auto</span>
                ) : j.validated ? (
                  <span className="text-xs text-green-400">✅ Validé</span>
                ) : (
                  <div className="text-right">
                    {j.validationsCount !== undefined && j.validationsCount > 0 && (
                      <div className="text-blue-300/50 text-[10px] mb-1">{j.validationsCount} validation(s)</div>
                    )}
                    <button
                      onClick={() => validateJuror(j.id)}
                      disabled={validatingId === j.id}
                      className="text-xs bg-orange-500/20 text-orange-300 px-3 py-1.5 rounded-xl hover:bg-orange-500/30 transition-all disabled:opacity-50"
                    >
                      {validatingId === j.id ? "..." : "✅ Valider"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          {jurors.length === 0 && (
            <p className="text-blue-300/40 text-xs text-center">Aucun jury inscrit</p>
          )}
        </div>
      </div>

      <div className="text-center">
        <a href="/results" className="text-blue-300 hover:text-blue-200 text-sm underline">🏆 Voir le classement</a>
      </div>
    </div>
  );
}
