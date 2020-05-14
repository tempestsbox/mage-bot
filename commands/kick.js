/* eslint-disable no-unused-vars */
// const { immune_kick_roles } = require("../config.json");

module.exports = {
    aliases: ["kick"],
    description: "Kicks a specified member",
    usage: "<member>",
    required_permissions: ["KICK_MEMBERS"],
    execute(message, args) {
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);

            if (member) {
                member
                    .kick(args.slice(1, 0).join(" "))
                    .then(() => {
                        message.reply(`Successfully kicked <@${user.id}>`);
                    })
                    .catch((e) => {
                        message.reply("unable to kick member - " + e.message);
                        console.log(error);
                    });
            } else {
                message.reply("that user isn't in this guild!");
            }
        } else {
            message.reply("you didn't mention the user to kick!");
        }
    },
};
