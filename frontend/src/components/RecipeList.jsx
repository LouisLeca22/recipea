import { Link } from 'react-router-dom';
import './recipelist.css';

function RecipeList({ recipes }) {


  if(recipes.length === 0){
    return <div className='error'>OOPS, il n'y a pas de recettes</div>
  }

  return (
    <div className='recipe-list'>
      {recipes.map((recipe) => (
        <Link to={`/recipes/${recipe._id}`} key={recipe._id}>
        <div  className='card'>
          <div className='featured'>
            <img src={recipe.img !== "" ? recipe.img : "/defaultRecipe.jpg"} alt='' />
          </div>
          <div className='details'>
            <div className='info'>
              <h4>{recipe.title}</h4>
              <p>{recipe.cookingTime} minutes</p>
              <div>{recipe.method.substring(0, 50)}...</div>
            </div>
            <div className="actions">
            <span>Préparer !</span>
            </div>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
}

export default RecipeList;
