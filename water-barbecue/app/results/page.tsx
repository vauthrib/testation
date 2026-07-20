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
  const [sortBy, setSortBy] = useState<"general" | string>("general");
  const [showDetails, setShowDetails] = useState(true);

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

  const getSortedResults = () => {
    if (!data) return [];
    let sorted = [...data.results];

    if (sortBy === "general") {
      sorted.sort((a, b) => (b.moyenneGenerale ?? -1) - (a.moyenneGenerale ?? -1));
    } else {
      const catId = parseInt(sortBy);
      sorted.sort((a, b) => {
        const aCat = a.categories.find((c) => c.categoryId === catId);
        const bCat = b.categories.find((c) => c.categoryId === catId);
        return (bCat?.moyenne ?? -1) - (aCat?.moyenne ?? -1);
      });
    }
    return sorted;
  };

  const getMedal = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  const getBarColor = (value: number | null) => {
    if (value === null) return "bg-white/10";
    if (value >= 7) return "bg-gradient-to-r from-green-500 to-emerald-400";
    if (value >= 5) return "bg-gradient-to-r from-blue-500 to-cyan-400";
    if (value >= 3) return "bg-gradient-to-r from-yellow-500 to-amber-400";
    return "bg-gradient-to-r from-red-500 to-orange-400";
  };

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

  const sortedResults = getSortedResults();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <a href="/" className="text-blue-300 hover:text-blue-200 text-sm">← Accueil</a>
        <div className="flex gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`text-xs px-3 py-1.5 rounded-full transition-all ${
              showDetails
                ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                : "bg-white/5 text-blue-300/50 border border-white/10"
            }`}
          >
            {showDetails ? "📊 Vue simple" : "📋 Vue détaillée"}
          </button>
          <button
            onClick={fetchResults}
            className="text-blue-300 hover:text-blue-200 text-sm bg-white/5 px-3 py-1.5 rounded-xl transition-all"
          >
            🔄
          </button>
        </div>
      </div>

      <div className="text-center">
        <div className="text-4xl mb-2">🏆</div>
        <h1 className="text-2xl font-bold text-white">Classement</h1>
        {data && (
          <p className="text-blue-300 text-sm">
            {data.results.length} concurrents · {data.totalJurors} jurys
          </p>
        )}
      </div>

      {/* Filtre de tri */}
      {data && data.categories.length > 0 && (
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setSortBy("general")}
            className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 ${
              sortBy === "general"
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                : "bg-white/5 text-blue-300/60 border border-white/10 hover:text-white"
            }`}
          >
            🏆 Général
          </button>
          {data.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSortBy(cat.id.toString())}
              className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 ${
                sortBy === cat.id.toString()
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                  : "bg-white/5 text-blue-300/60 border border-white/10 hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

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

      {error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-8 text-center">
          <p className="text-red-300 font-bold">Impossible de charger les résultats</p>
        </div>
      ) : data && sortedResults.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 text-center space-y-4">
          <div className="text-5xl">🏄</div>
          <h2 className="text-xl font-bold text-white">Aucun concurrent</h2>
          <p className="text-blue-200/60">Inscrivez des concurrents pour voir le classement.</p>
        </div>
      ) : (
        <>
          {/* VUE SIMPLIFIÉE : classement avec moyennes générales uniquement */}
          {!showDetails && (
            <div className="space-y-3">
              {sortedResults.map((result, index) => {
                const hasNotes = result.moyenneGenerale !== null;
                return (
                  <div
                    key={result.contestant.id}
                    className={`rounded-2xl p-4 flex items-center gap-3 transition-all ${
                      hasNotes
                        ? "bg-white/5 backdrop-blur-lg border border-white/10 hover:border-blue-500/30"
                        : "bg-white/[0.02] border border-dashed border-white/5"
                    }`}
                  >
                    {/* Rang */}
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0">
                      {hasNotes ? (
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${
                          index === 0 ? "bg-gradient-to-br from-yellow-400 to-amber-600" :
                          index === 1 ? "bg-gradient-to-br from-gray-300 to-gray-500" :
                          index === 2 ? "bg-gradient-to-br from-amber-600 to-amber-800" :
                          "bg-white/10"
                        } text-white`}>
                          {getMedal(index)}
                        </div>
                      ) : (
                        <div className="text-blue-300/20 text-sm">{index + 1}</div>
                      )}
                    </div>

                    {/* Pseudo */}
                    <div className="flex-1 min-w-0">
                      <div className={`font-bold truncate ${hasNotes ? "text-white" : "text-white/40"}`}>
                        {result.contestant.pseudo}
                      </div>
                      <div className={`text-xs ${hasNotes ? "text-blue-300" : "text-blue-300/20"}`}>
                        {result.contestant.prenom} · {result.nbJurys} jurys
                      </div>
                    </div>

                    {/* Barre de progression */}
                    <div className="hidden sm:block flex-1 max-w-[120px]">
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            hasNotes ? getBarColor(result.moyenneGenerale) : ""
                          }`}
                          style={{ width: hasNotes ? `${Math.min(100, ((result.moyenneGenerale ?? 0) / 9) * 100)}%` : "0%" }}
                        />
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right min-w-[50px]">
                      {hasNotes ? (
                        <>
                          <div className="text-xl font-bold text-white">
                            {result.moyenneGenerale?.toFixed(1)}
                          </div>
                          <div className="text-blue-300/40 text-xs">/9</div>
                        </>
                      ) : (
                        <div className="text-blue-300/20 text-xs text-center">
                          Pas<br/>noté
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* VUE DÉTAILLÉE : tableau complet avec toutes les catégories */}
          {showDetails && data && (
            <div className="overflow-x-auto -mx-4 px-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-2 text-blue-300/60 font-medium text-xs">Rang</th>
                    <th className="text-left py-2 pr-3 text-blue-300/60 font-medium text-xs">Concurrent</th>
                    <th className="text-center py-2 px-1 text-blue-300/60 font-medium text-xs">🏆</th>
                    {data.categories.map((cat) => (
                      <th key={cat.id} className="text-center py-2 px-1 text-blue-300/60 font-medium text-xs whitespace-nowrap">
                        {cat.name.length > 8 ? cat.name.slice(0, 8) + "…" : cat.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedResults.map((result, index) => {
                    const hasNotes = result.moyenneGenerale !== null;
                    return (
                      <tr
                        key={result.contestant.id}
                        className={`border-b border-white/5 transition-all ${
                          hasNotes ? "hover:bg-white/5" : "opacity-40"
                        }`}
                      >
                        <td className="py-3 pr-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                            index === 0 ? "bg-gradient-to-br from-yellow-400 to-amber-600" :
                            index === 1 ? "bg-gradient-to-br from-gray-300 to-gray-500" :
                            index === 2 ? "bg-gradient-to-br from-amber-600 to-amber-800" :
                            "bg-white/10"
                          } text-white`}>
                            {index + 1}
                          </div>
                        </td>
                        <td className="py-3 pr-3">
                          <div className="font-semibold text-white truncate max-w-[100px]">
                            {result.contestant.pseudo}
                          </div>
                          <div className="text-blue-300/40 text-xs">{result.nbJurys} jurys</div>
                        </td>
                        <td className="text-center py-3 px-1">
                          {hasNotes ? (
                            <span className="text-white font-bold text-base">
                              {result.moyenneGenerale?.toFixed(1)}
                            </span>
                          ) : (
                            <span className="text-blue-300/20 text-xs">-</span>
                          )}
                        </td>
                        {data.categories.map((cat) => {
                          const catResult = result.categories.find(
                            (c) => c.categoryId === cat.id
                          );
                          const val = catResult?.moyenne;
                          return (
                            <td key={cat.id} className="text-center py-3 px-1">
                              {val !== null && val !== undefined ? (
                                <div className="flex flex-col items-center">
                                  <span className="text-white font-bold text-xs">
                                    {val.toFixed(1)}
                                  </span>
                                  <span className="text-blue-300/30 text-[10px]">
                                    ({catResult!.nbVotes})
                                  </span>
                                </div>
                              ) : (
                                <span className="text-blue-300/15 text-xs">·</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Liens de navigation */}
      <div className="text-center space-y-2 pt-2">
        <div className="flex gap-2 justify-center flex-wrap">
          <a
            href="/vote"
            className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-6 rounded-2xl hover:from-orange-400 hover:to-red-400 transition-all active:scale-[0.98]"
          >
            ⚖️ Voter
          </a>
          <a
            href="/jury/list"
            className="inline-block bg-white/10 text-white font-semibold py-3 px-6 rounded-2xl hover:bg-white/20 transition-all active:scale-[0.98] border border-white/10"
          >
            👥 Jurys
          </a>
        </div>
        <p className="text-blue-300/20 text-xs">
          {showDetails
            ? "Vue détaillée — chaque colonne = une catégorie"
            : "Vue simplifiée — bascule en « Vue détaillée » pour tout voir"}
        </p>
      </div>
    </div>
  );
}
