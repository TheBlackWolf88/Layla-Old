const mongo = require('../mongo')
const inventorySchema = require('../schemas/inventorySchema')
var inv = []
const Discord = require('discord.js')

module.exports = {
    name: 'inv',
    aliases: "inventory",
    description: 'Shows your inventory',
    async execute(client, message) {
        await mongo().then(async(mongoose) => {
            try {
                //console.log('Fetching...')
                inv = await inventorySchema.find({ userid: message.author.id.toString() })
            } finally {
                mongoose.connection.close()
            }
        })
        if (inv.length === 0) {
            return message.channel.send('A táskád üres!')
        } else {
            if (message.guild === null) {
                var embed = new Discord.MessageEmbed()
                    .setColor(8867873)
                    .setTitle(`${message.author.username} tárgykészlete`)
                    .setDescription('Alább láthatod a tárgyaidat');
                for (let i = 0; i < inv.length; i++) {
                    if (inv[i].toObject().weight !== 0) {
                        embed.addField(inv[i].toObject().item_name, `Készlet: ${inv[i].toObject().qty}\n Tárgy típusa: ${inv[i].toObject().type} \n Sebzés: ${inv[i].toObject().damage}\nAnyaga: ${inv[i].toObject().material} \n Súlya: ${inv[i].toObject().weight}`)
                    } else if (inv[i].toObject().type === "potion") {
                        embed.addField(inv[i].toObject().itemid, `Készlet: ${inv[i].toObject().qty}\n Tárgy típusa: ${inv[i].toObject().type} \n A bájital erőssége: ${inv[i].toObject().potency}`)
                    } else {
                        embed.addField(inv[i].toObject().itemid, `Készlet: ${inv[i].toObject().qty}\n Tárgy típusa: ${inv[i].toObject().type}`)

                    }

                }
                return message.channel.send(embed)
            } else {
                var embed = new Discord.MessageEmbed()
                    .setColor(8867873)
                    .setTitle(`${message.member.displayName} tárgykészlete`)
                    .setDescription('Alább láthatod a tárgyaidat');
                for (let i = 0; i < inv.length; i++) {
                    if (inv[i].toObject().weight !== 0) {
                        embed.addField(inv[i].toObject().item_name, `Készlet: ${inv[i].toObject().qty}\n Tárgy típusa: ${inv[i].toObject().type} \n Sebzés: ${inv[i].toObject().damage}\nAnyaga: ${inv[i].toObject().material} \n Súlya: ${inv[i].toObject().weight}`)
                    } else if (inv[i].toObject().type === "potion") {
                        embed.addField(inv[i].toObject().itemid, `Készlet: ${inv[i].toObject().qty}\n Tárgy típusa: ${inv[i].toObject().type} \n A bájital erőssége: ${inv[i].toObject().potency}`)
                    } else {
                        embed.addField(inv[i].toObject().itemid, `Készlet: ${inv[i].toObject().qty}\n Tárgy típusa: ${inv[i].toObject().type}`)

                    }

                }
                return message.channel.send(embed)
            }
        }
    }
}