import React, { useState } from "react";
import Navbar from "./Navbar";
import { handleError, handleSuccess } from "../utils";
import "./community.css";

function Community() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const name = localStorage.getItem("loggedInUser");
  const email = localStorage.getItem("email");

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
      <h1 className="Ctitle">Join Our Community</h1>
      <div className="container">
        <div className="introwrap">
          <div className="intro">
            <h2 className="introhead">Be a Part of Something Bigger</h2>
            <p className="introtext">
              The Electrical Society is more than just an organization—it is a
              thriving community of passionate individuals committed to pushing
              the boundaries of electrical engineering. Our society is built on
              the foundation of collaboration, creativity, and continuous
              growth. We believe that every student has something valuable to
              contribute, whether it's a fresh perspective, an innovative idea,
              or simply a curiosity to learn and explore. By joining our
              community, you become part of a movement that aims to create
              impactful projects, host meaningful discussions, and encourage
              knowledge-sharing among students across all academic years.
            </p>
          </div>
          <div className="intro">
            <h2 className="introhead">Your Views Shape the Future</h2>
            <p className="introtext">
              Every suggestion, every thought, and every perspective matters.
              The Community Page is designed to be an open platform where
              members can freely express their ideas, provide feedback, and help
              shape the direction of the society. Whether it's proposing a new
              workshop, suggesting a guest speaker, or discussing potential
              hackathons, your voice can influence the events and initiatives we
              undertake. We want this society to be built by the students, for
              the students, ensuring that everyone's input is valued and
              utilized in ways that contribute to our collective growth.
            </p>
          </div>
          <div className="intro">
            <h2 className="introhead">Together, We Build and Expand</h2>
            <p className="introtext">
              The success of our society depends on active participation and a
              willingness to share insights. As we continue to organize
              technical workshops, coding competitions, and industry talks, your
              engagement will help us refine and improve these experiences. The
              more students who participate in discussions, the more we can
              tailor our initiatives to fit the needs and interests of the
              community. With your involvement, we can expand our reach, develop
              stronger programs, and create opportunities that benefit everyone.
            </p>
          </div>
          <div className="intro">
            <h2 className="introhead">Share, Collaborate, and Innovate</h2>
            <p className="introtext">
              This is your chance to make an impact! Engage in meaningful
              conversations, share your innovative ideas, and collaborate with
              like-minded peers. Your contributions today can lead to
              groundbreaking projects tomorrow. Whether you're looking to
              enhance your skills, connect with industry experts, or simply be
              part of an inspiring community, the Electrical Society is here to
              support you. Let's work together to build a society that not only
              excels in academics but also drives real-world innovation.
            </p>
          </div>
        </div>
        <div className="community-container">
          <h1>Community Suggestions</h1>
          <form onSubmit={handleSubmit}>
            <textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="Enter your suggestion..."
              className="text"
            ></textarea>
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Community;
