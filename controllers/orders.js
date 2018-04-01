const mongoose = require("mongoose");

const HttpException = require("../HttpException");
const GlobalController = require("./global");
const Product = require("../models/Product");
const Menu = require("../models/Menu");
const Ingredient = require("../models/Ingredient");
const Group = require("../models/Group");

const OrderController = function() { };

Object.assign(OrderController, GlobalController); // extends

// OVERLOAD_GLOBAL_CONTROLLER

/**
 * Overload controller
 * Example: OrderController.getById = function(response, request, Model, callback) { console.log("new controller"); };
 */

OrderController.add = function(response, { body }, Model, callback) {
  let price = 0;

  body.products = Array.isArray(body.products) ? body.products : [];
  body.menus = Array.isArray(body.menus) ? body.menus : [];

  // Model
  Product
    .find({ _id: { $in: body.products.map(product => mongoose.Types.ObjectId(product)) } })
    .populate("ingredients")
    .populate("groups")
    .exec((err, products) => {
      if (err) {
        if (err.name === "CastError") { // id invalide
          return HttpException.emitter.ClientException.BadRequestError(response, err.message);
        }

        return HttpException.emitter.ServerException.InternalError(response, err.toString());
      }

      // update price
      products.forEach(product => price += product.price);

      Menu
        .find({ _id: { $in: body.menus.map(menu => mongoose.Types.ObjectId(menu)) } })
        .populate("products")
        .exec((exec, menus) => {
          if (err) {
            if (err.name === "CastError") { // id invalide
              return HttpException.emitter.ClientException.BadRequestError(response, err.message);
            }

            return HttpException.emitter.ServerException.InternalError(response, err.toString());
          }

          Ingredient.populate(menus, { path: "products.ingredients" }, (err, menus) => {
            if(err) return HttpException.emitter.ServerException.InternalError(response, err.toString());

            Group
              .populate(menus, { path: "products.groups" }, (err, name) => {
                if(err) return HttpException.emitter.ServerException.InternalError(response, err.toString());

                // update price
                menus.forEach(menu => price += menu.price);

                callback({
                  items: {
                    products: products,
                    menus: menus
                  },
                  price: price,
                  status: "waiting"
                });
              });
          });
        });
    });
};

// END

module.exports = OrderController;
