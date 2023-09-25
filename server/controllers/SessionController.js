const sessionModel = require('../model/SessionSchema');

exports.getSession = async (req, res) => {
    const user = req.user
    try {
        const data = await sessionModel.find({ userId: user._id, isDeleted: true }).sort({ createdAt: -1 })
        res.json(data)
    } catch (error) {

        console.error('error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}