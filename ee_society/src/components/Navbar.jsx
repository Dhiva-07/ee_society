import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar({ dropdownOpen, setDropdownOpen }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_URL2;
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("email");
    handleSuccess("User Logged Out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <a
            href="https://www.iitism.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={PF + "/logo2.png"} alt="Logo" />
          </a>
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <div
          className="menu-icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <ul className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/community">Community</Link>
          </li>
          {isAdmin && (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          )}
        </ul>

        <div className="profile-container">
          <img
            src="/logo192.png"
            alt="Profile"
            className="profile-icon"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item">
                Profile
              </Link>
              <Link className="dropdown-item" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          )}
        </div>
      </nav>
      <ToastContainer />
    </>
  );
}

export default Navbar;
