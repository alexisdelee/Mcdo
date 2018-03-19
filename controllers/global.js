const HTTP = require("../http");

const GlobalController = function() { };

GlobalController.getAll = function(Model, params, body, callback) {
  Model
    .find({}, (err, items) => {
      if(err) {
        return callback(HTTP.ERR_SERVER.INTERNAL_ERROR, { message: err }, null);
      }

      callback(HTTP.SUCCESS.OK, null, { items: items });
    });
};

GlobalController.getById = function(Model, params, body, callback) {
  Model
    .findById(params.id, (err, items) => {
      if(err) {
        if(err.name === "CastError") { // id invalide
          return callback(HTTP.ERR_CLIENT.BAD_REQUEST, { message: err.message });
        }

        return callback(HTTP.ERR_SERVER.INTERNAL_ERROR, { message: err });
      } else if(items === null) { // aucun match
        return callback(HTTP.ERR_CLIENT.BAD_REQUEST, { message: "There is no item with this id" });
      }

      callback(HTTP.SUCCESS.OK, null, { items: items });
    });
};

GlobalController.add = function(Model, params, body, callback) {
  let model = new Model(body);
  model
    .save((err, items) => {
      if(err) {
        if(err.code === 11000) { // l'item existe déjà
          return callback(HTTP.ERR_CLIENT.BAD_REQUEST, { message: err.errmsg });
        } else if(err.name === "ValidationError") { // l'utilisateur n'a pas envoyé d'item
          return callback(HTTP.ERR_CLIENT.BAD_REQUEST, { message: err.message });
        }

        return callback(HTTP.ERR_SERVER.INTERNAL_ERROR, err);
      }

      callback(HTTP.SUCCESS.OK, null, { items: items });
    });
};

GlobalController.updateById = function(Model, params, body, callback) {
  Model
    .findByIdAndUpdate(params.id, body, { new: true }, (err, items) => {
      if(err) {
        if (err.name === "CastError") { // id invalide
          return callback(HTTP.ERR_CLIENT.BAD_REQUEST, { message: err.message });
        }

        return callback(HTTP.ERR_SERVER.INTERNAL_ERROR, { message: err });
      } else if(items === null) { // aucun match
        return callback(HTTP.ERR_CLIENT.BAD_REQUEST, { message: "There is no item with this id" });
      }

      callback(HTTP.SUCCESS.OK, null, { items: items });
    });
};

GlobalController.updateFieldById = function(Model, params, body, callback) {
  if(Object.keys(Model.schema.paths).includes(params.attribute) === false) {
    return callback(HTTP.ERR_CLIENT.BAD_REQUEST, { message: "There is no item with this attribute" });
  }

  Model
    .findByIdAndUpdate(params.id, { $set: { [params.attribute]: body[params.attribute] } }, { new: true }, (err, items) => {
      if(err) {
        if (err.name === "CastError") { // id invalide
          return callback(HTTP.ERR_CLIENT.BAD_REQUEST, { message: err.message });
        }

        return callback(HTTP.ERR_SERVER.INTERNAL_ERROR, { message: err });
      } else if(items === null) { // aucun match
        return callback(HTTP.ERR_CLIENT.BAD_REQUEST, { message: "There is no item with this id" });
      }

      callback(HTTP.SUCCESS.OK, null, { items: items });
    });
};

GlobalController.deleteById = function(Model, params, body, callback) {
  Model
    .findByIdAndRemove(params.id, (err, items) => {
      callback(HTTP.SUCCESS.OK, null, { items: items });
    });
};

module.exports = GlobalController;
