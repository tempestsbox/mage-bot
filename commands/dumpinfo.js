/* eslint-disable no-unused-vars */
module.exports = {
	aliases: ['dumpinfo'],
	description: 'Dumps server info into your channel',
	execute(message, args) {
		message.channel.send('Pong!');
	},
};
