const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

// GET ALL
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");

    res.status(200).json({
      status: "success",
      results: products.length,
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// CREATE
exports.createProduct = async (req, res) => {
  try {
    const { category, name, price } = req.body;

    if (!category || !name || price === undefined) {
      return res.status(400).json({
        status: "fail",
        message: "name, price and category are required",
      });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found",
      });
    }

    const newProduct = await Product.create(req.body);

    res.status(201).json({
      status: "success",
      data: newProduct,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// GET ONE
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// UPDATE (PATCH)
exports.updateProduct = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "Request body cannot be empty",
      });
    }

    if (req.body.category) {
      const categoryExists = await Category.findById(req.body.category);
      if (!categoryExists) {
        return res.status(404).json({
          status: "fail",
          message: "Category not found",
        });
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// UPDATE (PUT)
exports.replaceProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        status: "fail",
        message: "You must provide both name and price",
      });
    }

    const payload = {
      name,
      price,
      category: req.body.category,
    };

    if (payload.category) {
      const categoryExists = await Category.findById(payload.category);
      if (!categoryExists) {
        return res.status(404).json({
          status: "fail",
          message: "Category not found",
        });
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
      overwrite: true,
    });

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// DELETE
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: { id },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
