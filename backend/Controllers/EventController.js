const EventModel = require("../Models/Event");

const getEvents = async (req, res) => {
  try {
    const events = await EventModel.find().sort({ date : 1 }); 
    res.status(200).json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { getEvents };