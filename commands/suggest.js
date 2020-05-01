/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
	aliases: ['suggest', 'sug', 's'],
	description: 'Suggest a feature or improvement for TTB!',
	execute(message, args) {
		message.channel.send('Suggest ideas in <#576174992283140116> or at **https://reddit.com/' + config.reddit + '**!');
	},
};
