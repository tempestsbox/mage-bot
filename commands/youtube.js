/* eslint-disable no-unused-vars */
const config = require('../config.json');

module.exports = {
	aliases: ['youtube', 'yt'],
	description: 'Subscribe to us on YouTube!',
	execute(message, args) {
		message.channel.send('https://youtube.com/' + config.youtube);
	},
};
