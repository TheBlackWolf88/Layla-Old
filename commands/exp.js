const mongo = require('../mongo')
const ecoSchema = require('../schemas/economySchema')
var ecores = []
module.exports = {
    name: 'exp',
    description: 'Shows your XP and Skill Points',
    async execute(client, message, Discord) {
        await mongo().then(async(mongoose) => {

            try {
                var user = message.author.id
                    //console.log('Fetching...')
                ecores = await ecoSchema.find({ _id: user })
                    //console.log(ecores)

            } finally {
                mongoose.connection.close()
            }
        })
        if (message.guild === null) {
            return message.channel.send({
                embed: {
                    color: 3447003,
                    title: message.author.username,
                    fields: [{
                        name: 'Exp',
                        value: `${ecores[0].toObject().exp}`
                    }, {
                        name: 'Skill points',
                        value: `${ecores[0].toObject().skillPoints}`
                    }]
                }
            })
        } else {
            return message.channel.send({
                embed: {
                    color: 3447003,
                    title: message.member.displayName,
                    fields: [{
                        name: 'Exp',
                        value: `${ecores[0].toObject().exp}`
                    }, {
                        name: 'Skill points',
                        value: `${ecores[0].toObject().skillPoints}`
                    }]
                }
            })
        }
    }
}