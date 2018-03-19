const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
