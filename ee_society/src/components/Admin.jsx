import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import EventUploadForm from "../components/EventUploadForm";
import { handleError } from "../utils";
import Navbar from "./Navbar";
import "./admin.css";
function Admin() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [events, setEvents] = useState([]);

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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const url = `http://localhost:8080/events/delete/${id}`;
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete event");
        }
      } catch (err) {
        console.error("Error deleting event:", err);
      }
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
      <div className="admin-panel">
        <h2>Admin Panel</h2>
        <EventUploadForm onEventAdded={fetchEvents} />
        <div className="event-list">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onDelete={handleDelete}
              isAdmin={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
