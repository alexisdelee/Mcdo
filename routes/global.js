const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jsonwebtoken = require("jsonwebtoken");

const mapping = require("../mapping");
const SECRET_TOKEN = require("../internal/token");
const HttpException = require("../internal/HttpException");
const options = require("../internal/options");
const init = require("../internal/route");
const Models = require("../models/index");

const globalRouter = {};

// EXCEPTIONS_EVENT

init.signal();

// END

const iterator = init.route(mapping);
for([ route, crud, subRoute, access, method ] of iterator) {
  let currentRouter = globalRouter[route] ? globalRouter[route] : ( globalRouter[route] = express.Router() );

  currentRouter.use(bodyParser.json());
  currentRouter.use(bodyParser.urlencoded({ extended: false }));
  currentRouter.use(cors());

  ((route, crud, subRoute, access, method) => {
    currentRouter[crud](subRoute, function(request, response) {
      options.extend(request); // extend prototype of request object

      try {
        if(access === "private") {
          request.headers["x-access-token"] = request.headers["x-access-token"] || "";
          jsonwebtoken.verify(request.headers["x-access-token"], SECRET_TOKEN);
        }

        let controller = require("../controllers/" + route);
        controller[method](response, request, Models[route.charAt(0).toUpperCase() + route.slice(1, route.length - 1)], message => {
          if(access === "private") {
            const { generateToken } = require("../controllers/users");

            response.status(200).json(
              Object.assign(message, { token: generateToken() })
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
  })(route, crud, subRoute, access, method);
}

module.exports = globalRouter;
