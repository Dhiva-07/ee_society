import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Event from "./components/Event";
import Admin from "./components/Admin";
import About from "./components/About";
import Profile from "./pages/Profile";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import Community from "./components/Community";

function App() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/events" element={<Event />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/community" element={<Community />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
