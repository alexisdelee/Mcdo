const mongoose = require("mongoose");

const MenuSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  products: [{
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true
  }],
  dateStart: Date,
  dateEnd: Date
});

module.exports = mongoose.model("Menu", MenuSchema);
