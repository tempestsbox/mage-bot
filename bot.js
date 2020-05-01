/* eslint-disable no-unused-vars */
const fs = require("fs");
const Discord = require("discord.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  command.aliases.forEach(element => {
    client.commands.set(element, command);
  });
}

const config = require("./config.json");
const package = require("./package.json");

var lastChainStoryMessage;
var loaded = false;

client.on("ready", () => {
  console.log(
    "[" + client.user.username + " " + package.version + "] Ready and raring!\n"
  );
  client.user.setActivity(config.activity);

  if (!loaded)
      client.channels
          .fetch(config.bot_channel)
          .then((channel) => channel.send("Loaded!"))
          .catch(console.error);
  loaded = true;

  keepAlive();
});

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

client.on("message", async message => {
  if (message.author.bot) {
    if (message.channel.name == 'chain-story' && message.content.includes('Excuse me, one word per message')) lastChainStoryMessage = message;
    return;
  };

  // get args
  const args = message.content.slice(config.prefix.length).split(/ +/);
  // get command
  const command = args.shift().toLowerCase();

  if (message.channel.name == 'chain-story') {
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

    client.commands.get(command).required_permissions.forEach((item, index) => {
      if (!message.member.hasPermission(item)) {
        if (!vreturn) message.channel.send('<@' + message.author.id + '>, you do not have the required permissions! `' + client.commands.get(command).required_permissions + '`');
        vreturn = true;
      };
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
  if (message.content.includes(' ')) {
    message.delete();
    lastChainStoryMessage = message.channel.send('Excuse me, one word per message <@' + message.author + '>!');
  }
}

client.login(process.env.TOKEN);
