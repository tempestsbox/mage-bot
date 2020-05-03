/* eslint-disable no-unused-vars */
const { suggestions_channel } = require("../config.json");

module.exports = {
  aliases: ["suggest-marktypes"],
  description: "Lists the marktypes for suggestion marking",
  required_permissions: ["MANAGE_CHANNELS"],
  async execute(message, args) {
    var toSend =
      "__Available Marktypes for <#" +
      suggestions_channel +
      ">__" +
      "\n\n" +
      "`id` | `hex code` | `accepted emojis`" +
      "\n";

    marktypes = require("../suggestions_marktypes.json");

    for (marktype of marktypes) {
      toSend =
        toSend +
        "\n" +
        "`" +
        marktype[1] +
        "` `" +
        marktype[2] +
        "` " +
        marktype[0].toString().replace(",", "").replace(",", "");
    }

    message.channel.send(toSend);
  },
};
