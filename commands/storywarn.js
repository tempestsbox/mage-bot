/* eslint-disable no-unused-vars */
var user = undefined;
var messageGlobal;

module.exports = {
    aliases: ["storywarn", "sw"],
    description: "You boke de wules",
    usage: "<user id | user mention>",
    required_permissions: ["ADMINISTRATOR"],
    async execute(message, args) {
        const userarg = args[0];

        if (userarg === null || userarg === undefined) {
            message.channel.send(
                "<@" + message.author.id + "> - please specify a user!"
            );
            return;
        }

        user = await message.mentions.users.first();

        messageGlobal = message;
        if (user == undefined) {
            if (userarg.length == 18)
                message.guild.members
                    .fetch({ id: userarg, limit: 1 })
                    .then((fetchedMembers) => getUserId(fetchedMembers));
            else
                message.guild.members
                    .fetch({ username: userarg, limit: 1 })
                    .then((fetchedMembers) => getUserId(fetchedMembers));
        } else {
            message.channel.send(
                "Excuse me, one word per message <@" + user.id + ">!"
            );
        }
    },
};

function getUserId(fetchedMembers) {
    Promise.all([fetchedMembers])
        .then(async (fetchedMembersCollection) => {
            const result = await fetchedMembersCollection[0].map(
                (user) => user.id
            );

            messageGlobal.channel.send(
                "Excuse me, one word per message <@" + result[0] + ">!"
            );
        })
        .catch((e) => {
            console.log(e);
            user = undefined;
        });
}
