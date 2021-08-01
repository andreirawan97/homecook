import { BookmarkIcon } from "@heroicons/react/outline";
import { BookmarkIcon as BookmarkFilledIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { NoImage } from "../assets";

import { Recipe } from "../types/globalTypes";

type RecipeCardProps = {
  recipe: Recipe;
  onClickRecipe?: (recipeId: string) => void;
};

type Props = {
  recipes?: Array<Recipe>;
  onClickRecipe?: (recipeId: string) => void;
};

function RecipeCard(props: RecipeCardProps) {
  let { recipe, onClickRecipe } = props;

  const [isRecipeSaved, setRecipeSaved] = useState(false);

  const onClickSaveRecipe = () => {
    setRecipeSaved(!isRecipeSaved);
  };

  return (
    <div
      className="flex flex-1 flex-col shadow rounded-3xl pt-3 pb-3 pl-6 pr-6 mr-5 mb-5 max-w-lg md:mr-0 cursor-pointer"
      style={{
        backgroundColor: "rgba(246, 246, 248)",
      }}
      onClick={() => onClickRecipe && onClickRecipe(String(recipe.id))}
    >
      <div className="w-full h-max mb-3">
        <img className="rounded-lg" src={recipe.image ?? NoImage} alt="" />
      </div>

      <span className="font-bold text-xl">{recipe.title}</span>

      <div
        className="flex flex-1 flex-row mt-2"
        style={{ alignItems: "flex-end" }}
      >
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

        <div className="mb-2" onClick={onClickSaveRecipe}>
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
  let { recipes, onClickRecipe } = props;

  return (
    <div className="flex flex-1 md:flex-row flex-wrap">
      {recipes &&
        recipes.map((recipe, i) => (
          <RecipeCard
            key={i}
            onClickRecipe={(recipeId: string) =>
              onClickRecipe && onClickRecipe(recipeId)
            }
            recipe={recipe}
          />
        ))}
    </div>
  );
}
