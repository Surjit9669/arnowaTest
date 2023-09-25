const messageModel = require('../model/MessageSchema');




exports.saveMessage = async (req, res) => {
    const { text } = req.body;
    console.log(req.body);
    const currentUser = req.user;


    try {
        if (!text) {
            return res.status(400).json({ error: 'message is required' });
        }

        if (!currentUser) {
            return res.status(401).json({ message: 'unauthorized' });
        }

        let userMessage = await messageModel.findOne({ userId: currentUser.id });

        if (!userMessage) {
            userMessage = new messageModel({
                userId: currentUser.id,
                messages: [],
            });
        }

        userMessage.messages.push({
            text: text,
            timestamp: new Date(),
        });

        const data = await userMessage.save();
        console.log(data);
        res.status(201).json({ data, message: 'Message saved successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'internal server error' });
    }
}


exports.getMessages = async (req, res) => {
    const user = req.user

    try {
        const messages = await messageModel.find({ userId: user._id });
        res.json(messages);
    } catch (err) {
        console.error('error', err);
        res.status(500).json({ error: 'internal server error' });
    }


}

