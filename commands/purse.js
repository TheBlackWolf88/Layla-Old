const ecoSchema = require("../schemas/economySchema")
const mongo = require('../mongo')
var ecores = []
module.exports = {
    name: 'purse',
    description: 'Shows your money',
    async execute(client, message, Discord) {
        var ecores = []
        await mongo().then(async(mongoose) => {

            try {
                var user = message.author.id
                    //console.log('Fetching...')
                ecores = await ecoSchema.find({ _id: user })
                    //console.log(ecores)

            } finally {
                mongoose.connection.close()
            }
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
                //clear(1)
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
        })
    }
}