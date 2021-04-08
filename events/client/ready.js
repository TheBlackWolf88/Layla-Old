module.exports = (client, Discord) => {
    console.log('Rylia is ready to be conquered!')
    var msgID = '804987617337933874'
    if (msgID.partial) {
        console.log('The message is partial.');
        msgID.fetch()
            .then(fullmessage => {
                console.log(fullmessage.content);
            })
            .catch(error => {
                console.log('Something went wrong when fetching the message: ', error);
            });
    } else {
        console.log('The message is not partial.');
    }
}