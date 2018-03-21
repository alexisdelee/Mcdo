const HttpException = require("../HttpException");
const GlobalController = require("./global");
const ProductController = require("../controllers/products");
const Product = require("../models/Product");
const Ingredient = require("../models/Ingredient");

const GroupController = function() { };

Object.assign(GroupController, GlobalController); // extends

// OVERLOAD_GLOBAL_CONTROLLER

/**
 * Overload controller
 * Example: GroupController.getById = function(Model, params, body, callback) { console.log("new controller"); };
 */

GroupController.getProducts = function(response, Model, params, body, callback) {
  let groups = {};

  ProductController.getAll(Product, null, null, products => {
    // if(err) return callback(code, err);
    if(err) return; // error's event already sent

    products.items.forEach(product => {
      product.groups.forEach(group => {
        if(groups[group._id] === undefined) {
          groups[group._id] = [];
        }

        groups[group._id].push({ group: group, product: product });
      });
    });

    callback({ items: groups });
  });
};

GroupController.getProductsById = function(response, Model, params, body, callback) {
  let group = [];

  ProductController.getAll(Product, null, null, products => {
    // if(err) return callback(code, err);
    if(err) return; // error's event already sent

    products.items.forEach(product => {
      product.groups.forEach(_group => {
        if(_group._id === params.id) {
          group.push({ group: _group, product: product });
        }
      });
    });

    callback({ items: group });
  });
};

// END

module.exports = GroupController;
