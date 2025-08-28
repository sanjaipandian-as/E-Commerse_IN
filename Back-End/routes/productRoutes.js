import express from "express";
import { body, validationResult } from "express-validator";
import Product from "../Models/Product.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/Multer.js";

const router = express.Router();

router.post(
  "/products",
  authMiddleware,
  upload.single("image"),
  body("name").notEmpty(),
  body("price").isFloat({ gt: 0 }),
  body("category").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const newProduct = new Product({
        ...req.body,
        seller: req.user.id,
        image: req.file ? req.file.filename : undefined,
      });
      const product = await newProduct.save();
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.put(
  "/products/:id",
  authMiddleware,
  body("name").optional().notEmpty(),
  body("price").optional().isFloat({ gt: 0 }),
  body("category").optional().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ error: "Product not found" });
      if (product.seller.toString() !== req.user.id) return res.status(403).json({ error: "Not authorized" });
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedProduct);
    } catch (err) {
      res.status(400).json({ error: "Invalid ID" });
    }
  }
);

router.delete("/products/:id", authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    if (product.seller.toString() !== req.user.id) return res.status(403).json({ error: "Not authorized" });
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

router.get("/products/my-products", authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

export default router;
