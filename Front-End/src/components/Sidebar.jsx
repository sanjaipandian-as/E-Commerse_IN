import { NavLink, useLocation } from "react-router-dom";
import { User, ShoppingCart, LogIn, LayoutDashboard } from "lucide-react"; 
// install: npm i lucide-react

export default function Sidebar() {
  const location = useLocation();

  const linkBase =
    "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition";
  const inactive =
    "text-gray-600 hover:text-gray-900 hover:bg-gray-100";
  const active =
    "text-gray-900 bg-gray-100 border border-gray-200";

  const isActive = (to) => location.pathname === to;

  return (
    <aside className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 h-fit sticky top-6">
      <div className="flex items-center gap-3 p-3 mb-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
        <div className="h-10 w-10 rounded-full bg-gray-200 grid place-items-center">
          <User className="h-5 w-5" />
        </div>
        <div>
          <p className="text-base font-semibold text-gray-900">User</p>
          <p className="text-sm text-gray-500">user@example.com</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        <NavLink
          to="/account"
          className={`${linkBase} ${isActive("/account") ? active : inactive}`}
          end
        >
          <User className="h-4 w-4" />
          Profile
        </NavLink>

        <NavLink
          to="/account/cart"
          className={`${linkBase} ${isActive("/account/cart") ? active : inactive}`}
        >
          <ShoppingCart className="h-4 w-4" />
          Cart
        </NavLink>

        <NavLink
          to="/seller-login"
          className={`${linkBase} ${isActive("/seller-login") ? active : inactive}`}
        >
          <LogIn className="h-4 w-4" />
          Seller Login
        </NavLink>

        <NavLink
          to="/seller-dashboard"
          className={`${linkBase} ${isActive("/seller-dashboard") ? active : inactive}`}
        >
          <LayoutDashboard className="h-4 w-4" />
          Seller Dashboard
        </NavLink>
      </nav>
    </aside>
  );
}
