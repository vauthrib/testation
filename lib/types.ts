export type Bobine = {
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

export type ReceptionData = {
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

export type AutreSection = 'items' | 'lots' | 'users' | 'history' | 'backup' | 'reset'
export type PageKey = 'home' | 'arrivage' | 'usine' | 'retour_usine' | 'retour' | 'etat' | 'autre' | 'consommation'
export type ToastType = 'success' | 'error' | 'info' | 'warning'

export type ConsommationParCommande = {
  commande: string
  nb_mouvements: number
  nb_bobines: number
  poids_total: number
  poids_usine: number
  poids_dechet: number
  poids_retour: number
  matieres: string[]
  diametres: string[]
  duretes: string[]
}

export type ConsommationParDiametre = {
  diametre: string
  nb_mouvements: number
  poids_total: number
  poids_usine: number
  poids_dechet: number
}

export type ConsommationParDurete = {
  durete: string
  nb_mouvements: number
  poids_total: number
  poids_usine: number
  poids_dechet: number
}

export type ConsommationData = {
  total_mouvements: number
  par_commande: ConsommationParCommande[]
  par_diametre: ConsommationParDiametre[]
  par_durete: ConsommationParDurete[]
}
