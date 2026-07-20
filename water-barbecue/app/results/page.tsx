"use client";

import { useEffect, useState } from "react";

interface CategoryResult {
  category: string;
  categoryId: number;
  moyenne: number | null;
  nbVotes: number;
  photos: string[];
}

interface ContestantResult {
  contestant: { id: number; pseudo: string; age: number; prenom: string; popularite: number };
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
  const [fullPhoto, setFullPhoto] = useState<string | null>(null);

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

  const sortedByGeneral = () => {
    if (!data) return [];
    return [...data.results].sort(
      (a, b) => (b.moyenneGenerale ?? -1) - (a.moyenneGenerale ?? -1)
    );
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

  // Key handler for Escape key to close photo modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullPhoto(null);
    };
    if (fullPhoto) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [fullPhoto]);

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

  const sorted = sortedByGeneral();

  return (
    <div className="space-y-4">
      {/* Modal plein écran photo */}
      {fullPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setFullPhoto(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={fullPhoto}
              alt="Photo plein écran"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
            <button
              onClick={() => setFullPhoto(null)}
              className="absolute -top-3 -right-3 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-lg rounded-full flex items-center justify-center text-white text-xl transition-all"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <a href="/" className="text-blue-300 hover:text-blue-200 text-sm">← Accueil</a>
        <button
          onClick={fetchResults}
          className="text-blue-300 hover:text-blue-200 text-sm bg-white/5 px-3 py-1.5 rounded-xl transition-all"
        >
          🔄
        </button>
      </div>

      <div className="text-center">
        <div className="text-4xl mb-2">🏆</div>
        <h1 className="text-2xl font-bold text-white">Classement général</h1>
        {data && (
          <div className="flex items-center justify-center gap-4 text-blue-300 text-sm">
            <span>{data.results.length} concurrents</span>
            <span>·</span>
            <span>{data.totalJurors} jurys</span>
          </div>
        )}
      </div>

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
          {autoRefresh ? "🔵 Rafraîchissement auto ON" : "⚪ Rafraîchissement auto OFF"}
        </button>
      </div>

      {error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-8 text-center">
          <p className="text-red-300 font-bold">Impossible de charger les résultats</p>
        </div>
      ) : !data || sorted.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 text-center space-y-4">
          <div className="text-5xl">🏄</div>
          <h2 className="text-xl font-bold text-white">Aucun concurrent</h2>
          <p className="text-blue-200/60">Inscrivez des concurrents pour voir le classement.</p>
        </div>
      ) : (
        <>
          {/* Podium compact en haut */}
          {sorted.filter(r => r.moyenneGenerale !== null).length > 0 && (
            <div className="flex gap-2 justify-center">
              {sorted.slice(0, 3).map((r, i) => (
                r.moyenneGenerale !== null && (
                  <div
                    key={r.contestant.id}
                    className={`flex flex-col items-center px-4 py-3 rounded-2xl transition-all ${
                      i === 0 ? "bg-gradient-to-b from-yellow-400/10 to-transparent border border-yellow-400/30" :
                      i === 1 ? "bg-gradient-to-b from-gray-300/10 to-transparent border border-gray-300/30" :
                      "bg-gradient-to-b from-amber-600/10 to-transparent border border-amber-600/30"
                    }`}
                  >
                    <span className="text-2xl">{getMedal(i)}</span>
                    <span className="text-white font-bold text-sm truncate max-w-[80px]">{r.contestant.pseudo}</span>
                    <span className="text-white text-lg font-bold">{r.moyenneGenerale?.toFixed(1)}</span>
                  </div>
                )
              ))}
            </div>
          )}

          {/* TABLEAU TRANSPOSÉ : catégories en lignes, concurrents en colonnes */}
          <div className="overflow-x-auto -mx-4 px-4 pb-4">
            <table className="w-full text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="sticky left-0 bg-[#0a0f1e] z-10 text-left py-2 pr-3 text-blue-300/60 font-medium">
                    Catégorie
                  </th>
                  {sorted.map((r) => (
                    <th key={r.contestant.id} className="text-center py-2 px-1.5 text-blue-300/60 font-medium min-w-[70px]">
                      <div className="truncate max-w-[70px] mx-auto">{r.contestant.pseudo}</div>
                      <div className="text-[9px] text-blue-300/30">{r.nbJurys} jurys</div>
                    </th>
                  ))}
                  <th className="text-center py-2 px-1.5 text-blue-300/60 font-medium min-w-[60px]">
                    Moy.<br/>catégorie
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Ligne rang */}
                <tr className="border-b border-white/5">
                  <td className="sticky left-0 bg-[#0a0f1e] z-10 py-2 pr-3 text-blue-300/50 font-medium text-[10px]">
                    Rang
                  </td>
                  {sorted.map((r, idx) => (
                    <td key={r.contestant.id} className="text-center py-2 px-1.5">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold ${
                        idx === 0 ? "bg-gradient-to-br from-yellow-400 to-amber-600 text-white" :
                        idx === 1 ? "bg-gradient-to-br from-gray-300 to-gray-500 text-white" :
                        idx === 2 ? "bg-gradient-to-br from-amber-600 to-amber-800 text-white" :
                        "bg-white/10 text-blue-300/60"
                      }`}>
                        {idx + 1}
                      </span>
                    </td>
                  ))}
                  <td className="text-center py-2 px-1.5 text-blue-300/30 text-[10px]">
                    —
                  </td>
                </tr>

                {/* Lignes par catégorie */}
                {data.categories.map((cat) => {
                  // Calculer la moyenne par catégorie (tous concurrents confondus)
                  let catTotal = 0;
                  let catCount = 0;
                  sorted.forEach((r) => {
                    const cr = r.categories.find((c) => c.categoryId === cat.id);
                    if (cr?.moyenne !== null && cr?.moyenne !== undefined) {
                      catTotal += cr.moyenne;
                      catCount++;
                    }
                  });
                  const catMoyenne = catCount > 0 ? catTotal / catCount : null;

                  return (
                    <tr key={cat.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="sticky left-0 bg-[#0a0f1e] z-10 py-2 pr-3 text-blue-200 font-medium">
                        <span className="truncate block max-w-[100px]">{cat.name}</span>
                      </td>
                      {sorted.map((r) => {
                        const cr = r.categories.find((c) => c.categoryId === cat.id);
                        const val = cr?.moyenne;
                        const catPhotos = cr?.photos || [];
                        const hasCatPhoto = catPhotos.length > 0;
                        return (
                          <td key={r.contestant.id} className={`text-center py-2 px-1.5 ${hasCatPhoto ? "bg-blue-500/5" : ""}`}>
                            {val !== null && val !== undefined ? (
                              <div className="flex flex-col items-center">
                                <span className="text-white font-bold text-sm">{val.toFixed(1)}</span>
                                <span className="text-blue-300/30 text-[9px]">({cr!.nbVotes})</span>
                                {/* Photos dans la cellule */}
                                {hasCatPhoto && (
                                  <div className="flex justify-center gap-0.5 mt-0.5">
                                    {catPhotos.slice(0, 3).map((photo, pi) => (
                                      <button
                                        key={pi}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setFullPhoto(photo);
                                        }}
                                        className="focus:outline-none"
                                      >
                                        <img
                                          src={photo}
                                          alt=""
                                          className="w-6 h-6 rounded object-cover cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
                                        />
                                      </button>
                                    ))}
                                    {catPhotos.length > 3 && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setFullPhoto(catPhotos[0]);
                                        }}
                                        className="text-[8px] text-blue-300/50 hover:text-blue-300"
                                      >
                                        +{catPhotos.length - 3}
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-blue-300/15">·</span>
                            )}
                          </td>
                        );
                      })}
                      <td className="text-center py-2 px-1.5">
                        {catMoyenne !== null ? (
                          <div className="flex flex-col items-center">
                            <span className="text-white font-bold text-sm">{catMoyenne.toFixed(1)}</span>
                            <div className="h-1 w-8 bg-white/10 rounded-full mt-0.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${getBarColor(catMoyenne)}`}
                                style={{ width: `${Math.min(100, (catMoyenne / 9) * 100)}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="text-blue-300/15">·</span>
                        )}
                      </td>
                    </tr>
                  );
                })}

                {/* Ligne moyenne générale */}
                <tr className="border-t-2 border-blue-500/20 bg-blue-500/5">
                  <td className="sticky left-0 bg-blue-500/10 z-10 py-3 pr-3 text-blue-200 font-bold text-sm">
                    🏆 Générale
                  </td>
                  {sorted.map((r) => (
                    <td key={r.contestant.id} className="text-center py-3 px-1.5">
                      {r.moyenneGenerale !== null ? (
                        <div className="flex flex-col items-center">
                          <span className="text-white font-bold text-base">{r.moyenneGenerale.toFixed(1)}</span>
                          <div className="h-1.5 w-10 bg-white/10 rounded-full mt-0.5 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${getBarColor(r.moyenneGenerale)}`}
                              style={{ width: `${Math.min(100, (r.moyenneGenerale / 9) * 100)}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-blue-300/30 text-xs">Pas noté</span>
                      )}
                    </td>
                  ))}
                  <td className="text-center py-3 px-1.5">
                    {(() => {
                      const allMoy = sorted.filter(r => r.moyenneGenerale !== null).map(r => r.moyenneGenerale!);
                      if (allMoy.length === 0) return <span className="text-blue-300/30 text-xs">—</span>;
                      const generalAvg = allMoy.reduce((a, b) => a + b, 0) / allMoy.length;
                      return (
                        <div className="flex flex-col items-center">
                          <span className="text-white font-bold">{generalAvg.toFixed(1)}</span>
                          <span className="text-blue-300/30 text-[9px]">{allMoy.length} notés</span>
                        </div>
                      );
                    })()}
                  </td>
                </tr>

                {/* Ligne popularité */}
                <tr className="border-t border-white/5">
                  <td className="sticky left-0 bg-[#0a0f1e] z-10 py-2 pr-3 text-pink-300/60 font-medium">
                    ❤️ Popularité
                  </td>
                  {sorted.map((r) => (
                    <td key={r.contestant.id} className="text-center py-2 px-1.5">
                      {r.contestant.popularite > 0 ? (
                        <span className="text-pink-300 font-bold">{r.contestant.popularite}</span>
                      ) : (
                        <span className="text-blue-300/15">·</span>
                      )}
                    </td>
                  ))}
                  <td className="text-center py-2 px-1.5">
                    {(() => {
                      const totalPop = sorted.reduce((s, r) => s + r.contestant.popularite, 0);
                      return totalPop > 0 ? (
                        <span className="text-pink-300 font-bold">{totalPop}</span>
                      ) : (
                        <span className="text-blue-300/15">·</span>
                      );
                    })()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Légende */}
          <div className="text-center text-[10px] text-blue-300/30 space-y-1">
            <p>Catégories en lignes · Concurrents en colonnes · (nombre) = votes reçus</p>
            <p>📸 Photo dans le vote → coefficient ×3 pour ce jury</p>
            <p>Cliquez sur une photo pour l&apos;afficher en plein écran</p>
          </div>
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
      </div>
    </div>
  );
}
