import axios from "axios";
import { useEffect, useState } from "react";

import { Navbar, RecipeSelector, Searchbar } from "../components";
import { URLBuilder } from "../helpers/URLBuilder";
import {
  RandomRecipesParam,
  RandomRecipesResponse,
  Recipe,
} from "../types/globalTypes";

export default function HomePage() {
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

  useEffect(() => {
    getRandomRecipes();
  }, []);

  return (
    <div className="flex flex-1 flex-col h-screen">
      <Navbar />

      <div className="flex md:flex-col pt-6 pl-12 pr-12 mb-6 md:pl-3 md:pr-3 md:mb-3">
        <div className="flex-1 md:flex-none">
          <h1 className="font-bold">Recipes</h1>
        </div>

        <div className="flex-4 md:flex-none md:mt-3 pl-6 md:pl-0">
          <Searchbar />
        </div>
      </div>

      <div className="flex pl-12 pb-3 md:pl-6 md:pr-6">
        <p>Don't know what to make? Try these random recipes!</p>
      </div>

      <div className="flex-1 pl-12 pr-12 md:pl-3 md:pr-6">
        <RecipeSelector recipes={currentRecipes} />
      </div>
    </div>
  );
}
