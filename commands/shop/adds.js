const gshopSchema = require('@schemas/generalshopSchema')

module.exports = {
    name: 'adds',
    description: 'Adds an item to shop',
    async execute(client, message, args) {
        var itemid = args[0].charAt(0).toUpperCase() + args[0].slice(1)
        await gshopSchema.insertMany([{
            _id: itemid,
            type: args[1],
            price: args[2]
        }])


    }
}