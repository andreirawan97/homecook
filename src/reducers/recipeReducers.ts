import { Action } from "../types/actions";
import { RecipeState } from "../types/state";

const defaultRecipeState: RecipeState = {
  randomRecipes: [],
  searchResults: {
    urlParams: [],
    results: [],
  },
};

export const recipeReducers = (state = defaultRecipeState, action: Action) => {
  switch (action.type) {
    case "SET_RANDOM_RECIPES": {
      return {
        ...state,
        randomRecipes: action.payload,
      };
    }
    case "SET_SEARCH_RESULTS": {
      return {
        ...state,
        searchResults: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
