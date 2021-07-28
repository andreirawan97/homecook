import { Recipe } from "../types/globalTypes";

type Props = {
  recipes?: Array<Recipe>;
};

export default function RecipeSelector(props: Props) {
  let { recipes } = props;

  return (
    <div className="flex md:flex-row flex-wrap">
      {recipes &&
        recipes.map((recipe) => (
          <div
            className="flex flex-col shadow rounded-3xl pt-3 pb-3 pl-6 pr-6 mr-5 mb-5 w-96 cursor-pointer"
            style={{
              backgroundColor: "rgba(246, 246, 248)",
            }}
          >
            <span className="font-bold text-xl">{recipe.title}</span>

            <div className="flex flex-row mt-3">
              <div className="mr-6">
                <span className="text-gray-600">Serving</span>
                <p className="font-bold">{recipe.servings}</p>
              </div>

              <div className="mr-6">
                <span className="text-gray-600">Cooking Time</span>
                <p className="font-bold">{recipe.readyInMinutes} minutes</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
