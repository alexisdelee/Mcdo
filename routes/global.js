const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jsonwebtoken = require("jsonwebtoken");

const mapping = require("../mapping");
const SECRET_TOKEN = require("../token");
const HttpException = require("../HttpException");
const options = require("../options");

const Models = {
  Ingredient: require("../models/Ingredient"),
  Product: require("../models/Product"),
  Menu: require("../models/Menu"),
  Group: require("../models/Group"),
  User: require("../models/User"),
  Order: require("../models/Order")
};

const globalRouter = {};

// EXCEPTIONS_EVENT
HttpException.listener.ClientException.BadRequestError();
HttpException.listener.ClientException.UnauthorizedError();
HttpException.listener.ClientException.NotFoundError();

HttpException.listener.ServerException.InternalError();
HttpException.listener.ServerException.NotImplementedError();
HttpException.listener.ServerException.ServiceUnavailableError();
// END

Object.entries(mapping).forEach(route => {
  let currentRouter = ( globalRouter[route[0]] = express.Router() );

  currentRouter.use(bodyParser.json());
  currentRouter.use(bodyParser.urlencoded({ extended: false }));
  currentRouter.use(cors());

  Object.entries(route[1]).forEach(method => {
    Object.entries(method[1]).forEach(path => {
      currentRouter[method[0]](path[0], (request, response) => {
        options.extend(request); // extend prototype of request object

        try {
          if(path[1].access === "private") {
            // request.headers.authorization = request.headers.authorization || "";
            // jsonwebtoken.verify(request.headers.authorization, SECRET_TOKEN);

            request.headers["x-access-token"] = request.headers["x-access-token"] || "";
            jsonwebtoken.verify(request.headers["x-access-token"], SECRET_TOKEN);
          }

          let controller = require("../controllers/" + route[0]);
          let a = controller[path[1].method](response, request, Models[route[0].charAt(0).toUpperCase() + route[0].slice(1, route[0].length - 1)], message => {
            if(path[1].access === "private") {
              response.status(200).json(
                Object.assign(message, { token: controller.users.generateToken() })
              );
            } else {
              response.status(200).json(message);
            }
          });
        } catch(e) {
          if(e.message === "jwt must be provided" || e.message === "invalid signature") {
            return HttpException.emitter.ClientException.UnauthorizedError(response);
          }

          console.log(e.message);
          return HttpException.emitter.ServerException.InternalError(response, "Unknown error");
        }
      });
    });
  });
});

module.exports = globalRouter;
