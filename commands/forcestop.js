/* eslint-disable no-unused-vars */
module.exports = {
    aliases: ["forcestop", "fs"],
    description: "Kills the bot",
    required_permissions: ["ADMINISTRATOR"],
    execute(message, args) {
        message.channel
            .send("<@" + message.author.id + "> force-stopped the bot")
            .then(() => {
                process.exit(1);
            });
    },
};
