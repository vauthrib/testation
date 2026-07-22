# 🧮 Méthode de Calcul — Water-Barbecue 2026

## 📊 Principe général

Chaque juré note chaque concurrent dans plusieurs **catégories** (Design, Vitesse, Flotabilité, etc.) sur une échelle de **1 à 9**.

La note finale est une **moyenne pondérée** qui prend en compte :
- Le **type de jury** (coefficient de base)
- La **présence d'une photo** (bonus ×3)
- Le **nombre de votes** reçus

---

## 🔢 Coefficients des jurys

### Coefficient de base

| Type | Coefficient | Signification |
|------|:-----------:|---------------|
| 🎯 **Donateur** | **×6** | Le vote d'un donateur pèse **6 fois** plus qu'une note brute |
| 👨‍👩‍👧‍👦 **Family** | **×4** | Le vote d'un membre de la famille pèse **4 fois** plus |
| 👀 **Curieux** | **×2** | Le vote d'un curieux pèse **2 fois** plus |

### Bonus photo

Si un jury ajoute **une photo** à son vote, le coefficient est **multiplié par 3** pour ce vote uniquement.

**Exemples concrets :**

| Jury | Coeff base | Photo ? | Coeff effectif |
|:-----|:----------:|:-------:|:--------------:|
| 👀 Curieux | ×2 | ❌ Non | **×2** |
| 👀 Curieux | ×2 | ✅ Oui | **×6** (2 × 3) |
| 👨‍👩‍👧‍👦 Family | ×4 | ❌ Non | **×4** |
| 👨‍👩‍👧‍👦 Family | ×4 | ✅ Oui | **×12** (4 × 3) |
| 🎯 Donateur | ×6 | ❌ Non | **×6** |
| 🎯 Donateur | ×6 | ✅ Oui | **×18** (6 × 3) |

---

## 🧮 Formule de calcul

### Moyenne par catégorie

Pour un concurrent `C` et une catégorie `K` :

```
                   Σ ( note × coeffEffectif )
Moyenne(C, K)  =  ───────────────────────────
                       Σ coeffEffectif
```

Avec :
- `note` = note attribuée par le jury (1 à 9)
- `coeffEffectif` = coeff du jury × (3 si photo, sinon 1)

### Exemple détaillé

**Concurrent :** "AquaMaster" — **Catégorie :** Design

| Jury | Type | Note | Coeff base | Photo | Coeff effectif | Contribution |
|:-----|:----:|:----:|:----------:|:-----:|:--------------:|:------------:|
| Jean | Curieux | 7 | ×2 | ❌ | ×2 | 7 × 2 = **14** |
| Marie | Donateur | 8 | ×6 | ✅ | ×18 | 8 × 18 = **144** |
| Paul | Family | 6 | ×4 | ❌ | ×4 | 6 × 4 = **24** |
| Sophie | Curieux | 9 | ×2 | ✅ | ×6 | 9 × 6 = **54** |

**Calcul :**
- Somme pondérée = 14 + 144 + 24 + 54 = **236**
- Somme des coeffs = 2 + 18 + 4 + 6 = **30**
- **Moyenne Design = 236 ÷ 30 = 7,87 / 9**

---

### Moyenne générale

La **moyenne générale** d'un concurrent est la moyenne de **toutes ses moyennes par catégorie** :

```
                   Σ ( Moyenne(C, K) pour toutes les catégories K )
MoyGénérale(C)  =  ─────────────────────────────────────────────────
                              Nombre de catégories notées
```

---

## ❤️ Popularité (votes libres)

En parallèle des votes des jurys, chaque concurrent dispose d'un **QR code de popularité**.

- **Qui peut voter ?** N'importe qui (public, participants, jurys)
- **Comment ça marche ?** Scanne le QR code → +1 point de popularité
- **Anti-spam :** Un téléphone ne peut voter qu'une fois par concurrent
- **Moyenne de popularité :** La popularité s'affiche comme un score total (pas une moyenne)

La popularité est un indicateur **indépendant** qui apparaît dans le classement et peut servir à **départager des égalités**.

---

## 📈 Résumé visuel du poids des votes

```
Note brute (1-9)
      │
      ├── ×2 si Jury Curieux
      ├── ×4 si Jury Family
      ├── ×6 si Jury Donateur
      │
      └── ×3 si Photo jointe (quel que soit le type)
              │
              └── Coeff max possible : ×18 (Donateur + Photo)
```

---

## 💡 Rappel

> *Chaque vote compte, mais pas de la même manière. Plus tu t'impliques (donateur, photo), plus ton avis pèse dans le classement final !*

**Comité Water-Barbecue 2026**
