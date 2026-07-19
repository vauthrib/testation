"use client";

import { useState } from "react";

export default function RegisterContestantPage() {
  const [pseudo, setPseudo] = useState("");
  const [age, setAge] = useState("");
  const [prenom, setPrenom] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [contestant, setContestant] = useState<{ pseudo: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pseudo.trim() || !age.trim() || !prenom.trim()) {
      setStatus("error");
      setMessage("Tous les champs sont requis");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/contestants/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo: pseudo.trim(), age: parseInt(age), prenom: prenom.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setContestant(data.contestant);
        setMessage(`Bienvenue ${data.contestant.pseudo} ! Tu es inscrit ! 🎉`);
      } else {
        setStatus("error");
        setMessage(data.error || "Erreur lors de l'inscription");
      }
    } catch {
      setStatus("error");
      setMessage("Erreur réseau");
    }
  };

  return (
    <div className="space-y-6">
      <a href="/" className="text-blue-300 hover:text-blue-200 text-sm">
        ← Retour
      </a>

      <div className="text-center">
        <div className="text-4xl mb-2">🏄</div>
        <h1 className="text-2xl font-bold text-white">Inscription Concurrent</h1>
        <p className="text-blue-300 text-sm">Rejoins la course Water-Barbecue !</p>
      </div>

      {status === "success" && contestant ? (
        <div className="bg-green-500/10 border border-green-500/30 rounded-3xl p-8 text-center space-y-4">
          <div className="text-5xl">🎉</div>
          <p className="text-green-300 font-bold text-xl">{message}</p>
          <p className="text-green-200/60 text-sm">
            Un jury va bientôt évaluer ta création. Bonne chance ! 🚤
          </p>
          <a
            href="/"
            className="inline-block bg-green-600 text-white font-semibold py-3 px-8 rounded-2xl hover:bg-green-500 transition-all"
          >
            Retour à l'accueil
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-lg border border-blue-500/20 rounded-3xl p-6 space-y-4">
          <div>
            <label className="block text-blue-200 text-sm font-medium mb-1">Pseudo</label>
            <input
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 transition-all"
              placeholder="Ex: AquaMaster"
              maxLength={30}
            />
          </div>
          <div>
            <label className="block text-blue-200 text-sm font-medium mb-1">Prénom</label>
            <input
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 transition-all"
              placeholder="Ex: Jean"
              maxLength={30}
            />
          </div>
          <div>
            <label className="block text-blue-200 text-sm font-medium mb-1">Âge</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 transition-all"
              placeholder="Ex: 25"
              min={1}
              max={120}
            />
          </div>

          {status === "error" && (
            <p className="text-red-400 text-sm bg-red-500/10 rounded-xl px-4 py-2">{message}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-4 px-6 rounded-2xl hover:from-blue-500 hover:to-cyan-500 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {status === "loading" ? "Inscription..." : "🚀 S'inscrire"}
          </button>
        </form>
      )}
    </div>
  );
}
