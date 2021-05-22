const serverSchema = require('@schemas/serverSchema')


module.exports = {
    name: 'defarate',
    description: 'Defaults the changerate',
    async execute(client, message, args) {
        await serverSchema.deleteOne({ _id: 1 })
        await serverSchema.insertMany([{
            _id: 1,
            changeRateGold: 100,
            changeRateSilver: 100,
            changeRateBronze: 10000,
        }])
    }
}