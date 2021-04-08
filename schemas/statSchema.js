const mongoose = require('mongoose')
const reqInt = {
    type: Number,
    required: true,
};
const statSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    health: {
        reqInt
    },
    mana:{
        reqInt
    },
    stamina: {
        reqInt
    },
    dex: {
        reqInt
    },
    str: {
        reqInt
    },
    int: {
        reqInt
    },
    illusion: {
        reqInt
    },
    conjuration: {
        reqInt
    },
    destruction: {
        reqInt
    },
    restoration: {
        reqInt
    },
    alteration: {
        reqInt
    },
    enchanting: {
        reqInt
    },
    smithing: {
        reqInt
    },
    heavyarmor: {
        reqInt
    },
    block: {
        reqInt
    },
    twohanded: {
        reqInt
    },
    onehanded: {
        reqInt
    },
    archery: {
        reqInt
    },
    lightarmor: {
        reqInt
    },
    sneak: {
        reqInt
    },
    lockpicking: {
        reqInt
    },
    pickpocket: {
        reqInt
    },
    speech: {
        reqInt
    },
    alchemy: {
        reqInt
    }
})
module.exports = mongoose.model('stats', statSchema);