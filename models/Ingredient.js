const mongoose = require("mongoose");

const IngredientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("Ingredient", IngredientSchema);
