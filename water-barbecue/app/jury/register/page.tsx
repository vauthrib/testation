"use client";

import { useState } from "react";

const JURY_TYPES = [
  { value: "DONNATEUR", label: "Donnateur", coeff: "×6", desc: "Poids fort - parrain/mécène", color: "from-yellow-500 to-amber-600" },
  { value: "FAMILY", label: "Family", coeff: "×4", desc: "Poids moyen - famille/amis", color: "from-cyan-500 to-blue-600" },
  { value: "CURIEUX", label: "Curieux", coeff: "×2", desc: "Poids léger - public/visiteur", color: "from-purple-500 to-pink-600" },
];

export default function RegisterJuryPage() {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pseudo.trim() || !type) {
      setStatus("error");
      setMessage("Pseudo et type de jury requis");
      return;
    }
    if (!email.includes("@")) {
      setStatus("error");
      setMessage("Email valide requis");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/jurors/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo: pseudo.trim(), email: email.trim(), type }),
      });

      const data = await res.json();

      if (res.ok) {
        const needsValidation = type === "DONNATEUR" || type === "FAMILY";
        const extraMsg = needsValidation
          ? " En attente de validation par les concurrents."
          : " Tu peux voter immédiatement !";
        setStatus("success");
        setMessage(`Bienvenue ${data.juror.pseudo} ! Tu es maintenant jury (${type}) avec un coefficient ${data.juror.coeff}.${extraMsg}`);
      } else {
        setStatus("error");
        setMessage(data.error || "Erreur d'inscription");
      }
    } catch {
      setStatus("error");
      setMessage("Erreur réseau");
    }
  };

  if (status === "success") {
    return (
      <div className="space-y-6">
        <a href="/" className="text-blue-300 hover:text-blue-200 text-sm">← Retour</a>
        <div className="bg-green-500/10 border border-green-500/30 rounded-3xl p-8 text-center space-y-4">
          <div className="text-5xl">⚖️</div>
          <p className="text-green-300 font-bold text-lg">{message}</p>
          <p className="text-green-200/60 text-sm">Tu peux maintenant évaluer les concurrents !</p>
          <div className="flex gap-3 justify-center flex-wrap">
            {type !== "DONNATEUR" && type !== "FAMILY" ? (
              <a href={`/vote?juror=${encodeURIComponent(pseudo)}`} className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-6 rounded-2xl hover:from-orange-400 hover:to-red-400 transition-all">
                🎯 Voter maintenant
              </a>
            ) : (
              <a href="/contestant/dashboard" className="bg-orange-600/40 text-orange-300 font-bold py-3 px-6 rounded-2xl hover:bg-orange-600/60 transition-all border border-orange-500/30">
                ⏳ En attente de validation
              </a>
            )}
            <a href="/results" className="bg-green-600 text-white font-semibold py-3 px-6 rounded-2xl hover:bg-green-500 transition-all">
              🏆 Classement
            </a>
            <a href="/" className="bg-white/10 text-white font-semibold py-3 px-6 rounded-2xl hover:bg-white/20 transition-all">
              Accueil
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <a href="/" className="text-blue-300 hover:text-blue-200 text-sm">← Retour</a>

      <div className="text-center">
        <div className="text-4xl mb-2">⚖️</div>
        <h1 className="text-2xl font-bold text-white">Inscription Jury</h1>
        <p className="text-orange-300 text-sm">Donne ton avis sur les embarcations !</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-lg border border-orange-500/20 rounded-3xl p-6 space-y-4">
        <div>
          <label className="block text-orange-200 text-sm font-medium mb-1">Pseudo</label>
          <input
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            className="w-full bg-white/10 border border-orange-500/30 rounded-xl px-4 py-3 text-white placeholder-orange-300/50 focus:outline-none focus:border-orange-400 transition-all"
            placeholder="Ex: JudgeDredd"
            maxLength={30}
          />
        </div>
        <div>
          <label className="block text-orange-200 text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/10 border border-orange-500/30 rounded-xl px-4 py-3 text-white placeholder-orange-300/50 focus:outline-none focus:border-orange-400 transition-all"
            placeholder="Ex: judge@email.com"
          />
        </div>

        <div>
          <label className="block text-orange-200 text-sm font-medium mb-3">Type de jury (coefficient)</label>
          <div className="grid gap-3">
            {JURY_TYPES.map((jt) => (
              <button
                key={jt.value}
                type="button"
                onClick={() => setType(jt.value)}
                className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                  type === jt.value
                    ? "bg-gradient-to-r " + jt.color + " border-white/50 scale-[1.02]"
                    : "bg-white/5 border-white/10 hover:border-white/30"
                }`}
              >
                <div className={`text-3xl ${type === jt.value ? "" : "opacity-50"}`}>
                  {jt.value === "DONNATEUR" ? "👑" : jt.value === "FAMILY" ? "👨‍👩‍👧‍👦" : "👀"}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-white text-lg">{jt.label}</div>
                  <div className="text-white/60 text-sm">{jt.desc}</div>
                </div>
                <div className={`text-2xl font-bold ${type === jt.value ? "text-white" : "text-orange-300"}`}>
                  {jt.coeff}
                </div>
              </button>
            ))}
          </div>
        </div>

        {status === "error" && (
          <p className="text-red-400 text-sm bg-red-500/10 rounded-xl px-4 py-2">{message}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading" || !type}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 px-6 rounded-2xl hover:from-orange-400 hover:to-red-400 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {status === "loading" ? "Inscription..." : "⚖️ Devenir Jury"}
        </button>
      </form>
    </div>
  );
}
