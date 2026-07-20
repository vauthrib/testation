"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Contestant {
  id: number;
  pseudo: string;
  age: number;
  prenom: string;
}

interface Category {
  id: number;
  name: string;
}

function VoteContent() {
  const searchParams = useSearchParams();
  const [jurorPseudo, setJurorPseudo] = useState(searchParams.get("juror") || "");
  const [jurorId, setJurorId] = useState<number | null>(null);
  const [showJurorSearch, setShowJurorSearch] = useState(!searchParams.get("juror"));

  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [ratings, setRatings] = useState<Record<string, Record<number, number>>>({});
  const [ratingsPhoto, setRatingsPhoto] = useState<Record<string, Record<number, string>>>({});
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const [selectedContestant, setSelectedContestant] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/contestants/register")
      .then((r) => r.json())
      .then((d) => {
        setContestants(d.contestants);
        setCategories(d.categories);
      })
      .catch(() => {});
  }, []);

  const findJuror = async () => {
    if (!jurorPseudo.trim()) return;
    try {
      const res = await fetch("/api/jurors/register");
      const data = await res.json();
      const juror = data.jurors.find(
        (j: { pseudo: string; id: number }) =>
          j.pseudo.toLowerCase() === jurorPseudo.trim().toLowerCase()
      );
      if (juror) {
        setJurorId(juror.id);
        setShowJurorSearch(false);
      } else {
        setStatus("error");
        setMessage("Jury introuvable - inscris-toi d'abord !");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setMessage("Erreur réseau");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  // Re-trouver le jury quand le pseudo change
  useEffect(() => {
    if (jurorPseudo && !showJurorSearch && !jurorId) {
      findJuror();
    }
  }, [jurorPseudo]);

  const setNote = (contestantId: number, categoryId: number, value: number) => {
    setRatings((prev) => ({
      ...prev,
      [contestantId]: { ...(prev[contestantId] || {}), [categoryId]: value },
    }));
  };

  const handlePhotoUpload = async (contestantId: number, categoryId: number, file: File) => {
    setUploadingPhoto(true);
    try {
      const reader = new FileReader();
      reader.onload = () => {
        setRatingsPhoto((prev) => ({
          ...prev,
          [contestantId]: { ...(prev[contestantId] || {}), [categoryId]: reader.result as string },
        }));
        setUploadingPhoto(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setUploadingPhoto(false);
    }
  };

  const submitVotes = async (contestantId: number) => {
    if (!jurorId) return;
    const contestantRatings = ratings[contestantId];
    if (!contestantRatings) {
      setMessage("Donne au moins une note !");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
      return;
    }

    const ratingsArray = Object.entries(contestantRatings).map(([catId, value]) => ({
      categoryId: parseInt(catId),
      value,
      photoUrl: ratingsPhoto[contestantId]?.[parseInt(catId)] || null,
    }));

    setStatus("loading");
    try {
      const res = await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contestantId,
          jurorId,
          ratings: ratingsArray,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage(`✔️ Notes enregistrées pour ${contestants.find(c => c.id === contestantId)?.pseudo}`);
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        const data = await res.json();
        setStatus("error");
        setMessage(data.error || "Erreur");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setMessage("Erreur réseau");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const getMoyenneContestant = (id: number) => {
    const r = ratings[id];
    if (!r) return null;
    const vals = Object.values(r);
    if (vals.length === 0) return null;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  };

  if (showJurorSearch) {
    return (
      <div className="space-y-6">
        <a href="/" className="text-blue-300 hover:text-blue-200 text-sm">← Accueil</a>
        <div className="bg-white/5 backdrop-blur-lg border border-orange-500/20 rounded-3xl p-6 text-center space-y-4">
          <div className="text-4xl">⚖️</div>
          <h2 className="text-xl font-bold text-white">Qui es-tu ?</h2>
          <p className="text-orange-200 text-sm">Entre ton pseudo de jury pour voter</p>
          <input
            value={jurorPseudo}
            onChange={(e) => setJurorPseudo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && findJuror()}
            className="w-full bg-white/10 border border-orange-500/30 rounded-xl px-4 py-3 text-white placeholder-orange-300/50 focus:outline-none focus:border-orange-400 text-center text-lg"
            placeholder="Ton pseudo jury"
            maxLength={30}
          />
          {status === "error" && (
            <p className="text-red-400 text-sm">{message}</p>
          )}
          <button
            onClick={findJuror}
            disabled={!jurorPseudo.trim()}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-2xl hover:from-orange-400 hover:to-red-400 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            🔍 Me connecter
          </button>
          <p className="text-blue-300/40 text-xs">
            Pas encore inscrit ? <a href="/jury/register" className="text-orange-300 underline">Deviens jury</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <a href="/" className="text-blue-300 hover:text-blue-200 text-sm">← Accueil</a>
        <button
          onClick={() => setShowJurorSearch(true)}
          className="text-orange-300 hover:text-orange-200 text-sm bg-white/5 px-3 py-1.5 rounded-xl"
        >
          Changer de jury
        </button>
      </div>

      <div className="text-center">
        <div className="text-4xl mb-2">⚖️</div>
        <h1 className="text-2xl font-bold text-white">Voter</h1>
        <p className="text-orange-300 text-sm">
          Jury : <span className="font-bold text-white">{jurorPseudo}</span>
        </p>
      </div>

      {message && (
        <div
          className={`text-center py-3 px-4 rounded-2xl text-sm font-medium transition-all ${
            status === "success"
              ? "bg-green-500/20 text-green-300 border border-green-500/30"
              : status === "error"
              ? "bg-red-500/20 text-red-300 border border-red-500/30"
              : "bg-blue-500/20 text-blue-300"
          }`}
        >
          {message}
        </div>
      )}

      {contestants.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 text-center">
          <div className="text-4xl mb-2">🏄</div>
          <p className="text-blue-200">Aucun concurrent inscrit pour le moment.</p>
          <a href="/register/contestant" className="text-orange-300 underline text-sm mt-2 inline-block">
            Inscrire un concurrent
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-blue-300/60 text-xs text-center">
            Note chaque concurrent de 1 à 9 dans chaque catégorie
          </p>

          {contestants.map((c) => {
            const expanded = selectedContestant === c.id;
            const moyenne = getMoyenneContestant(c.id);
            const nbNotes = ratings[c.id] ? Object.keys(ratings[c.id]).length : 0;

            return (
              <div
                key={c.id}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden transition-all hover:border-blue-500/30"
              >
                <button
                  onClick={() => setSelectedContestant(expanded ? null : c.id)}
                  className="w-full p-5 flex items-center gap-4 text-left"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center text-xl font-bold text-white">
                    {c.pseudo.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-lg truncate">{c.pseudo}</div>
                    <div className="text-blue-300 text-xs">{c.prenom}, {c.age} ans</div>
                  </div>
                  <div className="text-right">
                    {moyenne ? (
                      <div className="text-lg font-bold text-white">{moyenne.toFixed(1)}</div>
                    ) : (
                      <div className="text-blue-300/50 text-lg">-</div>
                    )}
                    <div className="text-blue-300/40 text-xs">{nbNotes}/{categories.length}</div>
                  </div>
                </button>

                {expanded && (
                  <div className="px-5 pb-5 space-y-3 border-t border-white/10 pt-4">
                    {categories.map((cat) => {
                      const currentValue = ratings[c.id]?.[cat.id] || 0;
                      const photo = ratingsPhoto[c.id]?.[cat.id];
                      return (
                        <div key={cat.id}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-blue-200 text-sm">{cat.name}</span>
                            <span className="text-white font-bold text-sm">
                              {currentValue || "-"}/9
                            </span>
                          </div>
                          <div className="flex gap-1.5">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                              <button
                                key={n}
                                onClick={() => setNote(c.id, cat.id, n)}
                                className={`flex-1 h-10 rounded-xl text-sm font-bold transition-all ${
                                  currentValue === n
                                    ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white scale-110 shadow-lg"
                                    : "bg-white/10 text-blue-300/60 hover:bg-white/20 hover:text-white"
                                }`}
                              >
                                {n}
                              </button>
                            ))}
                          </div>
                          {/* Photo upload */}
                          <div className="mt-2 flex items-center gap-2">
                            <label className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs cursor-pointer transition-all ${
                              photo ? "bg-green-500/20 text-green-300 border border-green-500/30" : "bg-white/5 text-blue-300/60 border border-dashed border-white/20 hover:text-white hover:border-white/40"
                            }`}>
                              <span>{photo ? "📸 Photo ajoutée" : "📷 Ajouter une photo (booste le vote)"}</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                disabled={uploadingPhoto}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handlePhotoUpload(c.id, cat.id, file);
                                }}
                              />
                            </label>
                            {photo && (
                              <button
                                onClick={() => setRatingsPhoto((prev) => {
                                  const updated = { ...prev };
                                  if (updated[c.id]) delete updated[c.id][cat.id];
                                  return updated;
                                })}
                                className="text-red-400 text-xs hover:text-red-300"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    <button
                      onClick={() => submitVotes(c.id)}
                      disabled={status === "loading" || nbNotes === 0}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-2xl hover:from-orange-400 hover:to-red-400 transition-all active:scale-[0.98] disabled:opacity-50 mt-2"
                    >
                      {status === "loading" ? "Envoi..." : "📤 Envoyer les notes"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="text-center space-y-2">
        <div className="flex gap-3 justify-center">
          <a href="/results" className="text-blue-300 hover:text-blue-200 text-sm underline">
            🏆 Classement
          </a>
          <a href="/jury/list" className="text-orange-300 hover:text-orange-200 text-sm underline">
            👥 Jurys
          </a>
        </div>
      </div>
    </div>
  );
}

export default function VotePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-4xl animate-bounce mb-4">⚖️</div>
          <p className="text-blue-200 text-lg">Chargement...</p>
        </div>
      </div>
    }>
      <VoteContent />
    </Suspense>
  );
}
