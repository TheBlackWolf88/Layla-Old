const mongo = require('../mongo')
const ecoSchema = require('../schemas/economySchema')
const coinTypes = ['arany', 'ezüst', 'bronz'];

module.exports = {
    name: 'givemoney',
    description: 'Gives a specified amount to the player from a specified currency type',
    async execute(client, message, args) {
        if (!message.mentions.users.first() || !coinTypes.includes(args[1])) return message.channel.send('Hibás szintaktika!')
        var userID = message.mentions.users.first().id
        switch (args[1]) {
            case 'arany':
                await mongo().then(async(mongoose) => {
                    try {
                        await ecoSchema.findOneAndUpdate({ _id: userID }, {
                                $inc: {
                                    gold: Number(args[2])
                                }
                            })
                            //console.log('Money given')
                    } finally {
                        mongoose.connection.close()
                    }
                })
            case 'ezüst':
                await mongo().then(async(mongoose) => {
                    try {
                        await ecoSchema.findOneAndUpdate({ _id: userID }, {
                                $inc: {
                                    silver: Number(args[2])
                                }
                            })
                            //console.log('Money given')
                    } finally {
                        mongoose.connection.close()
                    }
                })
            case 'bronz':
                await mongo().then(async(mongoose) => {
                    try {
                        await ecoSchema.findOneAndUpdate({ _id: userID }, {
                                $inc: {
                                    bronze: Number(args[2])
                                }
                            })
                            //console.log('Money given')
                    } finally {
                        mongoose.connection.close()
                    }
                })
        }
        return message.channel.send(`${message.member.displayName} kapott ${args[2]} ${args[1]}-t `)

    }
}