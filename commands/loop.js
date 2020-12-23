const Discord = require('discord.js');
const fs = require('fs');
const servers = require('../servers.json');

module.exports = {
	name: 'покругу',
	description: 'Сделать воспроизведение песен БЕСКОНЕЧНЫМ.',
    aliases: ["loop", "l"],
	cooldown: 5,
    block: false,
	execute(message, args, bot) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('В очереди ничего нет.');
		if(!servers[message.guild.id]){
			bot.db.servers[message.guild.id] = {
				loop:true
			}
			let embed = new Discord.MessageEmbed()
				.setTitle("🔂 **Покругу**")
				.setColor('#00ff48')
				.setDescription(`Воспроизведение по кругу включено`)
				.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL());
			return message.channel.send(embed);
		}else if(servers[message.guild.id]){
			delete bot.db.servers[message.guild.id]
			let embed = new Discord.MessageEmbed()
				.setTitle("🔂 **Покругу**")
				.setColor('#ff6e3d')
				.setDescription(`Воспроизведение по кругу выключено`)
				.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL());
			return message.channel.send(embed);
		}
	}
};
