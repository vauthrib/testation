"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  return (
    <div className="space-y-5 min-h-screen flex flex-col items-center justify-center">
      {/* Header */}
      <div className="text-center animate-float">
        <div className="text-5xl mb-2">🚤🔥</div>
        <h1 className="text-4xl font-bold text-white mb-2">Water-Barbecue</h1>
        <p className="text-blue-200 text-lg">Compétition d'embarcations flottantes</p>
        <p className="text-blue-300/60 text-sm mt-1">Votez pour votre équipage préféré !</p>
      </div>

      {/* Programme en haut - avec plus de couleurs */}
      <div className="w-full bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 border border-yellow-500/30 rounded-3xl p-4 space-y-2 animate-pulse-glow">
        <div className="text-center">
          <span className="text-yellow-300 text-sm font-bold">📅 Programme 2026</span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>
            <span className="text-blue-300/60">23 Juil · Fin inscriptions</span>
          </div>
          <span className="text-white font-semibold text-right">16h00</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-400 inline-block"></span>
            <span className="text-blue-300/60">24 Juil · Début fabrication</span>
          </div>
          <span className="text-white font-semibold text-right">8h30</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
            <span className="text-blue-300/60">25 Juil · Mise à l'eau</span>
          </div>
          <span className="text-white font-semibold text-right">16h00</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse inline-block"></span>
            <span className="text-orange-300 font-semibold">25 Juil · 🔥 Largage amarres</span>
          </div>
          <span className="text-white font-bold text-right">20h30</span>
        </div>
        <div className="mt-2 pt-2 border-t border-yellow-500/20 text-center">
          <span className="text-blue-300/40 text-[10px]">23 au 25 Juillet 2026</span>
        </div>
      </div>

      {/* QR Codes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-2">
        {/* QR Concurrent */}
        <a
          href={baseUrl ? `/register/contestant` : "#"}
          className="group bg-white/5 backdrop-blur-lg border border-blue-500/30 rounded-3xl p-6 text-center hover:bg-blue-500/10 transition-all hover:scale-[1.02] animate-pulse-glow"
        >
          <div className="text-3xl mb-2">🏄</div>
          <h2 className="text-xl font-bold text-white mb-1">Je suis Concurrent</h2>
          <p className="text-blue-300 text-sm mb-3">Inscris-toi pour participer !</p>
          <div className="bg-white p-3 rounded-2xl inline-block">
            <QRCodeDisplay url={baseUrl ? `${baseUrl}/register/contestant` : ""} />
          </div>
          <p className="text-blue-300/50 text-xs mt-2">Scanne pour t'inscrire</p>
        </a>

        {/* QR Jury */}
        <a
          href={baseUrl ? `/jury/register` : "#"}
          className="group bg-white/5 backdrop-blur-lg border border-orange-500/30 rounded-3xl p-6 text-center hover:bg-orange-500/10 transition-all hover:scale-[1.02] animate-pulse-glow"
        >
          <div className="text-3xl mb-2">⚖️</div>
          <h2 className="text-xl font-bold text-white mb-1">Je suis Jury</h2>
          <p className="text-orange-300 text-sm mb-3">Donne ton avis éclairé !</p>
          <div className="bg-white p-3 rounded-2xl inline-block">
            <QRCodeDisplay url={baseUrl ? `${baseUrl}/jury/register` : ""} />
          </div>
          <p className="text-orange-300/50 text-xs mt-2">Scanne pour devenir jury</p>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        <a
          href={baseUrl ? `/results` : "#"}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-4 px-6 rounded-2xl text-center hover:from-blue-500 hover:to-cyan-500 transition-all active:scale-[0.98] text-lg"
        >
          🏆 Classement
        </a>
        <a
          href={baseUrl ? `/jury/list` : "#"}
          className="bg-white/10 border border-white/20 text-white font-bold py-4 px-6 rounded-2xl text-center hover:bg-white/20 transition-all active:scale-[0.98] text-lg"
        >
          👥 Jurys & Votes
        </a>
      </div>

      {/* Nouvelle section : Règlement et Comptage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        <a
          href={baseUrl ? `/reglement` : "#"}
          className="bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border border-yellow-500/30 text-yellow-200 font-bold py-4 px-6 rounded-2xl text-center hover:from-yellow-600/40 hover:to-orange-600/40 transition-all active:scale-[0.98] text-base"
        >
          📋 Règlement de course
        </a>
        <a
          href={baseUrl ? `/comptage` : "#"}
          className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/30 text-purple-200 font-bold py-4 px-6 rounded-2xl text-center hover:from-purple-600/40 hover:to-pink-600/40 transition-all active:scale-[0.98] text-base"
        >
          🧮 Méthode de calcul
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        <a
          href={baseUrl ? `/contestant/login` : "#"}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-4 rounded-2xl text-center hover:from-blue-400 hover:to-blue-600 transition-all active:scale-[0.98] text-sm"
        >
          🏄 Espace Concurrent
        </a>
        <a
          href={baseUrl ? `/admin` : "#"}
          className="bg-white/5 border border-red-500/20 text-red-300 font-bold py-3 px-4 rounded-2xl text-center hover:bg-white/10 transition-all active:scale-[0.98] text-sm"
        >
          🔧 Administration
        </a>
      </div>

      <p className="text-blue-300/30 text-xs text-center mt-4">
        Water-Barbecue 2026 · 23-25 Juillet · Tous droits réservés
      </p>
    </div>
  );
}

function QRCodeDisplay({ url }: { url: string }) {
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) return;
    try {
      import("qrcode").then((QRCode) => {
        QRCode.default.toDataURL(url, {
          width: 180,
          margin: 1,
          color: { dark: "#1e3a5f", light: "#ffffff" },
        }).then(setDataUrl).catch(() => setError(true));
      });
    } catch {
      setError(true);
    }
  }, [url]);

  if (error || !dataUrl) {
    return <div className="w-[180px] h-[180px] bg-blue-50 rounded-xl flex items-center justify-center text-blue-800 text-sm">QR Code</div>;
  }

  return <img src={dataUrl} alt="QR Code" className="w-[180px] h-[180px] rounded-xl" />;
}
