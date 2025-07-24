import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // ✅ now this works
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // ✅ now this works
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/users/Login", {
        email,
        password,
      });

      login(res.data.token, res.data.user);

      navigate("/");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="block w-full mb-4 p-2 border"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="block w-full mb-4 p-2 border"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </form>
  );
}
