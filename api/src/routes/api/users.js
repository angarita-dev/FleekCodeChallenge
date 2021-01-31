const express = require("express");
const router = express.Router();
const passport = require("passport");

// Controller methods
const { userLogIn, userCreate, userKeys } = require('../../controllers/user');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", userCreate);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", userLogIn);

// @route POST api/users/keys
// @desc Returns logged user API keys 
// @access Restricted
router.get("/keys", 
  // Authenticate user using jwt
  passport.authenticate('jwt', { session: false }),
  userKeys
);

module.exports = router;
