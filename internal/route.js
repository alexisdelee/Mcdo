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
  }
};
