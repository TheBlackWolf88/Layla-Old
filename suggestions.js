const Discord = require("discord.js")
const suggestionSchema = require("./schemas/suggestionSchema")
const statuses = {
    WAIT: {
        text: "⌛ Az ötletedet megkaptuk, feldologozás alatt van.",
        color: "#FFFF00"
    },
    ACCEPT: {
        text: "✅ Az ötleted elfogadásra kerül, hamarosan megvalósul!",
        color: "#00CD00"
    },
    DENY: {
        text: "❌ Sajnos ez most nem úgy sikerült.",
        color: "#FF0000"
    }
}
let suggestionCache = {}
const fetchSC = async(guildId) => {
    let query = {}
    if (guildId) {
        query._id = guildId
    }
    var results = await suggestionSchema.find(query)
    for (var result of results) {
        const { _id, channelId } = result
        suggestionCache[_id] = channelId
    }
}
module.exports = (client) => {
    {
        fetchSC()
        client.on('message', (message) => {

            const { guild, channel, member, content } = message
            let cachedChannel = suggestionCache[guild.id]
            if (cachedChannel && cachedChannel === channel.id && !member.user.bot) {
                message.delete()
                let status = statuses.WAIT
                const embed = new Discord.MessageEmbed()
                    .setColor(status.color)
                    .setAuthor(member.displayName, member.user.displayAvatarURL())
                    .setDescription(content)
                    .addFields({
                        name: "Státusz",
                        value: status.text
                    })
                    .setFooter("Ha van ötleted csak írd le ide!");
                channel.send(embed).then((message) => {
                    message.react("👍").then(() => {
                        message.react("👎")
                    })
                })
            }
        })
    }
}

module.exports.fetchSC = fetchSC
module.exports.statuses = statuses
module.exports.suggestionCache = () => {
    return suggestionCache
}