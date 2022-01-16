module.exports = {
	name: 'roll',
	description: 'Rolls a dice or more',
	execute(client, message, args) {
//Szóval syntax: roll [d?] [db]
		function getRandomIntInclusive(min, max) {
		  min = Math.ceil(min);
		  max = Math.floor(max);
		  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
		}
		let dice = Number(args[0])
		let NoD = 1
		if(args[1]) NoD = Number(args[1])
		for (let i = 0; i < NoD; i++) {
			message.channel.send(`You rolled a D${dice}; you rolled a ${getRandomIntInclusive(1,dice)}`)
		}
		//		message.channel.send(`End of Rolling`)

	}

}
