const path = require("path");
const { run } = require("runjs");

const webconfig = require("./webconfig");

const __path__ = {
  database: {
    location: path.relative(__dirname, webconfig.database.path),
    eX$iMport: (src) => path.relative(__dirname, src)
  },
  view: path.relative(__dirname, webconfig.view.path),
};

module.exports = {
  test: () => run("jest"),
  launch: {
    database: () => run("mongod --dbpath " + __path__.database.location + " --port " + webconfig.database.port),
    server: () => run("node index.js"),
    view: () => run("cd " + __path__.view + " && ng serve --port " + webconfig.view.port)
  },
  database: {
    launch: () => module.exports.launch.database(),
    export: (src = "export/") => run("mongodump --out " + __path__.database.eX$iMport(src)),
    import: (src = "export/") => run("mongorestore " + __path__.database.eX$iMport(src))
  }
};
