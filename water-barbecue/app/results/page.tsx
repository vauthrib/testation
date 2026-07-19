"use client";

import { useEffect, useState } from "react";

interface CategoryResult {
  category: string;
  categoryId: number;
  moyenne: number | null;
  nbVotes: number;
}

interface ContestantResult {
  contestant: { id: number; pseudo: string; age: number; prenom: string };
  categories: CategoryResult[];
  moyenneGenerale: number | null;
  nbJurys: number;
}

interface ResultsData {
  results: ContestantResult[];
  categories: { id: number; name: string }[];
  totalJurors: number;
}

export default function ResultsPage() {
  const [data, setData] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [expandedContestant, setExpandedContestant] = useState<number | null>(null);

  const fetchResults = async () => {
    try {
      const res = await fetch("/api/results");
      if (!res.ok) throw new Error("Erreur");
      const d = await res.json();
      setData(d);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchResults, 30000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const hasVotes = data?.results.some((r) => r.moyenneGenerale !== null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-4xl animate-bounce mb-4">🏆</div>
          <p className="text-blue-200 text-lg">Chargement des résultats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <a href="/" className="text-blue-300 hover:text-blue-200 text-sm">← Accueil</a>
        <button
          onClick={fetchResults}
          className="text-blue-300 hover:text-blue-200 text-sm bg-white/5 px-3 py-1.5 rounded-xl transition-all"
        >
          🔄 Rafraîchir
        </button>
      </div>

      <div className="text-center">
        <div className="text-4xl mb-2">🏆</div>
        <h1 className="text-2xl font-bold text-white">Classement</h1>
        {data && (
          <p className="text-blue-300 text-sm">
            {data.totalJurors} jurys ont voté
          </p>
        )}
      </div>

      {error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-8 text-center">
          <p className="text-red-300 font-bold">Impossible de charger les résultats</p>
        </div>
      ) : !hasVotes ? (
        <div className="bg-white/5 backdrop-blur-lg border border-blue-500/20 rounded-3xl p-8 text-center space-y-4">
          <div className="text-5xl">⏳</div>
          <h2 className="text-xl font-bold text-white">Pas encore de votes</h2>
          <p className="text-blue-200/60">
            Les résultats apparaîtront ici dès qu'un jury aura attribué des notes.
          </p>
          <p className="text-blue-300/40 text-xs">
            La page se rafraîchit automatiquement toutes les 30 secondes
          </p>
        </div>
      ) : (
        <>
          {/* Auto-refresh toggle */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                autoRefresh
                  ? "bg-green-500/20 text-green-300 border border-green-500/30"
                  : "bg-white/5 text-blue-300/50 border border-white/10"
              }`}
            >
              {autoRefresh ? "🔵 Auto-refresh ON" : "⚪ Auto-refresh OFF"}
            </button>
          </div>

          {/* Classement */}
          <div className="space-y-4">
            {data!.results
              .filter((r) => r.moyenneGenerale !== null)
              .sort((a, b) => (b.moyenneGenerale ?? 0) - (a.moyenneGenerale ?? 0))
              .map((result, index) => (
                <div
                  key={result.contestant.id}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden transition-all hover:border-blue-500/30"
                >
                  {/* Header */}
                  <button
                    onClick={() =>
                      setExpandedContestant(
                        expandedContestant === result.contestant.id ? null : result.contestant.id
                      )
                    }
                    className="w-full p-5 flex items-center gap-4 text-left"
                  >
                    {/* Rang */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0 ${
                        index === 0
                          ? "bg-gradient-to-br from-yellow-400 to-amber-600 text-white"
                          : index === 1
                          ? "bg-gradient-to-br from-gray-300 to-gray-500 text-white"
                          : index === 2
                          ? "bg-gradient-to-br from-amber-600 to-amber-800 text-white"
                          : "bg-white/10 text-blue-200"
                      }`}
                    >
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                    </div>

                    {/* Infos */}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white text-lg truncate">
                        {result.contestant.pseudo}
                      </div>
                      <div className="text-blue-300 text-xs">
                        {result.contestant.prenom}, {result.contestant.age} ans • {result.nbJurys} jurys
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        {result.moyenneGenerale?.toFixed(1) ?? "-"}
                      </div>
                      <div className="text-blue-300/50 text-xs">/9</div>
                    </div>
                  </button>

                  {/* Détails catégories (expanded) */}
                  {expandedContestant === result.contestant.id && (
                    <div className="px-5 pb-5 space-y-2 border-t border-white/10 pt-4">
                      {result.categories
                        .filter((c) => c.moyenne !== null)
                        .map((cat) => (
                          <div key={cat.categoryId} className="flex items-center gap-3">
                            <div className="flex-1 text-blue-200 text-sm truncate">{cat.category}</div>
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
                                  style={{ width: `${Math.min(100, ((cat.moyenne ?? 0) / 9) * 100)}%` }}
                                />
                              </div>
                              <span className="text-white font-bold text-sm w-8 text-right">
                                {cat.moyenne?.toFixed(1)}
                              </span>
                              <span className="text-blue-300/30 text-xs">({cat.nbVotes})</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </>
      )}

      <div className="text-center space-y-2">
        <a href="/vote" className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-6 rounded-2xl hover:from-orange-400 hover:to-red-400 transition-all active:scale-[0.98]">
          ⚖️ Voter
        </a>
        <p className="text-blue-300/20 text-xs">
          Page rafraîchie automatiquement toutes les 30 secondes
        </p>
      </div>
    </div>
  );
}
