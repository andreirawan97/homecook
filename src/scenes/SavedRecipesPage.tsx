import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Navbar, RecipeSelector } from "../components";
import { NavPage } from "../components/Navbar";
import { PAGE_NAME } from "../constants/navigation";
import { getSavedRecipes } from "../helpers/storageHelper";
import { URLBuilder } from "../helpers/URLBuilder";
import { Recipe } from "../types/globalTypes";

export default function SavedRecipesPage() {
  const history = useHistory();

  const [savedRecipes, setSavedRecipes] = useState<Array<Recipe>>([]);
  const [loadingSavedRecipes, setLoadingSavedRecipes] = useState(true);

  const onClickNav = (selectedPage: NavPage) => {
    if (selectedPage === "recipes") {
      history.push(`${PAGE_NAME.home}`);
    }
  };

  const onClickRecipe = (recipeId: string) => {
    history.push(`${PAGE_NAME.recipeDetail}${recipeId}`);
  };

  const fetchSavedRecipes = async () => {
    const savedRecipesIds = getSavedRecipes();
    const axiosRequests: Array<any> = [];
    const tmpSavedRecipes: Array<Recipe> = [];

    savedRecipesIds.forEach((id) => {
      axiosRequests.push(axios.get(URLBuilder("recipeDetail", {}, "", id)));
    });

    await axios.all(axiosRequests).then((responses) => {
      responses.forEach((res) => {
        tmpSavedRecipes.push(res.data as Recipe);
      });
    });

    setSavedRecipes(tmpSavedRecipes);
    setLoadingSavedRecipes(false);
  };

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  return (
    <div className="flex flex-1 flex-col h-screen">
      <Navbar currentPage="savedRecipes" onClickNav={onClickNav} />

      <div className="flex md:flex-col pt-6 pl-12 pr-12 mb-6 md:pl-3 md:pr-3 md:mb-3">
        <h1 className="font-bold">Saved Recipes</h1>
      </div>

      <div className="flex-1 pl-12 pr-12 md:pl-3 md:pr-3">
        {loadingSavedRecipes ? <span>Loading...</span> : <></>}
        {!loadingSavedRecipes && savedRecipes.length ? (
          <RecipeSelector
            onClickRecipe={onClickRecipe}
            recipes={savedRecipes}
          />
        ) : (
          <></>
        )}
        {!loadingSavedRecipes && !savedRecipes.length ? (
          <span>You have no saved recipes :(</span>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
