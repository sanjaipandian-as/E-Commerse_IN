import { useContext, createContext, useState, useEffect } from "react";

// Create context
const AuthContext = createContext();

// Hook to use in your components
export const useAuth = () => useContext(AuthContext);

// Provider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // holds { name, email, role }
  const [token, setToken] = useState(null);

  // Load from localStorage when app loads
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
