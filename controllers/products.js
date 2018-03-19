const mongoose = require("mongoose");

const HTTP = require("../http");
const GlobalController = require("./global");

const ProductController = function() { };

Object.assign(ProductController, GlobalController); // extends

// OVERLOAD_GLOBAL_CONTROLLER

/**
 * Overload controller
 * Example: ProductController.getById = function(Model, params, body, callback) { console.log("new controller"); };
 */

ProductController.getAll = function(Model, params, body, callback) {
  Model
    .find({})
    .populate("ingredients")
    .populate("groups")
    .exec((err, products) => {
      if(err) {
        return callback(HTTP.ERR_SERVER.INTERNAL_ERROR, { message: err });
      }

      callback(HTTP.SUCCESS.OK, null, { items: products });
    });
};

ProductController.getById = function(Model, params, body, callback) {
  Model
    .findById(params.id)
    .populate("ingredients")
    .populate("groups")
    .exec((err, products) => {
      if(err) {
        if(err.name === "CastError") { // id invalide
          return callback(HTTP.ERR_CLIENT.BAD_REQUEST, { message: err.message });
        }

        return callback(HTTP.ERR_SERVER.INTERNAL_ERROR, { message: err });
      } else if(products === null) { // aucun match
        return callback(HTTP.ERR_CLIENT.BAD_REQUEST, { message: "There is no item with this id" });
      }

      callback(HTTP.SUCCESS.OK, null, { items: products });
    });
};

// END

module.exports = ProductController;
