/* eslint-disable no-unused-vars */
module.exports = {
    aliases: ["kick"],
    description: "Kicks a specified member",
    usage: "<member>",
    execute(message, args) {
        message.channel.send("Pong!");
    },
};
