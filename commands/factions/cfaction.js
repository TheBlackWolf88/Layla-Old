const factionSchema = require("@schemas/factionSchema")
module.exports = {
    name: "cfaction",
    description: "creates a faction",
    async execute(client, message, args, Discord) {
        if (message.member.permissions.has("ADMINISTRATOR")) {
            if (args[0] === "royalassassin") args[0] = "Royal Assassin"
            await factionSchema.insertMany([{
                _id: args[0],
                fGold: 0,
                fSilver: 10,
                fBronze: 0,
                members: [],
                rank: 0
            }])

            return message.channel.send({
                embed: {
                    color: "#2C4F67",
                    description: `${args[0]} nevű frakció létrehozva!`
                }
            })
        } else {
            return message.channel.send("Insufficent permissions")
        }
    }
}