import { card, link } from "./recipe.module.scss";

const RecipeCard = ({recipe}) => {
  return (
    <a href={recipe.url} target="_blank" className={card}>
      <img src={recipe.image} alt={recipe.label}/>
      <div className={link}>{recipe.label}
      </div> 
    </a>
  )
}

export default RecipeCard 