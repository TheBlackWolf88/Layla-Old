const mongo = require('../mongo')
const inventorySchema = require('../schemas/inventorySchema')
var inv = []
var targetinv = []


module.exports = {
    name: 'transferitem',
    description: 'Lets you trade items',
    async execute(client, message, args) {
        const findItemInSomeonesInv = async(item, user) => {
            await mongo().then(async(mongoose) => {
                try {
                    //console.log('Fetching...')
                    if (user === message.author.id) {
                        inv = await inventorySchema.find({ userid: user, itemid: item })
                    } else {
                        targetinv = await inventorySchema.find({ userid: user, itemid: item })
                    }

                } finally {
                    mongoose.connection.close()
                }
            })
        }
        var from1 = message.author.id
        var target = message.mentions.users.first().id
        var item = args[1]
        var iamount = Number(args[2])
        await findItemInSomeonesInv(item, from1)
        await findItemInSomeonesInv(item, target)

        //console.log(inv, targetinv)
        await mongo().then(async(mongoose) => {
            try {
                if (inv.length !== 0) {
                    console.log(inv[0].toObject().qty)
                    if (inv[0].toObject().qty === iamount) {
                        if (targetinv.length !== 0) {
                            await inventorySchema.findOneAndUpdate({ userid: target, itemid: item }, { $inc: { qty: iamount } })
                            await inventorySchema.deleteMany({ userid: from1, itemid: item })
                                //console.log('itemtrans')
                        } else {
                            await inventorySchema.findOneAndUpdate({ userid: from1, itemid: item }, { userid: target })
                                //console.log('elvileg jó')
                        }
                    } else if (inv[0].toObject().qty < iamount) {
                        return message.channel.send(`Nincs ${iamount} darab ${item}-d`)
                    } else if (inv[0].toObject().qty > iamount) {
                        if (targetinv.length !== 0) {
                            await inventorySchema.findOneAndUpdate({ userid: from1, itemid: item }, { $inc: { qty: -iamount } })
                            await inventorySchema.findOneAndUpdate({ userid: target, itemid: item }, { $inc: { qty: iamount } })
                        } else {
                            await inventorySchema.findOneAndUpdate({ userid: from1, itemid: item }, { $inc: { qty: -iamount } })
                            await inventorySchema.insertMany([{
                                userid: target,
                                itemid: item,
                                type: inv[0].toObject().type,
                                effects: inv[0].toObject().effects,
                                damage: inv[0].toObject().damage,
                                reqWS: inv[0].toObject().reqWS,
                                reqStr: inv[0].toObject().reqStr,
                                material: inv[0].toObject().material,
                                weight: inv[0].toObject().weight,
                                item_name: inv[0].toObject().item_name,
                                qty: iamount
                            }])
                        }
                    }
                } else {
                    return message.channel.send('Nem adhatsz át olyan tárgyat, ami nincs nálad!')
                }
            } finally {
                mongoose.connection.close()
            }
        })
    }
}