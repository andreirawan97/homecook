import { Action } from "../types/actions";
import { Recipe } from "../types/globalTypes";

export const setRandomRecipes = (payload: Array<Recipe>): Action => {
  return {
    type: "SET_RANDOM_RECIPES",
    payload,
  };
};
