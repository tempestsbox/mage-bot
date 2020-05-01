/* eslint-disable no-unused-vars */
const config = require('../config.json');

module.exports = {
	name: ['issue', 'report'],
	description: 'Report an issue with TTB',
	execute(message, args) {
		message.channel.send(this.description + ': <https://github.com/' + config.github + '/issues>');
	},
};
