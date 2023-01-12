const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Ajouter un nom'],
    },
    email: {
      type: String,
      reqired: [true, 'Ajouter un email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Ajouter un mot de passe'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema)