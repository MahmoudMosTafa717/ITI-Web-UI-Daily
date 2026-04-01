const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

// /api/products
// router.get("/",productController.getAllProducts)
// router.post("/",productController.getAllProducts)
router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

// /api/products/:id
router
  .route("/:id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .put(productController.replaceProduct)
  .delete(productController.deleteProduct);

module.exports = router;
