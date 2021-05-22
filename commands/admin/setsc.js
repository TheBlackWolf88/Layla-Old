const suggestionSchema = require("@schemas/suggestionSchema");

module.exports = {
    name: "setsc",
    description: "Sets the suggestions channel",
    async execute(client, message) {
        //console.log(message.guild)
        const channel = message.mentions.channels.first() || message.channel
        const { id: guildId } = message.guild
        const { id: channelId } = channel

        await suggestionSchema.findOneAndUpdate({ _id: guildId }, { _id: guildId, channelId: channelId }, { upsert: true })
        fetchSC(guildId)
        return message.channel.send(`Suggestion channel set to ${channel}`)
    }
}