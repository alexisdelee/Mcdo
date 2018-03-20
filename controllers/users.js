const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");

const SECRET_TOKEN = require("../token");
const GlobalController = require("./global");
const HTTP = require("../http");

const UserController = function() { };

Object.assign(UserController , GlobalController); // extends

// OVERLOAD_GLOBAL_CONTROLLER

/**
 * Overload controller
 * Example: UserController .getById = function(Model, params, body, callback) { console.log("new controller"); };
 */

UserController.getAuthorization = function(Model, params, body, callback) {
  body.login = body.login || "";
  body.password = body.password || "";

  Model.findOne({ login: body.login, password: crypto.createHash("sha256").update(body.password).digest("base64") }, (err, user) => {
    if(err) {
      if(err.name === "CastError") { // id invalide
        return callback(HTTP.ERR_CLIENT.BAD_REQUEST, { message: err.message });
      }

      return callback(HTTP.ERR_SERVER.INTERNAL_ERROR, { message: err });
    } else if(user === null) { // aucun match
      return callback(HTTP.ERR_CLIENT.BAD_REQUEST, { message: "There is no item with this id" });
    }

    const token = jsonwebtoken.sign({ auth: true }, SECRET_TOKEN, { expiresIn: "1h" }); // expire after 1h
    callback(HTTP.SUCCESS.OK, null, { token: token });
  });
};

UserController.checkToken = function(Model, params, body, callback) {
  body.token = body.token || "";

  jsonwebtoken.verify(body.token, SECRET_TOKEN, err => {
    if(err) return callback(HTTP.ERR_CLIENT.UNAUTHORIZED, { auth: false });

    callback(HTTP.SUCCESS.OK, null, { auth: true });
  });
};

// END

module.exports = UserController ;
