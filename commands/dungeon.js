const mongo = require('../mongo')
const monSchema = require('../schemas/monstersSchema')
var monsters = []
let dunglevel

async function genMonster(rarity) {
    let selection = []
        //console.log(rarity)
    switch (rarity) {
        case 'common':
            await mongo().then(async(mongoose) => {
                try {
                    selection = await monSchema.find({ rarity: "common" })
                } finally {
                    mongoose.connection.close()
                }

            })
            break

        case 'uncommon':
            await mongo().then(async(mongoose) => {
                try {
                    selection = await monSchema.find({ $or: [{ rarity: "common" }, { rarity: "uncommon" }] })
                } finally {
                    mongoose.connection.close()
                }

            })
            break

        case 'rare':
            await mongo().then(async(mongoose) => {
                try {
                    selection = await monSchema.find({ $or: [{ rarity: "uncommon" }, { rarity: "rare" }] })
                } finally {
                    mongoose.connection.close()
                }

            })

    }
    //console.log(selection, selection.length)
    let randomnum = Math.floor(Math.random() * selection.length)
    let monster = selection[randomnum].toObject()
        //console.log(monster)
    if (monster) return monster;
    else return 0

}

module.exports = {
    name: 'dungeon',
    aliases: 'dung',
    cooldown: 0,
    async execute(client, message, args, Discord) {
        await mongo().then(async(mongoose) => {
                try {
                    monsters = await monSchema.find()
                } finally {
                    mongoose.connection.close()
                }
            })
            //console.log(monsters)
        if (!args[0]) { dunglevel = 1 } else { dunglevel = args[0] }
        let monsterlevel = Math.round(dunglevel * Math.random() * 10)
            //console.log(monsterlevel, dunglevel)
            //await genMonster('common')
        let i = 1

        let monster = await genMonster('common')
        let atk = Math.round(monster.baseatk + monsterlevel * 0.7)
        let hp = Math.round(monster.baseHP + monsterlevel * 0.7)
        message.channel.send({
            embed: {
                color: "b2071d",
                footer: { text: `${i}. kör` },
                title: `LVL ${dunglevel} dungeon`,
                fields: [{
                    name: `${monster._id} (lvl ${monsterlevel})`,
                    value: `Atk: ${atk} \n HP: ${hp}`
                }]
            }
        })
    }
}