import RecipeCard from "./RecipeCard"

const RecipeHolder = ({searchRecipes,recipes}) => {
  console.log(recipes)
  return (
    <div className="recipeCont">
        <button type="button" onClick={searchRecipes}>Find recipes</button>
        {recipes.length > 1 ? recipes.map(({recipe}) => <RecipeCard recipe={recipe}/>) : <h1>Hit find to search for recipes</h1>}
    </div>

  )
}

export default RecipeHolder