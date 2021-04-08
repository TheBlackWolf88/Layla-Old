const mongo = require('../mongo')
const serverSchema = require('../schemas/serverSchema')
var rates = []
const rateQuery = async () => {
    await mongo().then(async (mongoose) => {
        try {
            rates = await serverSchema.find({ _id: 1 })
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports = {
    name: 'changerate',
    description: 'Changes the rate. King only',
    async execute(client, message, args){
        await rateQuery()
            var sRate = rates[0].toObject().changeRateSilver * args[1]
            var gRate = rates[0].toObject().changeRateGold * args[1]
            switch (args[0]) {
                case 'silver':
                    await mongo().then(async (mongoose) => {
                        try {
                            //console.log(Number(args[2]))
                            if (90 < Number(args[1]) && Number(args[1]) < 115) {
                                await serverSchema.findOneAndUpdate({}, { changeRateSilver: args[2] })
                            }
                            else {
                                return message.channel.send('Error 3')
                            }
                            await serverSchema.findOneAndUpdate({ _id: 1 }, { changeRateBronze: sRate })

                        } finally {
                            mongoose.connection.close()
                        }
                    })
                    break;
                case 'gold':
                    await mongo().then(async (mongoose) => {
                        try {
                            //console.log(Number(args[2]))
                            if (90 < Number(args[2]) && Number(args[1]) < 115) {
                                await serverSchema.findOneAndUpdate({}, { changeRateGold: args[2] })
                            }
                            else {
                                return message.channel.send('Error 3')
                            }
                            await serverSchema.findOneAndUpdate({ _id: 1 }, { changeRateBronze: gRate })

                        } finally {
                            mongoose.connection.close()
                        }
                    })
                    break;
            }
    }
}