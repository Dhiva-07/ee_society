const EventModel = require("../Models/Team");

const getTeam = async (req, res) => {
  try {
    const team = await EventModel.find().sort({ level : 1 }); 
    res.status(200).json({ success: true, team });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { getTeam };