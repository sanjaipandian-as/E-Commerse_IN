import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded shadow p-4">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>₹{product.price}</p>
      <Link to={`/product/${product._id}`} className="text-blue-500">View</Link>
    </div>
  );
}
