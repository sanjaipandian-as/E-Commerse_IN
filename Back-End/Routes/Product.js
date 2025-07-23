const express = require("express");
const E_COM = express.Router();
const Product = require("../Models/Product");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");



E_COM.post("/POST", protect, authorizeRoles('admin', 'seller'), async (req, res) => {
  try {
    const { name, description, price, image, stock, category } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      image,
      stock,
      category,
      ownerId: req.user._id 
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", newProduct });

  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
});


E_COM.get("/Get", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

E_COM.get("/Get/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

E_COM.put("/Update/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.user.role !== 'admin' && !product.ownerId.equals(req.user._id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { name, description, price, image, stock, category } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image, stock, category },
      { new: true }
    );

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});



E_COM.delete("/Delete/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.user.role !== 'admin' && !product.ownerId.equals(req.user._id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

module.exports = E_COM;
