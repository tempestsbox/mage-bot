/* eslint-disable no-unused-vars */
module.exports = {
    aliases: ['echo'],
    description: 'Echo back a message',
    usage: '<message>',
    execute(message, args) {
        message.delete();
        message.channel.send(args.join(" "));
    },
};
