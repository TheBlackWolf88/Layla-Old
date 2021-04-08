const mongo = require('../mongo')
const serverSchema  =require('../schemas/serverSchema')
const { execute } = require('./shop')
var rates = []
const Discord = require('discord.js')
const rateQuery = async () => {
    await mongo().then(async (mongoose) => {
        try {
            rates = await serverSchema.find({ _id: 1 })
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports = {
    name: 'printrates',
    description: 'Tells you the current rates',
    async execute(client, message ){
        await rateQuery();
            message.channel.send({
                embed: {
                    title: 'Átváltási ráták: ',
                    color: 15120948,
                    description: `\n Arany: ${rates[0].toObject().changeRateGold}\n Ezüst: ${rates[0].toObject().changeRateSilver}`
                }
            })
    }
}