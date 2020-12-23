const Discord = require('discord.js');
const { resolve } = require('path');
const { rejects } = require('assert');

module.exports = {
	name: 'test',
	description: 'Посмотреть текущую композицию.',
    aliases: ["trd"],
	cooldown: 5,
    block: false,
	execute(message, args, bot) {
        const prom = new Promise((resolve, rejects) => {
            setTimeout(() => {
                resolve(Math.round(Math.random() * 5));
            }, 300);
        });
        
        prom.then((value) => {
            message.channel.send(value);
        });
	}
};
