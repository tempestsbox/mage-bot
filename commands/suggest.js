/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const secrets = require("../secrets.json");

client.login(secrets.token);

module.exports = {
    aliases: ["suggest", "sug", "s"],
    description: "Suggest a feature or improvement for TTB!",
    usage: "<suggestion>",
    async execute(message, args) {
        const feedback_prefix = "<@" + message.author.id + ">, ";

        if (args[0] == null || args[0] == undefined || args[0] == "") {
            message.channel.send(
            feedback_prefix + "you did not enter a suggestion!"
            );
            return;
        }

        const embed = new Discord.MessageEmbed()
            .setDescription(args.join(" ") + '\n\n[Source](' + message.url + ')')
            .setColor("0x9b9b9b")
            .setTimestamp()
            .setFooter(
            message.author.id +
            " • " +
            Math.floor(Math.random() * 2000000000 + 1)
            )
            .setAuthor(message.author.username, message.author.avatarURL());

        const suggestionsChannel = await client.channels.fetch(config.suggestions_channel);
        suggestionsChannel.send(embed).then((sent) => {
            sent.react("👍").then(() => {
                sent.react("👎").then(() => {
                    message.channel.send(
                        feedback_prefix +
                        "your suggestion has been posted in <#" +
                        suggestionsChannel +
                        ">!\n" + sent.url
                    );
                });
            });
        });
    }
};
