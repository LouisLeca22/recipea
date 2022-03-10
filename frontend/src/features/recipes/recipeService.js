import axios from "axios"


const API_URL = "/api/recipes"

// Create new ticket
const createRecipe = async (recipeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, recipeData, config)

  return response.data
}

const getRecipes = async () => {

  const response = await axios.get(API_URL)

  return response.data
}


const searchRecipes = async (query) => {

  const response = await axios.get(`${API_URL}/search?q=${query}`)

  return response.data
}


const getRecipe = async (recipeId) => {
  console.log(API_URL)
  const response = await axios.get(`${API_URL}/single/${recipeId}`)

  return response.data
}

const updateRecipe = async (recipeId, recipeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.put(API_URL + "single/"+ recipeId, recipeData, config)

  return response.data
}

const deleteRecipe = async (recipeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(API_URL + "single/" + recipeId, config)

  return response.data
}


const recipeService = {
  createRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  searchRecipes
}

export default recipeService