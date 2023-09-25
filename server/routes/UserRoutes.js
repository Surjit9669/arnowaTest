const router = require('express').Router()
const passport = require("passport")

const passportService = require('../services/passportSetup')

const UC = require("../controllers/UserControllers")
const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignIn = passport.authenticate('local', { session: false });

router.post("/login", requireSignIn, UC.login)
router.get("/user", requireAuth, UC.getUsers)
router.post("/signup", UC.signup);
router.get("/logout", requireAuth, UC.logout);


module.exports = router;