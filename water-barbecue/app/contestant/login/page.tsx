"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContestantLoginPage() {
  const router = useRouter();
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    if (!pseudo.trim() || !password.trim()) {
      setMessage("Pseudo et mot de passe requis");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/contestants/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo: pseudo.trim(), password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Stocker en sessionStorage
        sessionStorage.setItem("contestant", JSON.stringify(data.contestant));
        router.push("/contestant/dashboard");
      } else {
        setMessage(data.error || "Erreur de connexion");
        setStatus("error");
      }
    } catch {
      setMessage("Erreur réseau");
      setStatus("error");
    }
  };

  return (
    <div className="space-y-6">
      <a href="/" className="text-blue-300 hover:text-blue-200 text-sm">← Accueil</a>

      <div className="text-center">
        <div className="text-4xl mb-2">🏄</div>
        <h1 className="text-2xl font-bold text-white">Connexion Concurrent</h1>
        <p className="text-blue-300 text-sm">Accède à ton espace personnel</p>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-blue-500/20 rounded-3xl p-6 space-y-4">
        <input
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300/50 text-center focus:outline-none focus:border-blue-400"
          placeholder="Ton pseudo"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300/50 text-center focus:outline-none focus:border-blue-400"
          placeholder="Ton mot de passe"
        />

        {status === "error" && (
          <p className="text-red-400 text-sm text-center bg-red-500/10 rounded-xl px-4 py-2">{message}</p>
        )}

        <button
          onClick={handleLogin}
          disabled={status === "loading"}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 rounded-2xl hover:from-blue-500 hover:to-cyan-500 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {status === "loading" ? "Connexion..." : "🔑 Se connecter"}
        </button>

        <p className="text-blue-300/40 text-xs text-center">
          Pas encore inscrit ? <a href="/register/contestant" className="text-blue-300 underline">Inscris-toi</a>
        </p>
      </div>
    </div>
  );
}
