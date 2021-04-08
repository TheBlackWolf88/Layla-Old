module.exports = {
    name: 'del',
    description: 'Deletes channel',
    execute(client, message){
        if(message.member.hasPermission('ADMINISTRATOR')){
            message.channel.delete()
            return console.log(`${message.author.username} kitörölte a ${message.channel.name}-t`)
        }else{
            return
        }
        
    }
}