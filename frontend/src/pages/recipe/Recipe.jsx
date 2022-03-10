import './recipe.css';
import {useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import { deleteRecipe, getRecipe } from '../../features/recipes/recipeSlice';
import { toast } from 'react-toastify';
import { useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {FaTrashAlt, FaPen } from "react-icons/fa"

function Recipe() {
  const { recipeId } = useParams();
  const dispatch = useDispatch();

  const { recipe, isSuccess, isError, message, isLoading } = useSelector(
    (state) => state.recipes
  );

  const {user} = useSelector((state) => state.auth)
    const navigate = useNavigate()
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getRecipe(recipeId));
  }, [isError, message, recipeId]);

  if(isLoading){
    return <Loading />
  }

  const handleDelete = () => {
    dispatch(deleteRecipe(recipe._id))
    navigate("/")
  }
  
  const handleEdit = () => {
    if (user._id === recipe.user)
    navigate("/edit/622861c0a0878c91ff472f08")
  }
  return (
    <>
      
      <div className='content'>
        {recipe && Object.keys(recipe).length > 2 ? (
          <>
            <div className='banner'>
            <img src={recipe.img !== "" ? recipe.img : "/defaultRecipe.jpg"} alt='' />
              <h2>{recipe.title}</h2>
            </div>
            <div className='detail-info'>
              <p>Prend {recipe.cookingTime} minutes à cuisiner</p>
              <ul>
                {recipe.ingredients?.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
              <p className='method'>{recipe.method}</p>
            </div>
          </>
        ): (
          <div className='page-title'>OOps cette page n'est pas disponible</div>
        )}
        {recipe && user && recipe.user === user._id && (
          <>
          <button className='edit' onClick={handleEdit}><FaPen style={{color: "white"}}/></button>

          <button className='delete' onClick={handleDelete}><FaTrashAlt /></button>
          </>
       
        )}
      </div>
    </>
  );
}

export default Recipe;
