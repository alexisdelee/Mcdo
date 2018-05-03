const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: String,
    default: "http://via.placeholder.com/200x200?text=Unavailable"
  },
  ingredients: [{
    type: mongoose.Schema.ObjectId,
    ref: "Ingredient",
    required: true
  }],
  groups: [{
    type: mongoose.Schema.ObjectId,
    ref: "Group",
    required: true
  }],
  popular: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("Product", ProductSchema);
