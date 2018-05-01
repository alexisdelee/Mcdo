const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  menu: {
    type: mongoose.Schema.ObjectId,
    ref: "Menu",
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("OrderMenu", OrderSchema);
