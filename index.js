import express from "express";
import cors from "cors";
import products from "./router/products.js";

const app = express();

app.use(cors());
app.use("/products", products);

const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.write(`<h1><a href="/products">Shopping API</a></h1>`);
  res.write(`
    <ul>
      <li>Ürünler - /products</li>
      <li>Ürün - /products/:id</li>
      <li>Category - /products/category/:category</li>
      <li>Search - /products/search/:search</li>
    </ul>
  `);
});

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
