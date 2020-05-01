/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
const fs = require("fs");
const { prefix } = require('../config.json');

module.exports = {
	aliases: ['help'],
	description: 'Sends a DM to you with a list of all commands',
	execute(message, args) {
    const commandFiles = fs
      .readdirSync("./commands")
      .filter(file => file.endsWith(".js"));

    var commands = '';
    var modCommands = '';
    for (const file of commandFiles) {
      const command = require(`./${file}`);
      command.aliases.forEach(element => {
        const modifiedElement = "`" + element + "`";

        if (command.required_permissions != undefined) return;

        if (command.aliases[0] == element) commands = commands + ", " + modifiedElement;
        if (commands.startsWith(", ")) commands = modifiedElement;
      });
      
      command.aliases.forEach(element => {
        const modifiedElement = "`" + element + "`";

        if (command.required_permissions == undefined) return;

        if (command.aliases[0] == element) modCommands = modCommands + ", " + modifiedElement;
        if (modCommands.startsWith(", ")) modCommands = modifiedElement;
      });
    }
    
    message.channel.send('Here\'s a list of all my commands:\n' + commands + '\n\nMy prefix is `' + prefix + '`').then(() => {
      if (message.member.hasPermission('MANAGE_MESSAGES')) message.channel.send('‏‏‎ ‎\nMod commands:\n' + modCommands);
    });
	},
};
