'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { QRCodeSVG } from 'qrcode.react'
import type { Bobine, ReceptionData, AutreSection, PageKey, ToastType, ConsommationData } from '@/lib/types'
import { ToastMsg, Header, PageTitle, Loading, TotalCard, EmptyState, ActionButton, MiniStat, Input, Select, ItemManager } from '@/components/ui'

export default function Home() {
  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')

  // Data
  const [bobines, setBobines] = useState<Bobine[]>([])
  const [etatResume, setEtatResume] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState<PageKey>('home')

  // Arrivage wizard
  const [wizardStep, setWizardStep] = useState(1)
  const [receptionData, setReceptionData] = useState<ReceptionData>({
    code_fournisseur: '', num_commande: '', num_type_produit: '', type_materiel: 'Fil',
    matiere: '', durete: '', revetement: '', date_reception: new Date().toISOString().split('T')[0],
    nombre_bobines: 1, poids_bobines: []
  })

  // Scan & movement
  const [showScan, setShowScan] = useState(false)
  const [selectedBobine, setSelectedBobine] = useState<Bobine | null>(null)
  const [numCommandeFabrication, setNumCommandeFabrication] = useState('')
  const [showCommandSuggestions, setShowCommandSuggestions] = useState(false)
  const [poidsRestant, setPoidsRestant] = useState('')

  // Command history (localStorage)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  useEffect(() => {
    try { const saved = localStorage.getItem('cmd_history'); if (saved) setCommandHistory(JSON.parse(saved)) } catch {}
  }, [])

  const saveCommandToHistory = (cmd: string) => {
    if (!cmd.trim()) return
    const updated = [cmd, ...commandHistory.filter(c => c !== cmd)].slice(0, 15)
    setCommandHistory(updated)
    try { localStorage.setItem('cmd_history', JSON.stringify(updated)) } catch {}
  }

  // Consommation
  const [consoData, setConsoData] = useState<ConsommationData | null>(null)
  const [consoLoading, setConsoLoading] = useState(false)
  const [consoVue, setConsoVue] = useState<'commande' | 'diametre' | 'durete'>('commande')
  const [consoFiltreCmd, setConsoFiltreCmd] = useState('')
  const [consoFiltreDiam, setConsoFiltreDiam] = useState('')
  const [consoFiltreDur, setConsoFiltreDur] = useState('')
  const [consoFiltreMois, setConsoFiltreMois] = useState(12)

  const chargerConsommation = async () => {
    setConsoLoading(true)
    try {
      const params = new URLSearchParams()
      if (consoFiltreCmd) params.set('commande', consoFiltreCmd)
      if (consoFiltreDiam) params.set('diametre', consoFiltreDiam)
      if (consoFiltreDur) params.set('durete', consoFiltreDur)
      params.set('mois', String(consoFiltreMois))
      const res = await fetch(`/api/consommation/par-commande?${params}`)
      if (res.ok) setConsoData(await res.json())
    } catch { showToast('Erreur chargement consommation', 'error') }
    finally { setConsoLoading(false) }
  }

  const exporterConsoDetail = () => {
    const params = new URLSearchParams()
    if (consoFiltreCmd) params.set('commande', consoFiltreCmd)
    if (consoFiltreDiam) params.set('diametre', consoFiltreDiam)
    if (consoFiltreDur) params.set('durete', consoFiltreDur)
    params.set('mois', String(consoFiltreMois))
    window.open(`/api/consommation/export?${params}`, '_blank')
  }

  // Etiquettes
  const [showEtiquette, setShowEtiquette] = useState(false)
  const [bobinesToPrint, setBobinesToPrint] = useState<Bobine[]>([])

  // Filters
  const [moisConso, setMoisConso] = useState(3)
  const [commandeFilter, setCommandeFilter] = useState('')
  const [diametreFilter, setDiametreFilter] = useState<string>('')
  const [filtreDiametreUsine, setFiltreDiametreUsine] = useState<string>('')
  const [rechercheNomUsine, setRechercheNomUsine] = useState('')

  // Items
  const [itemsMatiere, setItemsMatiere] = useState<any[]>([])
  const [itemsDurete, setItemsDurete] = useState<any[]>([])
  const [itemsRev, setItemsRev] = useState<any[]>([])

  // Admin states
  const [backupFile, setBackupFile] = useState<File | null>(null)
  const [showEditLot, setShowEditLot] = useState(false)
  const [lots, setLots] = useState<any[]>([])
  const [editingLot, setEditingLot] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [editingUser, setEditingUser] = useState<any>(null)
  const [newUser, setNewUser] = useState({ login: '', password: '', isSuper: false, isAdmin: false })
  const [history, setHistory] = useState<any[]>([])
  const [autreSection, setAutreSection] = useState<AutreSection>('items')

  // UI
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)
  const [toast, setToast] = useState<{ message: string; type: ToastType; id: number } | null>(null)
  const cmdInputRef = useRef<HTMLInputElement>(null)

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now()
    setToast({ message, type, id })
  }, [])

  const navigateTo = useCallback((page: PageKey) => {
    setCurrentPage(page)
  }, [])

  useEffect(() => {
    const authData = localStorage.getItem('app_auth')
    if (authData) {
      const { user, date, isAdmin: admin } = JSON.parse(authData)
      if (date === new Date().toDateString()) {
        setIsAuthenticated(true); setCurrentUser(user); setIsAdmin(admin)
        chargerBobines(); chargerItems()
        return
      } else localStorage.removeItem('app_auth')
    }
  }, [])

  const handleAuth = async () => {
    if (!login.trim() || !password.trim()) { setAuthError('Veuillez remplir tous les champs'); return }
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password, appareil: navigator.userAgent || 'Navigateur inconnu' })
      })
      const data = await res.json()
      if (data.valid) {
        localStorage.setItem('app_auth', JSON.stringify({ user: data.user, date: new Date().toDateString(), isSuper: data.isSuper, isAdmin: data.isAdmin }))
        setIsAuthenticated(true); setCurrentUser(data.user); setIsAdmin(data.isAdmin)
        chargerBobines(); chargerItems()
      } else setAuthError(data.error || 'Erreur de connexion')
    } catch { setAuthError('Erreur de connexion au serveur') }
  }

  const handleLogout = () => {
    localStorage.removeItem('app_auth')
    setIsAuthenticated(false); setCurrentUser(''); setIsAdmin(false); setLogin(''); setPassword('')
  }

  const chargerBobines = async () => {
    try { setBobines(await fetch('/api/bobines').then(r => r.json())) }
    catch (e) { console.error(e) }
  }

  const chargerEtat = async () => {
    try { setEtatResume(await fetch('/api/etat').then(r => r.json())) }
    catch (e) { console.error(e) }
  }

  const chargerItems = async () => {
    try {
      const [matRes, durRes, revRes] = await Promise.all([
        fetch('/api/items?categorie=MATIERE'), fetch('/api/items?categorie=DURETE'), fetch('/api/items?categorie=REVETEMENT')
      ])
      setItemsMatiere(await matRes.json()); setItemsDurete(await durRes.json()); setItemsRev(await revRes.json())
    } catch (e) { console.error(e) }
  }

  const chargerLots = async () => { try { setLots(await fetch('/api/lots').then(r => r.json())) } catch (e) { console.error(e) } }
  const chargerUsers = async () => { try { setUsers(await fetch('/api/users').then(r => r.json())) } catch (e) { console.error(e) } }
  const chargerHistory = async () => { try { setHistory(await fetch('/api/auth/history?limit=100').then(r => r.json())) } catch (e) { console.error(e) } }

  const handleReset = async () => {
    if (!confirm('⚠️ Effacer TOUTES les donnees ? Action irreversible !')) return
    try { await fetch('/api/reset', { method: 'POST' }); showToast('Base reinitialisee', 'success'); chargerBobines(); chargerItems() }
    catch { showToast('Erreur', 'error') }
  }

  const handleExportBase = async () => {
    try {
      const res = await fetch('/api/backup/all')
      if (!res.ok) throw new Error('Erreur serveur')
      const blob = await res.blob(); const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a'); a.href = url; a.download = `backup_stock_bobines_${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a); a.click(); a.remove(); window.URL.revokeObjectURL(url)
      showToast('Fichier CSV telecharge', 'success')
    } catch { showToast('Erreur export', 'error') }
  }

  const handleImportBase = async () => {
    if (!backupFile) { showToast('Selectionnez un fichier CSV', 'warning'); return }
    if (!confirm('⚠️ Va ECRASER toutes les donnees. Continuer ?')) return
    try {
      const formData = new FormData(); formData.append('all', backupFile)
      const res = await fetch('/api/backup/import', { method: 'POST', body: formData })
      if (res.ok) { showToast('Base restauree', 'success'); chargerBobines(); chargerItems(); setBackupFile(null) }
      else { const e = await res.json(); showToast(e.error, 'error') }
    } catch { showToast('Erreur import', 'error') }
  }

  const handleInitUsers = async () => {
    if (!confirm('Creer utilisateurs par defaut ? (Masrour, Khiara, Benamar, Benoit)')) return
    try { const res = await fetch('/api/users/init', { method: 'POST' }); const d = await res.json(); showToast(d.message, 'success'); chargerUsers() }
    catch { showToast('Erreur', 'error') }
  }

  const handleAddUser = async () => {
    if (!newUser.login.trim() || !newUser.password.trim()) { showToast('Login et mot de passe requis', 'warning'); return }
    try {
      const res = await fetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newUser) })
      if (res.ok) { setNewUser({ login: '', password: '', isSuper: false, isAdmin: false }); chargerUsers(); showToast('Utilisateur cree', 'success') }
      else { const e = await res.json(); showToast(e.error, 'error') }
    } catch { showToast('Erreur', 'error') }
  }

  const handleUpdateUser = async () => {
    if (!editingUser) return
    try {
      const res = await fetch('/api/users', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingUser) })
      if (res.ok) { setEditingUser(null); chargerUsers(); showToast('Utilisateur mis a jour', 'success') }
      else { const e = await res.json(); showToast(e.error, 'error') }
    } catch { showToast('Erreur', 'error') }
  }

  const handleDeleteUser = async (id: number, login: string) => {
    if (!confirm(`Supprimer ${login} ?`)) return
    try { await fetch(`/api/users?id=${id}`, { method: 'DELETE' }); chargerUsers(); showToast('Supprime', 'success') }
    catch { showToast('Erreur', 'error') }
  }

  const handleEditLot = async (lotId: number) => {
    try { setEditingLot(await fetch(`/api/lots/${lotId}`).then(r => r.json())); setShowEditLot(true) }
    catch { showToast('Erreur chargement lot', 'error') }
  }

  const handleSaveLot = async () => {
    if (!editingLot) return
    try {
      const res = await fetch(`/api/lots/${editingLot.id}/update`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingLot) })
      if (res.ok) { showToast('Lot mis a jour', 'success'); setShowEditLot(false); setEditingLot(null); chargerBobines(); chargerLots() }
      else { const e = await res.json(); showToast(e.error, 'error') }
    } catch { showToast('Erreur sauvegarde', 'error') }
  }

  const handleAddBobine = () => {
    if (!editingLot) return
    setEditingLot({ ...editingLot, bobines: [...editingLot.bobines, { id: 0, code_bobine: '', num_bobine: editingLot.bobines.length + 1, poids_initial: '0', poids_actuel: '0', statut: 'EN_STOCK', lieu: 'STOCK_PRINCIPAL', num_commande_fabrication: '' }] })
  }

  const handleRemoveBobine = (index: number) => {
    if (!editingLot || !confirm('Supprimer cette bobine ?')) return
    setEditingLot({ ...editingLot, bobines: editingLot.bobines.filter((_: any, i: number) => i !== index) })
  }

  const handleUpdateBobine = (index: number, field: string, value: any) => {
    if (!editingLot) return
    const nb = [...editingLot.bobines]; nb[index] = { ...nb[index], [field]: value }; setEditingLot({ ...editingLot, bobines: nb })
  }

  const handleEtape1 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setReceptionData({ ...receptionData, code_fournisseur: (fd.get('code_fournisseur') as string).toUpperCase(), num_commande: fd.get('num_commande') as string, num_type_produit: fd.get('num_type_produit') as string })
    setWizardStep(2)
  }

  const handleEtape2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget); const n = parseInt(fd.get('nombre_bobines') as string)
    setReceptionData({ ...receptionData, type_materiel: fd.get('type_materiel') as string, diametre_fil: fd.get('diametre_fil') as string, longueur_feuillard: fd.get('longueur_feuillard') as string, largeur_feuillard: fd.get('largeur_feuillard') as string, matiere: fd.get('matiere') as string, durete: fd.get('durete') as string, revetement: fd.get('revetement') as string, date_reception: fd.get('date_reception') as string, nombre_bobines: n, poids_bobines: new Array(n).fill(0) })
    setWizardStep(3)
  }

  const handlePoidsChange = (index: number, value: string) => {
    const np = [...receptionData.poids_bobines]; np[index] = parseFloat(value) || 0; setReceptionData({ ...receptionData, poids_bobines: np })
  }

  const poidsTotal = receptionData.poids_bobines.reduce((s, p) => s + p, 0)

  const handleValiderReception = async () => {
    try {
      const res = await fetch('/api/receptions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(receptionData) })
      if (res.ok) {
        await res.json()
        const all = await fetch('/api/bobines').then(r => r.json())
        const duLot = all.filter((b: Bobine) => b.reception.code_fournisseur === receptionData.code_fournisseur && b.reception.num_commande === receptionData.num_commande.padStart(2, '0') && b.reception.num_type_produit === receptionData.num_type_produit.padStart(2, '0'))
        showToast('Reception creee !', 'success')
        if (confirm('Imprimer les etiquettes ?')) { setBobinesToPrint(duLot); setShowEtiquette(true) }
        else { setCurrentPage('home'); setWizardStep(1) }
        chargerBobines()
      } else { const e = await res.json(); showToast(e.error, 'error') }
    } catch { showToast('Erreur connexion', 'error') }
  }

  const startScanner = useCallback(() => {
    setShowScan(true)
    setTimeout(() => {
      const scanner = new Html5QrcodeScanner('reader', { qrbox: { width: 250, height: 250 }, fps: 5 }, false)
      scanner.render(
        (decodedText) => {
          const bobine = bobines.find(b => b.code_bobine === decodedText.toUpperCase())
          if (bobine) { setSelectedBobine(bobine); setShowScan(false); scanner.clear() }
          else showToast('Bobine non trouvee', 'error')
        },
        () => {}
      )
      scannerRef.current = scanner
    }, 100)
  }, [bobines, showToast])

  const handleVersUsine = async () => {
    if (!selectedBobine) return
    if (selectedBobine.lieu === 'USINE') { showToast('Deja en usine', 'warning'); return }
    if (!numCommandeFabrication.trim()) { showToast('Saisissez le N° de commande', 'warning'); return }
    try {
      const res = await fetch('/api/mouvements', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code_bobine: selectedBobine.code_bobine, type_mouvement: 'TRANSFERT_VERS_USINE', poids_mouvement: 0, num_commande_fabrication: numCommandeFabrication }) })
      if (res.ok) { saveCommandToHistory(numCommandeFabrication); showToast('Transferee vers usine', 'success'); setCurrentPage('home'); setSelectedBobine(null); setNumCommandeFabrication(''); chargerBobines() }
      else { const e = await res.json(); showToast(e.error, 'error') }
    } catch { showToast('Erreur', 'error') }
  }

  const handleRetourUsine = async () => {
    if (!selectedBobine) return
    if (selectedBobine.lieu !== 'USINE') { showToast("Pas en usine", 'warning'); return }
    const p = parseFloat(poidsRestant)
    if (isNaN(p) || p < 0) { showToast('Poids invalide (0 = tout consomme)', 'warning'); return }
    try {
      const res = await fetch('/api/mouvements', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code_bobine: selectedBobine.code_bobine, type_mouvement: 'RETOUR_USINE', poids_mouvement: p, lieu_destination: 'STOCK_PRINCIPAL' }) })
      if (res.ok) { showToast('Retour stock principal', 'success'); setCurrentPage('home'); setSelectedBobine(null); setPoidsRestant(''); chargerBobines() }
      else { const e = await res.json(); showToast(e.error, 'error') }
    } catch { showToast('Erreur', 'error') }
  }

  const handleRetourDechet = async () => {
    if (!selectedBobine) return
    try {
      const res = await fetch('/api/mouvements', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code_bobine: selectedBobine.code_bobine, type_mouvement: 'SORTIE_DECHET', poids_mouvement: parseFloat(selectedBobine.poids_actuel) }) })
      if (res.ok) { showToast('Mise au rebut', 'success'); setCurrentPage('home'); setSelectedBobine(null); chargerBobines() }
      else { const e = await res.json(); showToast(e.error, 'error') }
    } catch { showToast('Erreur', 'error') }
  }

  const lotsDisponibles = bobines.reduce((acc, b) => {
    const k = `${b.reception.code_fournisseur}-${b.reception.num_commande}-${b.reception.num_type_produit}`
    if (!acc[k]) acc[k] = { id: k, code_fournisseur: b.reception.code_fournisseur, num_commande: b.reception.num_commande, num_type_produit: b.reception.num_type_produit, nom: `${b.reception.code_fournisseur}${b.reception.num_commande}${b.reception.num_type_produit}`, nb_bobines: 0 }
    acc[k].nb_bobines++; return acc
  }, {} as Record<string, any>)

  const handleImprimerLot = (lotKey: string) => {
    const lot = lotsDisponibles[lotKey]
    setBobinesToPrint(bobines.filter(b => b.reception.code_fournisseur === lot.code_fournisseur && b.reception.num_commande === lot.num_commande && b.reception.num_type_produit === lot.num_type_produit))
    setShowEtiquette(true)
  }

  const exporterCSV = (type: 'stock' | 'consommation' | 'mouvements') => {
    let url = ''
    if (type === 'stock') url = '/api/export/stock'
    else if (type === 'consommation') url = `/api/export/consommation?mois=${moisConso}`
    else if (type === 'mouvements') url = `/api/export/mouvements${commandeFilter ? `?commande=${commandeFilter}` : ''}`
    window.open(url, '_blank')
  }

  const getBaseUrl = () => typeof window !== 'undefined' ? window.location.origin : 'https://stock-bobines.vercel.app'

  const diametresDisponibles = Array.from(new Set(bobines.filter(b => b.lieu === 'STOCK_PRINCIPAL' && b.reception.type_materiel === 'Fil' && b.reception.diametre_fil).map(b => parseFloat(b.reception.diametre_fil!)))).sort((a, b) => a - b)

  const etatFiltre = etatResume.filter(item => {
    if (!diametreFilter) return true
    const m = item.dimension.match(/Ø?([\d.]+)/)
    return m ? parseFloat(m[1]) === parseFloat(diametreFilter) : true
  }).sort((a, b) => {
    const mA = a.dimension.match(/Ø?([\d.]+)/); const mB = b.dimension.match(/Ø?([\d.]+)/)
    return (mA ? parseFloat(mA[1]) : 9999) - (mB ? parseFloat(mB[1]) : 9999)
  })

  const diametresConso = consoData?.par_diametre.map(d => d.diametre) || []
  const duretesConso = consoData?.par_durete.map(d => d.durete) || []

  // ============ RENDER HELPERS ============

  const renderLogin = () => (
    <div className="min-h-dvh bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-sm w-full" style={{ animation: 'slideUp 0.4s ease-out' }}>
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-xl shadow-blue-600/20">
            <span className="text-4xl">{'📦'}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Stock Bobines</h1>
          <p className="text-sm text-gray-500">Gestion terrain simplifiee</p>
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
          <p className="text-center text-xs text-gray-400">Connexion autorisee de 7h30 a 18h00</p>
        </div>
      </div>
    </div>
  )

  const renderHome = () => (
    <div className="min-h-dvh bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-5">
      <Header user={currentUser} isAdmin={isAdmin} onLogout={handleLogout} />
      <div className="max-w-lg mx-auto pt-4" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-sm text-gray-500 mt-1">Que souhaitez-vous faire ?</p>
        </div>
        <div className="space-y-3">
          <ActionButton icon={'➕'} label="Nouvel Arrivage" desc="Receptionner un lot de bobines" color="emerald" onClick={() => { setWizardStep(1); navigateTo('arrivage') }} />
          <ActionButton icon={'➡️'} label="Vers Usine" desc="Transferer une bobine a l'usine" color="purple" onClick={() => navigateTo('usine')} />
          <ActionButton icon={'🔙'} label="Retour Usine" desc="Retourner une bobine au stock" color="cyan" onClick={() => navigateTo('retour_usine')} />
          <ActionButton icon={'🗑️'} label="Mise au Rebut" desc="Declarer une bobine comme dechet" color="red" onClick={() => navigateTo('retour')} />
          <ActionButton icon={'📊'} label="Etat du Stock" desc="Voir l'inventaire complet" color="blue" onClick={() => { chargerEtat(); navigateTo('etat') }} />
          <ActionButton icon={'📉'} label="Consommation" desc="Analyse par commande, diametre, durete" color="orange" onClick={() => { chargerConsommation(); navigateTo('consommation') }} />
          <ActionButton icon={'🔐'} label="Administration" desc="Gestion des items, lots, utilisateurs" color="gray" onClick={() => {
            if (!isAdmin) { showToast('Acces reserve aux administrateurs', 'warning'); return }
            chargerLots(); chargerUsers(); navigateTo('autre')
          }} />
        </div>
      </div>
    </div>
  )

  const renderEtiquette = () => {
    const baseUrl = getBaseUrl()
    return (
      <>
        <div className="min-h-dvh bg-gray-50 p-5">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-4">
              <PageTitle icon={'🏷️'} title={`${bobinesToPrint.length} etiquette(s)`} />
              <div className="flex gap-2">
                <button onClick={() => window.print()} className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">{'🖨️'} Imprimer</button>
                <button onClick={() => { setShowEtiquette(false); setBobinesToPrint([]) }} className="w-10 h-10 rounded-xl bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors">{'✕'}</button>
              </div>
            </div>
            <div id="etiquettes-grid" className="space-y-4">
              {bobinesToPrint.map((bobine, idx) => {
                const r = bobine.reception
                const dim = r.type_materiel === 'Fil' ? `Ø${r.diametre_fil}` : `${r.largeur_feuillard}x${r.longueur_feuillard}`
                return (
                  <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{r.code_fournisseur} Cmd {r.num_commande}</p>
                      <p className="text-lg font-bold font-mono text-gray-900 mt-0.5">{bobine.code_bobine}</p>
                      <p className="text-2xl font-bold text-blue-700 mt-2">{dim}</p>
                      <p className="text-2xl font-bold text-emerald-700">{bobine.poids_initial} kg</p>
                      <p className="text-sm font-medium text-gray-700 mt-1">{r.matiere} | {r.durete} | {r.revetement}</p>
                    </div>
                    <div className="flex-shrink-0 flex items-center">
                      <QRCodeSVG value={`${baseUrl}/bobine/${bobine.code_bobine}`} size={100} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <style>{`
          @media print {
            body * { visibility: hidden; }
            #etiquettes-grid, #etiquettes-grid * { visibility: visible; }
            #etiquettes-grid { position: absolute; left: 0; top: 0; width: 210mm; display: grid; grid-template-columns: repeat(3, 62mm); grid-template-rows: repeat(3, 90mm); gap: 3mm; padding: 10mm; }
            .etiquette { width: 62mm; height: 90mm; border: 1px solid #000; padding: 2mm; page-break-inside: avoid; box-sizing: border-box; }
            @page { size: A4 portrait; margin: 0; }
          }
        `}</style>
      </>
    )
  }

  const renderScan = () => (
    <div className="min-h-dvh bg-gray-50 p-5">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-4">
          <PageTitle icon={'📷'} title="Scanner" />
          <button onClick={() => { setShowScan(false); if (scannerRef.current) scannerRef.current.clear() }} className="w-10 h-10 rounded-xl bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors">{'✕'}</button>
        </div>
        <div id="reader" className="w-full"></div>
      </div>
    </div>
  )

  const renderArrivage = () => (
    <div className="min-h-dvh bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-5">
      <div className="max-w-lg mx-auto" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <PageTitle icon={'➕'} title="Nouvel Arrivage" onBack={() => navigateTo('home')} />
        <div className="flex gap-1 mb-6">
          {[1, 2, 3].map(s => (
            <div key={s} className={`flex-1 h-2 rounded-full transition-colors ${s <= wizardStep ? 'bg-emerald-600' : 'bg-gray-200'}`} />
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center mb-1">Etape {wizardStep}/3</p>

        {wizardStep === 1 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-emerald-100" style={{ animation: 'slideUp 0.3s ease-out' }}>
            <form onSubmit={handleEtape1} className="space-y-4">
              <Input label="Code Fournisseur" name="code_fournisseur" value={receptionData.code_fournisseur} onChange={v => setReceptionData({ ...receptionData, code_fournisseur: v.toUpperCase() })} maxLength={4} placeholder="Ex: A001" />
              <Input label="N° Commande (2 chiffres)" name="num_commande" value={receptionData.num_commande} onChange={v => setReceptionData({ ...receptionData, num_commande: v })} maxLength={2} placeholder="Ex: 01" />
              <Input label="N° Type Produit (2 chiffres)" name="num_type_produit" value={receptionData.num_type_produit} onChange={v => setReceptionData({ ...receptionData, num_type_produit: v })} maxLength={2} placeholder="Ex: 01" />
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-2xl transition-all active:scale-[0.98]">Suivant</button>
            </form>
          </div>
        )}

        {wizardStep === 2 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-emerald-100" style={{ animation: 'slideUp 0.3s ease-out' }}>
            <form onSubmit={handleEtape2} className="space-y-4">
              <Select label="Type de materiel" name="type_materiel" value={receptionData.type_materiel} onChange={v => setReceptionData({ ...receptionData, type_materiel: v })} options={[{ value: 'Fil', label: 'Fil' }, { value: 'Feuillard', label: 'Feuillard' }]} />
              {receptionData.type_materiel === 'Fil' ? (
                <Input label="Diametre (mm)" name="diametre_fil" type="number" step="0.01" value={receptionData.diametre_fil || ''} onChange={v => setReceptionData({ ...receptionData, diametre_fil: v })} placeholder="Ex: 2.50" />
              ) : (
                <>
                  <Input label="Largeur (mm)" name="largeur_feuillard" type="number" step="0.01" value={receptionData.largeur_feuillard || ''} onChange={v => setReceptionData({ ...receptionData, largeur_feuillard: v })} placeholder="Ex: 30" />
                  <Input label="Longueur (mm)" name="longueur_feuillard" type="number" step="0.01" value={receptionData.longueur_feuillard || ''} onChange={v => setReceptionData({ ...receptionData, longueur_feuillard: v })} placeholder="Ex: 1000" />
                </>
              )}
              <Select label="Matiere" name="matiere" value={receptionData.matiere} onChange={v => setReceptionData({ ...receptionData, matiere: v })}
                options={itemsMatiere.map(i => ({ value: i.nom, label: i.nom }))} />
              <Select label="Durete" name="durete" value={receptionData.durete} onChange={v => setReceptionData({ ...receptionData, durete: v })}
                options={itemsDurete.map(i => ({ value: i.nom, label: i.nom }))} />
              <Select label="Revetement" name="revetement" value={receptionData.revetement} onChange={v => setReceptionData({ ...receptionData, revetement: v })}
                options={itemsRev.map(i => ({ value: i.nom, label: i.nom }))} />
              <Input label="Date reception" name="date_reception" type="date" value={receptionData.date_reception} onChange={v => setReceptionData({ ...receptionData, date_reception: v })} />
              <Input label="Nombre de bobines" name="nombre_bobines" type="number" value={String(receptionData.nombre_bobines)} onChange={v => setReceptionData({ ...receptionData, nombre_bobines: parseInt(v) || 1 })} />
              <div className="flex gap-3">
                <button type="button" onClick={() => setWizardStep(1)} className="flex-1 bg-gray-200 hover:bg-gray-300 font-semibold py-3.5 rounded-2xl transition-colors">Retour</button>
                <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-2xl transition-all active:scale-[0.98]">Suivant</button>
              </div>
            </form>
          </div>
        )}

        {wizardStep === 3 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-emerald-100" style={{ animation: 'slideUp 0.3s ease-out' }}>
            <h3 className="font-bold text-lg text-gray-900 mb-4">Poids des bobines</h3>
            <div className="space-y-3 mb-6 max-h-80 overflow-y-auto">
              {Array.from({ length: receptionData.nombre_bobines }).map((_, i) => (
                <Input key={i} label={`Bobine ${i + 1}`} type="number" step="0.01" value={String(receptionData.poids_bobines[i] || '')} onChange={v => handlePoidsChange(i, v)} placeholder="Poids en kg" />
              ))}
            </div>
            <TotalCard label="Poids total du lot" value={poidsTotal.toFixed(2)} unit="kg" count={`${receptionData.nombre_bobines} bobine(s)`} color="green" />
            <div className="flex gap-3 mt-4">
              <button onClick={() => setWizardStep(2)} className="flex-1 bg-gray-200 hover:bg-gray-300 font-semibold py-3.5 rounded-2xl transition-colors">Retour</button>
              <button onClick={handleValiderReception} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-2xl transition-all active:scale-[0.98]">Valider la reception</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderUsine = () => (
    <div className="min-h-dvh bg-gradient-to-br from-purple-50 via-white to-purple-100 p-5">
      <div className="max-w-lg mx-auto" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <PageTitle icon={'➡️'} title="Vers Usine" onBack={() => navigateTo('home')} />

        {!selectedBobine ? (
          <>
            <p className="text-sm text-gray-600 mb-4 text-center">Scannez une bobine pour la transferer a l'usine</p>
            <button onClick={startScanner} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-6 rounded-2xl text-xl transition-all shadow-lg shadow-purple-600/25 active:scale-[0.98] flex items-center justify-center gap-3">
              <span className="text-3xl">{'📷'}</span> Scanner une bobine
            </button>
          </>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-purple-100" style={{ animation: 'slideUp 0.3s ease-out' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-500">Bobine selectionnee</p>
                <p className="text-xl font-bold font-mono">{selectedBobine.code_bobine}</p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">{selectedBobine.poids_actuel} kg</span>
            </div>
            <div className="space-y-4 relative">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">N° Commande Fabrication</label>
                <input ref={cmdInputRef} type="text" value={numCommandeFabrication} onChange={e => { setNumCommandeFabrication(e.target.value); setShowCommandSuggestions(e.target.value.length > 0) }}
                  onFocus={() => setShowCommandSuggestions(numCommandeFabrication.length > 0)}
                  onBlur={() => setTimeout(() => setShowCommandSuggestions(false), 200)}
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all text-base" placeholder="CMD-2026-001" autoFocus />
                {/* Suggestions historiques */}
                {showCommandSuggestions && commandHistory.filter(c => c.toUpperCase().includes(numCommandeFabrication.toUpperCase())).length > 0 && (
                  <div className="absolute z-20 w-full mt-1 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 max-h-48 overflow-y-auto" style={{ animation: 'scaleIn 0.15s ease-out' }}>
                    {commandHistory.filter(c => c.toUpperCase().includes(numCommandeFabrication.toUpperCase())).map((cmd, i) => (
                      <button key={i} onClick={() => { setNumCommandeFabrication(cmd); setShowCommandSuggestions(false) }}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-purple-50 flex items-center gap-3 transition-colors">
                        <span className="text-purple-600">{'🕐'}</span> {cmd}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setSelectedBobine(null)} className="flex-1 bg-gray-200 hover:bg-gray-300 font-semibold py-3.5 rounded-2xl transition-colors">Annuler</button>
                <button onClick={handleVersUsine} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3.5 rounded-2xl transition-all active:scale-[0.98]">Valider</button>
              </div>
            </div>
          </div>
        )}
        {/* Historique rapide */}
        {commandHistory.length > 0 && !selectedBobine && (
          <div className="mt-6 bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-purple-100">
            <h3 className="font-semibold text-xs text-gray-500 uppercase tracking-wider mb-3">Dernieres commandes</h3>
            <div className="flex flex-wrap gap-2">
              {commandHistory.slice(0, 8).map((cmd, i) => (
                <button key={i} onClick={() => setNumCommandeFabrication(cmd)}
                  className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-xl text-sm font-medium transition-colors">
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderRetourUsine = () => (
    <div className="min-h-dvh bg-gradient-to-br from-cyan-50 via-white to-cyan-100 p-5">
      <div className="max-w-lg mx-auto" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <PageTitle icon={'🔙'} title="Retour Usine" onBack={() => navigateTo('home')} />

        {!selectedBobine ? (
          <>
            <p className="text-sm text-gray-600 mb-4 text-center">Scannez une bobine a retourner au stock</p>
            <button onClick={startScanner} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-6 rounded-2xl text-xl transition-all shadow-lg shadow-cyan-600/25 active:scale-[0.98] flex items-center justify-center gap-3">
              <span className="text-3xl">{'📷'}</span> Scanner une bobine
            </button>
          </>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-cyan-100" style={{ animation: 'slideUp 0.3s ease-out' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-500">Bobine selectionnee</p>
                <p className="text-xl font-bold font-mono">{selectedBobine.code_bobine}</p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">{selectedBobine.poids_actuel} kg</span>
            </div>
            {selectedBobine.lieu !== 'USINE' ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg mb-2">{'⚠️'}</p>
                <p className="font-medium">Cette bobine n'est pas a l'usine</p>
                <p className="text-sm mt-1">Statut: {selectedBobine.lieu}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-cyan-50 rounded-2xl p-4">
                  <p className="text-xs text-gray-600">Poids initial: <strong>{selectedBobine.poids_initial} kg</strong></p>
                  <p className="text-xs text-gray-600">Poids actuel: <strong>{selectedBobine.poids_actuel} kg</strong></p>
                </div>
                <Input label="Poids restant (kg)" type="number" step="0.01" value={poidsRestant} onChange={setPoidsRestant} placeholder="Ex: 15.5" />
                <div className="flex gap-3">
                  <button onClick={() => setSelectedBobine(null)} className="flex-1 bg-gray-200 hover:bg-gray-300 font-semibold py-3.5 rounded-2xl transition-colors">Annuler</button>
                  <button onClick={handleRetourUsine} className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3.5 rounded-2xl transition-all active:scale-[0.98]">Valider le retour</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )

  const renderDechet = () => (
    <div className="min-h-dvh bg-gradient-to-br from-red-50 via-white to-red-100 p-5">
      <div className="max-w-lg mx-auto" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <PageTitle icon={'🗑️'} title="Mise au Rebut" onBack={() => navigateTo('home')} />

        {!selectedBobine ? (
          <>
            <p className="text-sm text-gray-600 mb-4 text-center">Scannez la bobine a mettre au rebut</p>
            <button onClick={startScanner} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 rounded-2xl text-xl transition-all shadow-lg shadow-red-600/25 active:scale-[0.98] flex items-center justify-center gap-3">
              <span className="text-3xl">{'📷'}</span> Scanner une bobine
            </button>
          </>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-red-100" style={{ animation: 'slideUp 0.3s ease-out' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-500">Bobine selectionnee</p>
                <p className="text-xl font-bold font-mono">{selectedBobine.code_bobine}</p>
              </div>
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">{selectedBobine.statut}</span>
            </div>
            <div className="bg-red-50 rounded-2xl p-4 mb-4">
              <p className="text-sm text-gray-700">Poids actuel: <strong>{selectedBobine.poids_actuel} kg</strong></p>
              <p className="text-xs text-gray-500 mt-1">La bobine sera declaree comme dechet</p>
            </div>
            <button onClick={handleRetourDechet} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-2xl transition-all active:scale-[0.98] text-lg">{'🗑️'} Confirmer la mise au rebut</button>
            <button onClick={() => setSelectedBobine(null)} className="w-full mt-3 bg-gray-200 hover:bg-gray-300 font-semibold py-3 rounded-2xl transition-colors text-sm">Annuler</button>
          </div>
        )}
      </div>
    </div>
  )

  const renderEtat = () => (
    <div className="min-h-dvh bg-gradient-to-br from-blue-50 via-white to-blue-100 p-5">
      <div className="max-w-lg mx-auto" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <PageTitle icon={'📊'} title="Etat du Stock" onBack={() => navigateTo('home')} />

        {etatResume.length === 0 ? (
          <Loading text="Chargement du stock..." />
        ) : (
          <>
            <TotalCard label="Total bobines" value={String(bobines.length)} unit="unites" color="blue" />
            <div className="grid grid-cols-3 gap-2 mt-3 mb-5">
              <MiniStat value={bobines.filter(b => b.lieu === 'STOCK_PRINCIPAL').length} label="En Stock" color="blue" />
              <MiniStat value={bobines.filter(b => b.lieu === 'USINE').length} label="En Usine" color="purple" />
              <MiniStat value={bobines.filter(b => b.lieu === 'DECHET').length} label="Dechet" color="red" />
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-blue-100 mb-4">
              <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-3">Filtrer par diametre</h3>
              <select value={diametreFilter} onChange={e => setDiametreFilter(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none text-sm">
                <option value="">Tous les diametres</option>
                {diametresDisponibles.map(d => (
                  <option key={d} value={d}>Ø{d} mm</option>
                ))}
              </select>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-blue-100">
              <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-4">Par lot</h3>
              <div className="space-y-2">
                {etatFiltre.map((item, idx) => (
                  <div key={idx} className="py-3 px-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-start justify-between mb-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-sm">{item.dimension}</p>
                        <p className="text-xs text-gray-500">{item.matiere} | {item.durete} | {item.revetement}</p>
                        <p className="text-xs text-gray-400">{item.fournisseur} Cmd {item.commande}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <p className="font-bold text-gray-900">{item.poids_stock} kg</p>
                        <p className="text-xs text-gray-500">{item.nb_bobines} bobine(s)</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="bg-blue-100 rounded-xl py-1.5">
                        <p className="font-bold text-blue-800">{item.poids_stock} kg</p>
                        <p className="text-[10px] text-blue-600">En Stock</p>
                      </div>
                      <div className="bg-purple-100 rounded-xl py-1.5">
                        <p className="font-bold text-purple-800">{item.poids_consomme} kg</p>
                        <p className="text-[10px] text-purple-600">Consomme</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-blue-100 mt-4">
              <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-4">Imprimer etiquettes d'un lot</h3>
              <div className="flex flex-wrap gap-2">
                {Object.values(lotsDisponibles).map((lot: any) => (
                  <button key={lot.id} onClick={() => handleImprimerLot(lot.id)}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all active:scale-[0.95]">
                    {lot.nom} ({lot.nb_bobines})
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )

  const renderConsommation = () => (
    <div className="min-h-dvh bg-gradient-to-br from-orange-50 via-white to-amber-50 p-5">
      <div className="max-w-lg mx-auto" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <PageTitle icon={'📉'} title="Consommation" onBack={() => navigateTo('home')} />

        {/* Filtres */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-orange-100 mb-4">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Commande fab.</label>
              <input type="text" value={consoFiltreCmd} onChange={e => setConsoFiltreCmd(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" placeholder="Filtrer..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Diametre</label>
              <select value={consoFiltreDiam} onChange={e => setConsoFiltreDiam(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm">
                <option value="">Tous</option>
                {diametresConso.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Durete</label>
              <select value={consoFiltreDur} onChange={e => setConsoFiltreDur(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm">
                <option value="">Toutes</option>
                {duretesConso.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Periode</label>
              <select value={consoFiltreMois} onChange={e => setConsoFiltreMois(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm">
                <option value={1}>1 mois</option>
                <option value={3}>3 mois</option>
                <option value={6}>6 mois</option>
                <option value={12}>12 mois</option>
                <option value={24}>24 mois</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={chargerConsommation} className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 rounded-xl transition-all text-sm active:scale-[0.98]">{'🔍'} Appliquer</button>
            <button onClick={exporterConsoDetail} className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-4 py-2.5 rounded-xl transition-all text-sm">{'📥'} CSV</button>
          </div>
        </div>

        {/* Vue tabs */}
        <div className="flex gap-2 mb-4">
          {(['commande', 'diametre', 'durete'] as const).map(v => (
            <button key={v} onClick={() => setConsoVue(v)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${consoVue === v ? 'bg-orange-600 text-white shadow-lg' : 'bg-white/80 text-gray-600 border border-gray-200'}`}>
              {v === 'commande' ? '📋 Par Commande' : v === 'diametre' ? '🎯 Par Diametre' : '🔩 Par Durete'}
            </button>
          ))}
        </div>

        {consoLoading ? (
          <Loading text="Analyse des consommations..." />
        ) : !consoData ? (
          <div className="text-center py-12 text-gray-400">
            <span className="text-5xl mb-4 block">{'📉'}</span>
            <p>Appliquer les filtres pour voir les donnees</p>
          </div>
        ) : (
          <>
            {/* Total */}
            <TotalCard label="Mouvements analyses" value={String(consoData.total_mouvements)} unit="mvt" color="orange" />

            {/* Par Commande */}
            {consoVue === 'commande' && (
              <div className="mt-4 space-y-3">
                {consoData.par_commande.length === 0 && <EmptyState icon={'📋'} text="Aucune commande trouvee" />}
                {consoData.par_commande.map((item, idx) => (
                  <div key={idx} className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-orange-100">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-bold text-gray-900">{item.commande === 'SANS_COMMANDE' ? '⚠️ Sans commande' : item.commande}</p>
                        <p className="text-xs text-gray-500">{item.nb_bobines} bobine(s) · {item.nb_mouvements} mouvement(s)</p>
                      </div>
                      <span className="text-lg font-bold text-orange-700">{item.poids_total.toFixed(1)} kg</span>
                    </div>
                    {/* Barre de progression */}
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                      <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: `${Math.min(100, item.poids_total / 50 * 100)}%` }} />
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-orange-50 rounded-xl p-2">
                        <p className="font-bold text-orange-700">{item.poids_usine.toFixed(1)} kg</p>
                        <p className="text-gray-500">Usine</p>
                      </div>
                      <div className="bg-red-50 rounded-xl p-2">
                        <p className="font-bold text-red-700">{item.poids_dechet.toFixed(1)} kg</p>
                        <p className="text-gray-500">Dechet</p>
                      </div>
                      <div className="bg-cyan-50 rounded-xl p-2">
                        <p className="font-bold text-cyan-700">{item.poids_retour.toFixed(1)} kg</p>
                        <p className="text-gray-500">Retour</p>
                      </div>
                    </div>
                    {(item.matieres.length > 0 || item.diametres.length > 0) && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.matieres.slice(0, 3).map(m => <span key={m} className="px-2 py-0.5 bg-gray-100 rounded-lg text-[10px] text-gray-600">{m}</span>)}
                        {item.diametres.slice(0, 3).map(d => <span key={d} className="px-2 py-0.5 bg-blue-100 rounded-lg text-[10px] text-blue-700">{d}</span>)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Par Diametre */}
            {consoVue === 'diametre' && (
              <div className="mt-4 space-y-3">
                {consoData.par_diametre.length === 0 && <EmptyState icon={'🎯'} text="Aucun diametre trouve" />}
                {consoData.par_diametre.map((item, idx) => (
                  <div key={idx} className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-orange-100">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-bold text-gray-900">{item.diametre}</p>
                      <span className="text-lg font-bold text-orange-700">{item.poids_total.toFixed(1)} kg</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                      <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: `${Math.min(100, item.poids_total / 100 * 100)}%` }} />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="bg-orange-50 rounded-xl p-2">
                        <p className="font-bold text-orange-700">{item.poids_usine.toFixed(1)} kg</p>
                        <p className="text-gray-500">Usine</p>
                      </div>
                      <div className="bg-red-50 rounded-xl p-2">
                        <p className="font-bold text-red-700">{item.poids_dechet.toFixed(1)} kg</p>
                        <p className="text-gray-500">Dechet</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Par Durete */}
            {consoVue === 'durete' && (
              <div className="mt-4 space-y-3">
                {consoData.par_durete.length === 0 && <EmptyState icon={'🔩'} text="Aucune durete trouvee" />}
                {consoData.par_durete.map((item, idx) => (
                  <div key={idx} className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-orange-100">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-bold text-gray-900">{item.durete}</p>
                      <span className="text-lg font-bold text-orange-700">{item.poids_total.toFixed(1)} kg</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                      <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: `${Math.min(100, item.poids_total / 100 * 100)}%` }} />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="bg-orange-50 rounded-xl p-2">
                        <p className="font-bold text-orange-700">{item.poids_usine.toFixed(1)} kg</p>
                        <p className="text-gray-500">Usine</p>
                      </div>
                      <div className="bg-red-50 rounded-xl p-2">
                        <p className="font-bold text-red-700">{item.poids_dechet.toFixed(1)} kg</p>
                        <p className="text-gray-500">Dechet</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )

  const renderAutre = () => (
    <div className="min-h-dvh bg-gradient-to-br from-gray-50 via-white to-gray-100 p-5">
      <div className="max-w-lg mx-auto" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <PageTitle icon={'🔐'} title="Administration" onBack={() => navigateTo('home')} />
        <div className="flex overflow-x-auto gap-2 mb-6 pb-2 -mx-5 px-5">
          {(['items', 'lots', 'users', 'history', 'backup', 'reset'] as AutreSection[]).map(s => (
            <button key={s} onClick={() => setAutreSection(s)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${autreSection === s ? 'bg-gray-900 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {s === 'items' && '📦'} {s === 'lots' && '🏷️'} {s === 'users' && '👥'} {s === 'history' && '📋'} {s === 'backup' && '📤'} {s === 'reset' && '⚠️'} {' '}
              {s[0].toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {autreSection === 'items' && (
          <div className="space-y-4">
            <ItemManager title="Matieres" items={itemsMatiere} onRefresh={chargerItems} categorie="MATIERE" showToast={showToast} />
            <ItemManager title="Duretes" items={itemsDurete} onRefresh={chargerItems} categorie="DURETE" showToast={showToast} />
            <ItemManager title="Revetements" items={itemsRev} onRefresh={chargerItems} categorie="REVETEMENT" showToast={showToast} />
          </div>
        )}

        {autreSection === 'lots' && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-gray-100">
            <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-4">Lots ({lots.length})</h3>
            <div className="space-y-2">
              {lots.map((lot: any) => (
                <div key={lot.id} className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="font-semibold text-sm">{lot.code_fournisseur} Cmd {lot.num_commande}</p>
                    <p className="text-xs text-gray-500">{lot.matiere} | {lot.durete} | {lot.revetement}</p>
                    <p className="text-xs text-gray-400">{lot.bobines?.length || 0} bobine(s)</p>
                  </div>
                  <button onClick={() => handleEditLot(lot.id)} className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-medium transition-colors">{'✏️'} Editer</button>
                </div>
              ))}
              {lots.length === 0 && <EmptyState icon={'🏷️'} text="Aucun lot trouve" />}
            </div>
          </div>
        )}

        {autreSection === 'users' && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-gray-100">
              <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-4">Ajouter un utilisateur</h3>
              <div className="space-y-3">
                <Input label="Login" value={newUser.login} onChange={v => setNewUser({ ...newUser, login: v })} placeholder="Login" />
                <Input label="Mot de passe" value={newUser.password} onChange={v => setNewUser({ ...newUser, password: v })} placeholder="Mot de passe" />
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={newUser.isAdmin} onChange={e => setNewUser({ ...newUser, isAdmin: e.target.checked })} className="w-4 h-4" /> Admin</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={newUser.isSuper} onChange={e => setNewUser({ ...newUser, isSuper: e.target.checked })} className="w-4 h-4" /> Super Admin</label>
                </div>
                <button onClick={handleAddUser} className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-2xl transition-all active:scale-[0.98]">Ajouter</button>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-gray-100">
              <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-4">Utilisateurs ({users.length})</h3>
              <div className="space-y-2">
                {users.map((u: any) => (
                  <div key={u.id} className="py-3 px-4 bg-gray-50 rounded-2xl">
                    {editingUser?.id === u.id ? (
                      <div className="space-y-3">
                        <input type="text" value={editingUser.login} onChange={e => setEditingUser({ ...editingUser, login: e.target.value })}
                          className="w-full px-3 py-2 bg-white border rounded-xl text-sm" />
                        <input type="password" value={editingUser.password || ''} onChange={e => setEditingUser({ ...editingUser, password: e.target.value })}
                          className="w-full px-3 py-2 bg-white border rounded-xl text-sm" placeholder="Nouveau mot de passe" />
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editingUser.isAdmin} onChange={e => setEditingUser({ ...editingUser, isAdmin: e.target.checked })} /> Admin</label>
                          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editingUser.isSuper} onChange={e => setEditingUser({ ...editingUser, isSuper: e.target.checked })} /> Super</label>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={handleUpdateUser} className="flex-1 bg-emerald-600 text-white py-2 rounded-xl text-sm font-medium">Sauvegarder</button>
                          <button onClick={() => setEditingUser(null)} className="flex-1 bg-gray-300 py-2 rounded-xl text-sm">Annuler</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-sm">{u.login}</p>
                          <p className="text-xs text-gray-500">{u.isSuper ? 'Super Admin' : u.isAdmin ? 'Admin' : 'User'}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setEditingUser(u)} className="text-blue-600 text-xs font-medium">{'✏️'}</button>
                          <button onClick={() => handleDeleteUser(u.id, u.login)} className="text-red-600 text-xs font-medium">{'🗑️'}</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={handleInitUsers} className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 rounded-2xl transition-colors text-sm">Creer utilisateurs par defaut</button>
            </div>
          </div>
        )}

        {autreSection === 'history' && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-gray-100">
            <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-4">Historique des connexions</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {history.map((h: any, idx: number) => (
                <div key={idx} className="flex justify-between py-2 px-3 bg-gray-50 rounded-xl text-sm">
                  <div>
                    <p className="font-medium">{h.user}</p>
                    <p className="text-xs text-gray-500">{h.appareil || 'N/A'}</p>
                  </div>
                  <p className="text-xs text-gray-400">{new Date(h.date_connexion).toLocaleString('fr-FR')}</p>
                </div>
              ))}
              {history.length === 0 && <EmptyState icon={'📋'} text="Aucun historique" />}
            </div>
          </div>
        )}

        {autreSection === 'backup' && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-gray-100">
              <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-4">Exports CSV</h3>
              <div className="space-y-3">
                <button onClick={() => exporterCSV('stock')} className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-2xl transition-all active:scale-[0.98] text-sm">{'📤'} Exporter Stock</button>
                <button onClick={() => exporterCSV('consommation')} className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-2xl transition-all active:scale-[0.98] text-sm">{'📤'} Exporter Consommation</button>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 text-xs">{'⚡'} Periode:</span>
                  <select value={moisConso} onChange={e => setMoisConso(Number(e.target.value))} className="px-3 py-1.5 bg-gray-50 border rounded-xl text-xs">
                    <option value={1}>1 mois</option>
                    <option value={3}>3 mois</option>
                    <option value={6}>6 mois</option>
                    <option value={12}>12 mois</option>
                  </select>
                </div>
                <button onClick={() => exporterCSV('mouvements')} className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-2xl transition-all active:scale-[0.98] text-sm">{'📤'} Exporter Mouvements</button>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-gray-100">
              <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-4">Backup complet</h3>
              <button onClick={handleExportBase} className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-2xl transition-all active:scale-[0.98] text-sm">{'⬇️'} Telecharger Backup CSV</button>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-gray-100">
              <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-4">Restaurer depuis CSV</h3>
              <div className="space-y-3">
                <input type="file" accept=".csv" onChange={e => setBackupFile(e.target.files?.[0] || null)}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-white hover:file:bg-gray-800" />
                <button onClick={handleImportBase} disabled={!backupFile}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 rounded-2xl transition-all active:scale-[0.98] text-sm disabled:opacity-50">{'⬆️'} Importer</button>
              </div>
            </div>
          </div>
        )}

        {autreSection === 'reset' && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-gray-100">
            <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-4 text-red-600">⚠️ Danger Zone</h3>
            <p className="text-sm text-gray-600 mb-4">Cette action supprime toutes les donnees : bobines, receptions, mouvements, items, utilisateurs.</p>
            <button onClick={handleReset} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-2xl transition-all active:scale-[0.98]">{'🗑️'} TOUT EFFACER</button>
          </div>
        )}
      </div>
    </div>
  )

  // ============ PAGE ROUTER ============
  if (showScan) return renderScan()
  if (showEtiquette) return renderEtiquette()

  return (
    <div>
      {toast && <ToastMsg message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      {!isAuthenticated && renderLogin()}
      {isAuthenticated && currentPage === 'home' && renderHome()}
      {isAuthenticated && currentPage === 'arrivage' && renderArrivage()}
      {isAuthenticated && currentPage === 'usine' && renderUsine()}
      {isAuthenticated && currentPage === 'retour_usine' && renderRetourUsine()}
      {isAuthenticated && currentPage === 'retour' && renderDechet()}
      {isAuthenticated && currentPage === 'etat' && renderEtat()}
      {isAuthenticated && currentPage === 'consommation' && renderConsommation()}
      {isAuthenticated && currentPage === 'autre' && renderAutre()}
    </div>
  )
}
