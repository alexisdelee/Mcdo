const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  products: [{
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true
  }],
  menus: [{
    type: mongoose.Schema.ObjectId,
    ref: "Menu",
    required: true
  }]
});

module.exports = mongoose.model("Order", OrderSchema);
