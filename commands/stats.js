const mongo = require('../mongo')
const statSchema = require("../schemas/statSchema");
module.exports = {
    name: 'stats',
    description: 'Shows your stats',
    async execute(client, message, args) {
        var result
        const findStat = async() => {
            await mongo().then(async(mongoose) => {
                try {
                    //console.log('Fetching...')
                    result = await statSchema.find({ _id: message.author.id.toString() })
                } finally {
                    mongoose.connection.close()
                }
            })
        }
        await findStat()
        if (message.guild === null) {
            message.channel.send({
                embed: {
                    color: 11510963,
                    title: `${message.author.username}`,
                    fields: [{
                            name: "Attributes",
                            value: `
                    Health: ${result[0].toObject().health}
                    Mana: ${result[0].toObject().mana}
                    Stamina: ${result[0].toObject().stamina}
                    Dexterity: ${result[0].toObject().dex}
                    Strength: ${result[0].toObject().str}
                    Intelligence: ${result[0].toObject().int}`
                        },
                        {
                            name: "Fight skills",
                            value: `Two-handed: ${result[0].toObject().twohanded} 
                    One-handed: ${result[0].toObject().onehanded} 
                    Archery: ${result[0].toObject().archery} 
                    Light armor: ${result[0].toObject().lightarmor}
                    Heavy armor: ${result[0].toObject().heavyarmor}
                    Block:    ${result[0].toObject().block}`
                        },
                        {
                            name: "Magic skills",
                            value: `
                    Illusion: ${result[0].toObject().illusion}
                    Conjuration: ${result[0].toObject().conjuration}
                    Destruction: ${result[0].toObject().destruction}
                    Restoration: ${result[0].toObject().restoration}
                    Alteration: ${result[0].toObject().alteration}`
                        },
                        /*{
                            name: "Thief skills",
                            value: `
                    Sneak: ${result[0].toObject().sneak}
                    Lockpicking: ${result[0].toObject().lockpicking}
                    Pickpocket: ${result[0].toObject().pickpocket}`

                        },*/
                        {
                            name: "Crafting & Utility skills",
                            value: `
                    
                    Smithing: ${result[0].toObject().smithing}
                    
                    Alchemy: ${result[0].toObject().alchemy}`
                        }
                        /*Speech: ${result[0].toObject().speech}
                        Enchanting: ${result[0].toObject().enchanting}*/
                    ]
                }
            })
        } else {
            //clear(1)
            message.channel.send({
                embed: {
                    color: 11510963,
                    title: `${message.member.displayName}`,
                    fields: [{
                            name: "Attributes",
                            value: `
                Health: ${result[0].toObject().health}
                Mana: ${result[0].toObject().mana}
                Stamina: ${result[0].toObject().stamina}
                Dexterity: ${result[0].toObject().dex}
                Strength: ${result[0].toObject().str}
                Intelligence: ${result[0].toObject().int}`
                        },
                        {
                            name: "Fight skills",
                            value: `Two-handed: ${result[0].toObject().twohanded} 
                One-handed: ${result[0].toObject().onehanded} 
                Archery: ${result[0].toObject().archery} 
                Light armor: ${result[0].toObject().lightarmor}
                Heavy armor: ${result[0].toObject().heavyarmor}
                Block:    ${result[0].toObject().block}`
                        },
                        {
                            name: "Magic skills",
                            value: `
                Illusion: ${result[0].toObject().illusion}
                Conjuration: ${result[0].toObject().conjuration}
                Destruction: ${result[0].toObject().destruction}
                Restoration: ${result[0].toObject().restoration}
                Alteration: ${result[0].toObject().alteration}`
                        },
                        /*{
                        name: "Thief skills",
                        value: `
                Sneak: ${result[0].toObject().sneak}
                Lockpicking: ${result[0].toObject().lockpicking}
                Pickpocket: ${result[0].toObject().pickpocket}`

                    },*/
                        {
                            name: "Crafting & Utility skills",
                            value: `
                Smithing: ${result[0].toObject().smithing}
                Alchemy: ${result[0].toObject().alchemy}`
                        }
                        /*Speech: ${result[0].toObject().speech}
                        Enchanting: ${result[0].toObject().enchanting}*/
                    ]
                }
            })
        }
    }
}