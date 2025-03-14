const EventModel = require("../Models/Event");
const getEvents = async (req, res) => {
  try {
    const events = await EventModel.find().sort({ date: 1 });
    res.status(200).json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await EventModel.findById(id);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    await EventModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { getEvents, deleteEvent };
