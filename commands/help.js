/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
const fs = require("fs");
const { prefix } = require("../config.json");
const Discord = require("discord.js");

module.exports = {
    aliases: ["help"],
    description: "Lists all the commands available in TTB",
    usage: "[command]",
    execute(message, args) {
        const commandFiles = fs
            .readdirSync("./commands")
            .filter((file) => file.endsWith(".js"))
            .filter((file) => !file.startsWith("_"));

        if (args.length == 1) {
            const commandid = args[0];

            var command;
            try {
                command = require("./" + commandid + ".js");
            } catch {
                message.channel.send(
                    "Command `" + args.join(" ") + "` does not exist!"
                );
                return;
            }

            var embed = new Discord.MessageEmbed()
                .setTitle(prefix + commandid)
                .setDescription(command.description)
                .setColor("0x9b9b9b")
                .setTimestamp()
                .setFooter("Aliases: " + command.aliases);
            if (command.usage != undefined)
                embed.setDescription(
                    embed.description +
                    "\n\n*`" +
                    prefix +
                    commandid +
                    " " +
                    command.usage +
                    "`*"
                );
            message.channel.send(embed);
        } else {
            var commands = "";
            var modCommands = "";
            for (const file of commandFiles) {
                const command = require(`./${file}`);
                command.aliases.forEach((element) => {
                    const modifiedElement = "`" + element + "`";

                    if (command.required_permissions != undefined) return;

                    if (command.aliases[0] == element)
                        commands = commands + ", " + modifiedElement;
                    if (commands.startsWith(", ")) commands = modifiedElement;
                });

                command.aliases.forEach((element) => {
                    const modifiedElement = "`" + element + "`";

                    if (command.required_permissions == undefined) return;

                    if (command.aliases[0] == element)
                        modCommands = modCommands + ", " + modifiedElement;
                    if (modCommands.startsWith(", "))
                        modCommands = modifiedElement;
                });
            }

            message.channel
                .send(
                    "Here's a list of all my commands:\n" +
                    commands +
                    "\n\nMy prefix is `" +
                    prefix +
                    "`"
                )
                .then(() => {
                    if (message.member.hasPermission("MANAGE_MESSAGES"))
                        message.channel.send(
                            "‏‏‎ ‎\nMod commands:\n" + modCommands
                        );
                });
        }
    },
};
