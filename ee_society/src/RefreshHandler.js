import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setIsAuthenticated((prev) => {
        if (!prev) return true;
        return prev;
      });

      if (["/", "/login", "/signup"].includes(location.pathname)) {
        navigate("/home", { replace: true });
      }
    }
  }, [token, location.pathname, navigate]);

  return null;
}

export default RefreshHandler;
