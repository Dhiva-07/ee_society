const { string, required, boolean } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
});

const EventModel = mongoose.model("events", EventSchema);
module.exports = EventModel;
