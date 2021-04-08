const mongo = require('../mongo')
const ecoSchema = require('../schemas/economySchema')

module.exports = {
    name: 'setmoney',
    description: 'Sets your money to a specified amount',
    async execute(client, message, args) {
        if (!message.mentions.users.first() || isNaN(args[1]) || isNaN(args[2]) || isNaN(args[3])) return message.channel.send('Hibás szintaktika! Helyes szintaxis: .setmoney <@> <amountOfGold> <amountOfSilver> <amountOfBronze>')
        var userID = message.mentions.users.first().id
        var gold = { gold: Number(args[1]) }
        var silver = { silver: Number(args[2]) }
        var bronze = { bronze: Number(args[3]) }
        await mongo().then(async(mongoose) => {
            try {
                await ecoSchema.findOneAndUpdate({ _id: userID }, gold)
                await ecoSchema.findOneAndUpdate({ _id: userID }, silver)
                await ecoSchema.findOneAndUpdate({ _id: userID }, bronze)
                console.log('Money set.')
            } finally {
                mongoose.connection.close()
            }
        });
        return message.channel.send(`${message.mentions.members.first().displayName} pénze felülírva!`);
    }
}