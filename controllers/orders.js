const mongoose = require("mongoose");

const HttpException = require("../internal/HttpException");
const GlobalController = require("./global");
const OrderProduct = require("../models/OrderProduct");
const OrderMenu = require("../models/OrderMenu");
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

OrderController.getAll = function(response, request, Model, callback) {
  const _options = { limit: request.limit(), offset: request.offset() };

  Model
    .find({})
    .skip(_options.offset)
    .limit(_options.limit)
    .exec((err, orders) => {
      if (err) {
        if (err.name === "CastError") { // id invalide
          return HttpException.emitter.ClientException.BadRequestError(response, err.message);
        }

        return HttpException.emitter.ServerException.InternalError(response, err.toString());
      }

      OrderProduct
        .populate(orders, { path: "products" }, (err, orders) => {
          if(err) return HttpException.emitter.ServerException.InternalError(response, err.toString());

          Product
            .populate(orders, { path: "products.product" }, (err, orders) => {
              if(err) return HttpException.emitter.ServerException.InternalError(response, err.toString());

              Ingredient
                .populate(orders, { path: "products.product.ingredients" }, (err, orders) => {
                  if(err) return HttpException.emitter.ServerException.InternalError(response, err.toString());

                  Group
                    .populate(orders, { path: "products.product.groups" }, (err, orders) => {
                      if(err) return HttpException.emitter.ServerException.InternalError(response, err.toString());

                      OrderMenu
                        .populate(orders, { path: "menus" }, (err, orders) => {
                          if(err) return HttpException.emitter.ServerException.InternalError(response, err.toString());

                          Menu
                            .populate(orders, { path: "menus.menu" }, (err, orders) => {
                              if(err) return HttpException.emitter.ServerException.InternalError(response, err.toString());

                              Product
                                .populate(orders, { path: "menus.menu.products" }, (err, orders) => {
                                  if(err) return HttpException.emitter.ServerException.InternalError(response, err.toString());

                                  Ingredient
                                    .populate(orders, { path: "menus.menu.products.ingredients" }, (err, orders) => {
                                      if(err) return HttpException.emitter.ServerException.InternalError(response, err.toString());

                                      Group
                                        .populate(orders, { path: "menus.menu.products.groups" }, (err, orders) => {
                                          if(err) return HttpException.emitter.ServerException.InternalError(response, err.toString());

                                          callback({ items: orders });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};

OrderController.add = async function(response, { body }, Model, callback) {
  Product
    .find({ _id: { $in: body.products.map(item => mongoose.Types.ObjectId(item.product._id)) } })
    .exec((err, products) => {
      if (err) {
        if (err.name === "CastError") { // id invalide
          return HttpException.emitter.ClientException.BadRequestError(response, err.message);
        }

        return HttpException.emitter.ServerException.InternalError(response, err.toString());
      }

      Menu
        .find({ _id: { $in: body.menus.map(item => mongoose.Types.ObjectId(item.menu._id)) } })
        .exec((err, menus) => {
          if (err) {
            if (err.name === "CastError") { // id invalide
              return HttpException.emitter.ClientException.BadRequestError(response, err.message);
            }

            return HttpException.emitter.ServerException.InternalError(response, err.toString());
          }

          Promise.all(
            products.map(product => {
              return new Promise((resolve, reject) => {
                let orderProductModel = new OrderProduct({
                  product: product._id,
                  quantity: body.products.find(item => item.product._id === product._id.toString()).quantity
                });

                orderProductModel
                  .save((err, orderProducts) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(orderProducts);
                    }
                  });
              });
            })
          )
            .then(orderProducts => {
              Promise.all(
                menus.map(menu => {
                  return new Promise((resolve, reject) => {
                    let orderMenuModel = new OrderMenu({
                      menu: menu._id,
                      quantity: body.menus.find(item => item.menu._id === menu._id.toString()).quantity
                    });

                    orderMenuModel
                      .save((err, orderMenus) => {
                        if (err) {
                          reject(err);
                        } else {
                          resolve(orderMenus);
                        }
                      });
                  });
                })
              )
                .then(orderMenus => {
                  let model = new Model({
                    price: body.price,
                    status: "waiting",
                    products: orderProducts,
                    menus: orderMenus
                  });

                  model
                    .save((err, orders) => {
                      if(err) {
                        if (err.code === 11000) { // l'item existe déjà
                          return HttpException.emitter.ClientException.BadRequestError(response, err.errmsg);
                        } else if (err.name === "ValidationError") { // l'utilisateur n'a pas envoyé d'item
                          return HttpException.emitter.ClientException.BadRequestError(response, err.message);
                        }

                        return HttpException.emitter.ServerException.InternalError(response, err.toString());
                      }

                      callback({ items: orders });
                    });
                })
                .catch(err => {
                  if (err.code === 11000) { // l'item existe déjà
                    return HttpException.emitter.ClientException.BadRequestError(response, err.errmsg);
                  } else if (err.name === "ValidationError") { // l'utilisateur n'a pas envoyé d'item
                    return HttpException.emitter.ClientException.BadRequestError(response, err.message);
                  }

                  return HttpException.emitter.ServerException.InternalError(response, err.toString());
                });
            })
            .catch(err => {
              if (err.code === 11000) { // l'item existe déjà
                return HttpException.emitter.ClientException.BadRequestError(response, err.errmsg);
              } else if (err.name === "ValidationError") { // l'utilisateur n'a pas envoyé d'item
                return HttpException.emitter.ClientException.BadRequestError(response, err.message);
              }

              return HttpException.emitter.ServerException.InternalError(response, err.toString());
            });
        });
    });
};

// END

module.exports = OrderController;
