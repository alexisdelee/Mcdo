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
    ref: "OrderProduct",
    required: true
  }],
  menus: [{
    type: mongoose.Schema.ObjectId,
    ref: "OrderMenu",
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", OrderSchema);
