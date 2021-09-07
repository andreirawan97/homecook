import { Recipe, SearchResult } from "./globalTypes";

export type RecipeState = {
  randomRecipes: Array<Recipe>;
  searchResults: {
    urlParams: Array<[string, string]>;
    results: Array<SearchResult>;
  };
};
