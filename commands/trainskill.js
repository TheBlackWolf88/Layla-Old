const mongo = require('../mongo')
const statSchema = require('../schemas/statSchema')
const ecoSchema = require('../schemas/economySchema')
var ecores = []
var result = []

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
    name: 'trainskill',
    description: 'You can spend your SP with this command.',
    async execute(client, message, args) {
        await mongo().then(async(mongoose) => {
            try {
                //console.log('Fetching...')
                result = await statSchema.find({ _id: message.author.id.toString() })
                ecores = await ecoSchema.find({ _id: message.author.id.toString() })
            } finally {
                mongoose.connection.close()
            }
        })


        var skill = args[0];
        var amount = Number(args[1])
        var userID = message.author.id
        if (ecores[0].toObject().skillPoints < args[1]) {
            return message.channel.send(`Nincs elég skillpontod!`)
        } else {
            result = result[0].toObject()
            await mongo().then(async(mongoose) => {
                try {
                    await ecoSchema.findOneAndUpdate({ _id: userID }, {
                            $inc: {
                                'skillPoints': -amount
                            }
                        })
                        //console.log('Skill point withdrawed')
                } finally {
                    mongoose.connection.close()
                }
            })
            await mongo().then(async(mongoose) => {
                try {
                    await statSchema.findOneAndUpdate({ _id: userID }, {
                        $inc: {
                            [skill]: amount
                        }
                    })
                } finally {
                    mongoose.connection.close()
                }
            })
        }
        return message.channel.send({ embed: { description: `Your ${makeItLookGreat(skill)} skill increased by ${amount} points` } })
    }
}