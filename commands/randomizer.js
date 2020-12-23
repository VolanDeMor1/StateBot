const Discord = require('discord.js');

module.exports = {
	name: 'рандомайзер',
	description: 'Посмотреть текущую композицию.',
    aliases: ["рандом"],
    args: true,
    usage: '[минимум] [максимум]',
	cooldown: 5,
    block: false,
	execute(message, args, bot) {
        function random(){
            return Math.round(Math.random() * args[0]);
        }
        message.channel.send(random());
	}
};
