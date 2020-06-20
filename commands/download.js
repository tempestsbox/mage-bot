/* eslint-disable no-unused-vars */
const { github } = require("../config.json");

module.exports = {
    aliases: ['download','get','d'],
    description: 'Download TTB',
    execute(message, args) {
        message.channel.send('https://tempestsbox.github.io/download');
    },
};
