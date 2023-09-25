const sessionModel = require("../model/SessionSchema")

let sessionService = {}


sessionService.create = async (data) => {
    return sessionModel.insertMany([data])
}

sessionService.delete = async (critieria) => {
    return sessionModel.updateOne(critieria, { $set: { isDeleted: true } })
}

module.exports = sessionService