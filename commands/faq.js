/* eslint-disable no-unused-vars */
module.exports = {
    aliases: ['faq'],
    description: 'Link a frequently asked question',
    usage: '<faq>',
    help_extras: '**Available FAQs**\n- `How can I contribute?`\n- `Who is Zoey?`',
    execute(message, args) {
      var nonsafeChars = /[& +$,:;=?@"#{}|^~[`%!'<>\]\.\/\(\)\*\\\n\t\b\v]/g;
      const output = args.join(" ").trim()
        .replace(/\'/gi, '')
        .replace(nonsafeChars, '-')
        .replace(/-{2,}/g, '-')
        .substring(0, 64)
        .replace(/^-+|-+$/gm, '')
        .toLowerCase();
      
      message.delete();
      message.channel.send("https://tempestsbox.github.io/faq#" + output);
    },
};
