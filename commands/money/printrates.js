const serverSchema = require('@schemas/serverSchema')
var rates = []
const Discord = require('discord.js')

module.exports = {
    name: 'printrates',
    description: 'Tells you the current rates',
    async execute(client, message) {
        rates = await serverSchema.find({ _id: 1 })
        message.channel.send({
            embed: {
                title: 'Átváltási ráták: ',
                color: 15120948,
                description: `\n Arany: ${rates[0].toObject().changeRateGold}\n Ezüst: ${rates[0].toObject().changeRateSilver}`
            }
        })
    }
}