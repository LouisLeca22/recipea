
import "./home.css"
import {getRecipes, reset} from "../../features/recipes/recipeSlice"
import {useSelector, useDispatch} from "react-redux"
import { useEffect } from "react"
import RecipeList from "../../components/RecipeList";
import Loading from "../../components/Loading";
import Header from "../../components/Header";


function Home() {
  
  const {recipes, isLoading, isSuccess} = useSelector(state => state.recipes)
  const dispatch = useDispatch()


  useEffect(() => {
      dispatch(getRecipes())

  },[dispatch])

  useEffect(() => {

    return () => {
      if(isSuccess){
        dispatch(reset())
      }
 
    }

  }, [dispatch, isSuccess])

  return (
    <>
      <Header />
      <div className='content'>
        {isLoading && <Loading />}
        {recipes && <RecipeList recipes={recipes} />}
      </div>
    </>
  );
}

export default Home;
