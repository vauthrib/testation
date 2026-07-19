'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

type ToastType = 'success' | 'error' | 'info' | 'warning'

type Mouvement = {
  id: number
  type_mouvement: string
  poids_mouvement: string
  n_commande_client: string | null
  client: string | null
  texte_libre: string | null
  lieu_destination: string | null
  date_mouvement: string
}

type Bobine = {
  id: number
  code_bobine: string
  poids_initial: string
  poids_actuel: string
  statut: string
  lieu: string
  num_commande_fabrication: string | null
  reception: {
    code_fournisseur: string
    num_commande: string
    num_type_produit: string
    type_materiel: string
    diametre_fil: string | null
    largeur_feuillard: string | null
    longueur_feuillard: string | null
    matiere: string
    durete: string
    revetement: string
    date_reception: string
  }
  mouvements: Mouvement[]
}

function ToastMsg({ message, type, onClose }: { message: string; type: ToastType; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t) }, [onClose])
  const c: Record<ToastType, string> = { success: 'bg-emerald-600/95 text-white', error: 'bg-red-600/95 text-white', warning: 'bg-amber-500/95 text-white', info: 'bg-blue-600/95 text-white' }
  const i: Record<ToastType, string> = { success: '\u2713', error: '\u2715', info: '\u2139', warning: '\u26a0' }
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[999]" style={{ animation: 'toastIn 0.3s ease-out' }}>
      <div className={`${c[type]} px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[280px] max-w-[90vw] backdrop-blur-sm`}>
        <span className="text-lg font-bold flex-shrink-0">{i[type]}</span>
        <span className="text-sm font-medium leading-tight flex-1">{message}</span>
        <button onClick={onClose} className="flex-shrink-0 opacity-70 hover:opacity-100 text-lg leading-none">&times;</button>
      </div>
    </div>
  )
}

// Calcule la conso par commande à partir de l'historique
function calculerConsoParCommande(mouvements: Mouvement[]): Record<string, { envoye: number; retour: number; net: number }> {
  const conso: Record<string, { envoye: number; retour: number; net: number }> = {}
  for (const m of mouvements) {
    const cmd = m.n_commande_client || 'COMMANDE_DIRECTE'
    if (!conso[cmd]) conso[cmd] = { envoye: 0, retour: 0, net: 0 }
    const poids = parseFloat(m.poids_mouvement)
    if (m.type_mouvement === 'TRANSFERT_VERS_USINE' || m.type_mouvement === 'SORTIE_USINE') {
      conso[cmd].envoye += poids
    } else if (m.type_mouvement === 'RETOUR_USINE' || m.type_mouvement === 'TRANSFERT_VERS_STOCK') {
      conso[cmd].retour += poids
    }
  }
  for (const cmd of Object.keys(conso)) {
    conso[cmd].net = Math.round((conso[cmd].envoye - conso[cmd].retour) * 100) / 100
  }
  return conso
}

export default function BobinePage() {
  const params = useParams()
  const code = params.code as string

  const [bobine, setBobine] = useState<Bobine | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')

  const [showAction, setShowAction] = useState<'usine' | 'stock' | 'rebut' | 'rebut_partiel' | null>(null)
  const [numCommande, setNumCommande] = useState('')
  const [showCmdSuggestions, setShowCmdSuggestions] = useState(false)
  const [poidsRestant, setPoidsRestant] = useState('')
  const [commentaireRebut, setCommentaireRebut] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: ToastType; id: number } | null>(null)
  const [commandHistory, setCommandHistory] = useState<string[]>([])

  // Charger historique des commandes depuis localStorage
  useEffect(() => {
    try { const saved = localStorage.getItem('cmd_history'); if (saved) setCommandHistory(JSON.parse(saved)) } catch {}
  }, [])

  const saveCommandToHistory = (cmd: string) => {
    if (!cmd.trim()) return
    const updated = [cmd, ...commandHistory.filter(c => c !== cmd)].slice(0, 15)
    setCommandHistory(updated)
    try { localStorage.setItem('cmd_history', JSON.stringify(updated)) } catch {}
  }

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type, id: Date.now() })
    setTimeout(() => setToast(null), 3500)
  }

  useEffect(() => {
    const authData = localStorage.getItem('bobine_auth')
    if (authData) {
      const { user, date } = JSON.parse(authData)
      if (date === new Date().toDateString()) {
        setIsAuthenticated(true); setCurrentUser(user); chargerBobine()
        return
      } else localStorage.removeItem('bobine_auth')
    }
    setLoading(false)
  }, [code])

  const chargerBobine = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/bobine/${code}`)
      if (!res.ok) throw new Error('Bobine introuvable')
      setBobine(await res.json())
    } catch {
      setError('Bobine introuvable ou erreur de chargement')
    } finally { setLoading(false) }
  }

  const handleAuth = async () => {
    if (!login.trim() || !password.trim()) { setAuthError('Veuillez remplir tous les champs'); return }
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password, appareil: navigator.userAgent || 'Navigateur inconnu' })
      })
      const data = await res.json()
      if (data.valid) {
        localStorage.setItem('bobine_auth', JSON.stringify({ user: data.user, date: new Date().toDateString(), isSuper: data.isSuper }))
        setIsAuthenticated(true); setCurrentUser(data.user); chargerBobine()
      } else setAuthError(data.error || 'Erreur de connexion')
    } catch { setAuthError('Erreur de connexion') }
  }

  const handleLogout = () => {
    localStorage.removeItem('bobine_auth')
    setIsAuthenticated(false); setCurrentUser(''); setLogin(''); setPassword(''); setBobine(null)
  }

  const handleVersUsine = async () => {
    if (!numCommande.trim()) { showToast('Saisissez le N° de commande', 'warning'); return }
    setActionLoading(true)
    try {
      const res = await fetch('/api/mouvements', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code_bobine: bobine?.code_bobine, type_mouvement: 'TRANSFERT_VERS_USINE', poids_mouvement: 0, num_commande_fabrication: numCommande }) })
      if (res.ok) { saveCommandToHistory(numCommande); showToast('Transferee vers usine pour ' + numCommande, 'success'); setShowAction(null); setNumCommande(''); chargerBobine() }
      else { const e = await res.json(); showToast(e.error, 'error') }
    } catch { showToast('Erreur connexion', 'error') }
    finally { setActionLoading(false) }
  }

  const handleVersStock = async () => {
    const p = parseFloat(poidsRestant); const pi = parseFloat(bobine?.poids_initial || '0')
    if (isNaN(p) || p <= 0) { showToast('Poids invalide', 'warning'); return }
    if (p >= pi) { showToast(`Poids < ${pi} kg requis`, 'warning'); return }
    setActionLoading(true)
    try {
      const res = await fetch('/api/mouvements', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code_bobine: bobine?.code_bobine, type_mouvement: 'RETOUR_USINE', poids_mouvement: p, lieu_destination: 'STOCK_PRINCIPAL' }) })
      if (res.ok) { showToast('Retour stock principal', 'success'); setShowAction(null); setPoidsRestant(''); chargerBobine() }
      else { const e = await res.json(); showToast(e.error, 'error') }
    } catch { showToast('Erreur connexion', 'error') }
    finally { setActionLoading(false) }
  }

  const handleVersRebut = async () => {
    if (!commentaireRebut.trim()) { showToast('Decrivez le probleme', 'warning'); return }
    setActionLoading(true)
    try {
      const res = await fetch('/api/mouvements', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code_bobine: bobine?.code_bobine, type_mouvement: 'SORTIE_DECHET', poids_mouvement: parseFloat(bobine?.poids_actuel || '0'), texte_libre: commentaireRebut }) })
      if (res.ok) { showToast('Mise au rebut', 'success'); setShowAction(null); setCommentaireRebut(''); chargerBobine() }
      else { const e = await res.json(); showToast(e.error, 'error') }
    } catch { showToast('Erreur connexion', 'error') }
    finally { setActionLoading(false) }
  }

  const handleRebutPartiel = async () => {
    const p = parseFloat(poidsRestant)
    if (isNaN(p) || p <= 0) { showToast('Poids invalide', 'warning'); return }
    if (!commentaireRebut.trim()) { showToast('Decrivez le probleme', 'warning'); return }
    setActionLoading(true)
    try {
      const res = await fetch('/api/mouvements', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code_bobine: bobine?.code_bobine, type_mouvement: 'SORTIE_DECHET', poids_mouvement: p, texte_libre: commentaireRebut }) })
      if (res.ok) { showToast('Rebut partiel enregistre', 'success'); setShowAction(null); setPoidsRestant(''); setCommentaireRebut(''); chargerBobine() }
      else { const e = await res.json(); showToast(e.error, 'error') }
    } catch { showToast('Erreur connexion', 'error') }
    finally { setActionLoading(false) }
  }

  // Login page
  if (!isAuthenticated) {
    return (
      <div className="min-h-dvh bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center p-6">
        <div className="max-w-sm w-full" style={{ animation: 'slideUp 0.4s ease-out' }}>
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-xl shadow-blue-600/20">
              <span className="text-4xl">{'\ud83d\udd10'}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Connexion requise</h1>
            <p className="text-sm text-gray-500">Entrez vos identifiants</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-100 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Identifiant</label>
              <input type="text" value={login} onChange={e => setLogin(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAuth()}
                className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-base" placeholder="Votre login" autoFocus />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Mot de passe</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAuth()}
                className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-base" placeholder="Votre mot de passe" />
            </div>
            {authError && <p className="text-red-600 text-sm text-center font-medium">{authError}</p>}
            <button onClick={handleAuth} className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 rounded-2xl transition-all active:scale-[0.98] text-base">Se connecter</button>
            <p className="text-center text-xs text-gray-400">Bobine: {code}</p>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-dvh bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center text-gray-400">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
          <p className="text-sm">Chargement...</p>
        </div>
      </div>
    )
  }

  if (error || !bobine) {
    return (
      <div className="min-h-dvh bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center p-6">
        <div className="max-w-sm w-full bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-red-100 text-center" style={{ animation: 'scaleIn 0.3s ease-out' }}>
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4"><span className="text-3xl">{'\u274c'}</span></div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Erreur</h1>
          <p className="text-sm text-gray-600 mb-5">{error || 'Bobine introuvable'}</p>
          <button onClick={() => window.location.reload()} className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-xl transition-all text-sm">Reessayer</button>
        </div>
      </div>
    )
  }

  const r = bobine.reception
  const dimension = r.type_materiel === 'Fil' ? `Ø${r.diametre_fil} mm` : `${r.largeur_feuillard} x ${r.longueur_feuillard} mm`
  const consoParCommande = calculerConsoParCommande(bobine.mouvements)

  const badgeStatut: Record<string, string> = {
    EN_STOCK: 'bg-emerald-100 text-emerald-800', PARTIELLE: 'bg-orange-100 text-orange-800',
    VIDE: 'bg-gray-100 text-gray-800', DECHET: 'bg-red-100 text-red-800'
  }
  const badgeLieu: Record<string, string> = {
    STOCK_PRINCIPAL: 'bg-blue-100 text-blue-800', USINE: 'bg-purple-100 text-purple-800', DECHET: 'bg-red-100 text-red-800'
  }

  const estEnUsine = bobine.lieu === 'USINE'
  const estAuStock = bobine.lieu === 'STOCK_PRINCIPAL'

  return (
    <div className="min-h-dvh bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {toast && <ToastMsg message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="max-w-lg mx-auto p-4" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between mb-4 bg-white/80 backdrop-blur-lg rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg">{'\ud83d\udce6'}</span>
            <div className="min-w-0">
              <p className="text-[11px] text-gray-500">Connecte</p>
              <p className="font-semibold text-sm text-gray-900 truncate">{currentUser}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-xl text-xs font-medium transition-colors">{'\ud83d\udeaa'} Quitter</button>
        </div>

        {/* ===== MODE EMBARQUE - GROS AFFICHAGE ===== */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-6 shadow-2xl mb-4 text-white" style={{ animation: 'slideUp 0.3s ease-out' }}>
          {/* Nom bobine - TRES GROS */}
          <div className="text-center mb-6">
            <p className="text-[11px] text-blue-200 uppercase tracking-widest font-medium mb-1">{'\ud83d\udce6'} Bobine</p>
            <h1 className="text-4xl font-bold font-mono tracking-wider drop-shadow-lg">{bobine.code_bobine}</h1>
          </div>

          {/* Diametre -- Poids */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center">
              <p className="text-[10px] text-blue-200 uppercase tracking-wider font-medium mb-1">Dimension</p>
              <p className="text-3xl font-bold">{dimension}</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center">
              <p className="text-[10px] text-blue-200 uppercase tracking-wider font-medium mb-1">Poids</p>
              <p className="text-3xl font-bold">{bobine.poids_actuel}<span className="text-lg font-normal ml-1">kg</span></p>
            </div>
          </div>

          {/* Boutons d'action - grands pavés */}
          {!showAction && (
            <div className="grid grid-cols-2 gap-3">
              {estAuStock && (
                <>
                  <button onClick={() => setShowAction('usine')} 
                    className="bg-purple-500 hover:bg-purple-400 active:scale-[0.96] text-white font-bold py-5 rounded-2xl transition-all text-lg shadow-lg shadow-purple-500/30 flex flex-col items-center gap-1">
                    <span className="text-2xl">{'\u27a1\ufe0f'}</span>
                    <span>Vers Usine</span>
                  </button>
                  <button onClick={() => setShowAction('rebut')}
                    className="bg-red-500 hover:bg-red-400 active:scale-[0.96] text-white font-bold py-5 rounded-2xl transition-all text-lg shadow-lg shadow-red-500/30 flex flex-col items-center gap-1">
                    <span className="text-2xl">{'\ud83d\uddd1\ufe0f'}</span>
                    <span>Vers Rebut</span>
                  </button>
                </>
              )}
              {estEnUsine && (
                <>
                  <button onClick={() => setShowAction('stock')}
                    className="bg-cyan-500 hover:bg-cyan-400 active:scale-[0.96] text-white font-bold py-5 rounded-2xl transition-all text-lg shadow-lg shadow-cyan-500/30 flex flex-col items-center gap-1">
                    <span className="text-2xl">{'\ud83d\udce6'}</span>
                    <span>Vers Stock</span>
                  </button>
                  <button onClick={() => setShowAction('rebut')}
                    className="bg-red-500 hover:bg-red-400 active:scale-[0.96] text-white font-bold py-5 rounded-2xl transition-all text-lg shadow-lg shadow-red-500/30 flex flex-col items-center gap-1">
                    <span className="text-2xl">{'\ud83d\uddd1\ufe0f'}</span>
                    <span>Vers Rebut</span>
                  </button>
                  <button onClick={() => setShowAction('rebut_partiel')} className="col-span-2
                    bg-orange-500 hover:bg-orange-400 active:scale-[0.96] text-white font-bold py-4 rounded-2xl transition-all text-base shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2">
                    <span className="text-xl">{'\u26a0\ufe0f'}</span>
                    <span>Rebut Partiel</span>
                  </button>
                </>
              )}
              {!estAuStock && !estEnUsine && (
                <div className="col-span-2 text-center py-6 bg-white/10 rounded-2xl">
                  <p className="text-lg mb-1 opacity-80">{'\ud83d\uddd1\ufe0f'}</p>
                  <p className="font-medium">Au rebut</p>
                  <p className="text-sm text-blue-200 mt-1">Aucune action disponible</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ===== ACTIONS (formulaires) ===== */}

        {/* Action: Vers Usine */}
        {showAction === 'usine' && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-purple-100 mb-4" style={{ animation: 'slideUp 0.25s ease-out' }}>
            <h2 className="font-bold text-lg text-purple-900 mb-4">{'\u27a1\ufe0f'} Transferer a l'usine</h2>
            <div className="space-y-4 relative">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">N° Commande Fabrication</label>
                <input type="text" value={numCommande} onChange={e => { setNumCommande(e.target.value); setShowCmdSuggestions(e.target.value.length > 0) }}
                  onFocus={() => setShowCmdSuggestions(numCommande.length > 0)}
                  onBlur={() => setTimeout(() => setShowCmdSuggestions(false), 200)}
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all text-base" placeholder="CMD-2026-001" autoFocus />
                {showCmdSuggestions && commandHistory.filter(c => c.toUpperCase().includes(numCommande.toUpperCase())).length > 0 && (
                  <div className="absolute z-20 w-full mt-1 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 max-h-40 overflow-y-auto">
                    {commandHistory.filter(c => c.toUpperCase().includes(numCommande.toUpperCase())).map((cmd, i) => (
                      <button key={i} onClick={() => { setNumCommande(cmd); setShowCmdSuggestions(false) }}
                        className="w-full px-4 py-2.5 text-left text-sm hover:bg-purple-50 flex items-center gap-3 transition-colors">
                        <span className="text-purple-600">{'\ud83d\udd50'}</span> {cmd}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowAction(null)} className="flex-1 bg-gray-200 hover:bg-gray-300 font-semibold py-3.5 rounded-2xl transition-colors">Annuler</button>
                <button onClick={handleVersUsine} disabled={actionLoading}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3.5 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50">
                  {actionLoading ? <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Valider'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action: Retour stock */}
        {showAction === 'stock' && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-cyan-100 mb-4" style={{ animation: 'slideUp 0.25s ease-out' }}>
            <h2 className="font-bold text-lg text-cyan-900 mb-4">{'\ud83d\udce6'} Retour stock principal</h2>
            <div className="space-y-4">
              <div className="bg-cyan-50 rounded-2xl p-4 text-sm grid grid-cols-2 gap-4">
                <div><p className="text-gray-500 text-xs">Initial</p><p className="font-bold text-gray-900">{bobine.poids_initial} kg</p></div>
                <div><p className="text-gray-500 text-xs">Actuel</p><p className="font-bold text-gray-900">{bobine.poids_actuel} kg</p></div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Poids restant (kg)</label>
                <input type="number" step="0.01" value={poidsRestant} onChange={e => setPoidsRestant(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-cyan-500 focus:bg-white focus:outline-none transition-all text-base" placeholder="15.5" autoFocus />
                <p className="text-xs text-gray-500 mt-1">Doit etre &lt; {bobine.poids_initial} kg</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowAction(null)} className="flex-1 bg-gray-200 hover:bg-gray-300 font-semibold py-3.5 rounded-2xl transition-colors">Annuler</button>
                <button onClick={handleVersStock} disabled={actionLoading}
                  className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3.5 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50">
                  {actionLoading ? <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Valider'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action: Rebut total */}
        {showAction === 'rebut' && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-red-100 mb-4" style={{ animation: 'slideUp 0.25s ease-out' }}>
            <h2 className="font-bold text-lg text-red-900 mb-4">{'\ud83d\uddd1\ufe0f'} Mettre au rebut (total)</h2>
            <div className="space-y-4">
              <div className="bg-red-50 rounded-2xl p-4 text-sm">
                <p className="text-gray-700">Poids: <strong>{bobine.poids_actuel} kg</strong></p>
                <p className="text-xs text-gray-500 mt-1">La bobine sera entierement declaree dechet</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Description du probleme</label>
                <textarea value={commentaireRebut} onChange={e => setCommentaireRebut(e.target.value)} rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-red-500 focus:bg-white focus:outline-none transition-all text-sm resize-none" placeholder="Cassure, contamination..." autoFocus />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowAction(null)} className="flex-1 bg-gray-200 hover:bg-gray-300 font-semibold py-3.5 rounded-2xl transition-colors">Annuler</button>
                <button onClick={handleVersRebut} disabled={actionLoading}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50">
                  {actionLoading ? <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Confirmer'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action: Rebut partiel */}
        {showAction === 'rebut_partiel' && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-orange-100 mb-4" style={{ animation: 'slideUp 0.25s ease-out' }}>
            <h2 className="font-bold text-lg text-orange-900 mb-4">{'\u26a0\ufe0f'} Rebut Partiel</h2>
            <div className="space-y-4">
              <div className="bg-orange-50 rounded-2xl p-4 text-sm grid grid-cols-2 gap-4">
                <div><p className="text-gray-500 text-xs">Initial</p><p className="font-bold text-gray-900">{bobine.poids_initial} kg</p></div>
                <div><p className="text-gray-500 text-xs">Actuel</p><p className="font-bold text-gray-900">{bobine.poids_actuel} kg</p></div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Poids a rebuter (kg)</label>
                <input type="number" step="0.01" value={poidsRestant} onChange={e => setPoidsRestant(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:bg-white focus:outline-none transition-all text-base" placeholder="5.5" autoFocus />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Description</label>
                <textarea value={commentaireRebut} onChange={e => setCommentaireRebut(e.target.value)} rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:bg-white focus:outline-none transition-all text-sm resize-none" placeholder="Decrivez..." />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowAction(null)} className="flex-1 bg-gray-200 hover:bg-gray-300 font-semibold py-3.5 rounded-2xl transition-colors">Annuler</button>
                <button onClick={handleRebutPartiel} disabled={actionLoading}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3.5 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50">
                  {actionLoading ? <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Confirmer'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== DETAILS ===== */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-100 mb-4">
          <h2 className="font-bold text-lg text-gray-900 mb-4">{'\ud83d\udcca'} Details</h2>
          <div className="flex gap-2 mb-4 flex-wrap">
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${badgeStatut[bobine.statut] || 'bg-gray-100 text-gray-800'}`}>
              {bobine.statut === 'EN_STOCK' ? 'En Stock' : bobine.statut === 'PARTIELLE' ? 'Partiel' : bobine.statut === 'VIDE' ? 'Vide' : 'Dechet'}
            </span>
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${badgeLieu[bobine.lieu] || 'bg-gray-100 text-gray-800'}`}>
              {bobine.lieu === 'STOCK_PRINCIPAL' ? 'Stock Principal' : bobine.lieu === 'USINE' ? 'Usine' : 'Dechet'}
            </span>
          </div>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Fournisseur</p>
                <p className="font-semibold">{r.code_fournisseur}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Commande récep.</p>
                <p className="font-semibold">{r.num_commande}-{r.num_type_produit}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Matiere</p>
                <p className="font-semibold text-sm">{r.matiere}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Durete</p>
                <p className="font-semibold text-sm">{r.durete}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Revet.</p>
                <p className="font-semibold text-sm">{r.revetement}</p>
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-t border-gray-100 pt-3">
              <span className="text-gray-500">Poids initial</span>
              <span className="font-bold text-gray-900">{bobine.poids_initial} kg</span>
            </div>
            <div className="flex justify-between items-center py-2 border-t border-gray-100">
              <span className="text-gray-500">Date reception</span>
              <span className="font-semibold">{new Date(r.date_reception).toLocaleDateString('fr-FR')}</span>
            </div>
            {bobine.num_commande_fabrication && (
              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                <span className="text-gray-500">Commande fab.</span>
                <span className="font-bold text-purple-700">{bobine.num_commande_fabrication}</span>
              </div>
            )}
          </div>
        </div>

        {/* ===== HISTORIQUE DETAILLE ===== */}
        {bobine.mouvements.length > 0 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-100">
            <h2 className="font-bold text-lg text-gray-900 mb-4">{'\ud83d\udccb'} Historique ({bobine.mouvements.length})</h2>

            {/* Stats conso par commande en haut */}
            {Object.keys(consoParCommande).length > 0 && (
              <div className="bg-gradient-to-r from-purple-50 to-cyan-50 rounded-2xl p-4 mb-4 border border-purple-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Consommation par commande</p>
                <div className="space-y-2">
                  {Object.entries(consoParCommande).map(([cmd, data]) => (
                    <div key={cmd} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 truncate mr-2">{cmd}</span>
                      <div className="text-right flex-shrink-0">
                        <span className="font-semibold text-purple-700">{data.envoye.toFixed(1)} kg</span>
                        {data.retour > 0 && <span className="text-gray-500 text-xs"> (retour {data.retour.toFixed(1)})</span>}
                        <span className="font-bold text-cyan-700 ml-2">= {data.net.toFixed(1)} kg</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              {bobine.mouvements.map((mvt, idx) => {
                const icons: Record<string, string> = {
                  TRANSFERT_VERS_USINE: '\u27a1\ufe0f',
                  RETOUR_USINE: '\ud83d\udd19',
                  SORTIE_DECHET: '\ud83d\uddd1\ufe0f',
                  ENTREE_FOURNISSEUR: '\ud83d\udce5',
                  SORTIE_USINE: '\u27a1\ufe0f',
                  TRANSFERT_VERS_STOCK: '\ud83d\udce6',
                  TRANSFERT_VERS_DECHET: '\ud83d\uddd1\ufe0f'
                }
                const labels: Record<string, string> = {
                  TRANSFERT_VERS_USINE: 'Vers Usine',
                  RETOUR_USINE: 'Retour Usine',
                  SORTIE_DECHET: 'Rebut',
                  ENTREE_FOURNISSEUR: 'Entree Fournisseur',
                  SORTIE_USINE: 'Sortie Usine',
                  TRANSFERT_VERS_STOCK: 'Retour Stock',
                  TRANSFERT_VERS_DECHET: 'Vers Dechet'
                }
                const typeLabel = labels[mvt.type_mouvement] || mvt.type_mouvement
                const d = new Date(mvt.date_mouvement)
                const dateStr = d.toLocaleDateString('fr-FR')
                const heureStr = d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

                // Texte conso associé
                const cmd = mvt.n_commande_client || bobine.num_commande_fabrication
                const consoInfo = cmd && consoParCommande[cmd]

                return (
                  <div key={idx} className="py-3 px-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 min-w-0">
                        <span className="text-lg flex-shrink-0 mt-0.5">{icons[mvt.type_mouvement] || '\u2022'}</span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900">{typeLabel}</p>
                          {/* Affichage enrichi */}
                          {(mvt.type_mouvement === 'TRANSFERT_VERS_USINE' || mvt.type_mouvement === 'SORTIE_USINE') && cmd && (
                            <p className="text-xs text-purple-700 font-medium">pour {cmd}</p>
                          )}
                          {mvt.type_mouvement === 'RETOUR_USINE' && (
                            <p className="text-xs text-cyan-700 font-medium">
                              vers stock · {parseFloat(mvt.poids_mouvement).toFixed(1)} kg
                              {cmd && consoInfo && ` (conso ${cmd} = ${consoInfo.net.toFixed(1)} kg)`}
                            </p>
                          )}
                          {mvt.type_mouvement === 'SORTIE_DECHET' && mvt.texte_libre && (
                            <p className="text-xs text-red-600">{mvt.texte_libre}</p>
                          )}
                          {mvt.type_mouvement === 'ENTREE_FOURNISSEUR' && (
                            <p className="text-xs text-emerald-700 font-medium">+ {parseFloat(mvt.poids_mouvement).toFixed(1)} kg</p>
                          )}
                          <p className="text-[10px] text-gray-400 mt-0.5">{dateStr} {heureStr}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        {parseFloat(mvt.poids_mouvement) > 0 && (
                          <span className="text-sm font-bold text-gray-900">{parseFloat(mvt.poids_mouvement).toFixed(1)} kg</span>
                        )}
                        {mvt.lieu_destination && (
                          <p className="text-[10px] text-gray-500">{mvt.lieu_destination === 'STOCK_PRINCIPAL' ? 'Stock' : mvt.lieu_destination}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ===== FOOTER ===== */}
        <div className="text-center py-6">
          <p className="text-xs text-gray-400">{'\ud83d\udcf7'} Scannee depuis le QR code · {code}</p>
        </div>
      </div>
    </div>
  )
}
