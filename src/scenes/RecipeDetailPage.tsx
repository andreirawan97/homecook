import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { URLBuilder } from "../helpers/URLBuilder";
import { Recipe } from "../types/globalTypes";

import { RecipeDetailPageParam } from "../types/navigation";

export default function RecipeDetail() {
  const { recipeId } = useParams<RecipeDetailPageParam>();

  const getRecipeDetail = () => {
    axios.get(URLBuilder("recipeDetail", {}, "", recipeId)).then((res) => {
      const data = res.data as Recipe;
      console.log(data);
    });
  };

  useEffect(() => {
    getRecipeDetail();
  }, []);

  return (
    <div>
      <p>Recipe Detail</p>
    </div>
  );
}
