import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  category: { type: String },
  image: { type: String },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // This links the product to a user document
  },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
