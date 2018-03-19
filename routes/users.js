const globalRouter = require("./global");

// OVERLOAD_ROUTE

/**
 * Overload route
 * Example: globalRouter.users.get("/:id", (request, response) => console.log("new route", request.path));
 */

// END

module.exports = globalRouter.users;
