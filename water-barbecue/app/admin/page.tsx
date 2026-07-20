"use client";

import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [editCategory, setEditCategory] = useState<{ id: number; name: string } | null>(null);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const ADMIN_USER = "ben";
  const ADMIN_PASS = "7595";

  const handleLogin = () => {
    if (login === ADMIN_USER && password === ADMIN_PASS) {
      setLoggedIn(true);
      setAuthError("");
    } else {
      setAuthError("Identifiants incorrects");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch {}
  };

  useEffect(() => {
    if (loggedIn) fetchCategories();
  }, [loggedIn]);

  const addCategory = async () => {
    if (!newCategory.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password, name: newCategory.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ Catégorie "${newCategory}" ajoutée`);
        setNewCategory("");
        fetchCategories();
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch {
      setMessage("❌ Erreur");
    }
    setStatus("idle");
    setTimeout(() => setMessage(""), 3000);
  };

  const updateCategory = async () => {
    if (!editCategory || !editCategory.name.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password, id: editCategory.id, name: editCategory.name.trim() }),
      });
      if (res.ok) {
        setMessage("✅ Catégorie modifiée");
        setEditCategory(null);
        fetchCategories();
      }
    } catch {}
    setStatus("idle");
    setTimeout(() => setMessage(""), 3000);
  };

  const deleteCategory = async (id: number) => {
    if (!confirm("Supprimer cette catégorie ? Les notes associées seront aussi supprimées.")) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password, id }),
      });
      if (res.ok) {
        setMessage("✅ Catégorie supprimée");
        fetchCategories();
      }
    } catch {}
    setStatus("idle");
    setTimeout(() => setMessage(""), 3000);
  };

  const deleteContestants = async () => {
    if (!confirm("⚠️ Supprimer TOUS les concurrents ? Cette action est irréversible !")) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/cleanup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password, action: "delete_contestants" }),
      });
      const data = await res.json();
      setMessage(res.ok ? `✅ ${data.message}` : `❌ ${data.error}`);
    } catch {}
    setStatus("idle");
    setTimeout(() => setMessage(""), 3000);
  };

  const deleteJurors = async () => {
    if (!confirm("⚠️ Supprimer TOUS les jurys ? Cette action est irréversible !")) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/cleanup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password, action: "delete_jurors" }),
      });
      const data = await res.json();
      setMessage(res.ok ? `✅ ${data.message}` : `❌ ${data.error}`);
    } catch {}
    setStatus("idle");
    setTimeout(() => setMessage(""), 3000);
  };

  if (!loggedIn) {
    return (
      <div className="space-y-6">
        <a href="/" className="text-blue-300 hover:text-blue-200 text-sm">← Accueil</a>
        <div className="bg-white/5 backdrop-blur-lg border border-red-500/20 rounded-3xl p-6 text-center space-y-4">
          <div className="text-4xl">🔐</div>
          <h1 className="text-2xl font-bold text-white">Administration</h1>
          <p className="text-red-300 text-sm">Accès réservé</p>
          <input
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full bg-white/10 border border-red-500/30 rounded-xl px-4 py-3 text-white placeholder-red-300/50 focus:outline-none focus:border-red-400 text-center"
            placeholder="Identifiant"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full bg-white/10 border border-red-500/30 rounded-xl px-4 py-3 text-white placeholder-red-300/50 focus:outline-none focus:border-red-400 text-center"
            placeholder="Mot de passe"
          />
          {authError && <p className="text-red-400 text-sm">{authError}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white font-bold py-3 rounded-2xl hover:from-red-500 hover:to-red-400 transition-all"
          >
            🔑 Connexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <a href="/" className="text-blue-300 hover:text-blue-200 text-sm">← Accueil</a>
        <span className="text-green-400 text-xs bg-green-500/10 px-3 py-1 rounded-full">Admin connecté</span>
      </div>

      <div className="text-center">
        <div className="text-4xl mb-2">🔧</div>
        <h1 className="text-2xl font-bold text-white">Administration</h1>
        <p className="text-red-300 text-sm">Gestion de la compétition</p>
      </div>

      {message && (
        <div className={`text-center py-2 px-4 rounded-2xl text-sm font-medium ${
          message.startsWith("✅") ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
        }`}>
          {message}
        </div>
      )}

      {/* SECTION: Catégories */}
      <div className="bg-white/5 backdrop-blur-lg border border-blue-500/20 rounded-3xl p-5 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">📋 Catégories</h2>

        <div className="flex gap-2">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCategory()}
            className="flex-1 bg-white/10 border border-blue-500/30 rounded-xl px-4 py-2 text-white placeholder-blue-300/50 text-sm focus:outline-none focus:border-blue-400"
            placeholder="Nouvelle catégorie..."
          />
          <button
            onClick={addCategory}
            disabled={!newCategory.trim() || status === "loading"}
            className="bg-blue-600 text-white px-4 rounded-xl hover:bg-blue-500 transition-all disabled:opacity-50 text-sm font-bold"
          >
            + Ajouter
          </button>
        </div>

        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2">
              {editCategory?.id === cat.id ? (
                <>
                  <input
                    value={editCategory.name}
                    onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && updateCategory()}
                    className="flex-1 bg-white/10 border border-orange-500/30 rounded-lg px-3 py-1.5 text-white text-sm"
                    autoFocus
                  />
                  <button onClick={updateCategory} className="text-green-400 text-sm font-bold hover:text-green-300">✅</button>
                  <button onClick={() => setEditCategory(null)} className="text-red-400 text-sm hover:text-red-300">❌</button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-white text-sm">{cat.name}</span>
                  <button onClick={() => setEditCategory({ id: cat.id, name: cat.name })} className="text-blue-300 text-xs hover:text-blue-200">✏️</button>
                  <button onClick={() => deleteCategory(cat.id)} className="text-red-400 text-xs hover:text-red-300">🗑️</button>
                </>
              )}
            </div>
          ))}
          {categories.length === 0 && (
            <p className="text-blue-300/40 text-xs text-center">Aucune catégorie</p>
          )}
        </div>
      </div>

      {/* SECTION: Actions dangereuses */}
      <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-5 space-y-3">
        <h2 className="text-lg font-bold text-red-300 flex items-center gap-2">⚠️ Actions dangereuses</h2>

        <button
          onClick={deleteContestants}
          disabled={status === "loading"}
          className="w-full bg-red-600/30 border border-red-500/40 text-red-300 font-bold py-3 rounded-2xl hover:bg-red-600/50 transition-all disabled:opacity-50"
        >
          🗑️ Supprimer TOUS les concurrents
        </button>

        <button
          onClick={deleteJurors}
          disabled={status === "loading"}
          className="w-full bg-red-600/30 border border-red-500/40 text-red-300 font-bold py-3 rounded-2xl hover:bg-red-600/50 transition-all disabled:opacity-50"
        >
          🗑️ Supprimer TOUS les jurys
        </button>
      </div>
    </div>
  );
}
