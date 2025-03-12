import React, { useEffect, useState } from "react";
import { handleError } from "../utils";
function Event() {
  const [events, setEvents] = useState([]);
  const fetchEvents = async () => {
    try {
      const url = "http://localhost:8080/events";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      // console.log(result);
      setEvents(result.events);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div>
      {events &&
        events.map((item, index) => (
          <ul key={index}>
            <img src = {item.img} />
            <span>
              {item.title} : {item.desc}
            </span>
          </ul>
        ))}
    </div>
  );
}

export default Event;
