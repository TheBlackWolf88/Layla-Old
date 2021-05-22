const serverSchema = require('@schemas/serverSchema')
var rates = []
const rateQuery = async() => {
    rates = await serverSchema.find({ _id: 1 })
}

module.exports = {
    name: 'changerate',
    description: 'Changes the rate. King only',
    async execute(client, message, args) {
        await rateQuery()
        var sRate = rates[0].toObject().changeRateSilver * args[1]
        var gRate = rates[0].toObject().changeRateGold * args[1]
        switch (args[0]) {
            case 'silver':
                if (90 < Number(args[1]) && Number(args[1]) < 115) {
                    await serverSchema.findOneAndUpdate({}, { changeRateSilver: args[2] })
                } else {
                    return message.channel.send('Error 3')
                }
                await serverSchema.findOneAndUpdate({ _id: 1 }, { changeRateBronze: sRate })
                break;
            case 'gold':
                if (90 < Number(args[2]) && Number(args[1]) < 115) {
                    await serverSchema.findOneAndUpdate({}, { changeRateGold: args[2] })
                } else {
                    return message.channel.send('Error 3')
                }
                await serverSchema.findOneAndUpdate({ _id: 1 }, { changeRateBronze: gRate })
                break;
        }
    }
}