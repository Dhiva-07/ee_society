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
    <>
      <Navbar dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
      <h1 className="Ctitle">Community</h1>
      <div
        onClick={() => {
          if (dropdownOpen) setDropdownOpen(false);
        }}
        className="container"
      >
        <div className="intro">
          <p className="intro-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae
            dolor ipsam excepturi maxime voluptas eius tempora voluptatibus
            dignissimos soluta. In omnis atque ea distinctio reprehenderit,
            error ipsum ad architecto perferendis reiciendis libero laudantium
            minima nostrum illo non tenetur enim, possimus accusamus tempore
            aperiam totam dolores vitae numquam recusandae? Sint a itaque,
            perferendis laboriosam corporis rerum velit excepturi quaerat?
            Laudantium repudiandae quasi adipisci voluptatem quae mollitia iusto
            ipsam qui molestiae tenetur quidem blanditiis, modi esse
            accusantium, voluptate cum distinctio laboriosam culpa dolore
            incidunt ipsa. Perspiciatis esse libero facilis dignissimos non
            dolore eveniet, ipsum necessitatibus neque explicabo! Eum provident
            aliquid maiores. Accusantium qui incidunt praesentium nostrum quae,
            architecto vitae minima adipisci quas, velit consectetur inventore
            perferendis, non dicta! Esse vero quo consequatur dolorem laboriosam
            eaque illum consequuntur atque iste sed. Tempora odio quam natus,
            temporibus et saepe non iste ipsa, ducimus voluptatibus blanditiis
            expedita exercitationem optio esse aliquid repellendus! Eum, iure
            magni eligendi consectetur nostrum sit ducimus velit praesentium.
            Facilis ad asperiores sint quas, eos quisquam, qui veritatis
            repellat necessitatibus perferendis sequi corrupti aut nihil
            voluptate deserunt? Ab quia culpa, mollitia inventore ex
            accusantium, velit voluptates itaque deserunt quae libero ipsa natus
            modi asperiores quaerat pariatur sed quasi debitis sit alias ratione
            voluptas. Aliquam laudantium id repellendus ut voluptatem nostrum
            possimus! Hic fugit, quas veniam nemo officiis molestiae ipsam,
            voluptas reiciendis aut enim rerum? Enim quisquam architecto,
            dolorum dolore maxime incidunt corrupti eius impedit repudiandae
            tempora possimus aliquam quis voluptates deleniti, facere debitis at
            odit nobis nemo beatae illo! Quaerat rem autem recusandae! Quasi
            reprehenderit rem quis quidem ad autem eligendi saepe. Quibusdam,
            quae! Veritatis fugit molestias veniam dolorem sapiente deleniti
            accusantium quo error nemo dolore qui reiciendis, eligendi alias
            dicta neque, nobis fugiat sequi et ab, totam maxime. Impedit sed hic
            possimus distinctio, quibusdam animi consectetur dolore fugiat esse.
            Quos fugiat laborum nemo soluta, commodi adipisci nesciunt porro
            sequi quod aspernatur perspiciatis, dignissimos, quae dolorem?
            Tempora iste minus dolore, pariatur quo iure! Maiores nam libero
            omnis quasi? Ab voluptates, eius, quae recusandae eos voluptatibus
            nesciunt ea temporibus corporis reprehenderit eveniet beatae porro
            laboriosam debitis enim alias. Alias, dicta? Aut reprehenderit fuga
            et eos molestiae atque, corrupti illum quis maiores at illo expedita
            facilis saepe asperiores, aliquid unde dolorum. Fugiat molestiae
            consequuntur corrupti suscipit! Delectus nesciunt possimus aut
            mollitia obcaecati. Ut temporibus est consequatur. Adipisci hic
            nobis ut possimus molestias id soluta optio nulla deleniti fuga,
            unde laudantium culpa esse commodi perspiciatitimus qmet ducimus animi!
          </p>
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
    </>
  );
}

export default Community;
