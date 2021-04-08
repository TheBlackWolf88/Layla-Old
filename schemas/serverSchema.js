const mongoose = require('mongoose')
const serverSchema = mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    changeRateSilver: { //bronze -> silver
        type: Number,
        default: 100
    },
    changeRateGold: { //silver -> gold
        type: Number,
        default: 100
    },
    changeRateBronze:{ //bronze -> gold
        type: Number,
        default: 10000
    }
})
module.exports = mongoose.model('server-settings', serverSchema)