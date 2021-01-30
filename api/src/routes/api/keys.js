const router = require('express').Router();
const passport = require("passport");

// Controller methods
const { keyCreate, keyDelete } = require('../controllers/key');

// @route POST api/keys/create
// @desc Create new API key
// @access Restricted
router.post("/create",
  passport.authenticate('jwt', { session: false }),
  keyCreate
);

// @route POST api/keys/remove
// @desc Delete API key
// @access Restricted
router.post("/remove",
  passport.authenticate('jwt', { session: false }),
  keyDelete
);

