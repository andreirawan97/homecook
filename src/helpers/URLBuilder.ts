import { API_KEY, BASE_URL, Endpoint, URLParam } from "../constants/api";

export function URLBuilder(
  endpoint: Endpoint,
  urlParam?: URLParam,
  customAPIKey?: string,
  recipeId?: string // For recipeDetail
) {
  let url = `${BASE_URL}`;
  const USED_API_KEY = customAPIKey ? customAPIKey : API_KEY;

  switch (endpoint) {
    case "randomRecipes": {
      url += `recipes/random?apiKey=${USED_API_KEY}`;
      break;
    }
    case "recipeDetail": {
      url += `recipes/${recipeId}/information?apiKey=${USED_API_KEY}`;
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
