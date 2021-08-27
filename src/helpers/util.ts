import { ExtendedIngredient } from "../types/globalTypes";

export function removeDuplicateArray(arr?: Array<string>) {
  return [...new Set(arr)];
}

export function capitalizeFirstLetter(word: string) {
  return word
    .split("")
    .map((c, i) => (i === 0 ? c.toUpperCase() : c))
    .join("");
}

export function arrayToString(arr?: Array<string>) {
  let returnedString = "";

  if (!arr || arr.length < 1) {
    return "-";
  }

  if (arr.length === 1) {
    return capitalizeFirstLetter(arr[0]);
  }

  arr.forEach((word, i) => {
    if (i !== arr.length - 1) {
      returnedString += capitalizeFirstLetter(`${word}, `);
    } else {
      returnedString += capitalizeFirstLetter(word);
    }
  });

  return returnedString;
}

export function mapIngredientsToString(arr?: Array<ExtendedIngredient>) {
  if (!arr || !arr.length) {
    return "";
  }

  let tmpIngredients = arrayToString(
    arr.map(
      (ingredient) =>
        `${ingredient.name} ${ingredient.amount} ${ingredient.unit}`
    )
  );
  return tmpIngredients;
}
