const mongo = require('../mongo');
const ecoSchema = require('../schemas/economySchema');
const { execute } = require('./buy');
const redis = require('../redis');
const { RedisClient } = require('redis');
const statSchema = require('../schemas/statSchema');
const inventorySchema = require('../schemas/inventorySchema')

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
const redisPrefix = 'fatigueR-'
var inv = []
const findItemInSomeonesInv = async(item, user) => {
    await mongo().then(async(mongoose) => {
        try {
            //console.log('Fetching...')
            inv = await inventorySchema.find({ userid: user, itemid: item })
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports = {
    name: 'read',
    cooldown: 1,
    description: 'Lets you gain exp by reading a book',
    async execute(client, message, args, Discord) {
        const guild = client.guilds.cache.get('780056708025679872')
        const roleid = guild.roles.cache.find(r => r.id = '811205026314977280')
        await findItemInSomeonesInv('Skillbook', message.author.id)
        redis.expire(async(key) => {
            if (key.startsWith(redisPrefix)) {
                const split = key.split('-')
                const id = split[1]
                const member = await message.guild.members.fetch(id)
                    //console.log('a')
                member.roles.remove(roleid)
            }
        })
        var xp = getRandomIntInclusive(20, 30);
        const id = message.author.id
        const redisClient = await redis();
        if (inv.length === 0) {
            return message.channel.send('Nincs nálad olyan könyv amiből tudnál tanulni.')
        } else {
            try {
                const redisKey = `${redisPrefix}${id}`
                redisClient.set(redisKey, 'true', 'EX', 600)
                message.member.roles.add(roleid)
            } finally {
                redisClient.quit()
            }
            await mongo().then(async(mongoose) => {
                try {
                    await ecoSchema.findOneAndUpdate({ _id: id }, { $inc: { exp: xp } })
                    await inventorySchema.findOneAndUpdate({ userid: message.author.id, itemid: 'Skillbook' }, { $inc: { qty: -1 } }).then(
                        async() => {
                            await findItemInSomeonesInv('Skillbook', message.author.id)
                            if (inv[0].toObject().qty === 0) {
                                await mongo().then(async function(mongoose) {
                                    try {
                                        await inventorySchema.deleteOne({ userid: message.author.id, itemid: 'Skillbook', qty: 0 });
                                    } finally {
                                        mongoose.connection.close();
                                    }
                                })
                            } else { return }
                        })
                } finally {
                    await mongo().then(async(mongoose) => {
                        try {
                            ecores = await ecoSchema.find({ _id: id })
                            console.log('nms')
                            if (Number(ecores[0].toObject().exp) >= 100) {
                                var exps = Number(ecores[0].toObject().exp)
                                var sp = exps / 100
                                sp = Math.floor(sp)
                                var dxp = -sp * 100
                                    //console.log(sp, dxp)
                                await ecoSchema.findOneAndUpdate({ _id: id }, { $inc: { skillPoints: sp } })
                                await ecoSchema.findOneAndUpdate({ _id: id }, { $inc: { exp: dxp } })

                            }
                        } catch (error) {
                            throw error;
                        }
                    })

                    mongoose.connection.close()
                }
            })
            return message.channel.send(`Elolvastál egy könyvet! (+${xp} exp)`)
        }



    }
}