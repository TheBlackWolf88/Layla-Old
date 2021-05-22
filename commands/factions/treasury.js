const factionSchema = require("@schemas/factionSchema");

function inFaction(user, message) {
    const fArray = ['King', 'Royal Assassin', 'Mage', 'Blacksmith', 'Professor']
    for (var item of fArray) {
        var role = message.guild.roles.cache.find(r => r.name == item)
        if (user.roles.cache.has(role.id)) {
            return item
        }

    }
    return false

}


module.exports = {
    name: "treasury",
    description: "opens the treasury",
    async execute(client, message, Discord) {
        var inF = inFaction(message.member, message)
            //console.log(inF)
        if (inF == false) {
            await message.channel.messages.fetch({ limit: 1 }).then(messages => {
                message.channel.bulkDelete(messages);

            });
            return null
        }
        if (!message.member.roles.cache.has("780340586183786496")) return message.channel.send({ embed: { description: "Only the leader can access the treasury!" } })
        var colorHex
        switch (inF.toLowerCase()) {
            case "blacksmith":
                colorHex = "#666666"
                break
            case "mage":
                colorHex = "#2791FF"
                break
            case "professor":
                colorHex = "#AC8160"
                break
            case "royal assassin":
                colorHex = "#D82B00"
                break
            case "king":
                colorHex = "#FFD700"
                break


        }
        var faction = await factionSchema.find({ _id: inF })
        faction = faction[0].toObject()
        return message.channel.send({
            embed: {
                title: `${inF} treasury`,
                color: colorHex,
                fields: [
                    { name: `Gold:`, value: `${faction.fGold}` },
                    { name: `Silver:`, value: `${faction.fSilver}` },
                    { name: `Bronze:`, value: `${faction.fBronze}` }
                ],
                footer: `${inF}`
            }
        })


    }
}