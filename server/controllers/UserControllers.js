const userModel = require('../model/UserSchema');
const jwt = require("jwt-simple");
const config = require('../config/config');
const sessionService = require('../services/sessionService');
const sessionModel = require('../model/SessionSchema');


function tokenForUser(user) {
    return jwt.encode({ sub: user.id, iat: new Date().getTime() }, config.secretKey);
}


exports.getUsers = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: 'authentication required' });
        }

        const userData = await userModel.findOne({ email: user.email })

        const data = {
            name: userData.name,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            _id: userData._id,
            createdAt: userData.createdAt,
        };

        const response = {
            data
        };

        res.json(response.data);
    } catch (error) {
        console.error('error:-', error);
        res.status(500).json({ error: 'internal server error' });
    }


}

exports.login = async (req, res) => {
    try {
        const tempUser = req.user;

        const user = {
            name: tempUser.name,
            email: tempUser.email,
            phoneNumber: tempUser.phoneNumber,
            _id: tempUser._id,
            createdAt: tempUser.createdAt,
            token: tokenForUser(tempUser),
        };
        await sessionService.create({ userId: user._id, token: user.token })

        res.json(user);
    } catch (error) {
        console.error('error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}





exports.signup = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(422).json({ error: 'email already exists' });
        }

        const newUser = new userModel({ name, email, password, phoneNumber });

        const tempUser = await newUser.save();

        const user = {
            name: tempUser.name,
            email: tempUser.email,
            phoneNumber: tempUser.phoneNumber,
            _id: tempUser._id,
            createdAt: tempUser.createdAt,
            token: tokenForUser(tempUser),
        };

        res.json(user);
    } catch (error) {
        console.error('error:-', error);
        res.status(500).json({ error: 'internal server error' });
    }
}


exports.logout = async (req, res) => {
    try {
        const user = req.user;
        if (user) {
            await sessionService.delete({ userId: user._id, isDeleted: false })
            req.logout(

                function (err) {
                    if (err) {
                        console.error('error:-', err);
                        return res.status(500).json({ error: 'internal server error' });
                    }
                    res.json({ message: 'Logout successful' });
                }
            );
        } else {
            res.status(401).json({ message: 'user not logged in' });
        }
    } catch (error) {
        console.error('error:', error);
        res.status(500).json({ message: 'internal server error' });
    }
};





