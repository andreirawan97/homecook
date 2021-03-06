// @ts-nocheck
import { BookmarkIcon } from "@heroicons/react/outline";
import { BookmarkIcon as BookmarkFilledIcon } from "@heroicons/react/solid";
import { MouseEvent, useState } from "react";

import {
  addSavedRecipe,
  deleteSavedRecipe,
  isInSavedRecipes,
} from "../helpers/storageHelper";
import { NoImage } from "../assets";
import { Recipe, SearchResult } from "../types/globalTypes";

type RecipeCardProps =
  | {
      type?: "default";
      recipe: Recipe;
      onClickRecipe?: (recipeId: string) => void;
    }
  | {
      type?: "search";
      recipe: SearchResult;
      onClickRecipe?: (recipeId: string) => void;
    };

type Props =
  | {
      type?: "default";
      recipes?: Array<Recipe>;
      onClickRecipe?: (recipeId: string) => void;
    }
  | {
      type?: "search";
      recipes?: Array<SearchResult>;
      onClickRecipe?: (recipeId: string) => void;
    };

function RecipeCard(props: RecipeCardProps) {
  let { recipe, onClickRecipe, type = "default" } = props;

  const [isRecipeSaved, setRecipeSaved] = useState(
    isInSavedRecipes(String(recipe.id))
  );

  const onClickSaveRecipe = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (isRecipeSaved) {
      deleteSavedRecipe(String(recipe.id));
    } else {
      addSavedRecipe(String(recipe.id));
    }

    setRecipeSaved(!isRecipeSaved);
  };

  return (
    <div
      className="flex flex-1 flex-col shadow rounded-3xl pt-3 pb-3 pl-6 pr-6 mr-5 mb-5 max-w-recipecard md:mr-0 md:max-w-full cursor-pointer"
      style={{
        minWidth: 310,
        backgroundColor: "rgba(246, 246, 248)",
      }}
      onClick={() => onClickRecipe && onClickRecipe(String(recipe.id))}
    >
      <div className="w-full h-auto mb-3">
        <img className="rounded-lg" src={recipe.image ?? NoImage} alt="" />
      </div>

      <span className="font-bold text-xl">{recipe.title}</span>

      <div
        className="flex flex-1 flex-row mt-2"
        style={{ alignItems: "flex-end" }}
      >
        {type === "default" ? (
          <div className="flex flex-1">
            <div className="mr-6">
              <span className="text-gray-600">Serving</span>
              <p className="font-bold">{recipe.servings}</p>
            </div>

            <div className="mr-6">
              <span className="text-gray-600">Cooking Time</span>
              <p className="font-bold">{recipe.readyInMinutes} minutes</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-1" />
        )}

        <div className="mb-2 z-10" onClick={onClickSaveRecipe}>
          {isRecipeSaved ? (
            <BookmarkFilledIcon className="h-7 w-7 text-gray-500" />
          ) : (
            <BookmarkIcon className="h-7 w-7 text-gray-500" />
          )}
        </div>
      </div>
    </div>
  );
}

export default function RecipeSelector(props: Props) {
  let { recipes, onClickRecipe, type = "default" } = props;

  return (
    <div className="flex flex-1 md:flex-row flex-wrap">
      {recipes &&
        recipes.map((recipe, i) => (
          <RecipeCard
            key={i}
            type={type}
            onClickRecipe={(recipeId: string) =>
              onClickRecipe && onClickRecipe(recipeId)
            }
            recipe={recipe}
          />
        ))}
    </div>
  );
}
