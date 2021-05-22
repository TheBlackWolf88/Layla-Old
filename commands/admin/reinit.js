const ecoSchema = require('@schemas/economySchema')
const statSchema = require('@schemas/statSchema')
const inventorySchema = require('@schemas/inventorySchema')

module.exports = {
    name: 'reinit',
    description: 'Deletes your whole data. Only with admin permissions. Used when the character is killed.',
    async execute(client, message) {
        var userID = message.mentions.users.first().id
        await statSchema.deleteMany({ _id: message.mentions.users.first().id }).then(console.log(`Deleted ${message.mentions.users.first().id}'s Stat document, reInit is required`))
        await ecoSchema.deleteMany({ _id: userID }).then(console.log(`Deleted ${message.mentions.users.first().id}'s Eco document, reInit is required`))
        await inventorySchema.deleteMany({ userid: userID }).then(console.log(`Deleted ${message.mentions.users.first().id}'s Inv document.`))
        await statSchema.findOneAndUpdate({
            _id: userID
        }, {
            $inc: {
                'health': 100,
                'mana': 100,
                'stamina': 100,
                'dex': 0,
                'str': 0,
                'int': 0,
                'illusion': 0,
                'conjuration': 0,
                'destruction': 0,
                'restoration': 0,
                'alteration': 0,
                'enchanting': 0,
                'smithing': 0,
                'heavyarmor': 0,
                'block': 0,
                'twohanded': 0,
                'onehanded': 0,
                'archery': 0,
                'lightarmor': 0,
                'sneak': 0,
                'lockpicking': 0,
                'pickpocket': 0,
                'speech': 0,
                'alchemy': 0,
                'weight': 0
            }
        }, {
            upsert: true
        })
        await ecoSchema.findOneAndUpdate({ _id: userID }, {
            $inc: {
                gold: 0,
                silver: 0,
                bronze: 0,
                exp: 0,
                skillPoints: 10
            },
        }, { upsert: true })
        console.log(`Reinit done at ${userID}`)
        return message.channel.send('Felhasználó nullázva!');
    }
}