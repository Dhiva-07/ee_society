import React, { useEffect, useState } from "react";
import { handleError } from "../utils";
import Navbar from "./Navbar";
import "./about.css";

function About() {
  const [team, setTeam] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const topLevel = team.filter((mem) => mem.level >= 1 && mem.level <= 3);
  const midLevel = team.filter((mem) => mem.level >= 4 && mem.level <= 9);
  const bottomLevel = team.filter((mem) => mem.level >= 10);
  const PF = process.env.REACT_APP_PUBLIC_URL2;

  const fetchTeam = async () => {
    try {
      const url = "http://localhost:8080/team";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setTeam(result.team);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const MemberCard = ({ member }) => (
    <div className="member-card">
      <img src={PF + member.img} alt={member.name} className="member-img" />
      <h3 className="member-name">{member.name}</h3>
      <p className="member-role">{member.role}</p>
    </div>
  );

  return (
    <div
      onClick={() => {
        if (dropdownOpen) setDropdownOpen(false);
      }}
    >
      <Navbar dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
      <div className="team-container">
        {topLevel.length > 0 && (
          <>
            <h2 className="team-section-title">Top Leadership</h2>
            <div className="team-grid">
              {topLevel.map((mem) => (
                <MemberCard key={mem._id} member={mem} />
              ))}
            </div>
          </>
        )}

        {midLevel.length > 0 && (
          <>
            <h2 className="team-section-title">Executive Team</h2>
            <div className="team-grid">
              {midLevel.map((mem) => (
                <MemberCard key={mem._id} member={mem} />
              ))}
            </div>
          </>
        )}

        {bottomLevel.length > 0 && (
          <>
            <h2 className="team-section-title">Core Team</h2>
            <div className="team-grid">
              {bottomLevel.map((mem) => (
                <MemberCard key={mem._id} member={mem} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default About;
