/* eslint-disable no-unused-vars */
module.exports = {
    aliases: ['textures'],
    description: 'A list of textures that need to be done',
    execute(message, args) {
        message.channel.send('**Textures List**\n<https://trello.com/b/lsQB6Bue?menu=filter&filter=label:Graphics%20Required>');
    },
};
