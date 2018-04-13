const path = require("path");
const fs = require("fs");
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
    database: () => {
      if (!fs.existsSync(__path__.database.location)) {
        fs.mkdirSync(__path__.database.location);
      }

      run("mongod --dbpath " + __path__.database.location + " --port " + webconfig.database.port);
    },
    server: () => run("node index.js"),
    client: () => run("cd " + __path__.client + " && node node_modules/@angular/cli/bin/ng serve --open --port " + webconfig.client.port),
    dependencies: () => {
      run("npm install"); // install global dependencies
      run("cd " + __path__.client + " && npm install"); // install client dependencies
    },
    project: (env = "dev") => {
      module.exports.launch.dependencies();

      module.exports.launch.database(); // start mongodb
      module.exports.database.import(); // import new database

      module.exports.launch.server(); // start server

      if (env === "prod") {
        module.exports.client.build(); // build solution
      } else {
        module.exports.launch.client(); // start client
      }
    }
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
