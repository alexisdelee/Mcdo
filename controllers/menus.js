const mongoose = require("mongoose");

const HTTP = require("../http");
const GlobalController = require("./global");
const Ingredient = require("../models/Ingredient");
const Group = require("../models/Group");

const MenuController = function() { };

Object.assign(MenuController , GlobalController); // extends

// OVERLOAD_GLOBAL_CONTROLLER

/**
 * Overload controller
 * Example: MenuController .getById = function(Model, params, body, callback) { console.log("new controller"); };
 */

MenuController.getAll = function(Model, params, body, callback) {
  Model
    .find({})
    .populate("products")
    .exec((err, menus) => {
      if(err) {
        return callback(HTTP.ERR_SERVER.INTERNAL_ERROR, { message: err });
      }
      Ingredient
        .populate(menus, { path: "products.ingredients" }, (err, menus) => {
          if(err) return callback(HTTP.ERR_SERVER.INTERNAL_ERROR, err);

          Group
            .populate(menus, { path: "products.groups" }, (err, menus) => {
            if(err) return callback(HTTP.ERR_SERVER.INTERNAL_ERROR, err);

            callback(HTTP.SUCCESS.OK, null, { items: menus });
          });
        });
    });
};

MenuController.getById = function(Model, params, body, callback) {
  Model
    .findById(params.id)
    .populate("products")
    .exec((err, menus) => {
      if(err) {
        if(err.name === "CastError") { // id invalide
          return callback(HTTP.ERR_CLIENT.BAD_REQUEST, { message: err.message });
        }

        return callback(HTTP.ERR_SERVER.INTERNAL_ERROR, { message: err });
      } else if(menus === null) { // aucun match
        return callback(HTTP.ERR_CLIENT.BAD_REQUEST, { message: "There is no item with this id" });
      }

      Ingredient.populate(menus, { path: "products.ingredients" }, (err, menus) => {
        if(err) return callback(HTTP.ERR_SERVER.INTERNAL_ERROR, err);

        Group
          .populate(menus, { path: "products.groups" }, (err, name) => {
            if(err) return callback(HTTP.ERR_SERVER.INTERNAL_ERROR, err);

            callback(HTTP.SUCCESS.OK, null, { items: menus });
          });
      });
    });
};

// END

module.exports = MenuController;
