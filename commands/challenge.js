const { execute } = require("./buy");

module.exports = {
    name: "challenge",
    aliases: "duel",
    description: "Challenges another player to a duel.",
    async execute(client, message, Discord) {
        var name = "Duel-" + message.member.displayName + " VS " + message.mentions.members.first().displayName;
        message.guild.channels.create(name, {
            type: 'text',
            parent: "827828106025893890",
            permissionOverwrites: [{
                    id: message.author.id,
                    allow: "VIEW_CHANNEL"
                },
                {
                    id: message.mentions.users.first().id,
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
                    color: "#991229",
                    description: "A párbaj elkezdődött!",
                }
            })
        })

        var operators = ['417108579859038218']

        for (var user of operators) {
            var fetchedUser = await message.guild.members.fetch(user)
                //console.log(fetchedUser)
            fetchedUser.send("DUEL VAAAAN! :heart: :crossed_swords:")
        }


    }
}