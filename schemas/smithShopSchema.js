const mongoose = require('mongoose')
const smithShopSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    damage: {
        type: Number,
        required:true,
        default: 1
    },
    reqStr : {
        type:Number,
        required:true
    },
    reqWS: {
        type : Number,
        required: true
    },
    type: {
        type: String,
        required:true
    },
    custom_name: {
        type: String
    },
    price: {
        type: Number,
        default : 1
    }


})
module.exports = mongoose.model('smithShop', smithShopSchema)