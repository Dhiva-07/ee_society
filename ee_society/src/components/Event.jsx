import React, { useEffect, useState } from "react";
import { handleError } from "../utils";
import Navbar from "./Navbar";
import EventCard from "./EventCard";
import "./event.css";

function Event() {
  const PF = process.env.REACT_APP_PUBLIC_URL;
  const [events, setEvents] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
      setEvents(result.events);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      categorizeEvents(events);
    }, 100);

    return () => clearInterval(interval);
  }, [events]);

  const categorizeEvents = (events) => {
    const currentTime = new Date();
    const upcomingEvents = events
      .filter((event) => new Date(event.date) > currentTime)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    const pastEvents = events
      .filter((event) => new Date(event.date) <= currentTime)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .reverse();
    setUpcoming(upcomingEvents);
    setPast(pastEvents);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <div
        onClick={() => {
          if (dropdownOpen) setDropdownOpen(false);
        }}
      >
        <Navbar dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
        <div className="event-container">
          <div className="event-section">
            <h2 className="event-title">Upcoming Events</h2>
            <div className="test">
              {upcoming.map((event) => (
                <EventCard key={event._id} event={event} PF={PF} />
              ))}
            </div>
          </div>
          <div className="event-section">
            <h2 className="event-title">Past Events</h2>
            <div className="test">
              {past.map((event) => (
                <EventCard key={event._id} event={event} PF={PF} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Event;
