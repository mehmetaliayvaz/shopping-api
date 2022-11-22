const express = require("express");
const products = require("./products.js")

const server = express();

const port = process.env.PORT || 5000;

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get("/products", (req, res) => {
  res.status(200).json(products);
})

server.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find(product => product.id === parseInt(id));
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
})


server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});