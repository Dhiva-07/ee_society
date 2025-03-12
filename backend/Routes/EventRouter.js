const ensureAuthenticated = require('../Middlewares/ViewValidation.js');
const { getEvents } = require("../Controllers/EventController.js");
const router = require('express').Router();

router.get('/', ensureAuthenticated , getEvents)

module.exports = router;