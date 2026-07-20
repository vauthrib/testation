"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PopularitePage() {
  const params = useParams();
  const id = params?.id as string;

  const [status, setStatus] = useState<"loading" | "success" | "error" | "already">("loading");
  const [pseudo, setPseudo] = useState("");
  const [popularite, setPopularite] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const incrementPopularite = async () => {
      try {
        // Vérifier si déjà voté via localStorage
        const already = localStorage.getItem(`popularite_${id}`);
        
        const res = await fetch(`/api/contestants/popularite/${id}`, {
          method: already ? "GET" : "POST",
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Erreur");
          setStatus("error");
          return;
        }

        setPseudo(data.pseudo);
        setPopularite(data.popularite);

        if (already) {
          setStatus("already");
        } else {
          setStatus("success");
          localStorage.setItem(`popularite_${id}`, "1");
        }
      } catch {
        setError("Erreur réseau");
        setStatus("error");
      }
    };

    incrementPopularite();
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-sm w-full space-y-6 text-center">
        <Link href="/" className="text-blue-300 hover:text-blue-200 text-sm block">
          ← Retour à l'accueil
        </Link>

        {status === "loading" && (
          <div className="bg-white/5 backdrop-blur-lg border border-blue-500/20 rounded-3xl p-8 space-y-4">
            <div className="text-5xl animate-bounce">❤️</div>
            <p className="text-blue-200 text-lg">Ajout de popularité...</p>
          </div>
        )}

        {status === "success" && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-3xl p-8 space-y-4 animate-float">
            <div className="text-6xl">🎉</div>
            <h1 className="text-2xl font-bold text-white">+1 Popularité !</h1>
            <div className="bg-white/5 rounded-2xl p-4 space-y-2">
              <div className="text-3xl font-bold text-white">{pseudo}</div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-pink-400 text-lg">❤️</span>
                <span className="text-white font-bold text-2xl">{popularite}</span>
                <span className="text-blue-300/50 text-sm">points</span>
              </div>
            </div>
            <p className="text-green-200 text-sm">
              Merci de soutenir ce concurrent !<br />
              Chaque vote compte pour le classement de popularité.
            </p>
          </div>
        )}

        {status === "already" && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-3xl p-8 space-y-4">
            <div className="text-5xl">😊</div>
            <h1 className="text-xl font-bold text-yellow-300">Déjà voté !</h1>
            <div className="text-white text-lg font-bold">{pseudo}</div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-pink-400 text-lg">❤️</span>
              <span className="text-white font-bold text-2xl">{popularite}</span>
              <span className="text-blue-300/50 text-sm">points</span>
            </div>
            <p className="text-yellow-200 text-sm">
              Tu as déjà donné un point de popularité pour ce concurrent.
              <br />Merci pour ton soutien !
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-8 space-y-4">
            <div className="text-5xl">😕</div>
            <h1 className="text-xl font-bold text-red-300">Oups !</h1>
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        <div className="flex justify-center gap-3">
          <Link
            href="/results"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 px-6 rounded-2xl hover:from-blue-500 hover:to-cyan-500 transition-all"
          >
            🏆 Classement
          </Link>
          <Link
            href="/"
            className="bg-white/10 text-white font-semibold py-3 px-6 rounded-2xl hover:bg-white/20 transition-all"
          >
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
