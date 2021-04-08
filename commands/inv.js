const mongo = require('../mongo')
const inventoryentorySchema = require('../schemas/inventoryentorySchema')
var inventory = []
const Discord = require('discord.js')

module.exports = {
    name: 'inventory',
    aliases: "inventoryentory",
    description: 'Shows your inventoryentory',
    async execute(client, message) {
        await mongo().then(async(mongoose) => {
            try {
                //console.log('Fetching...')
                inventory = await inventoryentorySchema.find({ userid: message.author.id.toString() })
            } finally {
                mongoose.connection.close()
            }
        })
        if (inventory.length === 0) {
            return message.channel.send('A táskád üres!')
        } else {
            if (message.guild === null) {
                var embed = new Discord.MessageEmbed()
                    .setColor(8867873)
                    .setTitle(`${message.author.username} tárgykészlete`)
                    .setDescription('Alább láthatod a tárgyaidat');
                for (let i = 0; i < inventory.length; i++) {
                    if (inventory[i].toObject().weight !== 0) {
                        embed.addField(inventory[i].toObject().item_name, `Készlet: ${inventory[i].toObject().qty}\n Tárgy típusa: ${inventory[i].toObject().type} \n Sebzés: ${inventory[i].toObject().damage}\nAnyaga: ${inventory[i].toObject().material} \n Súlya: ${inventory[i].toObject().weight}`)
                    } else if (inventory[i].toObject().type === "potion") {
                        embed.addField(inventory[i].toObject().itemid, `Készlet: ${inventory[i].toObject().qty}\n Tárgy típusa: ${inventory[i].toObject().type} \n A bájital erőssége: ${inventory[i].toObject().potency}`)
                    } else {
                        embed.addField(inventory[i].toObject().itemid, `Készlet: ${inventory[i].toObject().qty}\n Tárgy típusa: ${inventory[i].toObject().type}`)

                    }

                }
                return message.channel.send(embed)
            } else {
                var embed = new Discord.MessageEmbed()
                    .setColor(8867873)
                    .setTitle(`${message.member.displayName} tárgykészlete`)
                    .setDescription('Alább láthatod a tárgyaidat');
                for (let i = 0; i < inventory.length; i++) {
                    if (inventory[i].toObject().weight !== 0) {
                        embed.addField(inventory[i].toObject().item_name, `Készlet: ${inventory[i].toObject().qty}\n Tárgy típusa: ${inventory[i].toObject().type} \n Sebzés: ${inventory[i].toObject().damage}\nAnyaga: ${inventory[i].toObject().material} \n Súlya: ${inventory[i].toObject().weight}`)
                    } else if (inventory[i].toObject().type === "potion") {
                        embed.addField(inventory[i].toObject().itemid, `Készlet: ${inventory[i].toObject().qty}\n Tárgy típusa: ${inventory[i].toObject().type} \n A bájital erőssége: ${inventory[i].toObject().potency}`)
                    } else {
                        embed.addField(inventory[i].toObject().itemid, `Készlet: ${inventory[i].toObject().qty}\n Tárgy típusa: ${inventory[i].toObject().type}`)

                    }

                }
                return message.channel.send(embed)
            }
        }
    }
}