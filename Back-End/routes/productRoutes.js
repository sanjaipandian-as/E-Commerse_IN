import express from "express";
import { body, validationResult } from "express-validator";
import Product from "../Models/Product.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Create a new product
// @route   POST /api/products
// @access  Private (Seller only)
router.post(
  "/",
  authMiddleware, // Only logged-in users can create products
  body("name").notEmpty().withMessage("Name is required"),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be a number greater than 0"),
  body("category").notEmpty().withMessage("Category is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Create a new product and link it to the authenticated user's ID
      const newProduct = new Product({
        ...req.body,
        seller: req.user.id, // <-- CRITICAL: Link the product to the seller
      });
      const product = await newProduct.save();
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (Owner only)
router.put(
  "/:id",
  authMiddleware,
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("price").optional().isFloat({ gt: 0 }).withMessage("Price must be a number greater than 0"),
  body("category").optional().notEmpty().withMessage("Category cannot be empty"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Check if the authenticated user is the product owner
      if (product.seller.toString() !== req.user.id) {
        return res.status(403).json({ error: "Not authorized to update this product" });
      }

      // Update the product
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedProduct);
    } catch (err) {
      res.status(400).json({ error: "Invalid ID" });
    }
  }
);

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Owner only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the authenticated user is the product owner
    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to delete this product" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// @desc    Get all products for the authenticated seller
// @route   GET /api/products/my-products
// @access  Private
router.get("/my-products", authMiddleware, async (req, res) => {
  try {
    // Find all products where the seller field matches the authenticated user's ID
    const products = await Product.find({ seller: req.user.id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Get all products (public)
// @route   GET /api/products
// @access  Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @desc    Get a single product by ID (public)
// @route   GET /api/products/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found Now" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

export default router;
