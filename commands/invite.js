/* eslint-disable no-unused-vars */
const config = require('../config.json');

module.exports = {
	name: ['discord', 'invite', 'discord-invite'],
	description: 'Invite your friends!',
	execute(message, args) {
		message.channel.send('https://discord.gg/' + config.invite);
	},
};
