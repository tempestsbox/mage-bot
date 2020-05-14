/* eslint-disable no-unused-vars */
const fs = require("fs");
const Discord = require("discord.js");

const client = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
client.commands = new Discord.Collection();

const config = require("./config.json");
const package = require("./package.json");

const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    command.aliases.forEach((element) => {
        client.commands.set(element, command);
    });
}

var lastChainStoryMessage;

console.log("Loading...");
client.login(process.env.TOKEN);

// event :: on load
client.on("ready", () => {
    console.log(
        "[" +
        client.user.username +
        " " +
        package.version +
        "] Ready and raring!\n"
    );

    preload();

    setTimeout(load, 2000);

    keepAlive();
});
function preload() {
    client.user.setActivity("🟡").then(() => {
        client.channels.fetch(config.bot_channel).then((channelFetch) => {
            Promise.all([channelFetch])
                .then((channels) => {
                    channels[0].setTopic("**Mage Bot**  🟡");
                })
                .catch((_error) => preload());
        });
    });
}
function load() {
    client.channels.fetch(config.bot_channel).then((channelFetch) => {
        Promise.all([channelFetch])
            .then((channels) => {
                channels[0].setTopic("**Mage Bot**  🟢");
                client.user.setActivity(config.activity);
            })
            .catch((_error) => load());
    });
}
function keepAlive() {
    const http = require("http");
    const express = require("express");
    const app = express();
    app.get("/", (request, response) => {
        process.exit();
    });
    app.listen(process.env.PORT);
    setInterval(() => {
        http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);
}

// event :: on message
client.on("message", async (message) => {
    if (message.author.bot) {
        if (
            message.channel.name == "chain-story" &&
            message.content.includes("Excuse me, one word per message")
        )
            lastChainStoryMessage = message;
        return;
    }

    // get args
    const args = message.content.slice(config.prefix.length).split(/ +/);
    // get command
    const command = args.shift().toLowerCase();

    if (message.channel.name == "chain-story") {
        if (lastChainStoryMessage != undefined) lastChainStoryMessage.delete();
        chainStory(message);
        return;
    }

    // post message to log if not command
    const isCommand = client.commands.has(command);
    if (!isCommand && config.postMessagesToLog)
        console.log(
            "[#" +
            message.channel.name +
            "] " +
            message.author.tag +
            ": " +
            message.content
        );

    // if not command, return
    if (!message.content.startsWith(config.prefix)) return;

    if (!isCommand) return;

    if (client.commands.get(command).required_permissions != null) {
        var vreturn = false;

        client.commands
            .get(command)
            .required_permissions.forEach((permission) => {
                if (!message.member.hasPermission(permission)) {
                    if (!vreturn)
                        message.channel.send(
                            "<@" +
                            message.author.id +
                            ">, you do not have the required permissions! `" +
                            client.commands.get(command)
                                .required_permissions +
                            "`"
                        );
                    vreturn = true;
                }
            });

        if (vreturn) return;
    }

    try {
        console.log(
            "---> " +
            message.author.tag +
            " ran command `" +
            message.content +
            "` in #" +
            message.channel.name
        );
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply(
            "there was an error trying to execute that command!" +
            "\n`" +
            error.message +
            "`"
        );
    }
});
function chainStory(message) {
    if (message.content.includes(" ")) {
        message.delete();
        lastChainStoryMessage = message.channel.send(
            "Excuse me, one word per message <@" + message.author + ">!"
        );
    }
}

// event :: add reaction
client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.log(
                "Something went wrong when fetching the message: ",
                error.message
            );
            return;
        }
    }

    const message = reaction.message;

    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;

    if ((message.channel.id = config.suggestions_channel)) {
        if (!(reaction.emoji.name == "👍" || reaction.emoji.name == "👎"))
            message.reactions.cache
                .get(reaction.emoji.name)
                .remove()
                .catch((error) =>
                    console.error("Failed to remove reactions: ", error)
                );

        const previousEmbed = message.embeds[0];
        const previousHasSpoiler =
            previousEmbed.description.startsWith("||") &&
            previousEmbed.description.endsWith("||");

        // global remove spoiler
        if (reaction.emoji.name == "▫️" && previousHasSpoiler) {
            message.edit(
                message.content,
                previousEmbed.setDescription(
                    previousEmbed.description.slice(2, -2)
                )
            );
            return;
        }

        // find other marktypes
        const markTypes = require("./suggestions_marktypes.json");
        var found = false;
        for (markType of markTypes) {
            for (acceptedEmoji of markType[0]) {
                if (reaction.emoji.name == acceptedEmoji) {
                    found = true;
                    break;
                }
            }

            if (found == true) {
                var newEmbed = previousEmbed.setColor(markType[2]);

                const censoredSuffix = " (Censored)";
                if (markType[3] == true) {
                    if (!previousHasSpoiler)
                        newEmbed.setDescription(
                            "||" + previousEmbed.description + "||"
                        );
                    if (
                        !previousEmbed.author.name
                            .endsWith(censoredSuffix)
                    )
                        newEmbed.setAuthor(
                            previousEmbed.author.name + censoredSuffix,
                            previousEmbed.author.iconURL
                        );
                } else if (
                    previousHasSpoiler &&
                    previousEmbed.author.name
                        .endsWith(censoredSuffix)
                ) {
                    newEmbed
                        .setDescription(previousEmbed.description.slice(2, -2))
                        .setAuthor(
                            previousEmbed.author.name.slice(
                                0,
                                -censoredSuffix.length
                            ),
                            previousEmbed.author.iconURL
                        );
                } else if (
                    previousEmbed.author.name
                        .endsWith(censoredSuffix)
                ) {
                    newEmbed.setAuthor(
                        previousEmbed.author.name.slice(
                            0,
                            -censoredSuffix.length
                        ),
                        previousEmbed.author.iconURL
                    );
                }

                message.edit("Marked as: `" + markType[1] + "` by <@" + user.id + ">", newEmbed);
                break;
            }
        }
    }
});

// event :: on member join
client.on("guildMemberAdd", (member) => {
    member.roles.add(
        member.guild.roles.cache.find((role) => role.id === config.join_role)
    );
});

module.exports = {
    client: client
};
