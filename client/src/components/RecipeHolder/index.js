import { useState } from "react";
import RecipeCard from "./RecipeCard";
import { cardContainer, btn } from "./recipe.module.scss";
import Loading from "../Loading";

const RecipeHolder = ({ searchRecipes, recipes, loading }) => {
  const [hideRecipes, setHideRecipes] = useState();
  if (!recipes) {
    return (
      <div style={{textAlign: "center"}}>
        <div className={cardContainer}>
        </div>
        <button type="button" onClick={searchRecipes} className={btn}>
          Find recipes
        </button>
        <small>Add ingredients below and hit find to search for recipes</small>
        {loading && <Loading />}
      </div>
    );
  }
  return (
    <div style={{textAlign: "center"}}>
      {recipes.length > 1 && (
        <button
          type="button"
          onClick={() => setHideRecipes(!hideRecipes)}
          className={btn}
        >
          {hideRecipes ? "Show Recipes" : "Hide Recipes"}
        </button>
      )}
      <div className={cardContainer}>
        {!hideRecipes && (
          recipes.map(({ recipe }) => <RecipeCard recipe={recipe} key={recipe.url} />)
        )}
      </div>
      <button type="button" onClick={() => {
        searchRecipes();
        setHideRecipes(false)
      }} className={btn}>
        Find recipes
      </button>
      <small>Add ingredients below and hit find to search for recipes</small>
      {loading && <Loading />}
    </div>
  );
};

export default RecipeHolder;
