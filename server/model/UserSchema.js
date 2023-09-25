const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const checkEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [checkEmail, 'Please fill a valid email address']
    },
    password: String,
    phoneNumber: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[0-9]{10}/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }
    }
}, {
    timestamps: true
}
)

userSchema.pre('save', function (next) {
    const user = this;

    bcrypt.hash(user.password, 10, function (err2, hash) {
        if (err2) { return next(err2) };
        user.password = hash;
        next();
    })
})

userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) { return (callback(err)) };

        callback(null, isMatch);
    })
}


const UserModel = mongoose.model('users', userSchema)
module.exports = UserModel;
