const mongoose = require('mongoose')
const reqString = { type: String, required: true }
const reqInt = { type: Number, required: true }
const inventorySchema = mongoose.Schema({
    _id: String,
    userid: String,
    itemid: String,
    damage: { type: Number, default: 0 },
    type: { type: String, default: 'item' },
    qty: Number,
    material: { type: String, default: '' },
    item_name: { type: String, default: '' },
    weight: { type: Number, default: 0 },
    potency: { type: Number }
})
module.exports = mongoose.model('PlayerInventory', inventorySchema)