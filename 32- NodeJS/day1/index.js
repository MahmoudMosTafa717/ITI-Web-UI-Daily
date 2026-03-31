const { log } = require("console");
const fs = require("fs");

// GET args
const [,, command, ...args] = process.argv;

// read file
const getProducts = () => {
  try {
    const data = fs.readFileSync("products.json", "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// write file
const saveProducts = (products) => {
  fs.writeFileSync("products.json", JSON.stringify(products, null, 2));
};

// get key value
const getKey = (key, arr) => {
  const index = arr.indexOf(key);
  return index !== -1 ? arr[index + 1] : null;
};

// COMMAND FUNCTIONS
// ADD
const addProduct = (args) => {
  const [name, price] = args;

  if (!name || !price) {
    return console.log("COMMAND: node index.js add name price");
  }

  const products = getProducts();

  const newProduct = {
    id: Date.now(),
    name,
    price: Number(price),
  };

  products.push(newProduct);
  saveProducts(products);

  console.log("Product added:", newProduct);
};

// LIST
const listProducts = () => {
  const products = getProducts();

  if (products.length === 0) {
    return console.log("No products found");
  }

  console.log("Products:");
  products.forEach(p => {
    console.log(`ID: ${p.id} | Name: ${p.name} | Price: ${p.price}`);
  });
};

// DELETE
const deleteProduct = (args) => {
  const [id] = args;

  if (!id) {
    return console.log("COMMAND: node index.js delete id");
  }

  const products = getProducts();

  const newProducts = products.filter(p => p.id !== Number(id));

  if (products.length === newProducts.length) {
    return console.log("Product not found");
  }

  saveProducts(newProducts);

  console.log("Product deleted");
};

// UPDATE
const updateProduct = (args) => {
  const [id, ...rest] = args;

  if (!id) {
    return console.log("COMMAND: node index.js update id [--name value] [--price value]");
  }

  const products = getProducts();

  const index = products.findIndex(p => p.id === Number(id));

  if (index === -1) {
    return console.log("Product not found");
  }

  const name = getKey("--name", rest);
  const price = getKey("--price", rest);

  // keys
  if (name !== null) {
    products[index].name = name;
  }

  if (price !== null) {
    products[index].price = Number(price);
  }

  // simple update
  if (name === null && price === null && rest.length > 0) {
    products[index].name = rest[0];
  }

  saveProducts(products);

  console.log("Updated:", products[index]);
};


// switch case on COMMAND
switch (command) {
  case "add":
    addProduct(args);
    break;

  case "list":
    listProducts();
    break;

  case "delete":
    deleteProduct(args);
    break;

  case "update":
    updateProduct(args);
    break;

  default:
    console.log("Wrong Command");
}