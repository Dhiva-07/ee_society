const { signup, login , getUser } = require('../Controllers/AuthController');
const { signupvalidation, loginvalidation } = require('../Middlewares/AuthValidation');
const ensureAuthenticated = require("../Middlewares/ViewValidation.js");

const router = require('express').Router();

router.post('/login', loginvalidation , login) 
router.post('/signup', signupvalidation , signup) 
router.get('/user', ensureAuthenticated , getUser) 

module.exports = router;