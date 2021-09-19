import axios from "axios";
import { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Shuffle as ShuffleIcon } from "react-ionicons";

import { Navbar, RecipeSelector, Searchbar } from "../components";
import { NavPage } from "../components/Navbar";
import { PAGE_NAME } from "../constants/navigation";
import { URLBuilder } from "../helpers/URLBuilder";
import { Action } from "../types/actions";
import {
  RandomRecipesParam,
  RandomRecipesResponse,
  Recipe,
} from "../types/globalTypes";
import { RecipeState } from "../types/state";

export default function HomePage() {
  const history = useHistory();
  const dispatch = useDispatch<Dispatch<Action>>();

  const randomRecipesData = useSelector<
    RecipeState,
    RecipeState["randomRecipes"]
  >((state) => state.randomRecipes);
  const setRandomRecipesData = (randomRecipes: Array<Recipe>) =>
    dispatch({
      type: "SET_RANDOM_RECIPES",
      payload: randomRecipes,
    });

  const [loadingRandomRecipes, setLoadingRandomRecipes] = useState(true);

  const getRandomRecipes = () => {
    const urlParam: RandomRecipesParam = {
      number: 8,
    };

    axios.get(URLBuilder("randomRecipes", urlParam)).then((res) => {
      const data = res.data as RandomRecipesResponse;
      setRandomRecipesData(data.recipes);
      setLoadingRandomRecipes(false);
    });
  };

  const onSearchRecipe = (searchQuery: string) => {
    // const urlParam: SearchParam = {
    //   query: searchQuery,
    // };

    // axios.get(URLBuilder("search", urlParam)).then((res) => {
    //   const data = res.data as RandomRecipesResponse;

    //   console.log(data);
    // });
    history.push(`${PAGE_NAME.search}?query=${searchQuery}`);
  };

  const onClickRecipe = (recipeId: string) => {
    history.push(`${PAGE_NAME.recipeDetail}${recipeId}`);
  };

  const onClickNav = (selectedPage: NavPage) => {
    if (selectedPage === "savedRecipes") {
      history.push(`${PAGE_NAME.savedRecipes}`);
    }
  };

  const onClickShuffle = () => {
    setRandomRecipesData([]);
    setLoadingRandomRecipes(true);
    getRandomRecipes();
  };

  useEffect(() => {
    if (!randomRecipesData.length) {
      getRandomRecipes();
    } else {
      // If you going back, the loadingRandomRecipes is set to true (which is the default)
      setLoadingRandomRecipes(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-1 flex-col h-screen">
      <Navbar onClickNav={onClickNav} />

      <div className="flex md:flex-col pt-6 pl-12 pr-12 mb-6 md:pl-3 md:pr-3 md:mb-3">
        <h1 className="font-bold">Recipes</h1>

        <div className="flex-1 md:flex-none md:mt-3 pl-6 md:pl-0">
          <Searchbar onSearchRecipe={onSearchRecipe} />
        </div>
      </div>

      <div className="flex flex-row items-center pl-12 pb-3 md:pl-6 md:pr-6">
        <p>Don't know what to make? Try these random recipes!</p>
        <ShuffleIcon
          style={{
            marginLeft: 12,
            cursor: "pointer",
          }}
          height="32px"
          width="32px"
          onClick={onClickShuffle}
        />
      </div>

      <div className="flex-1 pl-12 pr-12 md:pl-3 md:pr-3">
        {loadingRandomRecipes ? <p>Loading...</p> : <></>}
        <RecipeSelector
          onClickRecipe={onClickRecipe}
          recipes={randomRecipesData}
        />
      </div>
    </div>
  );
}
