const mongo = require('../mongo')
const ecoSchema = require('../schemas/economySchema')
var ecores = []
const coinTypes = ['gold', 'silver', 'bronze'];
const findEco = async(user) => {
    await mongo().then(async(mongoose) => {
        try {
            //console.log('Fetching...')
            ecores = await ecoSchema.find({ _id: user })
                //console.log(ecores)

        } finally {
            mongoose.connection.close()
        }
    })
}

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
    name: 'transfer',
    description: 'Allows you to give money to another player',
    async execute(client, message, args) {
        if (!message.mentions.users.first() || !coinTypes.includes(args[1] || isNaN(args[2]))) return message.channel.send('Hibás szintaktika! Helyes használat: .transfer <@> <coinType> <amount>')
        if (message.mentions.users.first() === message.author) return ('Nem adhatsz magadnak pénzt!')
        var from = message.author.id
        var to = message.mentions.users.first().id
        var amount = Number(args[2])
        await findEco(message.author.id);
        var type = args[1]
        ecores = ecores[0].toObject()
        if (amount <= ecores[type]) {
            await mongo().then(async(mongoose) => {
                try {
                    await ecoSchema.findOneAndUpdate({ _id: from }, {
                        $inc: {
                            [type]: -amount
                        }
                    })
                } finally {
                    mongoose.connection.close()
                }
            })
            await mongo().then(async(mongoose) => {
                try {
                    await ecoSchema.findOneAndUpdate({ _id: to }, {
                        $inc: {
                            [type]: amount
                        }
                    })
                } finally {
                    mongoose.connection.close()
                }
            })
        } else {
            return message.channel.send({ embed: { description: `You don't have enough: ${makeItLookGreat(type)}` } })
        }
        return message.channel.send({ embed: { description: `${message.member.displayName} gave ${amount} ${makeItLookGreat(type)} to ${message.mentions.members.first().displayName}` } })
    }
}