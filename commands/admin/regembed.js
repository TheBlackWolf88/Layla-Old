module.exports = {
    name: 'regembed',
    description: 'Sends the embed for registration',
    async execute(client, message, Discord){
        const newEmbed = new Discord.MessageEmbed()
            .setColor(' #9AC8FC')
            .setImage('https://cdn.discordapp.com/attachments/417734666041294850/788417435304722472/9a785e3872fa193143e10f962b4f5164.jpg')
            .setTitle('Regisztráció')
            .setFooter('Ne felejtsd el átolvasni a szabályzatot a regisztráció előtt!')
            .addFields(
                { name: 'Első lépés', value: 'Elsőkörben vegyél egy mély levegőt.' },
                { name: 'Második lépés', value: 'Kattints a :white_check_mark: iconra!' },
                { name: 'Harmadik lépés', value: 'A bot kérdéseket fog feltenni, neked pedig a megfelelő válasz számát kell neki elküldened.' },
                { name: 'Utolsó lépés', value: 'Ha legalább 80%-os eredményt érsz el, belépést nyerhetsz a szerverre, ha ez nem sikerült, ne búslakodj, nézd át a szabályzatot még egyszer és próbálkozz újra! Sok sikert!' },
            );
        message.channel.send(newEmbed).then(async (message) => { await message.react('✅') })

    
    }
}