const router = require('express').Router()
const passport = require("passport")

const passportService = require('../services/passportSetup')

const MC = require("../controllers/MessageControllers")

const requireAuth = passport.authenticate('jwt', { session: false })


router.post("/message", requireAuth, MC.saveMessage)
router.get("/allMessages", requireAuth, MC.getMessages)


module.exports = router;