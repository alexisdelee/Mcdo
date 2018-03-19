const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const mapping = require("../mapping");
const Models = {
  Ingredient: require("../models/Ingredient"),
  Product: require("../models/Product"),
  Menu: require("../models/Menu"),
  Group: require("../models/Group")
};

const globalRouter = {};

Object.entries(mapping).forEach(route => {
  let currentRouter = ( globalRouter[route[0]] = express.Router() );

  currentRouter.use(bodyParser.json());
  currentRouter.use(bodyParser.urlencoded({ extended: false }));
  currentRouter.use(cors());

  Object.entries(route[1]).forEach(method => {
    Object.entries(method[1]).forEach(path => {
      currentRouter[method[0]](path[0], (request, response) => {
        // TODO : check for private access

        let controller = require("../controllers/" + route[0]);
        controller[path[1].method](Models[route[0].charAt(0).toUpperCase() + route[0].slice(1, route[0].length - 1)], request.params, request.body, (code, err, items) => {
            if(err) response.status(code).json(err);
            else response.status(code).json(items);
          }
        );
      });
    });
  });
});

module.exports = globalRouter;
