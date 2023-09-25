const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    }, messages: [{
        text: String, timestamp: Date,
    }],

}, {
    timeseries: true
});



const messageModel = mongoose.model('message', messageSchema)
module.exports = messageModel;