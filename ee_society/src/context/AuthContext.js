import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  // Fetch user details from API
  const fetchUser = async (token) => {
    try {
      const res = await axios.get("http://localhost:8080/user/fetch", {
        headers: { Authorization: token },
      });
      setIsAuthenticated(true);
      setUser(res.data.user);
    } catch (err) {
      console.error("Error fetching user:", err);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle login
  const login = async (token) => {
    localStorage.setItem("token", token);
    await fetchUser(token); // Fetch user details
  };

  // Handle logout
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  // Check authentication on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
