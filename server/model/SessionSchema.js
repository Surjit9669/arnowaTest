const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    token: {
        type: String
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


const sessionModel = mongoose.model('session', sessionSchema)
module.exports = sessionModel;