/* eslint-disable no-unused-vars */
module.exports = {
    aliases: ['wiki', 'w'],
    description: 'Grab a wiki link',
    usage: '[wiki page]',
    execute(message, args) {
      var wikiUrl = "https://wiki.thetempestsbox.com";

      if (args.length != 0) {
        var output = [];

        args.forEach(async (arg) => {
          await output.push(arg.charAt(0).toUpperCase() + arg.slice(1));
        });

        wikiUrl = wikiUrl + "/" + output.join("_");
      }

      message.channel.send(wikiUrl);
    },
};
