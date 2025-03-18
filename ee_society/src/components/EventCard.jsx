import React from "react";
import "./eventcard.css";

const EventCard = ({ event, PF, onAdmin }) => {
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
        window.location.reload();
        if (!response.ok) {
          throw new Error("Failed to delete event");
        }
      } catch (err) {
        console.error("Error deleting event:", err);
      }
    }
  };

  return (
    <div key={event._id} className="event-card">
      <img className="event_img" src={PF + event.img} alt={event.title} />
      <div className="event-info">
        <h3>Name : {event.title}</h3>
        <p>Desc : {event.desc}</p>
        <p>Event Date: {new Date(event.date).toLocaleString()}</p>
        {new Date() <= new Date(event.date) && <p>Venue : {event.location}</p>}
        {onAdmin && (
          <button
            onClick={() => handleDelete(event._id)}
            className="delete-btn"
          >
            Delete Event
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
