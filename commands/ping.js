/* eslint-disable no-unused-vars */
module.exports = {
    aliases: ['ping'],
    description: 'Pingaz!',
    execute(message, args) {
        message.channel.send('Pong!');
    },
};
