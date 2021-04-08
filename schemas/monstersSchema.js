const mongoose = require('mongoose')
const monstersSchema = mongoose.Schema({
    _id: String,
    baseatk: Number,
    baseHP: Number,
    rarity: String,
    special: String
})

module.exports = mongoose.model('monsters', monstersSchema)