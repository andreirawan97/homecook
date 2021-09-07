import { RecipeState } from "./state";

export type Action =
  | {
      type: "SET_RANDOM_RECIPES";
      payload: RecipeState["randomRecipes"];
    }
  | {
      type: "SET_SEARCH_RESULTS";
      payload: RecipeState["searchResults"];
    };
