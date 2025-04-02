const ensureAuthenticated = require("../Middlewares/ViewValidation.js");
const ensureValid = require("../Middlewares/EventAddValidation.js");
const { getEvents, deleteEvent } = require("../Controllers/EventController.js");
const EventModel = require("../Models/Event");
const multer = require("multer");
const router = require("express").Router();
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + "/../files");
  },
  filename: function (req, file, callback) {
    const filename = `/event_${file.originalname}`; 
    callback(null, filename);
  },
});
const upload = multer({
  storage: storage,
  //   limits: {
  //     fileSize: 1048576, // Defined in bytes (1 Mb)
  //   },
});
router.get("/", ensureAuthenticated, getEvents);
router.post("/add", ensureValid, upload.any(), async function (req, res) {
  try {
    // console.log("Received body:", req.body); 
    // console.log("Received file:", req.files); 

    const { title, desc, date , location } = req.body;
    const img = req.files[0] ? req.files[0].filename : null; 
    if (!title || !desc || !date) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and date are required",
      });
    }

    const newEvent = new EventModel({ title, desc, img, date , location});
    await newEvent.save();

    res.status(201).json({
      success: true,
      message: "Event added successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error("Error adding event:", error); 
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
router.delete("/delete/:id", ensureValid, deleteEvent);

module.exports = router;
