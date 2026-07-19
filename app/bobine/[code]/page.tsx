'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

type ToastType = 'success' | 'error' | 'info' | 'warning'

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
    type_materiel: string
    diametre_fil: string | null
    largeur_feuillard: string | null
    longueur_feuillard: string | null
    matiere: string
    durete: string
    revetement: string
    date_reception: string
  }
  mouvements: any[]
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
  const [poidsRestant, setPoidsRestant] = useState('')
  const [commentaireRebut, setCommentaireRebut] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: ToastType; id: number } | null>(null)

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
      if (res.ok) { showToast('Transferee vers usine', 'success'); setShowAction(null); setNumCommande(''); chargerBobine() }
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
        {/* Header */}
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

        {/* Info bobine */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-100 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 font-mono">{bobine.code_bobine}</h1>
              <p className="text-sm text-gray-500 mt-0.5">{r.code_fournisseur} - Cmd {r.num_commande}</p>
            </div>
            <div className="flex gap-1.5 flex-shrink-0">
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${badgeStatut[bobine.statut] || 'bg-gray-100 text-gray-800'}`}>
                {bobine.statut === 'EN_STOCK' ? 'Stock' : bobine.statut === 'PARTIELLE' ? 'Partiel' : bobine.statut === 'VIDE' ? 'Vide' : 'Dechet'}
              </span>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${badgeLieu[bobine.lieu] || 'bg-gray-100 text-gray-800'}`}>
                {bobine.lieu === 'STOCK_PRINCIPAL' ? 'Stock' : bobine.lieu === 'USINE' ? 'Usine' : 'Dechet'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <p className="text-[11px] text-blue-600 font-medium mb-0.5">Dimension</p>
              <p className="text-xl font-bold text-blue-800">{dimension}</p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-4 text-center">
              <p className="text-[11px] text-emerald-600 font-medium mb-0.5">Poids actuel</p>
              <p className="text-xl font-bold text-emerald-800">{bobine.poids_actuel} kg</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            {[['Matiere', r.matiere], ['Durete', r.durete], ['Revetement', r.revetement],
              ['Poids initial', `${bobine.poids_initial} kg`],
              ['Date reception', new Date(r.date_reception).toLocaleDateString('fr-FR')],
              ...(bobine.num_commande_fabrication ? [['Commande fab.', bobine.num_commande_fabrication]] : [])
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-500">{label}</span>
                <span className="font-semibold text-gray-900">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        {!showAction && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-100 mb-4">
            <h2 className="font-bold text-lg text-gray-900 mb-4">Actions</h2>
            {estAuStock && (
              <div className="space-y-3">
                <button onClick={() => setShowAction('usine')} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-2xl transition-all active:scale-[0.98] text-lg flex items-center justify-center gap-3">
                  {'\u27a1\ufe0f'} Vers Usine
                </button>
                <button onClick={() => setShowAction('rebut')} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-2xl transition-all active:scale-[0.98] text-lg flex items-center justify-center gap-3">
                  {'\ud83d\uddd1\ufe0f'} Vers Rebut (total)
                </button>
              </div>
            )}
            {estEnUsine && (
              <div className="space-y-3">
                <button onClick={() => setShowAction('stock')} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-4 rounded-2xl transition-all active:scale-[0.98] text-lg flex items-center justify-center gap-3">
                  {'\ud83d\udce6'} Vers Stock
                </button>
                <button onClick={() => setShowAction('rebut')} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-2xl transition-all active:scale-[0.98] text-lg flex items-center justify-center gap-3">
                  {'\ud83d\uddd1\ufe0f'} Vers Rebut (total)
                </button>
                <button onClick={() => setShowAction('rebut_partiel')} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 rounded-2xl transition-all active:scale-[0.98] text-lg flex items-center justify-center gap-3">
                  {'\u26a0\ufe0f'} Rebut Partiel
                </button>
              </div>
            )}
            {!estAuStock && !estEnUsine && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg mb-1">{'\ud83d\uddd1\ufe0f'}</p>
                <p className="font-medium">Cette bobine est au rebut</p>
                <p className="text-sm text-gray-400 mt-1">Aucune action disponible</p>
              </div>
            )}
          </div>
        )}

        {/* Action: Vers Usine */}
        {showAction === 'usine' && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-purple-100 mb-4" style={{ animation: 'slideUp 0.25s ease-out' }}>
            <h2 className="font-bold text-lg text-purple-900 mb-4">{'\u27a1\ufe0f'} Transferer a l'usine</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">N° Commande Fabrication</label>
                <input type="text" value={numCommande} onChange={e => setNumCommande(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all text-base" placeholder="CMD-2026-001" autoFocus />
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
              <div className="bg-cyan-50 rounded-2xl p-4 text-sm">
                <p className="text-gray-700">Poids initial: <strong>{bobine.poids_initial} kg</strong></p>
                <p className="text-gray-700">Poids actuel: <strong>{bobine.poids_actuel} kg</strong></p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Poids restant (kg)</label>
                <input type="number" step="0.01" value={poidsRestant} onChange={e => setPoidsRestant(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-cyan-500 focus:bg-white focus:outline-none transition-all text-base" placeholder="15.5" autoFocus />
                <p className="text-xs text-gray-500 mt-1">Doit etre inferieur a {bobine.poids_initial} kg</p>
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
                <p className="text-gray-700">Poids actuel: <strong>{bobine.poids_actuel} kg</strong></p>
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
              <div className="bg-orange-50 rounded-2xl p-4 text-sm">
                <p className="text-gray-700">Poids initial: <strong>{bobine.poids_initial} kg</strong></p>
                <p className="text-gray-700">Poids actuel: <strong>{bobine.poids_actuel} kg</strong></p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Poids a rebuter (kg)</label>
                <input type="number" step="0.01" value={poidsRestant} onChange={e => setPoidsRestant(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:bg-white focus:outline-none transition-all text-base" placeholder="5.5" autoFocus />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Description du probleme</label>
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

        {/* Historique */}
        {bobine.mouvements.length > 0 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-100">
            <h2 className="font-bold text-lg text-gray-900 mb-4">Historique</h2>
            <div className="space-y-2">
              {bobine.mouvements.slice(0, 5).map((mvt, idx) => {
                const icons: Record<string, string> = { TRANSFERT_VERS_USINE: '\u27a1\ufe0f', RETOUR_USINE: '\ud83d\udd19', SORTIE_DECHET: '\ud83d\uddd1\ufe0f', ENTREE_FOURNISSEUR: '\ud83d\udce5' }
                const labels: Record<string, string> = { TRANSFERT_VERS_USINE: 'Vers Usine', RETOUR_USINE: 'Retour Usine', SORTIE_DECHET: 'Rebut', ENTREE_FOURNISSEUR: 'Entree' }
                return (
                  <div key={idx} className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-lg flex-shrink-0">{icons[mvt.type_mouvement] || '\u2022'}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{labels[mvt.type_mouvement] || mvt.type_mouvement}</p>
                        <p className="text-xs text-gray-500">{new Date(mvt.date_mouvement).toLocaleDateString('fr-FR')} {new Date(mvt.date_mouvement).toLocaleTimeString('fr-FR')}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {mvt.poids_mouvement > 0 && <p className="text-sm font-semibold text-gray-900">{mvt.poids_mouvement} kg</p>}
                      {mvt.n_commande_client && <p className="text-xs text-gray-500">{mvt.n_commande_client}</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center py-6">
          <p className="text-xs text-gray-400">{'\ud83d\udcf7'} Scannee depuis le QR code</p>
        </div>
      </div>
    </div>
  )
}
