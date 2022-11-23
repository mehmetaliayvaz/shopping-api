const express = require("express");
const products = require("./products.js");

var cors = require('cors');

const server = express();

const port = process.env.PORT || 5000;

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get("/products", cors(), (req, res) => {
  res.status(200).json(products);
})

server.get("/products/:id", cors(), (req, res) => {
  const { id } = req.params;
  const product = products.find(product => product.id === parseInt(id));
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
})

server.get("/products/category/:category", cors(), (req, res) => {
  const { category } = req.params;
  const product = products.find(product => product.category == category);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
})


server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});