const HttpException = require("../internal/HttpException");
const route = require("../internal/route");

const GlobalController = function() { };

GlobalController.getAll = function(response, request, Model, endpoint, callback) {
  const _options = { limit: request.limit(), offset: request.offset() };

  Model
    .find({})
    .skip(_options.offset)
    .limit(_options.limit)
    .exec((err, items) => {
      if(err) {
        return HttpException.emitter.ServerException.InternalError(response, err.toString());
      }

      callback({ items: items });
    });
};

GlobalController.getById = function(response, { params }, Model, endpoint, callback) {
  Model
    .findById(params.id, (err, items) => {
      if(err) {
        if(err.name === "CastError") { // id invalide
          return HttpException.emitter.ClientException.BadRequestError(response, err.message);
        }

        return HttpException.emitter.ServerException.InternalError(response, err.toString());
      } else if(items === null) { // aucun match
        return HttpException.emitter.ClientException.BadRequestError(response, "There is no item with this id");
      }

      callback({ items: items });
    });
};

GlobalController.add = async function(response, { body }, Model, endpoint, callback) {
  if(!!endpoint) {
    try {
      body = await route.graphql(body, response.req.originalUrl, endpoint);
    } catch(err) {
      return HttpException.emitter.ClientException.BadRequestError(response, err);
    }
  }

  let model = new Model(body);
  model
    .save((err, items) => {
      if(err) {
        if(err.code === 11000) { // l'item existe déjà
          return HttpException.emitter.ClientException.BadRequestError(response, err.errmsg);
        } else if(err.name === "ValidationError") { // l'utilisateur n'a pas envoyé d'item
          return HttpException.emitter.ClientException.BadRequestError(response, err.message);
        }

        return HttpException.emitter.ServerException.InternalError(response, err.toString());
      }

      callback({ items: items });
    });
};

GlobalController.updateById = async function(response, { params, body }, Model, endpoint, callback) {
  if(!!endpoint) {
    try {
      body = await route.graphql(body, response.req.originalUrl, endpoint);
    } catch(err) {
      return HttpException.emitter.ClientException.BadRequestError(response, err);
    }
  }

  Model
    .findByIdAndUpdate(params.id, body, { new: true }, (err, items) => {
      if(err) {
        if (err.name === "CastError") { // id invalide
          return HttpException.emitter.ClientException.BadRequestError(response, err.message);
        }

        return HttpException.emitter.ServerException.InternalError(response, err.toString());
      } else if(items === null) { // aucun match
        return HttpException.emitter.ClientException.BadRequestError(response, "There is no item with this id");
      }

      callback({ items: items });
    });
};

GlobalController.updateFieldById = async function(response, { params, body }, Model, endpoint, callback) {
  if(!!endpoint) {
    try {
      body = await route.graphql(body, response.req.originalUrl, endpoint);
    } catch(err) {
      return HttpException.emitter.ClientException.BadRequestError(response, err);
    }
  }

  if(Object.keys(Model.schema.paths).includes(params.attribute) === false) {
    return HttpException.emitter.ClientException.BadRequestError(response, "There is no item with this attribute");
  }

  Model
    .findByIdAndUpdate(params.id, { $set: { [params.attribute]: body.attribute } }, { new: true }, (err, items) => {
      if(err) {
        if (err.name === "CastError") { // id invalide
          return HttpException.emitter.ClientException.BadRequestError(response, err.message);
        }

        return HttpException.emitter.ServerException.InternalError(response, err.toString());
      } else if(items === null) { // aucun match
        return HttpException.emitter.ClientException.BadRequestError(response, "There is no item with this id");
      }

      callback({ items: items });
    });
};

GlobalController.deleteById = function(response, { params }, Model, endpoint, callback) {
  Model.findByIdAndRemove(params.id, (err, items) => {
    if(err) {
      return HttpException.emitter.ServerException.InternalError(response, err.toString());
    }

    callback({items: items });
  });
};

module.exports = GlobalController;
