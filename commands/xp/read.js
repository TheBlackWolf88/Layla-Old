const ecoSchema = require('@schemas/economySchema');
const inventorySchema = require('@schemas/inventorySchema')

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
const redisPrefix = 'fatigueR-'
var inv = []


module.exports = {
    name: 'read',
    cooldown: 1,
    description: 'Lets you gain exp by reading a book',
    async execute(client, message, args, Discord) {
        const guild = client.guilds.cache.get('780056708025679872')
        const roleid = guild.roles.cache.find(r => r.id = '811205026314977280')
        inv = await inventorySchema.find({ userid: message.author.id, itemid: "Skillbook" })
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
            await ecoSchema.findOneAndUpdate({ _id: id }, { $inc: { exp: xp } })
            await inventorySchema.findOneAndUpdate({ userid: message.author.id, itemid: 'Skillbook' }, { $inc: { qty: -1 } }).then(
                async() => {
                    inv = await inventorySchema.find({ userid: message.author.id, itemid: "Skillbook" })
                    if (inv[0].toObject().qty === 0) {
                        await inventorySchema.deleteOne({ userid: message.author.id, itemid: 'Skillbook', qty: 0 });

                    }
                    ecores = await ecoSchema.find({ _id: id })
                    if (Number(ecores[0].toObject().exp) >= 100) {
                        var exps = Number(ecores[0].toObject().exp)
                        var sp = exps / 100
                        sp = Math.floor(sp)
                        var dxp = -sp * 100
                        await ecoSchema.findOneAndUpdate({ _id: id }, { $inc: { skillPoints: sp } })
                        await ecoSchema.findOneAndUpdate({ _id: id }, { $inc: { exp: dxp } })






                    }


                    return message.channel.send(`Elolvastál egy könyvet! (+${xp} exp)`)
                })
        }

    }
}