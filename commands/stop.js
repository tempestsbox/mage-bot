const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("../config.json");
const secrets = require("../secrets.json");

client.login(secrets.token);

module.exports = {
    aliases: ["stop", "restart"],
    description: "Cleanly stops the bot",
    required_permissions: ["ADMINISTRATOR"],
    execute(message, args) {
        message.channel
            .send(
                "<@" + message.author.id + "> stopped the bot. Auto-restarting!"
            )
            .then(() => {
                client.user.setActivity("🔴").then(() => {
                    client.channels
                        .fetch(config.bot_channel)
                        .then((channelFetch) => {
                            Promise.all([channelFetch])
                                .then((channels) => {
                                    channels[0]
                                        .setTopic("**Mage Bot**  🔴")
                                        .then(() => {
                                            process.exit(1);
                                        });
                                })
                                .catch((_error) => this.execute(message, args));
                        });
                });
            });
    },
};
