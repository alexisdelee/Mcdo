const ingredientRouter = require("./ingredients");
const productRouter = require("./products");
const menuRouter = require("./menus");
const groupRouter = require("./groups");
const userRouter = require("./users");

const RouterManager = function() { };

RouterManager.attach = function(app) {
  app.use("/ingredients", ingredientRouter);
  app.use("/products", productRouter);
  app.use("/menus", menuRouter);
  app.use("/groups", groupRouter);
  app.use("/users", userRouter);
};

module.exports = RouterManager;
