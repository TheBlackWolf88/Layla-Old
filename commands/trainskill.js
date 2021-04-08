const mongo = require('../mongo')
const statSchema = require('../schemas/statSchema')
const ecoSchema = require('../schemas/economySchema')
var ecores = []
var result = []

module.exports = {
    name: 'trainskill',
    description: 'You can spend your SP with this command.',
    async execute(client, message, args) {
        await mongo().then(async(mongoose) => {
            try {
                //console.log('Fetching...')
                result = await statSchema.find({ _id: message.author.id.toString() })
            } finally {
                mongoose.connection.close()
            }
        })
        await mongo().then(async(mongoose) => {
            try {
                //console.log('Fetching...')
                ecores = await ecoSchema.find({ _id: message.author.id.toString() })
                    //console.log(ecores)

            } finally {
                mongoose.connection.close()
            }
        })

        var skill;
        var amount = Number(args[1])
        var userID = message.author.id
        if (ecores[0].skillPoints < args[1]) {
            return message.channel.send(`Nincs elég skillpontod!`)
        } else {
            switch (args[0]) { //args1 = skillName; args1 = incAmount
                case 'health':
                    return message.channel.send('Ezt nem fejlesztheted!')
                case 'mana':
                    return message.channel.send('Ezt nem fejlesztheted!')
                case 'stamina':
                    return message.channel.send('Ezt nem fejlesztheted!')
                case 'dex':
                    skill = { dex: result[0].toObject().dex + Number(args[1]) };
                    break;
                case 'str':
                    skill = { str: result[0].toObject().str + Number(args[1]) };
                    break;
                case 'int':
                    skill = { int: result[0].toObject().int + Number(args[1]) };
                    break;
                case 'illusion':
                    skill = { illusion: result[0].toObject().illusion + Number(args[1]) };
                    break;
                case 'conjuration':
                    skill = { conjuration: result[0].toObject().conjuration + Number(args[1]) };
                    break;
                case 'destruction':
                    skill = { destruction: result[0].toObject().destruction + Number(args[1]) };
                    break;
                case 'restoration':
                    skill = { restoration: result[0].toObject().restoration + Number(args[1]) };
                    break;
                case 'alteration':
                    skill = { alteration: result[0].toObject().alteration + Number(args[1]) };
                    break;
                case 'enchanting':
                    skill = { enchanting: result[0].toObject().enchanting + Number(args[1]) };
                    break;
                case 'smithing':
                    skill = { smithing: result[0].toObject().smithing + Number(args[1]) };
                    break;
                case 'heavyarmor':
                    skill = { heavyarmor: result[0].toObject().heavyarmor + Number(args[1]) };
                    break;
                case 'block':
                    skill = { block: result[0].toObject().block + Number(args[1]) };
                    break;
                case 'twohanded':
                    skill = { twohanded: result[0].toObject().twohanded + Number(args[1]) };
                    break;
                case 'onehanded':
                    skill = { onehanded: result[0].toObject().onehanded + Number(args[1]) };
                    break;
                case 'archery':
                    skill = { archery: result[0].toObject().archery + Number(args[1]) };
                    break;
                case 'lightarmor':
                    skill = { lightarmor: result[0].toObject().lightarmor + Number(args[1]) };
                    break;
                case 'sneak':
                    skill = { sneak: result[0].toObject().sneak + Number(args[1]) };
                    break;
                case 'lockpicking':
                    skill = { lockpicking: result[0].toObject().lockpicking + Number(args[1]) };
                    break;
                case 'pickpocket':
                    skill = { pickpocket: result[0].toObject().pickpocket + Number(args[1]) };
                    break;
                case 'speech':
                    skill = { speech: result[0].toObject().speech + Number(args[1]) };
                    break;
                case 'alchemy':
                    skill = { alchemy: result[0].toObject().alchemy + Number(args[1]) };
                    break;
            }
            await mongo().then(async(mongoose) => {
                try {
                    await ecoSchema.findOneAndUpdate({ _id: userID }, {
                        $inc: {
                            'skillPoints': -amount
                        }
                    })
                    console.log('Skill point withdrawed')
                } finally {
                    mongoose.connection.close()
                }
            })
            await mongo().then(async(mongoose) => {
                try {
                    await statSchema.findOneAndUpdate({ _id: userID }, skill)
                } finally {
                    mongoose.connection.close()
                }
            })
        }
        return message.channel.send(`${args[0]} növelve ${args[1]} ponttal. (${message.member.displayName})`)
    }
}