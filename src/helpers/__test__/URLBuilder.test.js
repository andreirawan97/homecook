import { URLBuilder } from "../URLBuilder";

it("should build the URL successfully", () => {
  const customAPIKey = "123";
  const expectedURL = "https://api.spoonacular.com/recipes/random?apiKey=123";

  const url = URLBuilder("randomRecipe", undefined, customAPIKey);

  expect(url).toBe(expectedURL);
});

it("should build the URL successfully with param", () => {
  const customAPIKey = "123";
  const urlParam = {
    number: 1,
  };
  const expectedURL =
    "https://api.spoonacular.com/recipes/random?apiKey=123&number=1";

  const url = URLBuilder("randomRecipe", urlParam, customAPIKey);

  expect(url).toBe(expectedURL);
});

it("should build the URL successfully with complex param", () => {
  const customAPIKey = "123";
  const urlParam = {
    number: 1,
    page: 3,
    tags: "vegetarian,dessert",
  };
  const expectedURL =
    "https://api.spoonacular.com/recipes/random?apiKey=123&number=1&page=3&tags=vegetarian,dessert";

  const url = URLBuilder("randomRecipe", urlParam, customAPIKey);

  expect(url).toBe(expectedURL);
});

it("should return invalid endpoint", () => {
  const customAPIKey = "123";
  const urlParam = {
    number: 1,
  };
  const expectedURL = "Invalid Endpoint!";

  const url = URLBuilder("random", urlParam, customAPIKey);

  expect(url).toBe(expectedURL);
});
