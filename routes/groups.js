const globalRouter = require("./global");

// OVERLOAD_ROUTE

/**
 * Overload route
 * Example: globalRouter.groups.get("/:id", (request, response) => console.log("new route", request.path));
 */

// END

module.exports = globalRouter.groups;
