import { Switch, Route, useLocation } from "react-router-dom";

import { PAGE_NAME } from "../constants/navigation";
import {
  HomePage,
  RecipeDetailPage,
  SavedRecipesPage,
  SearchPage,
} from "../scenes";

export default function App() {
  const location = useLocation();

  return (
    <Switch location={location}>
      <Route exact path={PAGE_NAME.home} component={HomePage} />
      <Route
        exact
        path={`${PAGE_NAME.recipeDetail}:recipeId`}
        component={RecipeDetailPage}
      />
      <Route
        exact
        path={`${PAGE_NAME.savedRecipes}`}
        component={SavedRecipesPage}
      />
      <Route exact path={`${PAGE_NAME.search}`} component={SearchPage} />
    </Switch>
  );
}
