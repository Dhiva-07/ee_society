const ensureAuthenticated = require('../Middlewares/EventValidation.js');
const { getEvents } = require("../Controllers/EventController.js");
const router = require('express').Router();

router.get('/', ensureAuthenticated , getEvents)

module.exports = router;