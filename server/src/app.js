const express = require('express');
const session = require('express-session');
const passport = require('passport');

const cors = require('cors')
const config = require('../config/config');

const UserRoute = require('../routes/UserRoutes')
const MessageRoute = require('../routes/MessageRoutes');
const SessionRoute = require('../routes/SessionRoutes')

const app = express();

app.use(express.json())
app.use(cors())
app.use(session({
    secret: config.secretKey,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', UserRoute)
app.use('/msg', MessageRoute)
app.use('/session', SessionRoute)

module.exports = app