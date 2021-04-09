const mongo = require("../mongo")
const factionSchema = require("../schemas/factionSchema")

function inFaction(user, message) {
    const fArray = ['King', 'Royal Assassin', 'Mage', 'Blacksmith', 'Professor']
    for (var item of fArray) {
        var role = message.guild.roles.cache.find(r => r.name == item)
            //console.log(role)
        if (user.roles.cache.has(role.id)) {
            //console.log("hai")
            user.roles.remove(role)
            return item
        }

    }
    return false

}
module.exports = {
    name: "fkick",
    description: "Kicks a member from a faction",
    async execute(client, message, args, Discord) {
        var member = message.mentions.members.first()
        if (!message.mentions.members.first()) return message.channel.send({ embed: { description: "You need to mention someone to kick!" } })
        var inF = inFaction(member, message)
            //console.log(inF)
        if (!inF) return message.channel.send({ embed: { description: "The one you're trying to kick is not in a faction" } })
        await mongo().then(async(mongoose) => {
            try {
                await factionSchema.findOneAndUpdate({ _id: inF }, { $pull: { members: member.displayName } })
            } finally {
                mongoose.connection.close()
            }
        })

        return message.channel.send({ embed: { description: `You kicked ${member.displayName} from this faction: ${inF}` } })


    }
}