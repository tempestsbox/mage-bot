/* eslint-disable no-unused-vars */
const Discord = require("discord.js");

module.exports = {
    aliases: ['trello','trel'],
    description: 'Replies with the TTB Trello',
    execute(message, args) {
        const logo = "https://tempestsbox.github.io/assets/logo.png";
        const embed = new Discord.MessageEmbed()
          .setAuthor('The Tempest\'s Box Trello', logo)
          .setColor("#FFB6C1")
          .setDescription('https://trello.com/b/lsQB6Bue')
          .setThumbnail(logo)
          .setTimestamp();

          message.channel.send(embed);
    },
};
