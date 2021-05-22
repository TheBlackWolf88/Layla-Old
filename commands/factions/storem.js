const economySchema = require("@schemas/economySchema")
const factionSchema = require("@schemas/factionSchema")

function makeItLookGreat(string) {
    string = string.toLowerCase()
    var temp = string.split(" ")
    var i = 0
    for (var element of temp) {
        temp[i] = element.charAt(0).toUpperCase() + element.slice(1)
        i++
    }
    var newString = temp.join(" ")
    return newString
}

function inFaction(user, message) {
    const fArray = ['King', 'Royal Assassin', 'Mage', 'Blacksmith', 'Professor']
    for (var item of fArray) {
        var role = message.guild.roles.cache.find(r => r.name == item)
            //console.log(role)
        if (user.roles.cache.has(role.id)) {
            return item
        }

    }
    return false

}

module.exports = {
    name: "storem",
    description: "Stores money in the treasury",
    async execute(client, message, args, Discord) {
        var type = args[0].toLowerCase()
        var amount = args[1]
        var userid = message.author.id
        var inF = inFaction(message.member, message)
        var purse = await economySchema.find({ _id: userid })
        if (Number(purse[type]) < amount) return message.channel.send({ embed: { description: "Invalid transaction" } })

        await economySchema.findOneAndUpdate({ _id: userid }, {
            $inc: {
                [type]: -amount
            }
        })
        type = "f" + makeItLookGreat(type)
        await factionSchema.findOneAndUpdate({ _id: inF }, {
            $inc: {
                [type]: amount
            }
        })
        type = type.replace("f", "")
        if (amount > 0) {
            return message.channel.send({ embed: { description: `You've placed ${amount} ${type} in the ${inF} treasury` } })
        } else {
            return message.channel.send({ embed: { description: `You've taken ${amount * -1} ${type} from the ${inF} treasury` } })
        }




    }
}