const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Recipe = require('../models/recipeModel');

//@desc get recipes
//@route GET /api/recipes
//@access public
const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find();
  res.status(200).json(recipes);
});

//@desc search recipes
//@route GET /api/recipes/search?q=query
const searchRecipes = asyncHandler(async (req, res) => {
  const query = req.query.q;

  const queryCapitalize = capitalizeFirstLetter = (query) => {
    return query.charAt(0).toUpperCase() + query.slice(1);
  }
  
  


  const recipes = await Recipe.find({$or: [
    {"title": {$regex: query}}, 
    {"title": {$regex: queryCapitalize(query)}},
  ]})

  res.status(200).json(recipes)
});

//@desc create recipe
//@route POST /api/recipes
//@access private
const createRecipe = asyncHandler(async (req, res) => {
  const { title, method, img, ingredients, cookingTime } = req.body;
  if (!title || !method || !ingredients || !cookingTime) {
    res.status(400);
    throw new Error('Remplissez tous les champs');
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("L'utilisateur n'a pas été trouvé");
  }

  const recipe = await Recipe.create({
    user: req.user.id,
    title,
    method,
    img,
    ingredients,
    cookingTime,
  });
  res.status(201).json(recipe);
});

//@desc Get single recipe
//@route GET /api/recipes/:id
//@access public
const getRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    res.status(404);
    throw new Error("La recette n'a pas été trouvée");
  }

  res.status(200).json(recipe);
});

//@desc Delete  recipe
//@route DELETE /api/recipes/:id
//@access private
const deleteRecipe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("L'utilisateur n'a pas été trouvé");
  }

  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    res.status(404);
    throw new Error("La recette n'a pas été trouvé");
  }

  if (recipe.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Non authorisé');
  }

  await recipe.remove();
  res.status(200).json(recipe._id);
});

//@desc Update single recipe
//@route PUT /api/recipes/:id
//@access private
const updateRecipe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("L'utilisateur n'a pas été trouvé");
  }

  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    res.status(404);
    throw new Error("La recette n'a pas été trouvée");
  }

  if (recipe.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Non authorisé');
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedRecipe);
});

module.exports = {
  getRecipes,
  searchRecipes,
  createRecipe,
  getRecipe,
  deleteRecipe,
  updateRecipe,
};
