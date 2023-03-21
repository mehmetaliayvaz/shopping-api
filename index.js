import express from "express";
import cors from "cors";
import products from "./router/products.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use("/products", products);

const port = process.env.PORT || 5001;

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.write(`<h1><a href="/products">Shopping API</a></h1>`);
  res.write(`
    <ul>
      <li>Products - /products</li>
      <li>Product - /products/:id</li>
      <li>Category - /products/category/:category</li>
      <li>Search - /products/search/:search</li>
    </ul>
  `);
});

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
