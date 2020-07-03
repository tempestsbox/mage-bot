/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports = {
    aliases: ['colors','colours','color','colour','colorscheme','colourscheme'],
    description: 'Replies with the TTB color scheme',
    execute(message, args) {
        message.channel.send('**TTB Color Scheme**');

        const MEDIUMPURPLE = colorEmbed('MEDIUMPURPLE', '9370DB');
        const REBECCAPURPLE = colorEmbed('REBECCAPURPLE', '663399');
        const YELLOWGREEN = colorEmbed('YELLOWGREEN', '9ACD32');
        const GREEN = colorEmbed('GREEN', '008000');
        
        const colors = [ MEDIUMPURPLE, REBECCAPURPLE, YELLOWGREEN, GREEN, ];

        colors.forEach(async (color) => {
            await message.channel.send(color);
        });

        function colorEmbed(name, hex) {
            return new Discord.MessageEmbed().setAuthor(name.toUpperCase()).setDescription('`#' + hex + '`').setColor('#' + hex);
        }
    },
};
