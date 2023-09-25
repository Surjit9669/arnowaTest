const passport = require("passport");
const bcrypt = require('bcrypt')
const userModel = require("../model/UserSchema");
const config = require('../config/config.js');
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: config.secretKey,
    expiresIn: 180
}


const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await userModel.findById(payload.sub);

        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
});


const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return done(null, false, { message: 'invalid email or password' });
        }
        bcrypt.compare(password, user.password, function (err, isMatch) {
            if (err) { return (callback(err)) };

            if (!isMatch) {
                return done(null, false, { message: 'invalid email or password' });
            }

            return done(null, user);
        })
    } catch (err) {
        return done(err);
    }
});
passport.use(localLogin);
passport.use(jwtLogin);