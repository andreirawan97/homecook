// Global Types

export type ExtendedIngredient_Measures = {
  us: {
    amount: number;
    unitShort: string;
    unitLong: string;
  };
  metric: {
    amount: number;
    unitShort: string;
    unitLong: string;
  };
};

export type ExtendedIngredient = {
  id: string;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalString: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: Array<string>;
  metaInformation: Array<string>;
  measures: ExtendedIngredient_Measures;
};

export type AnalyzedInstruction_Step_Equipment = {
  id: number;
  name: string;
  localizedName: string;
  image: string;
};

export type AnalyzedInstruction_Step_Ingredient = {
  id: number;
  name: string;
  localizedName: string;
  image: string;
};

export type AnalyzedInstruction_Step = {
  number: number;
  step: string;
  ingredients: Array<AnalyzedInstruction_Step_Ingredient>;
  equipment: Array<AnalyzedInstruction_Step_Equipment>;
};

export type AnalyzedInstruction = {
  name: string;
  steps: Array<AnalyzedInstruction_Step>;
};

export type Recipe = {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  lowFodmap: boolean;
  spoonacularScore: number;
  healthScore: number;
  creditsText: string;
  license: string;
  sourceName: string;
  pricePerServing: number;
  extendedIngredients: Array<ExtendedIngredient>;
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  summary: string;
  cusinies: Array<string>;
  dishTypes: Array<string>;
  diets: Array<string>;
  occasions: Array<string>;
  instructions: string;
  originalId?: string;
  analyzedInstructions: Array<AnalyzedInstruction>;
  spoonacularSourceUrl: string;
};

export type SearchResult = {
  id: number;
  image: string;
  imageType: string;
  title: string;
};

// API Types

export type BasicURLParam = Record<string, unknown>;

export type RandomRecipesParam = {
  tags?: string;
  number?: number;
};

export type RandomRecipesResponse = {
  recipes: Array<Recipe>;
};

export type SearchParam = {
  query: string;
};

export type SearchResponse = {
  number: number;
  offset: number;
  results: Array<SearchResult>;
  totalResults: number;
};

// Storage Types

export type SavedRecipes = Array<string>;
