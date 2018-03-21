const mongoose = require("mongoose");

const HttpException = require("../HttpException");
const GlobalController = require("./global");

const ProductController = function() { };

Object.assign(ProductController, GlobalController); // extends

// OVERLOAD_GLOBAL_CONTROLLER

/**
 * Overload controller
 * Example: ProductController.getById = function(Model, params, body, callback) { console.log("new controller"); };
 */

ProductController.getAll = function(response, Model, params, body, callback) {
  Model
    .find({})
    .populate("ingredients")
    .populate("groups")
    .exec((err, products) => {
      if(err) {
        // return ServerException.emit("InternalError", err.toString());
        return HttpException.emitter.ServerException.InternalError(response, err.toString());
      }

      callback({ items: products });
    });
};

ProductController.getById = function(response, Model, params, body, callback) {
  Model
    .findById(params.id)
    .populate("ingredients")
    .populate("groups")
    .exec((err, products) => {
      if (err) {
        if (err.name === "CastError") { // id invalide
          // return ClientException.emit("BadRequestError", err.message);
          return HttpException.emitter.ClientException.BadRequestError(response, err.message);
        }

        // return ServerException.emit("InternalError", err.toString());
        return HttpException.emitter.ServerException.InternalError(response, err.toString());
      } else if (products === null) { // aucun match
        // return ClientException.emit("BadRequestError", "There is no item with this id");
        return HttpException.emitter.ClientException.BadRequestError(response, "There is no item with this id");
      }

      callback({items: products});
    });
};

// END

module.exports = ProductController;
