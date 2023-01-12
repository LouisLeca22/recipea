const router = require("express").Router()
const {protect} = require("../middleware/authMiddleware")
const {createRecipe, getRecipes, searchRecipes, getRecipe, deleteRecipe, updateRecipe} = require("../controllers/recipeController")

router.route("/").get(getRecipes).post(protect, createRecipe)

router.route("/single/:id").get(getRecipe).delete(protect, deleteRecipe).put(protect, updateRecipe)

router.route("/search").get(searchRecipes)

module.exports = router