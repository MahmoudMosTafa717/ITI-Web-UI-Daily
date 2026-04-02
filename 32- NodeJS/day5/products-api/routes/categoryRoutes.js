const express = require("express");
const { protect, allowedTo } = require("../middleware/authMiddleware");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router
  .route("/")
  .post(categoryController.createCategory)
  .get(categoryController.getAllCategories);
router.route("/:id/products").get(categoryController.getProductsByCategory);

module.exports = router;
