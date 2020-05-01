/* eslint-disable no-unused-vars */
const fetch = require('node-fetch');
const config = require('../config.json');

module.exports = {
	name: ['version', 'ver', 'v'],
	description: 'Find the latest version on GitHub of TTB',
	async execute(message, args) {
		const repo = config.github;
		let archive;

		const replyMessage = await message.channel.send('Loading...');

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
			const github = '<https://github.com/' + repo + '/archive/' + archive + '.zip>';

			replyMessage.edit('The latest version available on GitHub is: ' + ('`' + archive + '`') + '\n          ' + github);
		});
	},
};
