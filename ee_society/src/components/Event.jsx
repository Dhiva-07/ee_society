import React, { useEffect, useState } from "react";
import { handleError } from "../utils";
function Event() {
  const [events, setEvents] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
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
    if (events.length > 0) {
      categorizeEvents(events);
    }
  }, [events]);

  const categorizeEvents = (events) => {
    const currentTime = new Date();
    console.log("Current Time:", currentTime);
    events.forEach((event) => {
      console.log("Event Date (Raw):", event.date);
      console.log("Event Date (Parsed):", new Date(event.date));
    });
    const upcomingEvents = events.filter(
      (event) => new Date(event.date) > currentTime
    );
    const pastEvents = events.filter(
      (event) => new Date(event.date) <= currentTime
    );
    console.log(upcomingEvents);
    console.log(pastEvents);
    console.log(events);
    setUpcoming(upcomingEvents);
    setPast(pastEvents);
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div>
      <h2>Upcoming Events</h2>
      {upcoming.map((event) => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.desc}</p>
          <img src={event.img} alt={event.title} width="200" />
          <p>
            Starts in:{" "}
            {Math.floor(
              (new Date(event.date) - new Date()) / (1000 * 60 * 60 * 24)
            )}{" "}
            days
          </p>
        </div>
      ))}

      <h2>Past Events</h2>
      {past.map((event) => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.desc}</p>
          <img src={event.img} alt={event.title} width="200" />
          <p>Event Date: {new Date(event.date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default Event;
