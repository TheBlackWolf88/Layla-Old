const mongo = require('../mongo')
const { addListener } = require('../schemas/monstersSchema')
const monSchema = require('../schemas/monstersSchema')
const serverSchema = require('../schemas/serverSchema')
module.exports = {
    name: 'test',
    async execute(client, message, args, Discord) {

        function splitterino(str) {
            str = str.match(/[A-Z][a-z]+/g)
            str = str.join(" ")
            return str
        }

        console.log(splitterino(args[0]))


    }
}