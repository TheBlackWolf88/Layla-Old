module.exports = async(client, Discord, reaction, user) => {
    const questions = require('../../JSONS/questions.json')
    const statSchema = require('../../schemas/statSchema')
    const ecoSchema = require('../../schemas/economySchema')
    var msgID = '804987617337933874'
    if (user.id === '561903341232324619') return //botID
    if (reaction.message.id !== msgID) return
    const guild = reaction.client.guilds.cache.get('780056708025679872');
    var catID = '804965798002819124'
    if (reaction.emoji.name === '✅') {
        var i = 0;
        var ans = [];
        var filter = m => m.author.id == user.id;
        user.send('Üdvözöllek a regisztrációnál!')
        await user.send("Elolvastad és elfogadod a szerver szabályait?")
        try {
            var acceptPolicy = await user.dmChannel.awaitMessages(filter, { time: 100000, max: 1, errors: ['time'] });
        } catch (e) { return console.log(`Timeout at ${user}`); };
        if (acceptPolicy.first().content.toLowerCase() === 'igen' || acceptPolicy.first().content.toLowerCase() === 'yes') {
            for (j = 0; j < questions.length; j++) {
                await user.send(questions[i].question);
                try {
                    var collectedMessages = await user.dmChannel.awaitMessages(filter, { time: 100000, max: 1, errors: ['time'] });
                } catch (e) { return console.log(`Timeout at ${message.author}`); };
                var response = collectedMessages.first().content;
                i++;
                ans.push(response.toLocaleLowerCase());
            }
            var points = 0
            for (k = 0; k < ans.length; k++) {
                if (ans[k] === questions[k].answers) {
                    points++;
                } else {
                    continue
                }
            }
            if (points >= 8) {
                var member = guild.members.cache.find(member => member.id === user.id)
                var role = guild.roles.cache.find(role => role.name === '✅')
                member.roles.add(role)
                user.send(`Sikeres teszt! Elért eredmény: ${points}/10`);
           } else {
                return user.send(`Sikertelen teszt! Elért eredmény: ${points}/9`);
            }
        } else {
            return user.send('Ha nem fogadod el a szabályainkat sajnos nem játszhatsz itt.')
        }

    } else {
        return console.log('random')
    }
}
