"use client";

import { useEffect, useState } from "react";

interface Contestant {
  id: number;
  pseudo: string;
  age: number;
  prenom: string;
}

interface Juror {
  id: number;
  pseudo: string;
  type: string;
  coeff: number;
}

interface Category {
  id: number;
  name: string;
}

interface Rating {
  id: number;
  contestantId: number;
  jurorId: number;
  categoryId: number;
  value: number;
  contestant: Contestant;
  juror: Juror;
  category: Category;
}

export default function JuryListPage() {
  const [jurors, setJurors] = useState<Juror[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedJuror, setExpandedJuror] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string>("ALL");

  const fetchData = async () => {
    try {
      const [jurorsRes, ratingsRes, contestantsRes] = await Promise.all([
        fetch("/api/jurors/register"),
        fetch("/api/ratings"),
        fetch("/api/contestants/register"),
      ]);
      const jurorsData = await jurorsRes.json();
      const ratingsData = await ratingsRes.json();
      const contestantsData = await contestantsRes.json();
      setJurors(jurorsData.jurors || []);
      setRatings(ratingsData.ratings || []);
      setContestants(contestantsData.contestants || []);
      setCategories(contestantsData.categories || []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getJurorTypeLabel = (type: string) => {
    switch (type) {
      case "DONNATEUR": return { label: "Donnateur", coeff: "×6", color: "from-yellow-500 to-amber-600" };
      case "FAMILY": return { label: "Family", coeff: "×4", color: "from-cyan-500 to-blue-600" };
      case "CURIEUX": return { label: "Curieux", coeff: "×2", color: "from-purple-500 to-pink-600" };
      default: return { label: type, coeff: "×?", color: "from-gray-500 to-gray-700" };
    }
  };

  const getRatingsForJuror = (jurorId: number) =>
    ratings.filter((r) => r.jurorId === jurorId);

  const getRatingForJurorContestantCategory = (
    jurorId: number,
    contestantId: number,
    categoryId: number
  ) => ratings.find((r) => r.jurorId === jurorId && r.contestantId === contestantId && r.categoryId === categoryId);

  const filteredJurors =
    filterType === "ALL"
      ? jurors
      : jurors.filter((j) => j.type === filterType);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-4xl animate-bounce mb-4">⚖️</div>
          <p className="text-blue-200 text-lg">Chargement des jurys...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <a href="/" className="text-blue-300 hover:text-blue-200 text-sm">← Accueil</a>
        <button
          onClick={fetchData}
          className="text-blue-300 hover:text-blue-200 text-sm bg-white/5 px-3 py-1.5 rounded-xl transition-all"
        >
          🔄 Rafraîchir
        </button>
      </div>

      <div className="text-center">
        <div className="text-4xl mb-2">⚖️</div>
        <h1 className="text-2xl font-bold text-white">Jurys et Votes</h1>
        <p className="text-orange-300 text-sm">
          {jurors.length} jurys inscrits · {ratings.length} votes au total
        </p>
      </div>

      {/* Filtres par type */}
      {jurors.length > 0 && (
        <div className="flex gap-2 justify-center flex-wrap">
          {["ALL", "DONNATEUR", "FAMILY", "CURIEUX"].map((type) => {
            const count = type === "ALL" ? jurors.length : jurors.filter((j) => j.type === type).length;
            const isActive = filterType === type;
            const typeInfo = getJurorTypeLabel(type);
            return (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? type === "ALL"
                      ? "bg-white/20 text-white border border-white/30"
                      : `bg-gradient-to-r ${typeInfo.color} text-white`
                    : "bg-white/5 text-blue-300/60 border border-white/10 hover:text-white"
                }`}
              >
                {type === "ALL" ? "Tous" : typeInfo.label} ({count})
              </button>
            );
          })}
        </div>
      )}

      {jurors.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 text-center">
          <div className="text-4xl mb-2">⚖️</div>
          <p className="text-orange-200">Aucun jury inscrit pour le moment.</p>
          <a href="/jury/register" className="text-blue-300 underline text-sm mt-2 inline-block">
            Devenir jury
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJurors.map((juror) => {
            const jurorRatings = getRatingsForJuror(juror.id);
            const jurorType = getJurorTypeLabel(juror.type);
            const nbVotes = jurorRatings.length;
            const nbContestantsVoted = new Set(jurorRatings.map((r) => r.contestantId)).size;
            const expanded = expandedJuror === juror.id;

            return (
              <div
                key={juror.id}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden transition-all hover:border-orange-500/30"
              >
                <button
                  onClick={() => setExpandedJuror(expanded ? null : juror.id)}
                  className="w-full p-5 flex items-center gap-4 text-left"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${jurorType.color} rounded-2xl flex items-center justify-center text-xl font-bold text-white shrink-0`}
                  >
                    {juror.pseudo.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-lg truncate">{juror.pseudo}</div>
                    <div className="text-blue-300 text-xs">
                      {jurorType.label} <span className="text-orange-300">({jurorType.coeff})</span>
                      {" · "}
                      {nbContestantsVoted} concurrents notés · {nbVotes} votes
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-bold ${expanded ? "text-orange-300" : "text-blue-300/50"}`}>
                      {expanded ? "▼" : "▶"}
                    </div>
                  </div>
                </button>

                {expanded && (
                  <div className="px-5 pb-5 border-t border-white/10 pt-4 space-y-4">
                    {contestants.length === 0 ? (
                      <p className="text-blue-300/50 text-sm text-center">Aucun concurrent inscrit</p>
                    ) : (
                      contestants.map((c) => {
                        const cRatings = jurorRatings.filter((r) => r.contestantId === c.id);
                        const cMoyenne =
                          cRatings.length > 0
                            ? cRatings.reduce((s, r) => s + r.value, 0) / cRatings.length
                            : null;

                        return (
                          <div
                            key={c.id}
                            className="bg-white/5 rounded-2xl p-3 border border-white/5"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white font-semibold text-sm">{c.pseudo}</span>
                              {cMoyenne ? (
                                <span className="text-orange-300 font-bold text-sm">
                                  {cMoyenne.toFixed(1)}/9
                                </span>
                              ) : (
                                <span className="text-blue-300/30 text-xs">Pas noté</span>
                              )}
                            </div>
                            {cRatings.length > 0 && (
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                                {categories.map((cat) => {
                                  const rating = getRatingForJurorContestantCategory(
                                    juror.id,
                                    c.id,
                                    cat.id
                                  );
                                  return (
                                    <div
                                      key={cat.id}
                                      className={`flex items-center justify-between px-2 py-1 rounded-lg text-xs ${
                                        rating
                                          ? "bg-blue-500/10 text-blue-200"
                                          : "text-blue-300/20"
                                      }`}
                                    >
                                      <span className="truncate mr-1">{cat.name}</span>
                                      <span className={`font-bold shrink-0 ${
                                        rating ? "text-white" : ""
                                      }`}>
                                        {rating ? `${rating.value}/9` : "-"}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="text-center space-y-2">
        <a
          href="/vote"
          className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-6 rounded-2xl hover:from-orange-400 hover:to-red-400 transition-all active:scale-[0.98]"
        >
          🎯 Voter
        </a>
        <a
          href="/results"
          className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-2xl hover:bg-blue-500 transition-all active:scale-[0.98] ml-2"
        >
          🏆 Classement
        </a>
        <p className="text-blue-300/20 text-xs">Clique sur un jury pour voir ses votes</p>
      </div>
    </div>
  );
}
