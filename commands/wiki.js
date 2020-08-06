/* eslint-disable no-unused-vars */
const config = require('../config.json');

module.exports = {
    aliases: ['translate', 'tl'],
    description: 'Help us to translate TTB!',
    execute(message, args) {
        message.channel.send('http://translate.thetempestsbox.com');
    },
};
