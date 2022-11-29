const express = require("express");
const products = require("./products.js");

var cors = require('cors');

const app = express();

app.use(cors());

const port = process.env.PORT || 5001;

app.get('/', (req, res) => {
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.write(`<h1><a href="/products">Shopping API</a></h1>`);
  res.write(`
    <ul>
      <li>Ürünler - /products</li>
      <li>Ürün - /products/:id</li>
      <li>Category - /products/category/:category</li>
      <li>Search - /products/search/:search</li>
    </ul>
  `)
});

app.get("/products", (req, res) => {
  res.status(200).json(products);
})

app.get("/products/:id", (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find(product => product.id === parseInt(id));
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(403).json({ message: error.message })
  }
})

app.get("/products/category/:category", (req, res) => {
  const { category } = req.params;
  const product = products.filter(product => product.category == category);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
})

app.get("/products/search/:search", (req, res) => {
  const { search } = req.params;
  const product = products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase()) || product.category.toLowerCase().includes(search.toLowerCase()) || product.id.toString().includes(search));
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
})

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});