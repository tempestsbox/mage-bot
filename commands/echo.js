/* eslint-disable no-unused-vars */
module.exports = {
	name: ['echo'],
	description: 'Echo!',
	execute(message, args) {
    message.delete();
		message.channel.send(args.join(" "));
	},
};
