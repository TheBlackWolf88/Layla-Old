const mongoose = require("mongoose")
const suggestionSchema = mongoose.Schema({
    _id: String,
    channelId: String
})
module.exports = mongoose.model("suggestions", suggestionSchema)