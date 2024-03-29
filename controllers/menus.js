const mongoose = require("mongoose");

const HttpException = require("../internal/HttpException");
const GlobalController = require("./global");
const Ingredient = require("../models/Ingredient");
const Group = require("../models/Group");

const MenuController = function() { };

Object.assign(MenuController , GlobalController); // extends

// OVERLOAD_GLOBAL_CONTROLLER

/**
 * Overload controller
 * Example: MenuController .getById = function(response, request, Model, endpoint, callback) { console.log("new controller"); };
 */

MenuController.getAll = function(response, request, Model, endpoint, callback) {
  const _options = { limit: request.limit(), offset: request.offset() };

  Model
    .find({})
    .populate("products")
    .skip(_options.offset)
    .limit(_options.limit)
    .exec((err, menus) => {
      if(err) {
        return HttpException.emitter.ServerException.InternalError(response, err.toString());
      }

      Ingredient
        .populate(menus, { path: "products.ingredients" }, (err, menus) => {
          if(err) return HttpException.emitter.ServerException.InternalError(response, err.toString());

          Group
            .populate(menus, { path: "products.groups" }, (err, menus) => {
              if(err) return HttpException.emitter.ServerException.InternalError(response, err.toString());

            callback({ items: menus });
          });
        });
    });
};

MenuController.getById = function(response, { params }, Model, endpoint, callback) {
  Model
    .findById(params.id)
    .populate("products")
    .exec((err, menus) => {
      if(err) {
        if(err.name === "CastError") { // id invalide
          return HttpException.emitter.ClientException.BadRequestError(response, err.message);
        }

        return HttpException.emitter.ServerException.InternalError(response, err.toString());
      } else if(menus === null) { // aucun match
        return HttpException.emitter.ClientException.BadRequestError(response, "There is no item with this id");
      }

      Ingredient.populate(menus, { path: "products.ingredients" }, (err, menus) => {
        if(err) return HttpException.emitter.ServerException.InternalError(response, err.toString());

        Group
          .populate(menus, { path: "products.groups" }, (err, name) => {
            if(err) return HttpException.emitter.ServerException.InternalError(response, err.toString());

            callback({ items: menus });
          });
      });
    });
};

// END

module.exports = MenuController;
