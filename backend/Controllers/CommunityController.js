const Suggestion = require("../Models/Suggestion");

const submitSuggestion = async (req, res) => {
  try {
    const { name, email, suggestion } = req.body;

    if (!name || !email || !suggestion) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newSuggestion = new Suggestion({ name, email, suggestion });
    await newSuggestion.save();

    res.status(201).json({ success: true, message: "Suggestion submitted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getSuggestions = async (req, res) => {
  try {
    const suggestions = await Suggestion.find().sort({ createdAt: -1 }); 
    res.status(200).json({ success: true, data: suggestions });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { submitSuggestion, getSuggestions };
