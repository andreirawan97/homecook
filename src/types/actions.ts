import { Recipe } from "./globalTypes";

export type Action = {
  type: "SET_RANDOM_RECIPES";
  payload: Array<Recipe>;
};
