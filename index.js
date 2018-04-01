const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const webconfig = require("./webconfig");
const RouterManager = require("./routes");

const app = express();
RouterManager.attach(app);

mongoose.connect("mongodb://" + webconfig.database.host + ":" + webconfig.database.port + "/" + webconfig.database.name);

app.listen(webconfig.server.port, () => console.log("Server started on " + webconfig.server.port + "..."));
