const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");

const SECRET_TOKEN = require("../internal/token");
const GlobalController = require("./global");
const HttpException = require("../internal/HttpException");
const route = require("../internal/route");

const UserController = function() { };

Object.assign(UserController , GlobalController); // extends

// OVERLOAD_GLOBAL_CONTROLLER

/**
 * Overload controller
 * Example: UserController .getById = function(response, request, Model, callback) { console.log("new controller"); };
 */

UserController.generateToken = function() {
  return jsonwebtoken.sign({ auth: true }, SECRET_TOKEN, { expiresIn: "1h" }); // expire after 1h
};

UserController.getAuthorization = async function(response, { body }, Model, endpoint, callback) {
  if(!!endpoint) {
    try {
      body = await route.graphql(body, response.req.originalUrl, endpoint);
    } catch(err) {
      return HttpException.emitter.ClientException.BadRequestError(response, err);
    }
  }

  Model.findOne({ login: body.login, password: crypto.createHash("sha256").update(body.password).digest("base64") }, (err, user) => {
    if(err) {
      if(err.name === "CastError") { // id invalide
        return HttpException.emitter.ClientException.BadRequestError(response, err.message);
      }

      return HttpException.emitter.ServerException.InternalError(response, err.toString());
    } else if(user === null) { // aucun match
      return HttpException.emitter.ClientException.UnauthorizedError(response);
    }

    callback({ token: UserController.generateToken() });
  });
};

UserController.checkToken = async function(response, { body }, Model, endpoint, callback) {
  if(!!endpoint) {
    try {
      body = await route.graphql(body, response.req.originalUrl, endpoint);
    } catch(err) {
      return HttpException.emitter.ClientException.BadRequestError(response, err);
    }
  }

  jsonwebtoken.verify(body.token, SECRET_TOKEN, err => {
    if(err) return HttpException.emitter.ClientException.UnauthorizedError(response);

    callback({ auth: true });
  });
};

// END

module.exports = UserController ;
