const ensureAuthenticated = require('../Middlewares/ViewValidation.js');
const { getTeam } = require("../Controllers/TeamController.js");
const router = require('express').Router();

router.get('/', ensureAuthenticated , getTeam)

module.exports = router;