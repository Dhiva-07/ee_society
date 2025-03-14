import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (token, name, isAdmin , email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("loggedInUser", name);
    localStorage.setItem("isAdmin", isAdmin);
    localStorage.setItem("email", email);
    
    setIsAuthenticated(true);
    setUser({ name, isAdmin });
  };


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("email");
    
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setUser({
        name: localStorage.getItem("loggedInUser"),
        isAdmin: localStorage.getItem("isAdmin") === "true",
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user , isLoading , login , logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
