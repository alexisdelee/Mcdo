const http = require("http");
const querystring = require("querystring");

const webconfig = require("../../webconfig");

const options = {
  method: "",
  host: webconfig.server.host,
  port: webconfig.server.port,
  path: "",
  headers: {}
};

const send = (options, data, callback) => {
  const request = http.request(options, response => {
    const _response = {
      statusCode: response.statusCode,
      body: ""
    };

    response.on("data", chunk => _response.body += chunk);

    response.on("end", () => {
      if(module.exports.getTypeOfHttpCode(_response.statusCode) === 2) {
        _response.body = JSON.parse(_response.body);
      }

      callback(_response);
    });
  }).on("error", err => { throw err });

  if (data) {
    request.write(JSON.stringify(data));
  }

  request.end();
};

module.exports = {
  getTypeOfHttpCode: (code) => (code / 100) | 0,
  get: (url, headers = {}) => {
    options.method = "GET";
    options.path = url;
    options.headers = headers;

    return new Promise(resolve => {
      send(options, null, response => resolve(response));
    });
  },
  post: (url, data = {}, headers = {}) => {
    options.method = "POST";
    options.path = url;
    options.headers = headers;

    return new Promise(resolve => {
      send(options, data, response => resolve(response));
    });
  },
  put: (url, data = {}, headers = {}) => {
    options.method = "PUT";
    options.path = url;
    options.headers = headers;

    return new Promise(resolve => {
      send(options, data, response => resolve(response));
    });
  },
  delete: (url, headers = {}) => {
    options.method = "DELETE";
    options.path = url;
    options.headers = headers;

    return new Promise(resolve => {
      send(options, null, response => resolve(response));
    });
  }
};
