/* eslint-disable no-unused-vars */
module.exports = {
	aliases: ['restart'],
	description: 'Restarts the bot',
  required_permissions: ['MANAGE_GUILD'],
	execute(message, args) {
    message.delete().then(() => {
      message.channel.send('<@' + message.author.id + '> restarted the bot. `T:' + Date.now() + '`').then(() => {
        process.exit(1);
      })
    });
  }
};
