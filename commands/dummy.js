const mongo = require('../mongo')
const statSchema = require('../schemas/statSchema')
const ecoSchema = require('../schemas/economySchema')
var ecores = []
var stats = []
const findStat = async(user) => {
    await mongo().then(async(mongoose) => {
        try {
            //console.log('Fetching...')
            stats = await statSchema.find({ _id: user })
        } finally {
            mongoose.connection.close()
        }
    })
}
const findEco = async(user) => {
    await mongo().then(async(mongoose) => {
        try {
            //console.log('Fetching...')
            ecores = await ecoSchema.find({ _id: user })
                //console.log(ecores)

        } finally {
            mongoose.connection.close()
        }
    })
}

const redis = require('../redis')
const redisPrefix = 'fatigueD-'
module.exports = {
    name: 'dummy',
    cooldown: 3600,
    description: 'Train with a dummy and get xp',
    async execute(client, message, args) {
        redis.expire(async(key) => {
            if (key.startsWith(redisPrefix)) {
                const split = key.split('-')
                const id = split[1]
                const member = await message.guild.members.fetch(id)
                member.roles.remove(roleid)
            }
        })
        const guild = client.guilds.cache.get('780056708025679872')
        const roleid = guild.roles.cache.find(r => r.id = '811205026314977280')
        await findEco(message.author.id)
        if (ecores[0].toObject().hasDummy === true) {
            await findStat(message.author.id)
            var stamina = stats[0].toObject().stamina
            var mana = stats[0].toObject().mana
            var time;
            var xp;
            var id = message.author.id
            const redisClient = await redis();
            if (stamina >= mana) {
                time = 3600 + stamina * 10;
                xp = time / 125
            } else {
                time = 3600 + mana * 10;
                xp = time / 125
            }
            try {
                const redisKey = `${redisPrefix}${id}`
                redisClient.set(redisKey, 'true', 'EX', 10)
                message.member.roles.add(roleid)
            } finally {
                redisClient.quit()
            }
            //await findEco(id)
            await mongo().then(async(mongoose) => {
                try {
                    await ecoSchema.findOneAndUpdate({ _id: id }, { $inc: { exp: Math.floor(xp) } })
                } finally {
                    ecores = await ecoSchema.find({ _id: id })
                    if (Number(ecores[0].toObject().exp) >= 100) {
                        var exps = Number(ecores[0].toObject().exp)
                        var sp = exps / 100
                        sp = Math.floor(sp)
                        var dxp = -sp * 100
                            //console.log(sp, dxp)
                        await ecoSchema.findOneAndUpdate({ _id: id }, { $inc: { skillPoints: sp } })
                        await ecoSchema.findOneAndUpdate({ _id: id }, { $inc: { exp: dxp } })

                    }
                    mongoose.connection.close()
                }
            })
            return message.channel.send({ embed: { color: '2acaea', description: `${time / 60} percet gyakoroltál! (+${Math.floor(xp)} exp)` } })
        } else {
            return message.channel.send({ embed: { color: '2acaea', description: 'Venned kell egy gyakorlóbábút, hogy gyakorolhass!', } })
        }

    }
}