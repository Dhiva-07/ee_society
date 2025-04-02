import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import { handleError, handleSuccess } from "../utils";
import "./community.css";
import AuthContext from "../context/AuthContext";

function Community() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const { user } = useContext(AuthContext);
  const name = user.name;
  const email = user.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!suggestion.trim()) {
      handleError("Suggestion cannot be empty!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/community", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ name, email, suggestion }),
      });

      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message);
        setSuggestion("");
      } else {
        handleError(result.message);
      }
    } catch (err) {
      handleError("Something went wrong");
    }
  };

  return (
    <div
      className="communitywrap"
      onClick={() => {
        if (dropdownOpen) setDropdownOpen(false);
      }}
    >
      <Navbar dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />

      <h1 className="Ctitle">Join Our Community !!</h1>

      <div className="container">
        {/* LEFT COLUMN */}
        <div className="introwrap">
          <div className="intro">
            <h2 className="introhead">Be a Part of Something Extraordinary</h2>
            <p className="introtext">
              The Electrical Society isn’t just an organization—it’s a vibrant hub
              of creativity, innovation, and collaboration. Here, every idea matters
              and every voice is heard. Step into a community where your passion
              for electrical engineering ignites groundbreaking projects and
              inspires real change.
            </p>
          </div>

          <div className="intro">
            <h2 className="introhead">Your Ideas, Our Future</h2>
            <p className="introtext">
              Whether you’re suggesting new workshops, brainstorming future
              hackathons, or simply sharing insights, your contributions shape the
              direction of our society. We’re building a platform that’s by the
              students, for the students—where creativity drives progress.
            </p>
          </div>

          <div className="intro">
            <h2 className="introhead">Collaborate, Innovate, Elevate</h2>
            <p className="introtext">
              Engage in thought-provoking discussions, share your innovative ideas,
              and collaborate with like-minded peers. Together, we’re paving the way
              for academic excellence and real-world impact.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="right-column">
          <div className="community-container">
            <h1>Community Suggestions</h1>
            <form onSubmit={handleSubmit} className="suggestion-form">
              <textarea
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder="Share your suggestion..."
                className="text"
              ></textarea>
              <button className="submit-btn" type="submit">
                Submit Suggestion
              </button>
            </form>
          </div>

          <div className="illustration-space">
            <img
              src="https://cdn-icons-png.flaticon.com/512/9746/9746766.png"
              alt="Community Illustration"
              className="illustration-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
