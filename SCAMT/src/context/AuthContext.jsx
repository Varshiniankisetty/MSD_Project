import React, { createContext, useContext, useState, useEffect } from "react";

// You can change this later to your real backend URL
const API_URL = "https://msd-project-backend.onrender.com";

// Create the Auth Context
const AuthContext = createContext();

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Default demo profile (John)
  const defaultUser = {
    name: "John Doe",
    email: "john@example.com",
    role: "resident",
    community: "Sunshine Apartments",
    phone: "9876543210"
  };

  useEffect(() => {
    // Check if user data already in localStorage
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    } else {
      // ✅ Auto-login John by default
      localStorage.setItem("authToken", "demo_token_12345");
      localStorage.setItem("userData", JSON.stringify(defaultUser));
      setIsAuthenticated(true);
      setUser(defaultUser);
    }

    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
