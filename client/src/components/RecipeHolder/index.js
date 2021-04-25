import { useState } from "react";
import RecipeCard from "./RecipeCard";
import { cardContainer, btn } from "./recipe.module.scss";

const RecipeHolder = ({ searchRecipes, recipes }) => {
  const [hideRecipes, setHideRecipes] = useState(false);

  if (recipes.length === 0) {
    return (
      <div style={{textAlign: "center"}}>
        <div className={cardContainer}>
        </div>
        <button type="button" onClick={searchRecipes} className={btn}>
          Find recipes
        </button>
        <small>Add ingredients below and hit find to search for recipes</small>
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
          recipes.map(({ recipe }) => <RecipeCard recipe={recipe} />)
        )}
      </div>
      <button type="button" onClick={searchRecipes} className={btn}>
        Find recipes
      </button>
      <small>Add ingredients below and hit find to search for recipes</small>
    </div>
  );
};

export default RecipeHolder;
