const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const RouterManager = require("./routes");

const app = express();
RouterManager.attach(app);

mongoose.connect("mongodb://localhost/mcdo");

app.listen(3000, () => console.log("Server started on 3000..."));
