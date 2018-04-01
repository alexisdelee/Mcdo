const http = require("http");

const webconfig = require("../webconfig");

const get = (url, header, headers = {}) => {
  const options = {
    method: "GET",
    host: webconfig.server.host,
    port: webconfig.server.port,
    path: url,
    headers: headers
  };

  return new Promise(resolve => {
    const request = http.request(options, response => {
      const _response = {
        statusCode: response.statusCode,
        body: ""
      };

      response.on("data", chunk => _response.body += chunk);

      response.on("end", () => {
        if((_response.statusCode / 100) | 0 === 2) {
          _response.body = JSON.parse(_response.body);
        }

        resolve(_response);
      });
    }).on("error", err => { throw err });

    request.end();
  });
};

test("get all ingredients", async () => {
  const response = await get("/ingredients");

  expect((response.statusCode / 100) | 0).toBe(2);
  expect(response.body.items.length).not.toBe(0);
});

test("get an ingredient", async () => {
  const response = await get("/ingredients/5aae7a4fbdd2ad35bce7121c");

  expect((response.statusCode / 100) | 0).toBe(2);
  expect(response.body.items.length).not.toBe(0);
});
