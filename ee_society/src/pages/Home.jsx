import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import "./home.css";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (!user) {
      navigate("/login");
    } else {
      setLoggedInUser(user);
    }
  }, [navigate]);

  return (
    <>
      <Navbar dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
      <div
        className="home-container"
        onClick={() => {
          if (dropdownOpen) setDropdownOpen(false);
        }}
      >
        <div className="content">
          <h1>Welcome, {loggedInUser}</h1>
          <p>Explore our community and stay updated with the latest events!</p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Home;
