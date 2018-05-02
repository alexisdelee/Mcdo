const fs = require("fs");
const { graphql, buildSchema } = require("graphql");

const HttpException = require("../internal/HttpException");

module.exports = {
  signal: () => {
    HttpException.listener.ClientException.BadRequestError();
    HttpException.listener.ClientException.UnauthorizedError();
    HttpException.listener.ClientException.NotFoundError();

    HttpException.listener.ServerException.InternalError();
    HttpException.listener.ServerException.NotImplementedError();
    HttpException.listener.ServerException.ServiceUnavailableError();
  },
  route: function *(data, depth = 0, options = []){
    for([ key, value ] of Object.entries(data)) {

      if(typeof value === "object") {
        options[depth] = key;

        const values = Object.values(value);
        if(values.length && typeof values[0] === "string") {
          yield options.concat(values);
        }

        yield *module.exports.route(value, depth + 1, options.slice(0)); // pass copy, not reference
      }
    }
  },
  graphql: (data, path, endpoint) => {
    path = path.split("/").filter(url => !!url)[0].slice(0, -1).toLowerCase();

    return new Promise((resolve, reject) => {
      graphql(
        buildSchema(fs.readFileSync(__dirname + "/../graphql/schema.graphqls", { encoding: "utf8" })),
        fs.readFileSync(__dirname + "/../graphql/" + path + "/" + endpoint + ".graphqle", { encoding: "utf8" }),
        data
      ).then(response => {
        if (response.errors) {
          reject(response.errors.map(e => e.message));
        } else {
          resolve(response.data[path]);
        }
      });
    });
  }
};
