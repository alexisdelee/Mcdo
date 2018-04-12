const HttpException = require("../internal/HttpException");
const GlobalController = require("./global");
const ProductController = require("../controllers/products");
const Product = require("../models/Product");
const Ingredient = require("../models/Ingredient");

const GroupController = function() { };

Object.assign(GroupController, GlobalController); // extends

// OVERLOAD_GLOBAL_CONTROLLER

/**
 * Overload controller
 * Example: GroupController.getById = function(response, request, Model, callback) { console.log("new controller"); };
 */

GroupController.getProducts = function(response, request, Model, callback) {
  let groups = {};

  ProductController.getAll(response, request, Product, products => {
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

GroupController.getProductsById = function(response, request, Model, callback) {
  let group = [];

  ProductController.getAll(response, request, Product, products => {
    products.items.forEach(product => {
      product.groups.forEach(_group => {
        if(_group._id.toString() === request.params.id) {
          group.push({ group: _group, product: product });
        }
      });
    });

    if(group.length === 0) {
      return HttpException.emitter.ClientException.BadRequestError(response, "There is no item with this id");
    }

    callback({ items: group });
  });
};

// END

module.exports = GroupController;
