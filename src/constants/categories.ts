import { Option } from "../components/Selector";

export type RecipeCategoryId = "random" | "pizza" | "vegetarian" | "steak";

export const RECIPE_CATEGORIES: Array<Option> = [
  {
    id: "random",
    label: "Random",
  },
  {
    id: "pizza",
    label: "Pizza",
  },
  {
    id: "vegetarian",
    label: "Vegetarian",
  },
  {
    id: "steak",
    label: "Steak",
  },
];
