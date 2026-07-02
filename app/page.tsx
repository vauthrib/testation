'use client'

import { useState, useEffect, useRef } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { QRCodeSVG } from 'qrcode.react'

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
    matiere: string
    type_materiel: string
    diametre_fil: string | null
    largeur_feuillard: string | null
    longueur_feuillard: string | null
    durete: string
    revetement: string
    date_reception: string
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
  const [etatResume, setEtatResume] = useState<any[]>([])

  // Navigation
  const [currentPage, setCurrentPage] = useState<'home' | 'arrivage' | 'usine' | 'retour_usine' | 'retour' | 'etat' | 'autre'>('home')

  // Wizard arrivage
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

  // Mouvements
  const [showScan, setShowScan] = useState(false)
  const [selectedBobine, setSelectedBobine] = useState<Bobine | null>(null)
  const [numCommandeFabrication, setNumCommandeFabrication] = useState('')
  const [poidsRestant, setPoidsRestant] = useState('')

  // Étiquettes
  const [showEtiquette, setShowEtiquette] = useState(false)
  const [bobinesToPrint, setBobinesToPrint] = useState<Bobine[]>([])

  // Autre (protégé par code)
  const [codeAcces, setCodeAcces] = useState('')
  const [autreAcces, setAutreAcces] = useState(false)
  const [moisConso, setMoisConso] = useState(3)
  const [commandeFilter, setCommandeFilter] = useState('')

  const scannerRef = useRef<Html5QrcodeScanner | null>(null)

  useEffect(() => {
    chargerBobines()
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear()
      }
    }
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

  const chargerEtat = async () => {
    try {
      const res = await fetch('/api/etat')
      const data = await res.json()
      setEtatResume(data)
    } catch (error) {
      console.error(error)
    }
  }

  // Reset base de données
  const handleReset = async () => {
    if (confirm('⚠️ Êtes-vous sûr de vouloir effacer TOUTES les données ? Cette action est irréversible !')) {
      try {
        const res = await fetch('/api/reset', { method: 'POST' })
        if (res.ok) {
          alert('✅ Base de données réinitialisée')
          chargerBobines()
        }
      } catch (error) {
        alert('❌ Erreur')
      }
    }
  }

  // Wizard Arrivage
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

  const handlePoidsChange = (index: number, value: string) => {
    const newPoids = [...receptionData.poids_bobines]
    newPoids[index] = parseFloat(value) || 0
    setReceptionData({ ...receptionData, poids_bobines: newPoids })
  }

  const poidsTotal = receptionData.poids_bobines.reduce((sum, p) => sum + p, 0)

  const handleValiderReception = async () => {
    try {
      const res = await fetch('/api/receptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...receptionData,
          poids_par_bobine: 0
        })
      })
      
      if (res.ok) {
        const result = await res.json()
        
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
        setCurrentPage('home')
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

  // Scan
  const startScanner = () => {
    setShowScan(true)
    setTimeout(() => {
      const scanner = new Html5QrcodeScanner("reader", {
        qrbox: { width: 250, height: 250 },
        fps: 5
      }, false)

      scanner.render(
        (decodedText) => {
          const bobine = bobines.find(b => b.code_bobine === decodedText.toUpperCase())
          if (bobine) {
            setSelectedBobine(bobine)
            setShowScan(false)
            scanner.clear()
          } else {
            alert('❌ Bobine non trouvée')
          }
        },
        (error) => {}
      )

      scannerRef.current = scanner
    }, 100)
  }

  // Vers usine
  const handleVersUsine = async () => {
    if (!selectedBobine) return

    try {
      const res = await fetch('/api/mouvements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code_bobine: selectedBobine.code_bobine,
          type_mouvement: 'TRANSFERT_VERS_USINE',
          poids_mouvement: 0,
          num_commande_fabrication: numCommandeFabrication
        })
      })

      if (res.ok) {
        alert('✅ Bobine transférée vers l\'usine')
        setCurrentPage('home')
        setSelectedBobine(null)
        setNumCommandeFabrication('')
        chargerBobines()
      } else {
        const error = await res.json()
        alert(`❌ ${error.error}`)
      }
    } catch (error) {
      alert('❌ Erreur de connexion')
    }
  }

  // Retour usine (vers stock principal)
  const handleRetourUsine = async () => {
    if (!selectedBobine) return

    try {
      const res = await fetch('/api/mouvements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code_bobine: selectedBobine.code_bobine,
          type_mouvement: 'RETOUR_USINE',
          poids_mouvement: parseFloat(poidsRestant),
          lieu_destination: 'STOCK_PRINCIPAL'
        })
      })

      if (res.ok) {
        alert('✅ Bobine retournée au stock principal')
        setCurrentPage('home')
        setSelectedBobine(null)
        setPoidsRestant('')
        chargerBobines()
      } else {
        const error = await res.json()
        alert(`❌ ${error.error}`)
      }
    } catch (error) {
      alert('❌ Erreur de connexion')
    }
  }

  // Retour (déchets, rebut)
  const handleRetourDechet = async () => {
    if (!selectedBobine) return

    try {
      const res = await fetch('/api/mouvements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code_bobine: selectedBobine.code_bobine,
          type_mouvement: 'SORTIE_DECHET',
          poids_mouvement: parseFloat(selectedBobine.poids_actuel)
        })
      })

      if (res.ok) {
        alert('✅ Bobine mise au rebut')
        setCurrentPage('home')
        setSelectedBobine(null)
        chargerBobines()
      } else {
        const error = await res.json()
        alert(`❌ ${error.error}`)
      }
    } catch (error) {
      alert('❌ Erreur de connexion')
    }
  }

  // Impression étiquettes
  const handleImprimerEtiquettes = (bobines: Bobine[]) => {
    setBobinesToPrint(bobines)
    setShowEtiquette(true)
  }

  // Accès Autre
  const handleCodeAcces = () => {
    if (codeAcces === '1111') {
      setAutreAcces(true)
    } else {
      alert('❌ Code incorrect')
    }
  }

  const exporterCSV = (type: 'stock' | 'consommation' | 'mouvements') => {
    let url = ''
    
    if (type === 'stock') {
      url = '/api/export/stock'
    } else if (type === 'consommation') {
      url = `/api/export/consommation?mois=${moisConso}`
    } else if (type === 'mouvements') {
      url = `/api/export/mouvements${commandeFilter ? `?commande=${commandeFilter}` : ''}`
    }
    
    window.open(url, '_blank')
  }

  // PAGE PRINCIPALE - BOUTONS UNIQUEMENT
  if (currentPage === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-blue-900 mb-12">📦 Gestion Stock Bobines</h1>
          
          <div className="grid grid-cols-2 gap-6">
            <button onClick={() => setCurrentPage('arrivage')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-12 rounded-xl text-2xl shadow-lg transition transform hover:scale-105">
              ➕ Nouvel Arrivage
            </button>
            
            <button onClick={() => setCurrentPage('usine')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-12 rounded-xl text-2xl shadow-lg transition transform hover:scale-105">
              ➡️ Vers Usine
            </button>
            
            <button onClick={() => setCurrentPage('retour_usine')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-12 rounded-xl text-2xl shadow-lg transition transform hover:scale-105">
              🔙 Retour Usine
            </button>
            
            <button onClick={() => setCurrentPage('retour')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-12 rounded-xl text-2xl shadow-lg transition transform hover:scale-105">
              🗑️ Retour
            </button>
            
            <button onClick={() => {
              setCurrentPage('etat')
              chargerEtat()
            }}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-12 rounded-xl text-2xl shadow-lg transition transform hover:scale-105">
              📊 État
            </button>
            
            <button onClick={() => setCurrentPage('autre')}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-12 rounded-xl text-2xl shadow-lg transition transform hover:scale-105">
              🔐 Autre
            </button>
          </div>
        </div>
      </div>
    )
  }

  // PAGE ÉTIQUETTES (impression)
  if (showEtiquette && bobinesToPrint.length > 0) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-blue-900">
                🏷️ Impression étiquettes ({bobinesToPrint.length})
              </h1>
              <button onClick={() => {
                setShowEtiquette(false)
                setBobinesToPrint([])
              }} className="text-red-600 hover:text-red-800">
                ✕ Fermer
              </button>
            </div>
            
            <div className="mb-6">
              <button onClick={() => window.print()} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md">
                🖨️ Imprimer
              </button>
            </div>

            <div id="etiquettes-grid">
              {bobinesToPrint.map((bobine, index) => {
                const r = bobine.reception
                const dimension = r.type_materiel === 'Fil' 
                  ? `Ø${r.diametre_fil}`
                  : `${r.largeur_feuillard}x${r.longueur_feuillard}`

                return (
                  <div key={index} className="etiquette">
                    <div className="text-center mb-1">
                      <p className="text-xs font-bold">{r.code_fournisseur} Cmd {r.num_commande}</p>
                      <p className="text-sm font-mono font-bold">{bobine.code_bobine}</p>
                    </div>

                    <div className="flex justify-center mb-1">
                      <QRCodeSVG value={bobine.code_bobine} size={50} />
                    </div>

                    <div className="text-center mb-1">
                      <p className="text-3xl font-bold text-blue-800">{dimension}</p>
                      <p className="text-3xl font-bold text-green-800">{bobine.poids_initial} kg</p>
                    </div>

                    <div className="text-xs">
                      <p>{r.matiere} - {r.durete} - {r.revetement}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <style jsx global>{`
          @media print {
            body * {
              visibility: hidden;
            }
            #etiquettes-grid, #etiquettes-grid * {
              visibility: visible;
            }
            #etiquettes-grid {
              position: absolute;
              left: 0;
              top: 0;
              width: 210mm;
              display: grid;
              grid-template-columns: repeat(3, 62mm);
              grid-template-rows: repeat(3, 90mm);
              gap: 3mm;
              padding: 10mm;
            }
            .etiquette {
              width: 62mm;
              height: 90mm;
              border: 1px solid #000;
              padding: 2mm;
              page-break-inside: avoid;
            }
            @page {
              size: A4 portrait;
              margin: 0;
            }
          }
        `}</style>
      </>
    )
  }

  // PAGE SCAN
  if (showScan) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-blue-900">📷 Scanner</h1>
            <button onClick={() => {
              setShowScan(false)
              if (scannerRef.current) scannerRef.current.clear()
            }} className="text-red-600 hover:text-red-800">
              ✕ Fermer
            </button>
          </div>
          <div id="reader" className="w-full"></div>
        </div>
      </div>
    )
  }

  // PAGE ARRIVAGE (wizard)
  if (currentPage === 'arrivage') {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-blue-900">➕ Nouvel Arrivage - Étape {wizardStep}/3</h1>
            <button onClick={() => {
              setCurrentPage('home')
              setWizardStep(1)
            }} className="text-red-600 hover:text-red-800">
              ✕ Annuler
            </button>
          </div>

          {wizardStep === 1 && (
            <form onSubmit={handleEtape1} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code Fournisseur</label>
                  <input name="code_fournisseur" maxLength={4} required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md uppercase" placeholder="MUGA" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">N° Commande</label>
                  <input name="num_commande" maxLength={2} required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="05" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">N° Type Produit</label>
                  <input name="num_type_produit" maxLength={2} required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="12" />
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md">
                Suivant →
              </button>
            </form>
          )}

          {wizardStep === 2 && (
            <form onSubmit={handleEtape2} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select name="type_materiel" className="w-full px-4 py-2 border border-gray-300 rounded-md">
                    <option value="Fil">Fil</option>
                    <option value="Feuillard">Feuillard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Matière</label>
                  <select name="matiere" className="w-full px-4 py-2 border border-gray-300 rounded-md">
                    <option value="Acier">Acier</option>
                    <option value="Inox">Inox</option>
                    <option value="Bronze">Bronze</option>
                    <option value="Cuivre">Cuivre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dureté</label>
                  <select name="durete" className="w-full px-4 py-2 border border-gray-300 rounded-md">
                    <option value="Doux">Fil Doux</option>
                    <option value="SL">SL</option>
                    <option value="SM">SM</option>
                    <option value="SH">SH</option>
                    <option value="TH">TH</option>
                    <option value="InoxNS">Inox NS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Revêtement</label>
                  <select name="revetement" className="w-full px-4 py-2 border border-gray-300 rounded-md">
                    <option value="Noir">Noir</option>
                    <option value="Galva">Galva</option>
                    <option value="Galfan">Galfan</option>
                    <option value="Cuivré">Cuivré</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Diamètre (mm)</label>
                  <input name="diametre_fil" type="number" step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="1.20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date réception</label>
                  <input name="date_reception" type="date" required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de bobines</label>
                <input name="nombre_bobines" type="number" min="1" max="99" defaultValue="1" required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md" />
              </div>

              <div className="flex gap-2">
                <button type="button" onClick={() => setWizardStep(1)} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-md">
                  ← Retour
                </button>
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md">
                  Suivant →
                </button>
              </div>
            </form>
          )}

          {wizardStep === 3 && (
            <div className="space-y-4">
              <div className="max-h-96 overflow-y-auto space-y-2">
                {receptionData.poids_bobines.map((poids, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <label className="w-32 text-sm font-medium">Bobine {String(index + 1).padStart(2, '0')}</label>
                    <input type="number" step="0.01" value={poids || ''}
                      onChange={(e) => handlePoidsChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md" placeholder="kg" />
                  </div>
                ))}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <p className="text-lg font-semibold text-green-800">Total : {poidsTotal.toFixed(2)} kg</p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setWizardStep(2)} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-md">
                  ← Retour
                </button>
                <button onClick={handleValiderReception} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md">
                  ✓ Valider
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // PAGE VERS USINE
  if (currentPage === 'usine') {
    const bobinesStock = bobines.filter(b => b.lieu === 'STOCK_PRINCIPAL')
    
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-purple-900">➡️ Vers Usine</h1>
            <button onClick={() => {
              setCurrentPage('home')
              setSelectedBobine(null)
            }} className="text-red-600 hover:text-red-800">
              ✕ Annuler
            </button>
          </div>

          {!selectedBobine ? (
            <div className="space-y-4">
              <button onClick={startScanner} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md">
                📷 Scanner
              </button>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {bobinesStock.map(b => (
                  <div key={b.id} onClick={() => setSelectedBobine(b)}
                    className="p-3 border rounded-md hover:bg-blue-50 cursor-pointer">
                    <div className="font-mono font-semibold">{b.code_bobine}</div>
                    <div className="text-sm text-gray-600">{b.reception.matiere} - {b.poids_actuel} kg</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-md p-4">
                <p className="font-mono font-semibold text-lg">{selectedBobine.code_bobine}</p>
                <p className="text-sm">{selectedBobine.poids_actuel} kg</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">N° commande fabrication</label>
                <input type="text" value={numCommandeFabrication} onChange={(e) => setNumCommandeFabrication(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="CMD-001" />
              </div>
              <button onClick={handleVersUsine} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md">
                ✓ Valider
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // PAGE RETOUR USINE
  if (currentPage === 'retour_usine') {
    const bobinesUsine = bobines.filter(b => b.lieu === 'USINE')
    
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-indigo-900">🔙 Retour Usine</h1>
            <button onClick={() => {
              setCurrentPage('home')
              setSelectedBobine(null)
            }} className="text-red-600 hover:text-red-800">
              ✕ Annuler
            </button>
          </div>

          {!selectedBobine ? (
            <div className="space-y-4">
              <button onClick={startScanner} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md">
                📷 Scanner
              </button>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {bobinesUsine.map(b => (
                  <div key={b.id} onClick={() => setSelectedBobine(b)}
                    className="p-3 border rounded-md hover:bg-indigo-50 cursor-pointer">
                    <div className="font-mono font-semibold">{b.code_bobine}</div>
                    <div className="text-sm text-gray-600">{b.num_commande_fabrication} - {b.poids_actuel} kg</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-indigo-50 border border-indigo-200 rounded-md p-4">
                <p className="font-mono font-semibold text-lg">{selectedBobine.code_bobine}</p>
                <p className="text-sm">Commande: {selectedBobine.num_commande_fabrication}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Poids restant (kg)</label>
                <input type="number" step="0.01" value={poidsRestant} onChange={(e) => setPoidsRestant(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="15.5" />
              </div>
              <button onClick={handleRetourUsine} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md">
                ✓ Valider (retour stock principal)
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // PAGE RETOUR (déchets)
  if (currentPage === 'retour') {
    const bobinesStock = bobines.filter(b => b.lieu === 'STOCK_PRINCIPAL')
    
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-red-900">🗑️ Mise au rebut</h1>
            <button onClick={() => {
              setCurrentPage('home')
              setSelectedBobine(null)
            }} className="text-red-600 hover:text-red-800">
              ✕ Annuler
            </button>
          </div>

          {!selectedBobine ? (
            <div className="space-y-4">
              <button onClick={startScanner} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md">
                📷 Scanner
              </button>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {bobinesStock.map(b => (
                  <div key={b.id} onClick={() => setSelectedBobine(b)}
                    className="p-3 border rounded-md hover:bg-red-50 cursor-pointer">
                    <div className="font-mono font-semibold">{b.code_bobine}</div>
                    <div className="text-sm text-gray-600">{b.reception.matiere} - {b.poids_actuel} kg</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="font-mono font-semibold text-lg">{selectedBobine.code_bobine}</p>
                <p className="text-sm">{selectedBobine.poids_actuel} kg</p>
              </div>
              <button onClick={handleRetourDechet} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md">
                ✓ Mettre au rebut
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // PAGE ÉTAT
  if (currentPage === 'etat') {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-green-900">📊 État du stock</h1>
            <div className="flex gap-2">
              <button onClick={() => handleImprimerEtiquettes(bobines.filter(b => b.lieu === 'STOCK_PRINCIPAL'))}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
                🏷️ Imprimer étiquettes
              </button>
              <button onClick={() => setCurrentPage('home')} className="text-red-600 hover:text-red-800">
                ✕ Fermer
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left">Dimension</th>
                  <th className="px-3 py-2 text-left">Matière</th>
                  <th className="px-3 py-2 text-left">Dureté</th>
                  <th className="px-3 py-2 text-right">Nb bobines</th>
                  <th className="px-3 py-2 text-right">Poids total</th>
                </tr>
              </thead>
              <tbody>
                {etatResume.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 font-semibold">{item.dimension}</td>
                    <td className="px-3 py-2">{item.matiere}</td>
                    <td className="px-3 py-2">{item.durete}</td>
                    <td className="px-3 py-2 text-right">{item.nombre_bobines}</td>
                    <td className="px-3 py-2 text-right font-bold text-green-800">{item.poids_total.toFixed(2)} kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  // PAGE AUTRE (protégée)
  if (currentPage === 'autre') {
    if (!autreAcces) {
      return (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">🔐 Accès protégé</h1>
            <input type="password" value={codeAcces} onChange={(e) => setCodeAcces(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4" placeholder="Code à 4 chiffres" maxLength={4} />
            <button onClick={handleCodeAcces} className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-md">
              Valider
            </button>
            <button onClick={() => setCurrentPage('home')} className="w-full mt-2 text-gray-600 hover:text-gray-800">
              Retour
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">🔐 Administration</h1>
            <button onClick={() => {
              setCurrentPage('home')
              setAutreAcces(false)
              setCodeAcces('')
            }} className="text-red-600 hover:text-red-800">
              ✕ Fermer
            </button>
          </div>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <h2 className="text-lg font-semibold mb-2">Exports CSV</h2>
              <div className="flex gap-2">
                <button onClick={() => exporterCSV('stock')} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                  💾 Stock actuel
                </button>
                <button onClick={() => exporterCSV('mouvements')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                  📥 Tous mouvements
                </button>
              </div>
            </div>

            <div className="border-b pb-4">
              <h2 className="text-lg font-semibold mb-2">Stats par commande</h2>
              <div className="flex gap-2">
                <input type="text" value={commandeFilter} onChange={(e) => setCommandeFilter(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md" placeholder="N° commande" />
                <button onClick={() => exporterCSV('mouvements')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                  Exporter
                </button>
              </div>
            </div>

            <div className="border-b pb-4">
              <h2 className="text-lg font-semibold mb-2">Consommation</h2>
              <div className="flex gap-2 items-center">
                <input type="number" value={moisConso} onChange={(e) => setMoisConso(parseInt(e.target.value) || 1)}
                  min="1" max="120" className="w-20 px-3 py-2 border border-gray-300 rounded-md" />
                <span>mois</span>
                <button onClick={() => exporterCSV('consommation')} className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md">
                  📈 Exporter
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button onClick={handleReset} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md">
                ⚠️ Réinitialiser base de données
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}