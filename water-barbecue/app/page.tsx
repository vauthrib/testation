"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  return (
    <div className="space-y-6 min-h-screen flex flex-col items-center justify-center">
      {/* Header */}
      <div className="text-center animate-float">
        <div className="text-5xl mb-2">🚤🔥</div>
        <h1 className="text-4xl font-bold text-white mb-2">Water-Barbecue</h1>
        <p className="text-blue-200 text-lg">Compétition d'embarcations flottantes</p>
        <p className="text-blue-300/60 text-sm mt-1">Votez pour votre équipage préféré !</p>
      </div>

      {/* QR Codes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
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

      {/* Voir les résultats */}
      <a
        href={baseUrl ? `/results` : "#"}
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-4 px-6 rounded-2xl text-center hover:from-blue-500 hover:to-cyan-500 transition-all active:scale-[0.98] text-lg"
      >
        🏆 Voir le classement
      </a>

      <p className="text-blue-300/30 text-xs text-center mt-4">
        Water-Barbecue 2026 - Tous droits réservés
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
