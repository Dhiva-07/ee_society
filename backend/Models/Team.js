const { string, required, boolean } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  level : {
    type : Number,
  }
});

const TeamModel = mongoose.model("teams", TeamSchema);
module.exports = TeamModel;
