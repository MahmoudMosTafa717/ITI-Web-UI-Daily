const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

// /products

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

// /products/:id
router
  .route("/:id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .put(productController.replaceProduct)
  .delete(productController.deleteProduct);

module.exports = router;
