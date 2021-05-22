const inventorySchema = require('@schemas/inventorySchema')
const statSchema = require("@schemas/statSchema")
const ecoSchema = require("@schemas/economySchema")
var craftlist = []
const alchemy = require("@json/alchemy.json")
var inv = []
var stats = []
var potion
const findStat = async(user) => {
    stats = await statSchema.find({ _id: user })
}
const findPotionInInv = async(user, item, potency) => {
    inv = await inventorySchema.find({ userid: user, itemid: item, potency: potency })
}
const findItemInInv = async(user, item) => {
    inv = await inventorySchema.find({ userid: user, itemid: item })
}

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
    name: 'brew',
    description: 'Brews a potion',
    cooldown: 1,
    async execute(client, message, Discord) {
        craftlist = []
        var filter = m => m.author.id == message.author.id;
        for (i = 0; i < alchemy.length; i++) {
            await message.channel.send(alchemy[i].question);
            try {
                var collectedMessages = await message.channel.awaitMessages(filter, { time: 100000, max: 1, errors: ['time'] });
            } catch (e) { return console.log(`Timeout at ${message.author}`); };
            var response = collectedMessages.first().content;
            craftlist.push(response.toLocaleLowerCase());
        }
        await findStat(message.author.id)
        var potency = stats[0].toObject().alchemy + 5

        if (craftlist[0] === "blue mountain flower" && craftlist[1] === "kufara" || craftlist[0] === "kufara" && craftlist[1] === "blue mountain flower") {
            potion = "Health Potion"
        } else if (craftlist[0] === "catnip" && craftlist[1] === "yangu" || craftlist[0] === "yangu" && craftlist[1] === "catnip") {
            potion = "Mana Potion"
        } else if (craftlist[0] === "ropa" && craftlist[1] === "kudonha" || craftlist[0] === "kudonha" && craftlist[1] === "ropa") {
            potion = "Stamina Potion"
        } else if (craftlist[0] === "chokwadi" && craftlist[1] === "rosehips" || craftlist[0] === "rosehips" && craftlist[1] === "chokwadi") {
            potion = "Cure Disease Potion"
        } else {
            return message.channel.send("Wrong recipe, fool!")
        }

        var hone = makeItLookGreat(craftlist[0])
        var htwo = makeItLookGreat(craftlist[1])
        await findItemInInv(message.author.id, hone)
        if (inv.length === 0) {
            return message.channel.send("Insufficent ingredients")
        } else {
            await findItemInInv(message.author.id, htwo)
            if (inv.length === 0) {
                return message.channel.send("Insufficent ingredients")
            } else {
                //console.log("passed")
            }
        }
        await findPotionInInv(message.author.id, potion, potency)
        if (inv.length === 0) {
            await inventorySchema.insertMany([{
                userid: message.author.id.toString(),
                itemid: potion,
                qty: 1,
                type: "potion",
                potency: potency

            }])

        } else {
            await inventorySchema.findOneAndUpdate({ userid: message.author.id, itemid: potion, potency: potency }, { $inc: { qty: 1 } })
        }
        //első levonás
        await findItemInInv(message.author.id, hone)
            //console.log(inv)
        if (inv[0].toObject().qty === 1) {
            await inventorySchema.deleteOne({ userid: message.author.id, itemid: hone })

        } else {
            await inventorySchema.findOneAndUpdate({ userid: message.author.id, itemid: hone }, { $inc: { qty: -1 } })
        }
        //második levonás
        await findItemInInv(message.author.id, htwo)
            //console.log(inv)
        if (inv[0].toObject().qty === 1) {
            await inventorySchema.deleteOne({ userid: message.author.id, itemid: htwo })
        } else {
            await inventorySchema.findOneAndUpdate({ userid: message.author.id, itemid: htwo }, { $inc: { qty: -1 } })
        }

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
                    description: `Sikeresen lefőzted a bájitalt! (+${xp} xp)`,
                    color: "#687BBE"
                }
            })
        }
    }
}