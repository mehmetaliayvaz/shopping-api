const express = require("express");
const products = require("./products.js");

var cors = require('cors');

const server = express();

const port = process.env.PORT || 5001;

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
  const product = products.filter(product => product.category == category);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
})

server.get("/products/search/:search", cors(), (req, res) => {
  const { search } = req.params;
  const product = products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase()) || product.category.toLowerCase().includes(search.toLowerCase()) || product.id.toString().includes(search));
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});