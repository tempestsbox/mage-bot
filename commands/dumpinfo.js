/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
  aliases: ["dumpinfo"],
  description: "Dumps server info into your channel",
  required_permissions: ['ADMINISTRATOR'],
  async execute(message, args) {
    message.delete();

    const preEmbed = await new Discord.MessageEmbed()
      .setColor("#2f3136")
      .setImage(
        "https://media.discordapp.net/attachments/694148880681664652/706208919529324625/banner-embed.png"
      );

    const infoEmbed = await new Discord.MessageEmbed()
      .setColor("#2f3136")
      .setTitle("<:welcome:706225401621512192>  ‎**Welcome!**")
      .setDescription(
        "The Tempest's Box adds countless features that add to the game, providing you with many new items, blocks, entities, structures, and more!\nThis project is a rebirth of Zoey's TTB for 1.16+, and, just like classic TTB, we want you as involved as possible with the project!"
      );

    const rulesEmbed = await new Discord.MessageEmbed()
      .setColor("#2f3136")
      .setTitle("🚔 ‎ **Rules**")
      .setDescription(
        "Basis - be respectful and be responsible\n‏‏‏‏‎\n ‎ • No spam, keep the chat clean.\n‏‏‏‏‎ ‎• Keep personal topics to a minimum. Talking about religion, your personal mental state or even politics could make someone feel uncomfortable\n‏‏‏‏‎ ‎• No impersonating Moderators"
      );

    const socialsEmbed = await new Discord.MessageEmbed()
      .setColor("#2f3136")
      .setTitle("<:earth:706239952090038403>  ‎**Social Media**")
      .setDescription(
        "<:github:706241347404955770> [GitHub](https://github.com/" +
        config.github +
        ")\n" +
        "<:youtube:706244121173426367> [YouTube](https://youtube.com/" +
        config.youtube +
        ")\n" +
        ":link: [Site](" +
        config.site +
        ")"
      );

    const embeds = [preEmbed, infoEmbed, rulesEmbed, socialsEmbed];

    embeds.forEach(async (item) => {
      await message.channel.send(item);
    });

    message.channel.send("https://discord.gg/6TFaAuW");
  },
};
