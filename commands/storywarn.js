/* eslint-disable no-unused-vars */
module.exports = {
  name: ['storywarn', 'sw'],
  description: 'BANNED',
  required_permissions: ['MANAGE_MESSAGES'],
  async execute(message, args) {
    const userarg = args[0];

    if (userarg === null || userarg === undefined) {
      message.channel.send('<@' + message.author.id + '> - please specify a user!')
      return;
    }

    if (userarg.startsWith('<') && userarg.endsWith('>') && userarg.includes('!')) {
      msg(userarg);
      return;
    };

    var fetchedMember = await message.guild.members.fetch({ query: userarg, limit: 1 });
    fetchedMember = await fetchedMember.map(user => user.id);

    if (userarg.length == 18) fetchedMember = await message.guild.members.fetch(userarg);

    if (fetchedMember.length == 0) {
      message.channel.send('<@' + message.author.id + '> - could not find user ' + userarg);
      return;
    }

    msg('<@' + fetchedMember + '>');

    function msg(user) {
      message.delete().then(() => {
        message.channel.send('Excuse me, one word per message ' + user + '!');
      });
    }
  }
};
