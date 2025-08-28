import React from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, ShoppingCart, Package, DollarSign, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Dummy Data
const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4780 },
  { month: "May", sales: 5890 },
  { month: "Jun", sales: 4390 },
];

const productData = [
  { name: "Electronics", value: 400 },
  { name: "Clothes", value: 300 },
  { name: "Shoes", value: 300 },
  { name: "Books", value: 200 },
];

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear session (adjust if you use JWT/auth tokens)
    localStorage.clear();
    sessionStorage.clear();

    // redirect to home page
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-gray-200">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e293b] p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-indigo-400 mb-8">Light Blue</h2>
        <nav className="flex flex-col gap-4 text-gray-300 flex-1">
          <a href="#" className="hover:text-indigo-400">Dashboard</a>
          <a href="#" className="hover:text-indigo-400">Analytics</a>
          <a href="#" className="hover:text-indigo-400">Products</a>
          <a href="#" className="hover:text-indigo-400">Orders</a>
          <a href="#" className="hover:text-indigo-400">Users</a>
        </nav>

        {/* Logout at bottom */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mt-auto"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#1e293b] px-4 py-2 rounded-lg text-gray-200 outline-none"
            />
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
              <span className="font-bold">A</span>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<Users />} title="Total Users" value="1,245" />
          <StatCard icon={<ShoppingCart />} title="Orders" value="320" />
          <StatCard icon={<Package />} title="Products" value="85" />
          <StatCard icon={<DollarSign />} title="Revenue" value="$12,450" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Line Chart */}
          <div className="bg-[#1e293b] rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ fill: "#6366f1" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Product Distribution Pie Chart */}
          <div className="bg-[#1e293b] rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Products Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {productData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}

// 📌 Stat Card Component
function StatCard({ icon, title, value }) {
  return (
    <div className="bg-[#1e293b] rounded-2xl shadow p-6 flex items-center gap-4 hover:shadow-lg hover:shadow-indigo-500/30 transition">
      <div className="p-3 bg-indigo-500/20 rounded-full text-indigo-400">
        {icon}
      </div>
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
