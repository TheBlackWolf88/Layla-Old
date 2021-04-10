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

function inFaction(user, mention, message) {
    const fArray = ['King', 'Royal Assassin', 'Mage', 'Blacksmith', 'Professor']
    for (var item of fArray) {
        var role = message.guild.roles.cache.find(r => r.name == item)

        if (user.roles.cache.has(role.id)) {
            //console.log(role)
            //console.log("hai")
            mention.roles.add(role)
            return item
        }

    }
    return false

}
module.exports = {
    name: "recruit",
    description: "Adds a member to a faction",
    async execute(client, message, args, Discord) {
        if (!message.member.roles.cache.has("780340586183786496")) return message.channel.send({ embed: { description: "Only the leader can recruit!" } })
        let member = message.mentions.members.first()
        let dname = member.displayName
        var inF = inFaction(message.member, message.mentions.members.first(), message)
        if (!inF) return
            //console.log(inF)
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

        await mongo().then(async(mongoose) => {
            try {
                await factionSchema.findOneAndUpdate({ _id: inF }, { $push: { members: dname } }).then(bool = true)
            } finally {
                mongoose.connection.close()
            }
        })

        return message.channel.send({
            embed: {
                color: colorHex,
                description: `Sikeresen felvetted ${dname}-et a frakciódba! (${inF})`
            }
        })

    }

}