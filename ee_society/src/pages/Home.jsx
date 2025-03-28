import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import "./home.css";

function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_URL2;
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div
      className="home-main-container"
      onClick={() => {
        if (dropdownOpen) setDropdownOpen(false);
      }}
    >
      <Navbar dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
      <div className="home-container">
        <header className="hero-section">
          <div className="logo-container">
            <img src={PF + "/logo.jpg"} className="logo" alt="Society Logo" />
          </div>
          <h1 className="hero-title">
            <span className="gradient-text">Electrical Engineering</span>
            <span className="gradient-text">Society</span>
          </h1>
        </header>

        <main className="content-container">
          <section className="content-section intro-section">
            <h2 className="section-title">Empowering Innovation</h2>
            <p className="section-text">
              Welcome to the Electrical Engineering Society, a vibrant community
              where passion meets technology. Join us in shaping the future of
              electrical engineering through collaboration, innovation, and
              hands-on learning.
            </p>
          </section>

          <div className="grid-layout">
            <section className="content-section vision-section">
              <div className="section-header">
                <div className="decorative-line"></div>
                <h2 className="section-title">Our Vision</h2>
              </div>
              <p className="section-text">
                To create a nexus of technical excellence where students
                transform into industry-ready professionals through
                cutting-edge projects and collaborative innovation.
              </p>
            </section>

            <section className="content-section offer-section">
              <div className="section-header">
                <div className="decorative-line"></div>
                <h2 className="section-title">What We Offer</h2>
              </div>
              <ul>
                <li>
                  <strong>Competitions & Hackathons:</strong> Exciting events to challenge and showcase your skills.
                </li>
                <li>
                  <strong>Workshops & Training:</strong> Hands-on sessions to build practical, industry-relevant expertise.
                </li>
                <li>
                  <strong>Expert Talks:</strong> Insightful sessions with alumni and professionals to guide your career.
                </li>
                <li>
                  <strong>Research & Innovation:</strong> Opportunities to collaborate on cutting-edge projects.
                </li>
                <li>
                  <strong>Networking:</strong> Connect with peers and mentors in the field.
                </li>
              </ul>
            </section>
          </div>

          <section className="cta-section">
            <h2 className="cta-title">Ready to Innovate?</h2>
            <button
              className="cta-button"
              onClick={() =>
                window.open("https://forms.gle/oNqwPpXqZcA5iGvd8", "_blank")
              }
            >
              Join Our Society Today
              <span className="button-arrow">→</span>
            </button>
          </section>
        </main>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Home;
