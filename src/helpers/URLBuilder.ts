import { API_KEY, BASE_URL, Endpoint, URLParam } from "../constants/api";

type URLBuilderOption = {
  urlParam?: URLParam;
  customAPIKey?: string;
  recipeIdForRecipeDetail?: string;
};

export function URLBuilder(endpoint: Endpoint, option: URLBuilderOption) {
  const { urlParam, customAPIKey, recipeIdForRecipeDetail } = option;

  let url = `${BASE_URL}`;
  const USED_API_KEY = customAPIKey ? customAPIKey : API_KEY;

  switch (endpoint) {
    case "randomRecipes": {
      url += `recipes/random?apiKey=${USED_API_KEY}`;
      break;
    }
    case "recipeDetail": {
      url += `recipes/${recipeIdForRecipeDetail}/information?apiKey=${USED_API_KEY}`;
      break;
    }
    case "search": {
      url += `recipes/complexSearch?apiKey=${USED_API_KEY}`;
      break;
    }
    default: {
      return "Invalid Endpoint!";
    }
  }

  if (urlParam) {
    Object.keys(urlParam).forEach((key, i) => {
      url += `&${key}=${urlParam[key]}`;
    });
  }

  return url;
}
