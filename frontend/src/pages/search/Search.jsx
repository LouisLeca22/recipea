import "./search.css"
import {useSearchParams} from "react-router-dom"
import RecipeList from "../../components/RecipeList"
import Loading from "../../components/Loading"
import {useSelector, useDispatch} from "react-redux"
import {searchRecipes, reset} from "../../features/recipes/recipeSlice"
import {useEffect} from "react"


function Search() {
  const  [searchParams] = useSearchParams()
  const query = searchParams.get("q")

  const {recipes, isLoading, isSuccess} = useSelector(state => state.recipes)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if(isSuccess){
        dispatch(reset())
      }
    }
  },[dispatch, isSuccess])

  useEffect(() => {
    dispatch(searchRecipes(query))
    
  },[dispatch, query])

  return (
    <>
    <h2 className="page-title">Recttes contenant le terme "{query}"</h2>
          <div className='content'>
      {isLoading && <Loading />}
      {recipes && <RecipeList recipes={recipes} />}

    </div>
    </>

  )
}

export default Search