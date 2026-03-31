const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(express.json());

const getProducts = () => {
  try {
    const data = fs.readFileSync("products.json", "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const saveProducts = (products) => {
  fs.writeFileSync("products.json", JSON.stringify(products, null, 2));
};

//////////////////////////////////////////////////
// GET all products
app.get("/products", (req, res) => {
  const products = getProducts();

  res.status(200).json({
    status: "success",
    results: products.length,
    data: products,
  });
});

//////////////////////////////////////////////////
// GET product by ID
app.get("/products/:id", (req, res) => {
  const products = getProducts();
  const { id } = req.params;

  const product = products.find((p) => p.id === id);

  // not found
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  // found
  res.status(200).json({
    success: true,
    data: product,
  });
});

//////////////////////////////////////////////////
// POST create product
app.post("/products", (req, res) => {
  const products = getProducts();

  const newProduct = {
    id: uuidv4(),
    ...req.body,
  };

  products.push(newProduct);
  saveProducts(products);

  res.status(201).json({
    status: "success",
    data: newProduct,
  });
});

//////////////////////////////////////////////////
// PATCH (partial update)
app.patch("/products/:id", (req, res) => {
  const products = getProducts();
  const { id } = req.params;

  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  products[index] = {
    ...products[index],
    ...req.body,
  };

  saveProducts(products);

  res.status(200).json({
    status: "success",
    data: products[index],
  });
});

//////////////////////////////////////////////////
// PUT (full replace)
app.put("/products/:id", (req, res) => {
  const products = getProducts();
  const { id } = req.params;

  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  // validation
  if (!req.body.name && !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide name or price",
    });
  }

  const updatedProduct = {
    id,
    ...req.body,
  };

  products[index] = updatedProduct;

  saveProducts(products);

  res.status(200).json({
    status: "success",
    data: updatedProduct,
  });
});

//////////////////////////////////////////////////
// DELETE
app.delete("/products/:id", (req, res) => {
  const products = getProducts();
  const { id } = req.params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  const newProducts = products.filter((p) => p.id !== id);
  saveProducts(newProducts);

  res.status(200).json({
    status: "success",
    data: id,
  });
});

//////////////////////////////////////////////////
// Server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});