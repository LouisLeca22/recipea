import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import recipeService from "./recipeService"

const initialState = {
  recipes: [],
  recipe: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}

export const createRecipe = createAsyncThunk(
  'recipes/create',
  async (recipeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await recipeService.createRecipe(recipeData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getRecipe = createAsyncThunk(
  'recipes/get',
  async (recipeId, thunkAPI) => {
    try {
      return await recipeService.getRecipe(recipeId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getRecipes = createAsyncThunk(
  'recipes/getAll',
  async (_, thunkAPI) => {
    try {
      return await recipeService.getRecipes()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const searchRecipes = createAsyncThunk(
  'recipes/search',
  async (query, thunkAPI) => {
    try {
      return await recipeService.searchRecipes(query)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateRecipe = createAsyncThunk(
  'recipes/update',
  async (data, thunkAPI) => {
    const {recipeId, recipeData} = data
    try {
      const token = thunkAPI.getState().auth.user.token
      return await recipeService.updateRecipe(recipeId,recipeData,token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteRecipe = createAsyncThunk(
  'recipes/delete',
  async (recipeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await recipeService.deleteRecipe(recipeId,token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRecipe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createRecipe.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getRecipes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.isLoading = false
        state.recipes = action.payload
      })
      .addCase(getRecipes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(searchRecipes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.recipes = action.payload
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getRecipe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRecipe.fulfilled, (state, action) => {
        state.isLoading = false
        state.recipe = action.payload
      })
      .addCase(getRecipe.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.recipes = state.recipes.map(recipe => recipe._id === action.payload._id ? (action.payload) : recipe)
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.isLoading = false 
        state.isError = false
        state.recipes = state.recipes.filter(recipe => recipe._id !== action.payload)
      })

  }
})

export const {reset} = recipeSlice.actions
export default recipeSlice.reducer
