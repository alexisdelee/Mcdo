const globalRouter = require("./global");

// OVERLOAD_ROUTE

/**
 * Overload route
 * Example: globalRouter.ingredients.get("/:id", (request, response) => console.log("new route", request.path));
 */

// END

module.exports = globalRouter.ingredients;
