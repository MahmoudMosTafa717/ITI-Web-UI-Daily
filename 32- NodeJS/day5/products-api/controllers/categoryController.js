const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ status: "success", data: category });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res
      .status(200)
      .json({
        status: "success",
        results: categories.length,
        data: categories,
      });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ status: "fail", message: "Category not found" });
    }

    const products = await Product.find({ category: categoryId });

    res
      .status(200)
      .json({ status: "success", results: products.length, data: products });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
