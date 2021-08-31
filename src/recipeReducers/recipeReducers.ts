import { Action } from "../types/actions";
import { RecipeState } from "../types/state";

const defaultRecipeState: RecipeState = {
  randomRecipes: [],
};

export const recipeReducers = (state = defaultRecipeState, action: Action) => {
  switch (action.type) {
    case "SET_RANDOM_RECIPES": {
      return {
        ...state,
        randomRecipes: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
