/* eslint-disable no-unused-vars */
const Discord = require("discord.js");

module.exports = {
    aliases: ['userinfo','user','ui'],
    description: 'List general info of a user',
    execute(message, args) {
        let ment = message.mentions.users.first();
        if(!ment) {
          message.channel.send('Please mention a user!')
          return;
        }

        let embed = new Discord.MessageEmbed()
          .addField("Username", ment.tag)
          .addField("ID", ment.id)
          .addField("Status", ment.presence.status)
          .addField("Created", ment.createdAt)
          .setAuthor(ment.username, ment.avatarURL)
          .setThumbnail(ment.avatarURL);
        message.channel.send(embed + ment.avatarURL);
    },
};
