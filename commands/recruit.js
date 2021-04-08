const mongo = require("../mongo")
const factionSchema = require("../schemas/factionSchema")
var colorHex
var bool = false

function makeItLookGreat(string) {

    var temp = string.split(" ")
    var i = 0
    for (var element of temp) {
        temp[i] = element.charAt(0).toUpperCase() + element.slice(1)
        i++
    }
    var newString = temp.join(" ")
    return newString
}
module.exports = {
    name: "recruit",
    description: "Adds a member to a faction",
    async execute(client, message, args, Discord) {
        args[1] = args[1].toLowerCase()
        switch (args[1]) {
            case "blacksmith":
                colorHex = "#666666"
                break
            case "mage":
                colorHex = "#2791FF"
                break
            case "professor":
                colorHex = "#AC8160"
                break
            case "royalassassin":
                colorHex = "#D82B00"
                break
            case "king":
                colorHex = "#FFD700"
                break



        }
        if (args[1] == "royalassassin") args[1] = "Royal Assassin"
        let member = message.mentions.members.first()
        let dname = member.displayName
        args[1] = makeItLookGreat(args[1])
        let role = message.guild.roles.cache.find(role => role.name == args[1])
        if (!role) return message.channel.send("Nem létező frakció!")
        member.roles.add(role)
        await mongo().then(async(mongoose) => {
            try {
                await factionSchema.findOneAndUpdate({ _id: args[1] }, { $push: { members: dname } }).then(bool = true)
            } finally {
                mongoose.connection.close()
            }
        })

        return message.channel.send({
            embed: {
                color: colorHex,
                description: `Sikeresen felvetted ${dname}-et a frakciódba! (${args[1]})`
            }
        })

    }

}