const { Guild, MessageEmbed } = require("discord.js")
const { statuses, suggestionCache } = require("@root/suggestions")
module.exports = {
        name: "suggestion",
        description: "yes",
        async execute(client, message, args, Discord) {
            const { guild } = message
            const messageId = args.shift()
            let newStatus = args.shift().toUpperCase()
            const reason = args.join(' ')
            message.delete()
            newStatus = statuses[newStatus]
            if (!newStatus) {
                return message.author.send("Wrong status, dear :heart:")
            }
            const channelId = suggestionCache()[guild.id]
            if (!channelId) {
                return message.author.send("Something went wrong, dear :heart:")
            }
            const channel = guild.channels.cache.get(channelId)
            if (!channel) {
                return message.author.send("The suggestions channel doesn't exist, dear :heart:")
            }
            const targetMessage = await channel.messages.fetch(messageId, false, true)
            if (!targetMessage) {
                return message.author.send("The message no longer exist, dear :heart:")
            }
            const oldEmbed = targetMessage.embeds[0]
            const embed = new MessageEmbed()
                .setAuthor(oldEmbed.author.name, oldEmbed.author.iconURL)
                .setDescription(oldEmbed.description)
                .setColor(newStatus.color)
                .setFooter(oldEmbed.footer.text)
                .addFields({
                        name: "Státusz",
                        value: `${newStatus.text}${reason ? ` Indok: ${reason}` : ''}`,
            })
        targetMessage.edit(embed)

    }
    
}