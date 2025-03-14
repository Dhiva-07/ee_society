import React from "react";

function EventCard({ event, onDelete, isAdmin }) {
  return (
    <div className="event-card">
      <img src={event.img} alt={event.title} />
      <h3>{event.title}</h3>
      <p>{event.desc}</p>
      <p>{new Date(event.date).toDateString()}</p>
      <button onClick={() => onDelete(event._id)} className="delete-btn">
        ❌ Delete
      </button>
    </div>
  );
}

export default EventCard;
