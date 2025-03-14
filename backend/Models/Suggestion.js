const mongoose = require("mongoose");

const SuggestionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    suggestion: { type: String, required: true },
  },
  { timestamps: true } 
);
const SuggestionModel = mongoose.model("suggestions", SuggestionSchema);
module.exports = SuggestionModel;