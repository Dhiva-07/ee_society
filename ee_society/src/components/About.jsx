import React, { useEffect, useState } from "react";
import { handleError } from "../utils";

function About() {
  const [team, setTeam] = useState([]);
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
        console.log(result);
        setTeam(result.team);
      } catch (err) {
        handleError(err);
      }
    };
      useEffect(() => {
        fetchTeam();
      }, []);
  return (
    <div>
      <h1>Team : </h1>
      {team.map((mem) => (
        <div key={mem._id}>
          <h3>{mem.name}</h3>
          <p>{mem.role}</p>
          <img src={mem.img} width="200" />
        </div>
      ))}
    </div>
  )
}

export default About
