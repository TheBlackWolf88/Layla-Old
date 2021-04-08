const mongoose = require('mongoose')
const economySchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    gold: {
        type: Number,
        required: true
    },
    silver: {
        type: Number,
        required: true
    },
    bronze: {
        type: Number,
        required: true
    },
    exp: {
        type: Number,
        required: true
    },
    skillPoints: {
        type: Number,
        required: true
    },
    hasDummy: {
        type: Boolean,
        default: false
    }

})
module.exports = mongoose.model('economy', economySchema)