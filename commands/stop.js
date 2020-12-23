const Discord = require('discord.js');

module.exports = {
	name: 'стоп',
	description: 'Команда остановки воспроизведения музыки.',
    aliases: ["stop"],
	cooldown: 5,
    block: false,
	execute(message) {
		const { channel } = message.member.voice;
		if (!channel) {
			let embed = new Discord.MessageEmbed()
				.setTitle("🚫 **Внимание!**")
				.setColor('#ff4f4f')
				.setDescription(`Вы должны быть в голосовом канале -_-`)
				.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL());
			return message.channel.send(embed);
		};
		const serverQueue = message.client.queue.get(message.guild.id);
		if(message.guild.me.voice.channel !== channel && serverQueue){
			let embed = new Discord.MessageEmbed()
				.setTitle("🚫 **Внимание!**")
				.setColor('#ff4f4f')
				.setDescription(`Вы должны находится в том же канале, что и я`)
				.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL())
			return message.channel.send(embed);
		}
		// const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue){
			let embed = new Discord.MessageEmbed()
				.setTitle("🚫 **Внимание!**")
				.setColor('#ff4f4f')
				.setDescription(`В очереди пусто 😔`)
				.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL());
			return message.channel.send(embed);
		}
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Вы остановили воспроизведение!');
	}
};
