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
  params.login = params.login || "";
  params.password = params.password || "";

  Model.findOne({ login: body.login, password: crypto.createHash("sha256").update(body.password).digest("base64") }, (err, user) => {
    if(err) {
      if(err.name === "CastError") { // id invalide
        return callback(HTTP.ERR_CLIENT.BAD_REQUEST, { message: err.message });
      }

      return callback(HTTP.ERR_SERVER.INTERNAL_ERROR, { message: err });
    } else if(user === null) { // aucun match
      return callback(HTTP.ERR_CLIENT.BAD_REQUEST, { message: "There is no item with this id" });
    }

    const token = jsonwebtoken.sign({ admin: true }, SECRET_TOKEN, { expiresIn: "1h" }); // expire after 1h
    callback(HTTP.SUCCESS.OK, null, { items: user, token: token });
  });
};

// END

module.exports = UserController ;
