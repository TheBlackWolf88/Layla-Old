const mongo = require('../mongo')
const serverSchema = require('../schemas/serverSchema')
const ecoSchema = require('../schemas/economySchema')
const { execute } = require('./shop');
var ecores = [];
var rates = []
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
const rateQuery = async() => {
    await mongo().then(async(mongoose) => {
        try {
            rates = await serverSchema.find({ _id: 1 })
        } finally {
            mongoose.connection.close()
        }
    })
}
module.exports = {
    name: 'changemoney',
    description: 'Changes your money around', //changemoney <from> <to> <amount> 
    async execute(client, message, args) {
        await rateQuery()
        await findEco(message.author.id);
        var userbronze = ecores[0].toObject().bronze
        var usersilver = ecores[0].toObject().silver
        var usergold = ecores[0].toObject().gold
        var from = args[0]
        var to = args[1]
        var amount = args[2]
        var changesilver = rates[0].toObject().changeRateSilver
        var changegold = rates[0].toObject().changeRateGold
        var changebronze = rates[0].toObject().changeRateBronze
        switch (from) {
            case 'bronze':
                switch (to) {
                    case 'silver':
                        if (userbronze >= amount && amount / changesilver % 1 === 0) {
                            await mongo().then(async(mongoose) => {
                                try {

                                    await ecoSchema.findOneAndUpdate({ _id: message.author.id }, { $inc: { bronze: -amount } })
                                    await ecoSchema.findOneAndUpdate({ _id: message.author.id }, { $inc: { silver: amount / changesilver } })
                                    return message.channel.send(`Váltottál ${amount/changesilver} ${to} (${from}ból)`)

                                } finally {
                                    mongoose.connection.close()
                                }
                            })

                        } else {
                            return message.reply(`Nincs elég beváltandód, szükséges: ${changesilver * amount}`)
                        }
                        break;
                    case 'gold':
                        if (userbronze >= amount && amount / changebronze % 1 === 0) {
                            await mongo().then(async(mongoose) => {
                                try {

                                    await ecoSchema.findOneAndUpdate({ _id: message.author.id }, { $inc: { bronze: -amount } })
                                    await ecoSchema.findOneAndUpdate({ _id: message.author.id }, { $inc: { gold: amount / changebronze } })
                                    return message.channel.send(`Váltottál ${amount/changebronze} ${to} (${from}ból)`)

                                } finally {
                                    mongoose.connection.close()
                                }
                            })
                        } else {
                            return message.reply(`Nincs elég beváltandód, szükséges: ${changesilver * amount}`)
                        }
                        break;
                }
                break;
            case 'silver':
                switch (to) {
                    case 'bronze':
                        if (usersilver >= amount) {
                            await mongo().then(async(mongoose) => {
                                try {

                                    await ecoSchema.findOneAndUpdate({ _id: message.author.id }, { $inc: { silver: -amount } })
                                    await ecoSchema.findOneAndUpdate({ _id: message.author.id }, { $inc: { bronze: amount * changesilver } })
                                    return message.channel.send(`Váltottál ${amount*changesilver} ${to} (${from}ból)`)

                                } finally {
                                    mongoose.connection.close()
                                }
                            })
                        } else {
                            return message.reply(`Nincs elég beváltandód, szükséges: ${amount}`)
                        }
                        break;
                    case 'gold':
                        if (usersilver >= amount && amount / changegold % 1 === 0) {
                            await mongo().then(async(mongoose) => {
                                try {

                                    await ecoSchema.findOneAndUpdate({ _id: message.author.id }, { $inc: { silver: -amount } })
                                    await ecoSchema.findOneAndUpdate({ _id: message.author.id }, { $inc: { gold: amount / changegold } })
                                    return message.channel.send(`Váltottál ${amount/changegold} ${to} (${from}ból)`)
                                } finally {
                                    mongoose.connection.close()
                                }
                            })
                        } else {
                            return message.reply(`Nincs elég beváltandód, szükséges: ${changesilver * amount}`)
                        }
                        break;
                }
                break;
            case 'gold':
                switch (to) {
                    case 'bronze':
                        if (usergold >= amount) {
                            await mongo().then(async(mongoose) => {
                                try {

                                    await ecoSchema.findOneAndUpdate({ _id: message.author.id }, { $inc: { gold: -amount } })
                                    await ecoSchema.findOneAndUpdate({ _id: message.author.id }, { $inc: { bronze: amount * changebronze } })
                                    return message.channel.send(`Váltottál ${amount*changebronze} ${to} (${from}ból)`)

                                } finally {
                                    mongoose.connection.close()
                                }
                            })

                        } else {
                            return message.reply(`Nincs elég beváltandód, szükséges: ${changesilver * amount}`)
                        }
                        break;
                    case 'silver':
                        if (usergold >= amount) {
                            await mongo().then(async(mongoose) => {
                                try {

                                    await ecoSchema.findOneAndUpdate({ _id: message.author.id }, { $inc: { gold: -amount } })
                                    await ecoSchema.findOneAndUpdate({ _id: message.author.id }, { $inc: { silver: amount * changegold } })
                                    return message.channel.send(`Váltottál ${amount*changegold} ${to} (${from}ból)`)

                                } finally {
                                    mongoose.connection.close()
                                }
                            })
                        } else {
                            return message.reply(`Nincs elég beváltandód, szükséges: ${amount}`)
                        }
                        break;
                }
        }
    }
}