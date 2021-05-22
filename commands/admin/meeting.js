module.exports = {
    name: 'meeting',
    description: 'Layla brings some coffee',
    execute(client, message){
        if (message.member.voice.channel) {
            message.member.voice.channel.join()
            return message.author.send('Itt vagyok!!')
        }
        else {
            return message.author.send('Hova???')
        }
    }
}