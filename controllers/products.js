const mongoose = require("mongoose");

const HttpException = require("../HttpException");
const GlobalController = require("./global");

const ProductController = function() { };

Object.assign(ProductController, GlobalController); // extends

// OVERLOAD_GLOBAL_CONTROLLER

/**
 * Overload controller
 * Example: ProductController.getById = function(response, request, Model, callback) { console.log("new controller"); };
 */

ProductController.getAll = function(response, request, Model, callback) {
  const _options = { limit: request.limit(), offset: request.offset() };

  Model
    .find({})
    .populate("ingredients")
    .populate("groups")
    .skip(_options.offset)
    .limit(_options.limit)
    .exec((err, products) => {
      if(err) {
        return HttpException.emitter.ServerException.InternalError(response, err.toString());
      }

      callback({ items: products });
    });
};

ProductController.getById = function(response, { params }, Model, callback) {
  Model
    .findById(params.id)
    .populate("ingredients")
    .populate("groups")
    .exec((err, products) => {
      if (err) {
        if (err.name === "CastError") { // id invalide
          return HttpException.emitter.ClientException.BadRequestError(response, err.message);
        }

        return HttpException.emitter.ServerException.InternalError(response, err.toString());
      } else if (products === null) { // aucun match
        return HttpException.emitter.ClientException.BadRequestError(response, "There is no item with this id");
      }

      callback({ items: products });
    });
};

ProductController.getAllPopulars = function(response, request, Model, callback) {
  const _options = { limit: request.limit(), offset: request.offset() };

  Model
    .find({ popular: true })
    .populate("ingredients")
    .populate("groups")
    .skip(_options.offset)
    .limit(_options.limit)
    .exec((err, products) => {
      if(err) {
        return HttpException.emitter.ServerException.InternalError(response, err.toString());
      }

      callback({ item: products });
    });
};

ProductController.getPopularById = function(response, { params }, Model, callback) {
  Model
    .findById(params.id)
    .where("popular").equals(true)
    .populate("ingredients")
    .populate("groups")
    .exec((err, products) => {
      if (err) {
        if (err.name === "CastError") { // id invalide
          return HttpException.emitter.ClientException.BadRequestError(response, err.message);
        }

        return HttpException.emitter.ServerException.InternalError(response, err.toString());
      } else if (products === null) { // aucun match
        return HttpException.emitter.ClientException.BadRequestError(response, "There is no item with this id");
      }

      callback({ items: products });
    });
};

// END

module.exports = ProductController;
