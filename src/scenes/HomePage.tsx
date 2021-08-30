import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Navbar, RecipeSelector, Searchbar } from "../components";
import { NavPage } from "../components/Navbar";
import { PAGE_NAME } from "../constants/navigation";
import { URLBuilder } from "../helpers/URLBuilder";
import {
  RandomRecipesParam,
  RandomRecipesResponse,
  Recipe,
} from "../types/globalTypes";

export default function HomePage() {
  const history = useHistory();

  const [currentRecipes, setCurrentRecipes] = useState<Array<Recipe>>([]);

  const getRandomRecipes = () => {
    const urlParam: RandomRecipesParam = {
      number: 8,
    };

    axios.get(URLBuilder("randomRecipes", urlParam)).then((res) => {
      const data = res.data as RandomRecipesResponse;
      setCurrentRecipes(data.recipes);
    });
  };

  const onClickRecipe = (recipeId: string) => {
    history.push(`${PAGE_NAME.recipeDetail}${recipeId}`);
  };

  const onClickNav = (selectedPage: NavPage) => {
    if (selectedPage === "savedRecipes") {
      history.push(`${PAGE_NAME.savedRecipes}`);
    }
  };

  useEffect(() => {
    getRandomRecipes();
  }, []);

  return (
    <div className="flex flex-1 flex-col h-screen">
      <Navbar onClickNav={onClickNav} />

      <div className="flex md:flex-col pt-6 pl-12 pr-12 mb-6 md:pl-3 md:pr-3 md:mb-3">
        <h1 className="font-bold">Recipes</h1>

        <div className="flex-1 md:flex-none md:mt-3 pl-6 md:pl-0">
          <Searchbar />
        </div>
      </div>

      <div className="flex pl-12 pb-3 md:pl-6 md:pr-6">
        <p>Don't know what to make? Try these random recipes!</p>
      </div>

      <div className="flex-1 pl-12 pr-12 md:pl-3 md:pr-3">
        <RecipeSelector
          onClickRecipe={onClickRecipe}
          recipes={currentRecipes}
        />
      </div>
    </div>
  );
}
