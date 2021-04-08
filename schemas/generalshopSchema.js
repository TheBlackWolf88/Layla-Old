const mongoose = require('mongoose')
const gshopSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required:true
    },
    type: {
        type: String,
        required:true
    }
})
module.exports = mongoose.model('gShop', gshopSchema)