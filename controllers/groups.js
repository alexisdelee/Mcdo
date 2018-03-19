const HTTP = require("../http");
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

GroupController.getProducts = function(Model, params, body, callback) {
  let groups = {};

  ProductController.getAll(Product, null, null, (code, err, products) => {
    if(err) return callback(code, err);

    products.items.forEach(product => {
      product.groups.forEach(group => {
        if(groups[group._id] === undefined) {
          groups[group._id] = [];
        }

        groups[group._id].push({ group: group, product: product });
      });
    });

    callback(HTTP.SUCCESS.OK, null, { items: groups });
  });
};

GroupController.getProductsById = function(Model, params, body, callback) {
  let group = [];

  ProductController.getAll(Product, null, null, (code, err, products) => {
    if(err) return callback(code, err);

    products.items.forEach(product => {
      product.groups.forEach(_group => {
        if(_group._id == params.id) {
          group.push({ group: _group, product: product });
        }
      });
    });

    callback(HTTP.SUCCESS.OK, null, { items: group });
  });
};

// END

module.exports = GroupController;
