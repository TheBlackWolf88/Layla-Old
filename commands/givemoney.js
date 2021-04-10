const mongo = require('../mongo')
const ecoSchema = require('../schemas/economySchema')
const coinTypes = ['gold', 'silver', 'bronze'];

module.exports = {
    name: 'givemoney',
    description: 'Gives a specified amount to the player from a specified currency type',
    async execute(client, message, args) {
        if (!message.mentions.users.first() || !coinTypes.includes(args[1].toLowerCase())) return message.channel.send('Hibás szintaktika!')
        var userID = message.mentions.users.first().id
        var type = args[1]
        var amount = args[2]
        await mongo().then(async(mongoose) => {
            try {
                await ecoSchema.findOneAndUpdate({ _id: userID }, {
                        $inc: {
                            [type]: Number(amount)
                        }
                    })
                    //console.log('Money given')
            } finally {
                mongoose.connection.close()
            }
        })
        return message.channel.send({ embed: { description: `${message.member.displayName} got ${amount} ${type} ` } })

    }
}