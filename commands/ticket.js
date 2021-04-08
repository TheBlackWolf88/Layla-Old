const { execute } = require("../mongoQueries")

module.exports = {
    name: 'ticket',
    description: 'Opens a ticket',
    async execute(client, message) {
        var name = `ticket-${message.author.username.toLowerCase()}`
            //console.log(name)
        message.guild.channels.create(name, {
            type: 'text',
            permissionOverwrites: [{
                    id: message.author.id,
                    allow: "VIEW_CHANNEL"
                },
                {
                    id: message.guild.roles.everyone,
                    deny: "VIEW_CHANNEL"
                }
            ]

        }).then(c => {
            c.send({
                embed: {
                    color: 3447003,
                    description: "Write down your problem, and a developer will get back to you as soon as possible!",
                }
            })
        })

        var operators = ['417108579859038218']

        for (var user of operators) {
            var fetchedUser = await message.guild.members.fetch(user)
                //console.log(fetchedUser)
            fetchedUser.send("New ticket! :heart:")
        }
    }
}