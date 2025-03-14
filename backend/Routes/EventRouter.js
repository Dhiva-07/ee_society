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
    // You can write your own logic to define the filename here (before passing it into the callback), e.g:
    // console.log(file.originalname); // User-defined filename is available
    const filename = `event_${file.originalname}`; // Create custom filename (crypto.randomUUID available in Node 19.0.0+ only)
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
    console.log("Received body:", req.body); // Log request body
    console.log("Received file:", req.files); // Log uploaded file info

    const { title, desc, date } = req.body;
    const img = req.files[0] ? req.files[0].filename : null; // Get image path
    console.log(img);
    if (!title || !desc || !date) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and date are required",
      });
    }

    const newEvent = new EventModel({ title, desc, img, date });
    await newEvent.save();

    res.status(201).json({
      success: true,
      message: "Event added successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error("Error adding event:", error); // Log error
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
router.delete("/delete/:id", ensureValid, deleteEvent);

module.exports = router;
