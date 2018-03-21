const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");

const SECRET_TOKEN = require("../token");
const GlobalController = require("./global");
const HttpException = require("../HttpException");

const UserController = function() { };

Object.assign(UserController , GlobalController); // extends

// OVERLOAD_GLOBAL_CONTROLLER

/**
 * Overload controller
 * Example: UserController .getById = function(Model, params, body, callback) { console.log("new controller"); };
 */

UserController.getAuthorization = function(response, Model, params, body, callback) {
  body.login = body.login || "";
  body.password = body.password || "";

  Model.findOne({ login: body.login, password: crypto.createHash("sha256").update(body.password).digest("base64") }, (err, user) => {
    if(err) {
      if(err.name === "CastError") { // id invalide
        // return ClientException.emit("BadRequestError", err.message);
        return HttpException.emitter.ClientException.BadRequestError(response, err.message);
      }

      // return ServerException.emit("InternalError", err.toString());
      return HttpException.emitter.ServerException.InternalError(response, err.toString());
    } else if(user === null) { // aucun match
      // return ClientException.emit("BadRequestError", "There is no item with this id");
      return HttpException.emitter.ClientException.BadRequestError(response, "There is no item with this id");
    }

    const token = jsonwebtoken.sign({ auth: true }, SECRET_TOKEN, { expiresIn: "1h" }); // expire after 1h
    callback({ token: token });
  });
};

UserController.checkToken = function(response, Model, params, body, callback) {
  body.token = body.token || "";

  jsonwebtoken.verify(body.token, SECRET_TOKEN, err => {
    // if(err) return ClientException.emit("UnauthorizedError", () => {});
    if(err) return HttpException.emitter.ClientException.UnauthorizedError(response);

    callback({ auth: true });
  });
};

// END

module.exports = UserController ;
