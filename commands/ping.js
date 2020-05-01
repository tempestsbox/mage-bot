/* eslint-disable no-unused-vars */
module.exports = {
	name: ['ping'],
	description: 'Pingaz!',
	execute(message, args) {
		message.channel.send('Pong!');
	},
};
