import React from "react";
import "./eventcard.css"; 

const EventCard = ({ event, PF }) => {
  return (
    <div key={event._id} className="event-card">
      <img className="event_img" src={PF + event.img} alt={event.title} />
      <div className="event-info">
        <h3>Name : {event.title}</h3>
        <p>Desc : {event.desc}</p>
        <p>
          Event Date: {new Date(event.date).toLocaleString()}
        </p>
        <p>Venue : {event.location}</p>
      </div>
    </div>
  );
};

export default EventCard;
