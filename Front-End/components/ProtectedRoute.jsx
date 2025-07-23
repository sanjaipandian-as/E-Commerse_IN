import { Navigate } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user } = useAuth();

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Role not allowed
    return <Navigate to="/" replace />;
  }

  // Allowed
  return children;
}