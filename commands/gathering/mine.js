const inventorySchema = require('@schemas/inventorySchema')
const cheapOreTypes = ['iron', 'coal', 'copper', 'tin', 'lead']
const rareOreTypes = ['gold', 'silver', 'chiedza', 'aihwa', 'tariro']
var inv = []

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
const findItemInInv = async(user, item) => {
    inv = await inventorySchema.find({ userid: user, itemid: item })
}

module.exports = {
    name: 'mine',
    description: 'Mine ores',
    async execute(client, message) {
        var result = getRandomIntInclusive(1, 100);
        if (result > 97) {
            //console.log('Rare found')
            var amount1 = Number(getRandomIntInclusive(1, 2))
            var amount2 = Number(getRandomIntInclusive(1, 3))
            var oreone = Number(getRandomIntInclusive(0, 4))
            var oretwo = Number(getRandomIntInclusive(0, 4))
            oreone = rareOreTypes[oreone].charAt(0).toUpperCase() + rareOreTypes[oreone].slice(1)
            oretwo = cheapOreTypes[oretwo].charAt(0).toUpperCase() + cheapOreTypes[oretwo].slice(1)
        } else {
            var amount1 = Number(getRandomIntInclusive(1, 3))
            var amount2 = Number(getRandomIntInclusive(1, 3))
            var oreone = Number(getRandomIntInclusive(0, 4))
            var oretwo = Number(getRandomIntInclusive(0, 4))
            oreone = cheapOreTypes[oreone].charAt(0).toUpperCase() + cheapOreTypes[oreone].slice(1)
            oretwo = cheapOreTypes[oretwo].charAt(0).toUpperCase() + cheapOreTypes[oretwo].slice(1)
        }
        await findItemInInv(message.author.id.toString(), oreone.toString());
        inv2 = await inventorySchema.find({ userid: message.author.id.toString(), itemid: oretwo })
        if (oreone === oretwo) {
            if (inv.length === 0) {
                await inventorySchema.insertMany([{
                    userid: message.author.id.toString(),
                    itemid: oreone,
                    type: 'ore',
                    qty: amount1 + amount2
                }])
            } else {
                await inventorySchema.findOneAndUpdate({ itemid: oretwo }, {
                    $inc: {
                        qty: amount2 + amount1
                    }
                })
            }
        } else {
            if (inv.length === 0 && inv2.length === 0) {
                await inventorySchema.insertMany([{
                    userid: message.author.id.toString(),
                    itemid: oreone,
                    type: 'ore',
                    qty: amount1

                }, {
                    userid: message.author.id.toString(),
                    itemid: oretwo,
                    type: 'ore',
                    qty: amount2
                }])
            } else if (inv.length === 0 && inv2 !== 0) {
                await inventorySchema.insertMany([{
                    userid: message.author.id.toString(),
                    itemid: oreone,
                    type: 'ore',
                    qty: amount1

                }])
                await inventorySchema.findOneAndUpdate({ itemid: oretwo }, {
                    $inc: {
                        qty: amount2
                    }
                })
            } else if (inv.length !== 0 && inv2 === 0) {
                await inventorySchema.insertMany([{
                    userid: message.author.id.toString(),
                    itemid: oretwo,
                    type: 'ore',
                    qty: amount1

                }])
                await inventorySchema.findOneAndUpdate({ itemid: oreone }, {
                    $inc: {
                        qty: amount2
                    }
                })
            } else {
                await inventorySchema.findOneAndUpdate({ itemid: oreone }, {
                    $inc: {
                        qty: amount1
                    }
                })
                await inventorySchema.findOneAndUpdate({ itemid: oretwo }, {
                    $inc: {
                        qty: amount2
                    }
                })
            }
        }
        if (oreone === oretwo) {
            return message.channel.send(`You mined: ${amount1 + amount2} ${oreone}`)
        } else {
            return message.channel.send(`You mined: ${amount1} ${oreone}, ${amount2} ${oretwo}`)
        }
    }
}