const GlobalController = require("./global");

const IngredientController = function() { };

Object.assign(IngredientController, GlobalController); // extends

// OVERLOAD_GLOBAL_CONTROLLER

/**
 * Overload controller
 * Example: IngredientController.getById = function(response, request, Model, endpoint, callback) { console.log("new controller"); };
 */

// END

module.exports = IngredientController;
