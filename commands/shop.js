const mongo = require('../mongo')
const gshopSchema = require('../schemas/generalshopSchema')
var shopItems = [];
const Discord = require('discord.js')
module.exports = {
    name: 'shop',
    description: `Lists the shop's items`,
    async execute(client, message) {

        await mongo().then(async(mongoose) => {
            try {
                shopItems = await gshopSchema.find({})
                    //console.log('Fetching')
            } finally {
                mongoose.connection.close()
            }
        })
        var embed = new Discord.MessageEmbed()
            .setTitle(`Bolt`)
            .setColor(336699)
            .setDescription('Az áraink bronzban értendőek, illetve csak azt fogadunk el!');
        for (i = 0; i < shopItems.length; i++) {
            embed.addField(shopItems[i].toObject()._id, `Ár: ${shopItems[i].toObject().price}`)
        }
        return message.channel.send(embed)
    }
}