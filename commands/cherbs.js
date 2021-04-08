const mongo = require('../mongo')
const inventorySchema = require('../schemas/inventorySchema')
const { execute } = require('./shop')
var inv = []
const herbs = ["Blue Mountain Flower", "Kufara", "Catnip", "Yangu", "Ropa", "Kudonha", "Chokwadi", "Rosehips"]
    //const potionTypes = ["Health Potion", "Mana Potion", "Stamina Potion", "Cure Disease Potion"]

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
const findItemInInv = async(user, item) => {
    await mongo().then(async(mongoose) => {
        try {
            //console.log('Fetching...')
            inv = await inventorySchema.find({ userid: user, itemid: item })
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports = {
    name: 'cherbs',
    description: 'Collects herbs',
    async execute(client, message) {
        var amount1 = Number(getRandomIntInclusive(1, 2))
        var amount2 = Number(getRandomIntInclusive(1, 3))
        var herbone = Number(getRandomIntInclusive(0, 4))
        var herbtwo = Number(getRandomIntInclusive(0, 4))
        herbone = herbs[herbone].charAt(0).toUpperCase() + herbs[herbone].slice(1)
        herbtwo = herbs[herbtwo].charAt(0).toUpperCase() + herbs[herbtwo].slice(1)
        await findItemInInv(message.author.id.toString(), herbone.toString());
        await mongo().then(async(mongoose) => {
            try {
                //console.log('Fetching...')
                inv2 = await inventorySchema.find({ userid: message.author.id.toString(), itemid: herbtwo })
            } finally {
                mongoose.connection.close()
            }
        })
        mongo().then(async(mongoose) => {
            try {
                if (herbone === herbtwo) {
                    if (inv.length === 0) {
                        await inventorySchema.insertMany([{
                            userid: message.author.id.toString(),
                            itemid: herbone,
                            type: 'herb',
                            qty: amount1 + amount2
                        }])
                    } else {
                        await inventorySchema.findOneAndUpdate({ itemid: herbtwo }, {
                            $inc: {
                                qty: amount2 + amount1
                            }
                        })
                    }
                } else {
                    if (inv.length === 0 && inv2.length === 0) {
                        await inventorySchema.insertMany([{
                            userid: message.author.id.toString(),
                            itemid: herbone,
                            type: 'herb',
                            qty: amount1

                        }, {
                            userid: message.author.id.toString(),
                            itemid: herbtwo,
                            type: 'herb',
                            qty: amount2
                        }])
                    } else if (inv.length === 0 && inv2 !== 0) {
                        await inventorySchema.insertMany([{
                            userid: message.author.id.toString(),
                            itemid: herbone,
                            type: 'herb',
                            qty: amount1

                        }])
                        await inventorySchema.findOneAndUpdate({ itemid: herbtwo }, {
                            $inc: {
                                qty: amount2
                            }
                        })
                    } else if (inv.length !== 0 && inv2 === 0) {
                        await inventorySchema.insertMany([{
                            userid: message.author.id.toString(),
                            itemid: herbtwo,
                            type: 'herb',
                            qty: amount1

                        }])
                        await inventorySchema.findOneAndUpdate({ itemid: herbone }, {
                            $inc: {
                                qty: amount2
                            }
                        })
                    } else {
                        await inventorySchema.findOneAndUpdate({ itemid: herbone }, {
                            $inc: {
                                qty: amount1
                            }
                        })
                        await inventorySchema.findOneAndUpdate({ itemid: herbtwo }, {
                            $inc: {
                                qty: amount2
                            }
                        })
                    }
                }

            } finally {
                mongoose.connection.close()
            }
        })
        if (herbone === herbtwo) {
            return message.channel.send(`You found: ${amount1 + amount2} ${herbone}`)
        } else {
            return message.channel.send(`You found: ${amount1} ${herbone}, ${amount2} ${herbtwo}`)
        }
    }
}