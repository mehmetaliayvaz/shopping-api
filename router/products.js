import express from "express";
import products from "../products.js";

const router = express.Router();

router.get("/", (req, res) => {
  if (req.query.page) {
    const page = req.query.page;
    const limit = 7;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = products.slice(startIndex, endIndex);
    res.status(200).json(results);
  } else {
    res.status(200).json(products);
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find((product) => product.id === parseInt(id));
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});

router.get("/category/:category", (req, res) => {
  const { category } = req.params;
  const product = products.filter((product) => product.category == category);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.get("/search/:search", (req, res) => {
  const { search } = req.params;
  const product = products.filter(
    (product) =>
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()) ||
      product.id.toString().includes(search)
  );
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

export default router;
