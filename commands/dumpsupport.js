/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    aliases: ["dumpsupport"],
    description: "Dumps #support-us into your channel",
    required_permissions: ['ADMINISTRATOR'],
    async execute(message, args) {
        message.delete();

        const translateEmbed = await new Discord.MessageEmbed()
            .setColor("#3dd0ad")
            .setTitle("Translate TTB!")
            .setDescription(
                "https://translate.thetempestsbox.com"
            )
            .setThumbnail(
                "https://poeditor.com/public/images/logo/logo.svg"
            );
        const githubEmbed = await new Discord.MessageEmbed()
            .setColor("#222222")
            .setTitle("Contribute to the TTB project(s)!")
            .setDescription(
                "https://github.com/tempestsbox"
            )
            .setThumbnail(
                "https://github.githubassets.com/images/modules/logos_page/Octocat.png"
            );
        const patreonEmbed = await new Discord.MessageEmbed()
            .setColor("#FF424D")
            .setTitle("Help us via donating!")
            .setDescription(
                "https://donate.thetempestsbox.com"
            )
            .setThumbnail('https://i0.wp.com/decentered.co.uk/wp-content/uploads/2019/12/patreon-logo-png-badge-7.png');

        const embeds = [translateEmbed, githubEmbed, patreonEmbed];

        embeds.forEach(async (item) => {
            await message.channel.send(item);
        });
    },
};
