const mongo = require('../mongo')
const ecoSchema = require('../schemas/economySchema')
var ecores = []
const coinTypes = ['arany', 'ezüst', 'bronz'];
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
        switch (args[1]) {
            case 'arany':
                if (amount <= ecores[0].toObject().gold) {
                    await mongo().then(async(mongoose) => {
                        try {
                            await ecoSchema.findOneAndUpdate({ _id: from }, { $inc: { gold: -amount } })
                        } finally {
                            mongoose.connection.close()
                        }
                    })
                    await mongo().then(async(mongoose) => {
                        try {
                            await ecoSchema.findOneAndUpdate({ _id: to }, { $inc: { gold: amount } })
                        } finally {
                            mongoose.connection.close()
                        }
                    })
                } else {
                    return message.channel.send(`Nincs elég ${args[1]}-d`)
                }
                break;
            case 'ezüst':
                if (amount <= ecores[0].toObject().silver) {
                    await mongo().then(async(mongoose) => {
                        try {
                            await ecoSchema.findOneAndUpdate({ _id: from }, { $inc: { silver: -amount } })
                        } finally {
                            mongoose.connection.close()
                        }
                    })
                    await mongo().then(async(mongoose) => {
                        try {
                            await ecoSchema.findOneAndUpdate({ _id: to }, { $inc: { silver: amount } })
                        } finally {
                            mongoose.connection.close()
                        }
                    })
                } else {
                    return message.channel.send(`Nincs elég ${args[1]}-d`)
                }
                break;
            case 'bronz':
                if (amount <= ecores[0].toObject().bronze) {
                    await mongo().then(async(mongoose) => {
                        try {
                            await ecoSchema.findOneAndUpdate({ _id: from }, { $inc: { bronze: -amount } })
                        } finally {
                            mongoose.connection.close()
                        }
                    })
                    await mongo().then(async(mongoose) => {
                        try {
                            await ecoSchema.findOneAndUpdate({ _id: to }, { $inc: { bronze: amount } })
                        } finally {
                            mongoose.connection.close()
                        }
                    })
                } else {
                    return message.channel.send(`Nincs elég ${args[1]}-d`)
                }
                break;
        }
        return message.channel.send(`${message.member.displayName} átadott ${amount} ${args[1]}-t ${message.mentions.members.first().displayName}-nak/nek.`)
    }
}