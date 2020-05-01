/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");

module.exports = {
    aliases: ["suggest", "sug", "s"],
    description: "Suggest a feature or improvement for TTB!",
    async execute(message, args) {
        const feedback_prefix = '<@' + message.author.id + '>, ';

        if (args[0] == null || args[0] == undefined || args[0] == '') {
            message.channel.send(feedback_prefix + 'you did not enter a suggestion!');
            return;
        }

        const embed = new Discord.MessageEmbed()
            .setDescription(args.join(" "))
            .setColor('0x9b9b9b')
            .setTimestamp()
            .setFooter('Suggestion', message.author.avatarURL())
            .setAuthor(message.author.tag);

        const channel = await client.channels.fetch(config.suggestions_channel);

        try {
            channel.send(embed).then(() => {
                message.channel.send(feedback_prefix + 'your suggestion has been posted in <#' + channel + '>!');
            });
        } catch (error) {
            message.channel.send('`' + error.message + '` - Please keep trying the command! It works eventually 😛');
        }
    },
};

client.login(process.env.TOKEN);
