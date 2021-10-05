import { ArrowLeftIcon } from "@heroicons/react/solid";
import axios from "axios";
import { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RecipeSelector } from "../components";
import { PAGE_NAME } from "../constants/navigation";

import { URLBuilder } from "../helpers/URLBuilder";
import useURLParams from "../helpers/useURLParams";
import { Action } from "../types/actions";
import {
  SearchParam,
  SearchResponse,
  SearchResult,
} from "../types/globalTypes";
import { RecipeState } from "../types/state";

export default function SearchPage() {
  const history = useHistory();
  const urlParams = useURLParams();
  const urlParamsEntries = Array.from([...urlParams.entries()]);
  const currentQuery = urlParams.get("query") ?? "";
  const dispatch = useDispatch<Dispatch<Action>>();

  const searchResults = useSelector<RecipeState, RecipeState["searchResults"]>(
    (state) => state.searchResults
  );
  const setSearchResults = (searchResults_: Array<SearchResult>) =>
    dispatch({
      type: "SET_SEARCH_RESULTS",
      payload: {
        urlParams: urlParamsEntries,
        results: searchResults_,
      },
    });

  const [loading, setLoading] = useState(true);

  const searchRecipes = () => {
    const urlParam: SearchParam = {
      query: currentQuery,
    };

    setLoading(true);

    axios.get(URLBuilder("search", { urlParam })).then((res) => {
      const data = res.data as SearchResponse;

      setSearchResults(data.results);
      setLoading(false);
    });
  };

  useEffect(() => {
    // If the URL change
    if (
      JSON.stringify(urlParamsEntries) !==
      JSON.stringify(searchResults.urlParams)
    ) {
      searchRecipes();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickRecipe = (recipeId: string) => {
    history.push(`${PAGE_NAME.recipeDetail}${recipeId}`);
  };

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
      </div>

      <h2 className="font-bold mb-3">Search result for "{currentQuery}"</h2>

      {loading ? (
        <span>Loading...</span>
      ) : (
        <RecipeSelector
          type="search"
          onClickRecipe={onClickRecipe}
          recipes={searchResults.results}
        />
      )}
    </div>
  );
}
