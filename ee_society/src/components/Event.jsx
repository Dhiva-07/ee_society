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
  const [timeLeft, setTimeLeft] = useState(null);

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
    fetchEvents();
  }, []);

  // Re-categorize events periodically in case the date changes in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      categorizeEvents(events);
    }, 100);
    return () => clearInterval(interval);
  }, [events]);

  const categorizeEvents = (eventsList) => {
    const currentTime = new Date();
    const upcomingEvents = eventsList
      .filter((event) => new Date(event.date) > currentTime)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const pastEvents = eventsList
      .filter((event) => new Date(event.date) <= currentTime)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .reverse();

    setUpcoming(upcomingEvents);
    setPast(pastEvents);

    // Set up countdown timer for the next event
    if (upcomingEvents.length > 0) {
      const eventDate = new Date(upcomingEvents[0].date);
      const now = new Date();
      const difference = eventDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }
  };

  return (
    <div
      onClick={() => {
        if (dropdownOpen) setDropdownOpen(false);
      }}
    >
      <Navbar dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />

      <div className="event-page-container">
        {/* Hero Section */}
        <section className="hero-section-event">
          {upcoming.length === 0 ? (
            <div className="coming-soon">
              <h1>Coming Soon</h1>
              <p>Stay tuned for our next event!</p>
            </div>
          ) : (
            <div className="event-hero">
                <div className="countdown">
                  {timeLeft && (
                    <div className="timer">
                      <div>{timeLeft.days}d</div>
                      <div>{timeLeft.hours}h</div>
                      <div>{timeLeft.minutes}m</div>
                      <div>{timeLeft.seconds}s</div>
                    </div>
                  )}
                </div>
              <img src={PF + upcoming[0].img} alt={upcoming[0].title} className="hero-img" />
              <div className="hero-content">
                <h1>{upcoming[0].title}</h1>
                <p>{upcoming[0].desc}</p>
              </div>
            </div>
          )}
        </section>
        <section className="event-section">
          <h2 className="admin-title">Past Events</h2>
          {past.length === 0 ? (
            <p className="no-event-text">No past events available.</p>
          ) : (
            <div className="event-list">
              {past.map((event) => (
                <EventCard key={event._id} event={event} PF={PF} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Event;
