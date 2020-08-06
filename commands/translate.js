/* eslint-disable no-unused-vars */
const Discord = require("discord.js");

module.exports = {
    aliases: ['trello','trel'],
    description: 'Replies with the TTB Trello',
    execute(message, args) {
        const logo = "https://thetempestsbox.com/assets/logo.png";
        const embed = new Discord.MessageEmbed()
          .setAuthor('The Tempest\'s Box Translations', logo)
          .setColor("#FFB6C1")
          .setDescription('https://trello.com/b/lsQB6Bue')
          .setThumbnail(logo)
          .setTimestamp();

          message.channel.send(embed);
    },
};
