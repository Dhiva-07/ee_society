const express = require("express");
const { submitSuggestion, getSuggestions } = require("../Controllers/CommunityController");
const ensureAuthenticated = require("../Middlewares/ViewValidation.js");

const router = express.Router();

router.post("/", ensureAuthenticated, submitSuggestion);

router.get("/", ensureAuthenticated, getSuggestions);

module.exports = router;
