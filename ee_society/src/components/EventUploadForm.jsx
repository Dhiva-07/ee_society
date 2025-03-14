import React, { useState } from "react";

function EventUploadForm({ onEventAdded }) {
  const [eventData, setEventData] = useState({
    title: "",
    desc: "",
    date: "",
    img: null,
  });

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
    console.log("EVENT DATA WHILE APPENDING " , eventData);
    formData.append("title", eventData.title);
    formData.append("desc", eventData.desc);
    formData.append("date", eventData.date);
    formData.append("img", eventData.img); 
    
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
      onEventAdded(); 
      setEventData({ title: "", desc: "", date: "", img: null });
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <input type="text" name="title" placeholder="Title" value={eventData.title} onChange={handleChange} required />
      <textarea name="desc" placeholder="Description" value={eventData.desc} onChange={handleChange} required />
      <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
      <input type="file" accept="image/*" onChange={handleFileChange} required />
      <button type="submit">Add Event</button>
    </form>
  );
}

export default EventUploadForm;
