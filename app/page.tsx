'use client'

import { useState, useEffect } from 'react'

type Bobine = {
  id: number
  code_bobine: string
  poids_initial: string
  poids_actuel: string
  statut: string
  reception: {
    code_fournisseur: string
    matiere: string
    type_materiel: string
    diametre_fil: string | null
    largeur_feuillard: string | null
    longueur_feuillard: string | null
    durete: string
    revetement: string
  }
}

type ReceptionData = {
  code_fournisseur: string
  num_commande: string
  num_type_produit: string
  type_materiel: string
  diametre_fil?: string
  longueur_feuillard?: string
  largeur_feuillard?: string
  matiere: string
  durete: string
  revetement: string
  date_reception: string
  nombre_bobines: number
  poids_bobines: number[]
}

export default function Home() {
  const [bobines, setBobines] = useState<Bobine[]>([])
  const [msgMouvement, setMsgMouvement] = useState('')
  const [typeMouvement, setTypeMouvement] = useState('SORTIE_USINE')
  const [moisConso, setMoisConso] = useState(3)

  // État du wizard de réception
  const [showWizard, setShowWizard] = useState(false)
  const [wizardStep, setWizardStep] = useState(1)
  const [receptionData, setReceptionData] = useState<ReceptionData>({
    code_fournisseur: '',
    num_commande: '',
    num_type_produit: '',
    type_materiel: 'Fil',
    matiere: 'Acier',
    durete: 'Doux',
    revetement: 'Noir',
    date_reception: new Date().toISOString().split('T')[0],
    nombre_bobines: 1,
    poids_bobines: []
  })

  useEffect(() => {
    chargerBobines()
  }, [])

  const chargerBobines = async () => {
    try {
      const res = await fetch('/api/bobines')
      const data = await res.json()
      setBobines(data)
    } catch (error) {
      console.error(error)
    }
  }

  // Wizard - Étape 1 : Créer le lot
  const handleEtape1 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    
    setReceptionData({
      ...receptionData,
      code_fournisseur: (formData.get('code_fournisseur') as string).toUpperCase(),
      num_commande: formData.get('num_commande') as string,
      num_type_produit: formData.get('num_type_produit') as string
    })
    
    setWizardStep(2)
  }

  // Wizard - Étape 2 : Caractéristiques
  const handleEtape2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    
    const nombreBobines = parseInt(formData.get('nombre_bobines') as string)
    
    setReceptionData({
      ...receptionData,
      type_materiel: formData.get('type_materiel') as string,
      diametre_fil: formData.get('diametre_fil') as string,
      longueur_feuillard: formData.get('longueur_feuillard') as string,
      largeur_feuillard: formData.get('largeur_feuillard') as string,
      matiere: formData.get('matiere') as string,
      durete: formData.get('durete') as string,
      revetement: formData.get('revetement') as string,
      date_reception: formData.get('date_reception') as string,
      nombre_bobines: nombreBobines,
      poids_bobines: new Array(nombreBobines).fill(0)
    })
    
    setWizardStep(3)
  }

  // Wizard - Étape 3 : Saisie des poids
  const handlePoidsChange = (index: number, value: string) => {
    const newPoids = [...receptionData.poids_bobines]
    newPoids[index] = parseFloat(value) || 0
    setReceptionData({ ...receptionData, poids_bobines: newPoids })
  }

  const poidsTotal = receptionData.poids_bobines.reduce((sum, p) => sum + p, 0)

  const handleValider = async () => {
    try {
      const res = await fetch('/api/receptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...receptionData,
          poids_par_bobine: 0 // On va créer les bobines avec poids 0, puis les mettre à jour
        })
      })
      
      if (res.ok) {
        const result = await res.json()
        
        // Mettre à jour le poids de chaque bobine
        for (let i = 0; i < receptionData.nombre_bobines; i++) {
          const bobine = result.bobines[i]
          await fetch('/api/mouvements', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              code_bobine: bobine.code_bobine,
              type_mouvement: 'ENTREE_FOURNISSEUR',
              poids_mouvement: receptionData.poids_bobines[i]
            })
          })
        }
        
        alert('✅ Réception créée avec succès !')
        setShowWizard(false)
        setWizardStep(1)
        chargerBobines()
      } else {
        const error = await res.json()
        alert(`❌ ${error.error}`)
      }
    } catch (error) {
      alert('❌ Erreur de connexion')
    }
  }

  const handleMettreEnAttente = () => {
    // Sauvegarder en localStorage pour pouvoir reprendre plus tard
    localStorage.setItem('reception_en_attente', JSON.stringify(receptionData))
    alert('✅ Réception mise en attente. Vous pourrez la reprendre plus tard.')
    setShowWizard(false)
    setWizardStep(1)
  }

  const handleAnnuler = () => {
    if (confirm('Êtes-vous sûr de vouloir annuler ? Toutes les données seront perdues.')) {
      setShowWizard(false)
      setWizardStep(1)
      setReceptionData({
        code_fournisseur: '',
        num_commande: '',
        num_type_produit: '',
        type_materiel: 'Fil',
        matiere: 'Acier',
        durete: 'Doux',
        revetement: 'Noir',
        date_reception: new Date().toISOString().split('T')[0],
        nombre_bobines: 1,
        poids_bobines: []
      })
    }
  }

  // Gestion des mouvements
  const handleSubmitMouvement = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    
    const data = {
      code_bobine: formData.get('code_bobine'),
      type_mouvement: formData.get('type_mouvement'),
      poids_mouvement: formData.get('poids_mouvement'),
      n_commande_client: formData.get('n_commande_client'),
      client: formData.get('client'),
      texte_libre: formData.get('texte_libre')
    }

    try {
      const res = await fetch('/api/mouvements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const result = await res.json()
      
      if (res.ok) {
        setMsgMouvement(`✅ ${result.message} - Restant: ${result.poids_restant} kg (${result.statut})`)
        form.reset()
        chargerBobines()
      } else {
        setMsgMouvement(`❌ ${result.error}`)
      }
    } catch (error) {
      setMsgMouvement('❌ Erreur de connexion')
    }
    
    setTimeout(() => setMsgMouvement(''), 5000)
  }

  const exporterCSV = async (type: 'stock' | 'consommation') => {
    const url = type === 'stock' 
      ? '/api/export/stock'
      : `/api/export/consommation?mois=${moisConso}`
    
    window.open(url, '_blank')
  }

  const getStatutBadge = (statut: string) => {
    const colors: Record<string, string> = {
      EN_STOCK: 'bg-green-100 text-green-800',
      PARTIELLE: 'bg-orange-100 text-orange-800',
      VIDE: 'bg-gray-100 text-gray-800',
      DECHET: 'bg-red-100 text-red-800'
    }
    return colors[statut] || 'bg-gray-100 text-gray-800'
  }

  // Modal Wizard
  if (showWizard) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-blue-900">
                ➕ Nouvelle Réception - Étape {wizardStep}/3
              </h1>
              <button onClick={handleAnnuler} className="text-red-600 hover:text-red-800">
                ✕ Fermer
              </button>
            </div>

            {/* Barre de progression */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className={wizardStep >= 1 ? 'text-blue-600 font-semibold' : 'text-gray-400'}>1. Lot</span>
                <span className={wizardStep >= 2 ? 'text-blue-600 font-semibold' : 'text-gray-400'}>2. Produit</span>
                <span className={wizardStep >= 3 ? 'text-blue-600 font-semibold' : 'text-gray-400'}>3. Poids</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full transition-all" style={{width: `${(wizardStep / 3) * 100}%`}}></div>
              </div>
            </div>

            {/* ÉTAPE 1 : Créer le lot */}
            {wizardStep === 1 && (
              <form onSubmit={handleEtape1} className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Informations du lot</h2>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Code Fournisseur (4 lettres)</label>
                    <input name="code_fournisseur" maxLength={4} required defaultValue={receptionData.code_fournisseur}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md uppercase" placeholder="MUGA" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">N° Commande</label>
                    <input name="num_commande" maxLength={2} required defaultValue={receptionData.num_commande}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="05" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">N° Type Produit</label>
                    <input name="num_type_produit" maxLength={2} required defaultValue={receptionData.num_type_produit}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="12" />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md">
                    Suivant →
                  </button>
                </div>
              </form>
            )}

            {/* ÉTAPE 2 : Caractéristiques */}
            {wizardStep === 2 && (
              <form onSubmit={handleEtape2} className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Caractéristiques du produit</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type de matériel</label>
                  <select name="type_materiel" defaultValue={receptionData.type_materiel}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md">
                    <option value="Fil">Fil</option>
                    <option value="Feuillard">Feuillard</option>
                  </select>
                </div>

                {receptionData.type_materiel === 'Fil' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Diamètre fil (mm)</label>
                    <input name="diametre_fil" type="number" step="0.01" defaultValue={receptionData.diametre_fil}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="1.20" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Largeur (mm)</label>
                      <input name="largeur_feuillard" type="number" step="0.01" defaultValue={receptionData.largeur_feuillard}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="20" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Longueur (mm)</label>
                      <input name="longueur_feuillard" type="number" step="0.01" defaultValue={receptionData.longueur_feuillard}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="1000" />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Matière</label>
                    <select name="matiere" defaultValue={receptionData.matiere}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md">
                      <option value="Acier">Acier</option>
                      <option value="Inox">Inox</option>
                      <option value="Bronze">Bronze</option>
                      <option value="Cuivre">Cuivre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dureté</label>
                    <select name="durete" defaultValue={receptionData.durete}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md">
                      <option value="Doux">Fil Doux</option>
                      <option value="SL">Fil Ressort SL</option>
                      <option value="SM">Fil Ressort SM</option>
                      <option value="SH">Fil Ressort SH</option>
                      <option value="TH">Fil Ressort TH</option>
                      <option value="InoxNS">Inox NS</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Revêtement</label>
                  <select name="revetement" defaultValue={receptionData.revetement}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md">
                    <option value="Noir">Noir</option>
                    <option value="Galva">Galva</option>
                    <option value="Galfan">Galfan</option>
                    <option value="Cuivré">Cuivré</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de réception</label>
                    <input name="date_reception" type="date" defaultValue={receptionData.date_reception} required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de bobines (max 99)</label>
                    <input name="nombre_bobines" type="number" min="1" max="99" defaultValue={receptionData.nombre_bobines} required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button type="button" onClick={() => setWizardStep(1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-md">
                    ← Retour
                  </button>
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md">
                    Suivant →
                  </button>
                </div>
              </form>
            )}

            {/* ÉTAPE 3 : Saisie des poids */}
            {wizardStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Saisie des poids</h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>Lot :</strong> {receptionData.code_fournisseur}{receptionData.num_commande}{receptionData.num_type_produit} - {receptionData.nombre_bobines} bobines
                  </p>
                </div>

                <div className="max-h-96 overflow-y-auto space-y-2">
                  {receptionData.poids_bobines.map((poids, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <label className="w-32 text-sm font-medium text-gray-700">
                        Bobine {String(index + 1).padStart(2, '0')}
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={poids || ''}
                        onChange={(e) => handlePoidsChange(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="Poids en kg"
                      />
                      <span className="text-sm text-gray-500">kg</span>
                    </div>
                  ))}
                </div>

                <div className="bg-green-50 border border-green-200 rounded-md p-4 mt-4">
                  <p className="text-lg font-semibold text-green-800">
                    Poids total : {poidsTotal.toFixed(2)} kg
                  </p>
                </div>

                <div className="flex justify-between mt-6">
                  <button type="button" onClick={() => setWizardStep(2)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-md">
                    ← Retour
                  </button>
                  <div className="flex gap-2">
                    <button onClick={handleMettreEnAttente} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-md">
                      ⏸ Mettre en attente
                    </button>
                    <button onClick={handleAnnuler} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md">
                      ✕ Annuler
                    </button>
                    <button onClick={handleValider} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md">
                      ✓ Valider
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Page principale
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-900">📦 Gestion Stock Bobines</h1>
          <button onClick={() => setShowWizard(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md text-lg">
            ➕ Nouvelle Réception
          </button>
        </div>

        {/* FORMULAIRE MOUVEMENT */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-4 border-b-2 border-blue-500 pb-2">
            🔄 Mouvement de stock
          </h2>
          <form onSubmit={handleSubmitMouvement} className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Code Bobine</label>
                <input name="code_bobine" required placeholder="MUGA0512-03"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm uppercase" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type de mouvement</label>
                <select name="type_mouvement" value={typeMouvement} onChange={(e) => setTypeMouvement(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option value="SORTIE_USINE">Sortie vers Usine</option>
                  <option value="RETOUR_USINE">Retour d'Usine</option>
                  <option value="SORTIE_DECHET">Sortie vers Déchet</option>
                </select>
              </div>
            </div>

            {typeMouvement === 'SORTIE_USINE' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">N° Commande Client</label>
                  <input name="n_commande_client" placeholder="CMD-2026-001"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Client</label>
                  <input name="client" placeholder="Nom du client"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Poids du mouvement (kg)</label>
                <input name="poids_mouvement" type="number" step="0.01" required placeholder="5.5"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Note (optionnel)</label>
                <input name="texte_libre" placeholder="Commentaire..."
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
              </div>
            </div>

            <button type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition">
              Enregistrer le mouvement
            </button>

            {msgMouvement && (
              <div className={`p-2 rounded text-sm ${msgMouvement.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {msgMouvement}
              </div>
            )}
          </form>
        </div>

        {/* LISTE DES BOBINES */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-800 border-b-2 border-blue-500 pb-2">
              📋 Stock actuel ({bobines.length} bobines)
            </h2>
            <button onClick={chargerBobines}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm font-medium">
              🔄 Rafraîchir
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left">Code</th>
                  <th className="px-3 py-2 text-left">Matière</th>
                  <th className="px-3 py-2 text-left">Dimension</th>
                  <th className="px-3 py-2 text-left">Dureté</th>
                  <th className="px-3 py-2 text-right">Poids initial</th>
                  <th className="px-3 py-2 text-right">Poids actuel</th>
                  <th className="px-3 py-2 text-center">Statut</th>
                </tr>
              </thead>
              <tbody>
                {bobines.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-4 text-gray-500">Aucune bobine en stock</td></tr>
                ) : (
                  bobines.map(b => {
                    const dim = b.reception.type_materiel === 'Fil'
                      ? `Ø${b.reception.diametre_fil}`
                      : `${b.reception.largeur_feuillard}x${b.reception.longueur_feuillard}`
                    return (
                      <tr key={b.id} className="border-b hover:bg-gray-50">
                        <td className="px-3 py-2 font-mono font-semibold">{b.code_bobine}</td>
                        <td className="px-3 py-2">{b.reception.matiere}</td>
                        <td className="px-3 py-2">{dim}</td>
                        <td className="px-3 py-2">{b.reception.durete}</td>
                        <td className="px-3 py-2 text-right">{b.poids_initial} kg</td>
                        <td className="px-3 py-2 text-right font-semibold">{b.poids_actuel} kg</td>
                        <td className="px-3 py-2 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatutBadge(b.statut)}`}>
                            {b.statut}
                          </span>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* EXPORTS CSV */}
        <div className="bg-gray-100 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">📊 Exports CSV</h2>
          <div className="flex flex-wrap gap-3 items-end">
            <button onClick={() => exporterCSV('stock')}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition">
              💾 Exporter stock actuel
            </button>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Consommation sur</label>
              <input type="number" value={moisConso} onChange={(e) => setMoisConso(parseInt(e.target.value) || 1)}
                min="1" max="120"
                className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm" />
              <span className="text-sm">mois</span>
              <button onClick={() => exporterCSV('consommation')}
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded-md transition">
                📈 Exporter consommation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}