const mongo = require('../mongo')
const { execute } = require('../mongoQueries')
const statSchema = require('../schemas/statSchema')
var allStatArray = [
    'health',
    'mana',
    'stamina',
    'dex',
    'str',
    'int',
    'illusion',
    'conjuration',
    'destruction',
    'restoration',
    'alteration',
    'enchanting',
    'smithing',
    'heavyarmor',
    'block',
    'twohanded',
    'onehanded',
    'archery',
    'lightarmor',
    'sneak',
    'lockpicking',
    'pickpocket',
    'speech',
    'alchemy'
]
module.exports = {
    name: 'setskill',
    description: 'Sets your skill level to the given amount. Administrator privilage is required!',
    async execute(client, message, args, Discord) {
        console.log(args)
        var isIt = allStatArray.includes(args[1])
        console.log(isIt)
        if (!message.mentions.users.first() || !isIt || isNaN(args[2])) return message.channel.send('Hibás szintaxis! A helyes szintaxis: .setskill <@> <skillName> <amount>')
        var userID = message.mentions.users.first().id.toString()
        switch (args[1].toString().toLowerCase()) {
            case 'health':
                var skill = { health: Number(args[2]) };
                break;
            case 'mana':
                var skill = { mana: Number(args[2]) };
                break;
            case 'stamina':
                var skill = { stamina: Number(args[2]) };
                break;
            case 'dex':
                var skill = { dex: Number(args[2]) };
                break;
            case 'str':
                var skill = { str: Number(args[2]) };
                break;
            case 'int':
                var skill = { int: Number(args[2]) };
                break;
            case 'illusion':
                var skill = { illusion: Number(args[2]) };
                break;
            case 'conjuration':
                var skill = { conjuration: Number(args[2]) };
                break;
            case 'destruction':
                var skill = { destruction: Number(args[2]) };
                break;
            case 'restoration':
                var skill = { restoration: Number(args[2]) };
                break;
            case 'alteration':
                var skill = { alteration: Number(args[2]) };
                break;
            case 'enchanting':
                var skill = { enchanting: Number(args[2]) };
                break;
            case 'smithing':
                var skill = { smithing: Number(args[2]) };
                break;
            case 'heavyarmor':
                var skill = { heavyarmor: Number(args[2]) };
                break;
            case 'block':
                var skill = { block: Number(args[2]) };
                break;
            case 'twohanded':
                var skill = { twohanded: Number(args[2]) };
                break;
            case 'onehanded':
                var skill = { onehanded: Number(args[2]) };
                break;
            case 'archery':
                var skill = { archery: Number(args[2]) };
                break;
            case 'lightarmor':
                var skill = { lightarmor: Number(args[2]) };
                break;
            case 'sneak':
                var skill = { sneak: Number(args[2]) };
                break;
            case 'lockpicking':
                var skill = { lockpicking: Number(args[2]) };
                break;
            case 'pickpocket':
                var skill = { pickpocket: Number(args[2]) };
                break;
            case 'speech':
                var skill = { speech: Number(args[2]) };
                break;
            case 'alchemy':
                var skill = { alchemy: Number(args[2]) };
                break;

        }
        //console.log(skill)
        await mongo().then(async mongoose => {
                try {
                    //console.log('Fetching...')
                    await statSchema.findOneAndUpdate({ _id: userID }, skill)
                        .then(console.log(`Updated ${args[1]} to ${args[2]} at ${message.mentions.users.first()}`))

                } finally {
                    mongoose.connection.close()
                }
            }

        )
        return message.channel.send(`${message.member.displayName} ${args[1]} szintje ${args[2]}-ra/re módosítva!`)
    }
}