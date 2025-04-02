import React, { useEffect, useState } from "react";
import { handleError } from "../utils";
import Navbar from "./Navbar";
import "./admin.css";
import EventCard from "./EventCard";
function Admin() {
  const [eventData, setEventData] = useState({
    title: "",
    desc: "",
    date: "",
    location: "",
    img: null,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showPast, setShowPast] = useState(false);
  const recentSuggestions = suggestions?.slice(0, 3) || [];
  const pastSuggestions = suggestions?.slice(3) || [];
  const PF = process.env.REACT_APP_PUBLIC_URL;

  useEffect(() => {
    fetchEvents();
  }, []);

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
    setUpcoming(upcomingEvents);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setEventData((prev) => ({ ...prev, img: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("desc", eventData.desc);
    formData.append("date", eventData.date);
    formData.append("img", eventData.img);
    formData.append("location", eventData.location);

    try {
      const response = await fetch("http://localhost:8080/events/add", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add event");
      }
      fetchEvents();
      setEventData({ title: "", desc: "", date: "", img: null, location: "" });
      window.location.reload();
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const response = await fetch("http://localhost:8080/community", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      const result = await response.json();
      setSuggestions(result.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };
  return (
    <div
      onClick={() => {
        if (dropdownOpen) setDropdownOpen(false);
      }}
      className="wrapper"
    >
      <Navbar dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
      <h2 className="addevent">Add New Event </h2>
      <form onSubmit={handleSubmit} className="event-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="input-admin"
          value={eventData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="desc"
          placeholder="Description"
          className="textarea-admin"
          value={eventData.desc}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Venue"
          className="input-admin"
          value={eventData.location}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          className="input-admin"
          value={eventData.date}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          className="input-admin-img"
          onChange={handleFileChange}
          required
        />
        <button className="addbtn" type="submit">
          Add Event
        </button>
      </form>
      <div className="event-section">
        <h2 className="event-title">Upcoming Events</h2>
        <div className="test">
          {upcoming.map((event) => (
            <EventCard key={event._id} event={event} PF={PF} onAdmin={1} />
          ))}
        </div>
      </div>
      <div className="suggestioncontainer">
        <h2 className="addevent">Suggestions </h2>
        <div className="resug">
          <h2>Recent Suggestions : </h2>
          <div className="suggestion-list">
            {recentSuggestions.map((s) => (
              <div key={s._id} className="suggestion-card">
                <p className="suggestion-name">
                  <strong>Name</strong> : {s.name}
                </p>
                <p className="suggestion-email">
                  <strong>Email</strong> : {s.email}
                </p>
                <p className="suggestion-desc">
                  <strong>Suggestion</strong> : {s.suggestion}
                </p>
                <small>
                  Created At : {new Date(s.createdAt).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => {
            setShowPast(!showPast);
          }}
          className="showpast"
        >
          {showPast ? "Hide Past Suggestions" : "Show Past Suggestions"}
        </button>
        {showPast && (
          <div className="resug">
            <h2>Past Suggestions : </h2>
            <div className="suggestion-list">
              {pastSuggestions.map((s) => (
                <div key={s._id} className="suggestion-card">
                  <p className="suggestion-name">
                    <strong>Name </strong> : {s.name}
                  </p>
                  <p className="suggestion-desc">
                    <strong>Suggestion</strong> : {s.suggestion}
                  </p>
                  <small>
                    Created At : {new Date(s.createdAt).toLocaleString()}
                  </small>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
