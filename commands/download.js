/* eslint-disable no-unused-vars */
const fetch = require("node-fetch");
const config = require("../config.json");
const Discord = require("discord.js");

module.exports = {
  aliases: ["download", "version", "d", "ver", "v"],
  description: "Fetches the latest version of TTB from GitHub",
  async execute(message, args) {
    const repo = config.github;
    let archive;

    const replyMessage = await message.channel.send(
      "Getting version from GitHub..."
    );

    async function fetchGitHubArchive() {
      let response = await fetch(
        "https://api.github.com/repos/" + repo + "/releases"
      );
      let data = await response.json();
      if (data[0]) {
        archive = data[0].tag_name;
        return;
      }
      response = await fetch("https://api.github.com/repos/" + repo);
      data = await response.json();
      archive = data.default_branch;
    }

    // wait for fetchArchive() and send data to user
    fetchGitHubArchive().then(async function() {
      const github =
        "<https://github.com/" + repo + "/archive/" + archive + ".zip>";

      const embed = await new Discord.MessageEmbed()
            .setColor("#2f3136")
            .setTitle("Latest TTB Version - " + archive)
            .setDescription(
              '[Download URL](' + github + ')'
              + ' | ' +
              '[Article](https://thetempestsbox.com/article/release-' + archive + ')'
            );
      replyMessage.delete();
      message.channel.send(embed);
    });
  }
};
