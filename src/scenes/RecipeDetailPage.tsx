import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  BookmarkIcon as BookmarkFilledIcon,
} from "@heroicons/react/solid";
import { BookmarkIcon } from "@heroicons/react/outline";
import htmlParser from "html-react-parser";

import { URLBuilder } from "../helpers/URLBuilder";
import { Recipe } from "../types/globalTypes";
import { RecipeDetailPageParam } from "../types/navigation";
import { arrayToString } from "../helpers/util";
import { Checkbox, Collapsible } from "../components";
import {
  addSavedRecipe,
  deleteSavedRecipe,
  isInSavedRecipes,
} from "../helpers/storageHelper";

export default function RecipeDetail() {
  const { recipeId } = useParams<RecipeDetailPageParam>();
  const history = useHistory();

  const [recipeData, setRecipeData] = useState<Recipe>();
  const [isRecipeSaved, setRecipeSaved] = useState(
    isInSavedRecipes(String(recipeId))
  );
  const [loadingRecipeDetail, setLoadingRecipeDetail] = useState(true);

  const getRecipeDetail = () => {
    axios.get(URLBuilder("recipeDetail", {}, "", recipeId)).then((res) => {
      const data = res.data as Recipe;
      setRecipeData(data);
      console.log(data);

      setLoadingRecipeDetail(false);
    });
  };

  const onClickSaveRecipe = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (isRecipeSaved) {
      deleteSavedRecipe(String(recipeId));
    } else {
      addSavedRecipe(String(recipeId));
    }

    setRecipeSaved(!isRecipeSaved);
  };

  useEffect(() => {
    getRecipeDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6">
      <div
        className="flex flex-row justify-between cursor-pointer items-center mb-3"
        onClick={() => history.goBack()}
      >
        <div className="flex flex-row">
          <ArrowLeftIcon className="h-7 w-7 mr-2" />
          <span className="text-xl">Back</span>
        </div>

        {!loadingRecipeDetail ? (
          <div className="z-10" onClick={onClickSaveRecipe}>
            {isRecipeSaved ? (
              <BookmarkFilledIcon className="h-9 w-9 text-gray-500" />
            ) : (
              <BookmarkIcon className="h-9 w-9 text-gray-500" />
            )}
          </div>
        ) : (
          <></>
        )}
      </div>

      {!loadingRecipeDetail ? (
        <div>
          <div className="flex flex-row md:flex-col items-center justify-center mb-6">
            <div className="flex flex-row max-w-2xl">
              <img
                className="rounded-lg mr-6 md:mb-3 w-72 h-40"
                alt=""
                src={recipeData?.image}
              />

              <div>
                <h2 className="font-bold">{recipeData?.title}</h2>

                <span className="text-gray-600 mr-2">
                  Serving:{" "}
                  <span className="text-black font-bold">
                    {recipeData?.servings}
                  </span>
                </span>
                <br />

                <span className="text-gray-600 mr-2">
                  Cooking Time:{" "}
                  <span className="text-black font-bold">
                    {recipeData?.readyInMinutes} minutes
                  </span>
                </span>
                <br />

                <span className="text-gray-600 mr-2">
                  Diets:{" "}
                  <span className="text-black font-bold">
                    {arrayToString(recipeData?.diets)}
                  </span>
                </span>
                <br />

                <span className="text-gray-600 mr-2">
                  Dish types:{" "}
                  <span className="text-black font-bold">
                    {arrayToString(recipeData?.dishTypes)}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 pl-3 pr-3 pb-1 bg-white rounded-2xl shadow">
            <Collapsible
              title="Summary"
              content={
                <div className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  {htmlParser(recipeData?.summary ?? "")}
                </div>
              }
            />

            <Collapsible
              title="Ingredients"
              content={recipeData?.extendedIngredients.map((ingredient) => (
                <div className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  <Checkbox caption={ingredient.original} />
                </div>
              ))}
            />

            <Collapsible
              title="Instructions"
              content={
                <div className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  {recipeData && recipeData.analyzedInstructions.length ? (
                    recipeData?.analyzedInstructions[0].steps.map(
                      (instruction, i) => (
                        <p key={i} className="mb-2">{`${i + 1}. ${
                          instruction.step
                        }`}</p>
                      )
                    )
                  ) : (
                    <span>
                      This is weird but this recipe doesn't have an Instructions
                    </span>
                  )}
                </div>
              }
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
