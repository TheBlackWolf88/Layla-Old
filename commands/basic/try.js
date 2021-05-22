function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
module.exports = {
    name: "try",
    description: "50-50",
    async execute(client, message, args, Discord) {
        var rand = getRandomIntInclusive(1, 2)
        if (rand === 1) { //fail
            return message.channel.send({ embed: { color: " #FF0000", description: `Failed: ${args.join(" ")}` } })
        } else if (rand === 2) {
            return message.channel.send({ embed: { color: " #67F20F", description: `Success: ${args.join(" ")}` } })
        }
    }
}