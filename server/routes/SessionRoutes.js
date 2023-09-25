const router = require('express').Router()
const passport = require("passport")

const passportService = require('../services/passportSetup')

const SC = require("../controllers/SessionController")
const requireAuth = passport.authenticate('jwt', { session: false })

router.get("/previouslogin", requireAuth, SC.getSession);


module.exports = router;