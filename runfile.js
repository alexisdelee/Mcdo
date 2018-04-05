const path = require("path");
const { run } = require("runjs");

const webconfig = require("./webconfig");

const __path__ = {
  database: {
    location: path.relative(__dirname, webconfig.database.path),
    eX$iMport: (src) => path.relative(__dirname, src)
  },
  client: path.relative(__dirname, webconfig.client.path),
};

module.exports = {
  test: () => run("node node_modules/jest/bin/jest.js"),
  launch: {
    database: () => run("mongod --dbpath " + __path__.database.location + " --port " + webconfig.database.port),
    server: () => run("node index.js"),
    client: () => run("cd " + __path__.client + " && node node_modules/@angular/cli/bin/ng serve --open --port " + webconfig.client.port)
  },
  database: {
    launch: () => module.exports.launch.database(),
    export: (src = "export/") => run("mongodump --out " + __path__.database.eX$iMport(src)),
    import: (src = "export/") => run("mongorestore " + __path__.database.eX$iMport(src))
  },
  client: {
    launch: () => module.exports.launch.client(),
    build: () => run("cd " + __path__.client + " && node node_modules/@angular/cli/bin/ng build --prod")
  }
};
