const inventorySchema = require('@schemas/inventorySchema')
const ecoSchema = require("@schemas/economySchema")
var craftlist = []
const forge = require("@json/forge.json")
var wdamage

function makeItLookGreat(string) {

    var temp = string.split(" ")
    var i = 0
    for (var element of temp) {
        temp[i] = element.charAt(0).toUpperCase() + element.slice(1)
        i++
    }
    var newString = temp.join(" ")
    return newString
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

module.exports = {
    name: 'forge',
    description: 'Forges a piece of weaponry or armor.',
    cooldown: 1800,
    async execute(client, message, Discord) {
        craftlist = []
        var filter = m => m.author.id == message.author.id;
        for (i = 0; i < forge.length; i++) {
            await message.channel.send(forge[i].question);
            try {
                var collectedMessages = await message.channel.awaitMessages(filter, { time: 100000, max: 1, errors: ['time'] });
            } catch (e) { return console.log(`Timeout at ${message.author}`); };
            var response = collectedMessages.first().content;
            craftlist.push(response.toLocaleLowerCase());
        }
        if (craftlist[2].toLowerCase().includes("1")) { //craftlist[2] = type
            wdamage = Math.round(craftlist[3] * 5.3)
            craftlist[2] = craftlist[2].replace("1", "")
        } else if (craftlist[2].toLowerCase().includes("2")) {
            wdamage = Math.round(craftlist[3] * 6.5)
            craftlist[2] = craftlist[2].replace("2", "")
        } else if (craftlist[2].toLowerCase().includes("bow")) {
            wdamage = Math.round(craftlist[3] * 5.9)
        }
        await inventorySchema.insertMany([{
            userid: message.author.id,
            itemid: craftlist[0],
            material: makeItLookGreat(craftlist[1]),
            type: makeItLookGreat(craftlist[2]),
            weight: craftlist[3],
            item_name: makeItLookGreat(craftlist[4]),
            qty: 1,
            damage: wdamage
        }])


        let xp = getRandomIntInclusive(18, 27)
        try {
            await ecoSchema.findOneAndUpdate({ _id: message.author.id }, { $inc: { exp: xp } })
        } finally {
            ecores = await ecoSchema.find({ _id: message.author.id })
                //console.log('nms')
            if (Number(ecores[0].toObject().exp) >= 100) {
                var exps = Number(ecores[0].toObject().exp)
                var sp = exps / 100
                sp = Math.floor(sp)
                var dxp = -sp * 100
                    //console.log(sp, dxp)
                await ecoSchema.findOneAndUpdate({ _id: message.author.id }, { $inc: { skillPoints: sp } })
                await ecoSchema.findOneAndUpdate({ _id: message.author.id }, { $inc: { exp: dxp } })

            }
            return message.channel.send({
                embed: {
                    description: `Sikeresen legyártottad a tárgyat! (+${xp} xp)`,
                    color: "#666666"
                }
            })
        }
    }
}