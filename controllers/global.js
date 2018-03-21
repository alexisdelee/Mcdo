const HttpException = require("../HttpException");

const GlobalController = function() { };

GlobalController.getAll = function(response, Model, params, body, callback) {
  Model
    .find({}, (err, items) => {
      if(err) {
        // return ServerException.emit("InternalError", err.toString());
        return HttpException.emitter.ServerException.InternalError(response, err.toString());
      }

      callback({ items: items });
    });
};

GlobalController.getById = function(response, Model, params, body, callback) {
  Model
    .findById(params.id, (err, items) => {
      if(err) {
        if(err.name === "CastError") { // id invalide
          // return ClientException.emit("BadRequestError", err.message);
          return HttpException.emitter.ClientException.BadRequestError(response, err.message);
        }

        // return ServerException.emit("InternalError", err.toString());
        return HttpException.emitter.ServerException.InternalError(response, err.toString());
      } else if(items === null) { // aucun match
        // return ClientException.emit("BadRequestError", "There is no item with this id");
        return HttpException.emitter.ClientException.BadRequestError(response, "There is no item with this id");
      }

      callback({ items: items });
    });
};

GlobalController.add = function(response, Model, params, body, callback) {
  let model = new Model(body);
  model
    .save((err, items) => {
      if(err) {
        if(err.code === 11000) { // l'item existe déjà
          // return ClientException.emit("BadRequestError", err.errmsg);
          return HttpException.emitter.ClientException.BadRequestError(response, err.errmsg);
        } else if(err.name === "ValidationError") { // l'utilisateur n'a pas envoyé d'item
          // return ClientException.emit("BadRequestError", err.message);
          return HttpException.emitter.ClientException.BadRequestError(response, err.message);
        }

        // return ServerException.emit("InternalError", err.toString());
        return HttpException.emitter.ServerException.InternalError(response, err.toString());
      }

      callback({ items: items });
    });
};

GlobalController.updateById = function(response, Model, params, body, callback) {
  Model
    .findByIdAndUpdate(params.id, body, { new: true }, (err, items) => {
      if(err) {
        if (err.name === "CastError") { // id invalide
          // return ClientException.emit("BadRequestError", err.message);
          return HttpException.emitter.ClientException.BadRequestError(response, err.message);
        }

        // return ServerException.emit("InternalError", err.toString());
        return HttpException.emitter.ServerException.InternalError(response, err.toString());
      } else if(items === null) { // aucun match
        // return ClientException.emit("BadRequestError", "There is no item with this id");
        return HttpException.emitter.ClientException.BadRequestError(response, "There is no item with this id");
      }

      callback({ items: items });
    });
};

GlobalController.updateFieldById = function(response, Model, params, body, callback) {
  if(Object.keys(Model.schema.paths).includes(params.attribute) === false) {
    // return ClientException.emit("BadRequestError", "There is no item with this attribute");
    return HttpException.emitter.ClientException.BadRequestError(response, "There is no item with this attribute");
  }

  Model
    .findByIdAndUpdate(params.id, { $set: { [params.attribute]: body[params.attribute] } }, { new: true }, (err, items) => {
      if(err) {
        if (err.name === "CastError") { // id invalide
          // return ClientException.emit("BadRequestError", err.message);
          return HttpException.emitter.ClientException.BadRequestError(response, err.message);
        }

        // return ServerException.emit("InternalError", err.toString());
        return HttpException.emitter.ServerException.InternalError(response, err.toString());
      } else if(items === null) { // aucun match
        // return ClientException.emit("BadRequestError", "There is no item with this id");
        return HttpException.emitter.ClientException.BadRequestError(response, "There is no item with this id");
      }

      callback({ items: items });
    });
};

GlobalController.deleteById = function(response, Model, params, body, callback) {
  Model.findByIdAndRemove(params.id, (err, items) => {
    if(err) {
      // return ServerException.emit("InternalError", err.toString());
      return HttpException.emitter.ServerException.InternalError(response, err.toString());
    }

    callback({items: items });
  });
};

module.exports = GlobalController;
