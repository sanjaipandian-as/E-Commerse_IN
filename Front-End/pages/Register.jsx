import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/users/Post", form);
      alert("Registered! Please login.");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" className="block w-full mb-4 p-2 border" />
      <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" className="block w-full mb-4 p-2 border" />
      <input value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} type="password" placeholder="Password" className="block w-full mb-4 p-2 border" />
      <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="block w-full mb-4 p-2 border">
        <option value="customer">Customer</option>
        <option value="seller">Seller</option>
      </select>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
}
