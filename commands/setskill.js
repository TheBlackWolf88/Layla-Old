const mongo = require('../mongo')
const statSchema = require('../schemas/statSchema')
var allStatArray = [
    'health',
    'mana',
    'stamina',
    'dex',
    'str',
    'int',
    'illusion',
    'conjuration',
    'destruction',
    'restoration',
    'alteration',
    'enchanting',
    'smithing',
    'heavyarmor',
    'block',
    'twohanded',
    'onehanded',
    'archery',
    'lightarmor',
    'sneak',
    'lockpicking',
    'pickpocket',
    'speech',
    'alchemy'
]
module.exports = {
    name: 'setskill',
    description: 'Sets your skill level to the given amount. Administrator privilage is required!',
    async execute(client, message, args, Discord) {
        var isIt = allStatArray.includes(args[1])
        if (!message.mentions.users.first() || !isIt || isNaN(args[2])) return message.channel.send('Hibás szintaxis! A helyes szintaxis: .setskill <@> <skillName> <amount>')
        var userID = message.mentions.users.first().id.toString()
        var type = args[1]
        var amount = args[2]
            //console.log(skill)
        await mongo().then(async mongoose => {
                try {
                    //console.log('Fetching...')
                    await statSchema.findOneAndUpdate({ _id: userID }, {
                            [type]: amount
                        })
                        .then(console.log(`Updated ${type} to ${amount} at ${message.mentions.users.first().username}`))

                } finally {
                    mongoose.connection.close()
                }
            }

        )
        return message.channel.send({ embed: { description: `Set ${message.member.displayName}'s ${type} to ${amount}` } })
    }
}