export interface ContestantData {
  id: number;
  pseudo: string;
  age: number;
  prenom: string;
}

export interface JurorData {
  id: number;
  pseudo: string;
  type: string;
  coeff: number;
}

export interface CategoryData {
  id: number;
  name: string;
}

export interface RatingData {
  contestantId: number;
  jurorId: number;
  categoryId: number;
  value: number;
}

export interface CategoryResult {
  category: string;
  categoryId: number;
  moyenne: number;
  nbVotes: number;
}

export interface ContestantResult {
  contestant: ContestantData;
  categories: CategoryResult[];
  moyenneGenerale: number;
}
