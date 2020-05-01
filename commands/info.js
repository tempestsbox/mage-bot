/* eslint-disable no-unused-vars */
const fetch = require('node-fetch');
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
	aliases: ['info', 'information', 'inf', 'i'],
	description: 'Sends a DM to you with info about TTB',
	async execute(message, args) {
		const repo = config.github;
		let archive;

		const replyMessage = await message.channel.send(config.description + '\n\nLoading...');

		async function fetchGitHubArchive() {
			let response = await fetch('https://api.github.com/repos/' + repo + '/releases');
			let data = await response.json();
			if (data[0]) {
				archive = data[0].tag_name;
				return;
			}
			response = await fetch('https://api.github.com/repos/' + repo);
			data = await response.json();
			archive = data.default_branch;
		}

		// wait for fetchArchive() and send data to user
		fetchGitHubArchive().then(function() {
			const curseforge = '<https://curseforge.com/' + config.curseforge + '>';
			const github = '<https://github.com/' + repo + '/archive/' + archive + '.zip>';

			// const ttbLogo = config.site + '/assets/logos/ttb/128x.png';
			// const downloadEmbed = new Discord.MessageEmbed()
			//	.setColor('#000000')
			//	.setURL(config.site)
			//	.setDescription(config.description)
			//	.setAuthor('TTB', ttbLogo, config.site)
			//	.addField('Download', '[CurseForge](' + curseforge + ')' + ' | ' + '[GitHub `' + archive + '`](' + github + ')')
			//	.setTimestamp();

			replyMessage.edit('‏‏‎ ‎').then(function() {
				// { embed: downloadEmbed }
				replyMessage.edit(config.description + '\n\n**CurseForge** ' + curseforge + '\n**Latest GitHub release** ' + github);
			});
		});
	},
};
