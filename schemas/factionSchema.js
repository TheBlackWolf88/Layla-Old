const mongoose = require("mongoose")
const factionSchema = mongoose.Schema({
    _id: String,
    fGold: Number,
    fSilver: Number,
    fBronze: Number,
    members: Array,
    rank: Number
})

module.exports = mongoose.model("factions", factionSchema)