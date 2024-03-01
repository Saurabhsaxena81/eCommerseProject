/**
 * POST localhost:8888/ecomm/api/v1/categories
 */
category_controller = require("../controllers/category.controller");

module.exports = (app) => {
  app.post("/ecomm/api/v1/categories", category_controller.createNewCategory);
};
