require("module-alias/register")
const Discord = require('discord.js');
//const loadfeatures = require('./features/loadfeatures');
const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION', 'CHANNEL'] });
const suggestions = require("@root/suggestions")
const config = require("@json/config.json")


client.commands = new Discord.Collection()
client.events = new Discord.Collection

const handlerArray = ['command_handler', 'event_handler']
handlerArray.forEach(handler => {
    require(`@handlers/${handler}`)(client, Discord)
});
//loadfeatures(client)
//suggestions(client)

client.login(config.Ttoken)