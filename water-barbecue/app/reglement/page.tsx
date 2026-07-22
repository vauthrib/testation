"use client";

import { useEffect, useState } from "react";
import { renderMarkdown } from "@/lib/markdown";

export default function ReglementPage() {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/content/reglement.md")
      .then((res) => res.text())
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => {
        setContent("Erreur de chargement du règlement.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-4xl animate-bounce mb-4">📋</div>
          <p className="text-blue-200 text-lg">Chargement du règlement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-8">
      <div className="flex items-center justify-between">
        <a href="/" className="text-blue-300 hover:text-blue-200 text-sm">← Accueil</a>
      </div>

      <div className="text-center">
        <div className="text-5xl mb-2">📋</div>
        <h1 className="text-3xl font-bold text-white">Règlement de Course</h1>
        <p className="text-blue-300/60 text-sm mt-1">Water-Barbecue 2026</p>
      </div>

      <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl py-2 px-4 text-center">
        <p className="text-blue-300/50 text-xs">
          📝 Modifiable dans <code className="text-blue-300 bg-blue-500/10 px-1.5 py-0.5 rounded font-mono">public/content/reglement.md</code>
        </p>
      </div>

      <div
        className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl p-5 space-y-1"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
      />

      <div className="text-center pt-4">
        <a
          href="/"
          className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 px-8 rounded-2xl hover:from-blue-500 hover:to-cyan-500 transition-all active:scale-[0.98]"
        >
          🏠 Retour à l'accueil
        </a>
      </div>
    </div>
  );
}
