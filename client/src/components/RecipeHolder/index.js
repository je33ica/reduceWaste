import { useState } from "react";
import RecipeCard from "./RecipeCard";
import { cardContainer, btn } from "./recipe.module.scss";

const RecipeHolder = ({ searchRecipes, recipes }) => {
  const [hideRecipes, setHideRecipes] = useState(false);

  if (recipes.length === 0) {
    return (
      <div>
        <div className={cardContainer}>
          <h1>Hit find to search for recipes</h1>
        </div>
        <button type="button" onClick={searchRecipes} className={btn}>
          Find recipes
        </button>
      </div>
    );
  }
  return (
    <div>
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
    </div>
  );
};

export default RecipeHolder;
