import React, { useEffect, useState } from "react";
import { handleError } from "../utils";
import Navbar from "./Navbar";
import "./event.css";

function Event() {
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
    }, 1); 
  
    return () => clearInterval(interval); 
  }, [events]);


  const categorizeEvents = (events) => {
    const currentTime = new Date();
    const upcomingEvents = events.filter(
      (event) => new Date(event.date) > currentTime
    );
    const pastEvents = events.filter(
      (event) => new Date(event.date) <= currentTime
    ).reverse();
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
                <div key={event._id} className="event-card">
                  <img src={event.img} alt={event.title} />
                  <div className="event-info">
                    <h3>{event.title}</h3>
                    <p>{event.desc}</p>
                    <p className="event-date">
                      Event Date: {new Date(event.date).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="event-section">
            <h2 className="event-title">Past Events</h2>
            <div className="test">
              {past.map((event) => (
                <div key={event._id} className="event-card">
                  <img src={event.img} alt={event.title} />
                  <div className="event-info">
                    <h3>{event.title}</h3>
                    <p>{event.desc}</p>
                    <p className="event-date">
                      Event Date: {new Date(event.date).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Event;
