const mongo = require('../mongo')
const { addListener } = require('../schemas/monstersSchema')
const monSchema = require('../schemas/monstersSchema')
const serverSchema = require('../schemas/serverSchema')
module.exports = {
    name: 'test',
    async execute(client, message, args, Discord) {
        var str = "1broadsword"
        str = str.replace("1", "")
        console.log(str)


    }
}