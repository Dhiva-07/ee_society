const ensureAuthenticated = require('../Middlewares/ViewValidation.js');
const ensureValid = require('../Middlewares/EventAddValidation.js');
const { getEvents , addEvent, deleteEvent } = require("../Controllers/EventController.js");
const router = require('express').Router();

router.get('/', ensureAuthenticated , getEvents)
router.post("/add", ensureValid, addEvent);
router.delete("/delete/:id", ensureValid, deleteEvent);

module.exports = router;