const ecoSchema = require("@schemas/economySchema")
var ecores = []
module.exports = {
    name: 'purse',
    description: 'Shows your money',
    async execute(client, message, Discord) {
        var ecores = []
        var user = message.author.id
        ecores = await ecoSchema.find({ _id: user })

        if (message.guild === null) {
            message.channel.send({
                embed: {
                    color: 16766720,
                    title: message.author.username,
                    fields: [{
                        name: 'Gold',
                        value: `${ecores[0].toObject().gold}`
                    }, {
                        name: 'Silver',
                        value: `${ecores[0].toObject().silver}`
                    }, {
                        name: 'Bronze',
                        value: `${ecores[0].toObject().bronze}`
                    }]
                }
            })
        } else {
            message.channel.send({
                embed: {
                    color: 16766720,
                    title: message.member.displayName,
                    fields: [{
                        name: 'Gold',
                        value: `${ecores[0].toObject().gold}`
                    }, {
                        name: 'Silver',
                        value: `${ecores[0].toObject().silver}`
                    }, {
                        name: 'Bronze',
                        value: `${ecores[0].toObject().bronze}`
                    }]
                }
            })
        }
    }
}