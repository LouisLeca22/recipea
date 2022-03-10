const mongoose = require('mongoose');

const recipeModal = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Ajouter un nom pour votre recette'],
    },
    method: {
      type: String,
      required: [true, 'Ajouter une méthode pour votre recette'],
    },
    img: {
      type: String,
      default: "defaultRecipe.jpg"
    },
    ingredients: {
      type: Array,
      requires: [true, "Ajouter des ingrédients"]
    },
    cookingTime: {
      type: Number,
      required: [true, "Ajouter un temps de préparation"],
      min: 5,
      max: 240,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipe', recipeModal);
