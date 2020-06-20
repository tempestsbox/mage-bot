/* eslint-disable no-unused-vars */
const fetch = require("node-fetch");
const config = require("../config.json");

module.exports = {
    aliases: ["version", "ver", "v"],
    description: "Fetches the latest version of TTB from GitHub",
    async execute(message, args) {
        const repo = config.github;
        const prefix = "The latest version available from GitHub is "
        let archive;

        const replyMessage = await message.channel.send(prefix + "...");

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
        fetchGitHubArchive().then(function () {
            const github =
                "<https://github.com/" + repo + "/archive/" + archive + ".zip>";

            replyMessage.edit(
                prefix +
                    ("`" + archive + "`")
                    // +
                    // "\n          " +
                    // github
            );
        });
    },
};
