const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION', 'CHANNEL'] });

client.commands = new Discord.Collection()
client.events = new Discord.Collection

const handlerArray = ['command_handler', 'event_handler']
handlerArray.forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
});

client.login('NTYxOTAzMzQxMjMyMzI0NjE5.XKC_RA.KfxKwrEDT0QJaeL_y1cS-38E9Mg')

/*const kingrole = '780057018458570763'
const adminrole = '780449029489295384'
const smithrole = '780075087205498880'
const magerole = '780074773387804682'
const royalassasinrole = '780478867496108062'
 const profrole = '780059172506959923'*/