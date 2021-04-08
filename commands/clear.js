module.exports =  {
    name: 'clear',
    description: 'Deletes x amount of messages',
    async execute(client, message, args) {
        let clearAmount = args[0]
        if (!clearAmount) return message.reply("írd be a törlendő üzenetek számát!");

        if (isNaN(clearAmount)) return message.reply("számot írj be!");

        if (clearAmount > 100) return message.reply("legfeljebb 100 üzenetet törölhetsz!!");

        if (clearAmount < 1) return message.reply("ha nem akarsz törölni, akkor ne is próbáld meg!");

        await message.channel.messages.fetch({ limit: clearAmount }).then(messages => {
            message.channel.bulkDelete(messages);
        });
    }
}