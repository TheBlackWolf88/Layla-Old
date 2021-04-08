const mongo = require('../mongo')
const gshopSchema = require('../schemas/generalshopSchema')
const ecoSchema = require('../schemas/economySchema')
const inventorySchema = require('../schemas/inventorySchema');
const economySchema = require('../schemas/economySchema');
var inv = [];
var ecores = [];
var foundItems = [];
var amount

module.exports = {
    name: 'buy',
    description: 'Lets you buy items from the shop',
    async execute(client, message, args) {
        if (!args[1]) {
            amount = 1
        } else {
            amount = args[1]
        }

        await mongo().then(async(mongoose) => {
            try {
                //console.log('Fetching...')
                inv = await inventorySchema.find({ userid: message.author.id.toString(), itemid: args[0].charAt(0).toUpperCase() + args[0].slice(1) })
            } finally {
                mongoose.connection.close()
            }
        })
        await mongo().then(async(mongoose) => {
            try {
                //console.log('Fetching...')
                ecores = await ecoSchema.find({ _id: message.author.id })
                    //console.log(ecores)

            } finally {
                mongoose.connection.close()
            }
        })
        await mongo().then(async(mongoose) => {
            try {
                foundItems = await gshopSchema.find({ _id: args[0].charAt(0).toUpperCase() + args[0].slice(1) })
                    //console.log('Fetching')
            } finally {
                mongoose.connection.close()
            }
        })
        await mongo().then(async(mongoose) => {
            try {
                if (Number(ecores[0].toObject().bronze) >= Number(foundItems[0].toObject().price) * Number(amount)) {
                    if (inv.length === 0) {
                        await inventorySchema.insertMany([{
                            userid: message.author.id.toString(),
                            itemid: foundItems[0].toObject()._id,
                            type: foundItems[0].toObject().type,
                            qty: amount

                        }])
                    } else {
                        await inventorySchema.findOneAndUpdate({ itemid: args[0] }, {
                            $inc: {
                                qty: amount
                            }
                        })
                    }
                    await ecoSchema.findOneAndUpdate({ _id: message.author.id }, {
                        $inc: {
                            bronze: -Number(foundItems[0].toObject().price) * Number(amount),

                        }
                    })
                    return message.channel.send(`Sikeresen vásároltál ${amount} ${args[0].charAt(0).toUpperCase() + args[0].slice(1)}-t`);
                } else {
                    return message.channel.send('Nincs elég pénzed a tárgy megvételéhez!')
                }


            } finally {
                mongoose.connection.close()
            }
        })
        if (args[0] === 'dummy') {
            await economySchema.findOneAndUpdate({ _id: message.author.id }, { hasDummy: true })
            await inventorySchema.deleteOne({ itemid: 'Dummy' })
        }
    }
}