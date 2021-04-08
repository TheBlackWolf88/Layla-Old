const mongo = require('../mongo')
const serverSchema = require('../schemas/serverSchema')
const { execute } = require('./shop')

module.exports = {
    name: 'defarate',
    description: 'Defaults the changerate',
    async execute(client, message, args) {
        await mongo().then(async(mongoose) => {
            try {
                await serverSchema.deleteOne({ _id: 1 })
                await serverSchema.insertMany([{
                    _id: 1,
                    changeRateGold: 100,
                    changeRateSilver: 100,
                    changeRateBronze: 10000,
                }])
            } finally {
                mongoose.connection.close()
            }
        })
    }
}