import { STORAGE_KEYS } from "../constants/storage";
import { SavedRecipes } from "../types/globalTypes";

function getSavedRecipes() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.savedRecipes) ?? "[]");
}

export function addSavedRecipe(recipeId: string) {
  let tmpSavedRecipes: SavedRecipes = getSavedRecipes();

  tmpSavedRecipes.push(recipeId);

  localStorage.setItem(
    STORAGE_KEYS.savedRecipes,
    JSON.stringify(tmpSavedRecipes)
  );
}

export function deleteSavedRecipe(recipeId: string) {
  let tmpSavedRecipes: SavedRecipes = getSavedRecipes();

  let newSavedRecipes = tmpSavedRecipes.filter(
    (recipeId_) => recipeId !== recipeId_
  );

  localStorage.setItem(
    STORAGE_KEYS.savedRecipes,
    JSON.stringify(newSavedRecipes)
  );
}

export function isInSavedRecipes(recipeId: string) {
  let tmpSavedRecipes: SavedRecipes = getSavedRecipes();

  return tmpSavedRecipes.includes(recipeId);
}
