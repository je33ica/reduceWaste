import RecipeCard from "./RecipeCard";
import { cardContainer } from "./recipe.module.scss";

const RecipeHolder = ({ searchRecipes, recipes }) => {
  return (
    <div>
      <button type="button" onClick={searchRecipes}>
        Find recipes
      </button>
      <div className={cardContainer}>
        {recipes.length > 1 ? (
          recipes.map(({ recipe }) => <RecipeCard recipe={recipe} />)
        ) : (
          <h1>Hit find to search for recipes</h1>
        )}
      </div>
    </div>
  );
};

export default RecipeHolder;
