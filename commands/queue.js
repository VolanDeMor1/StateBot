const Discord = require('discord.js');

module.exports = {
	name: 'очередь',
	description: 'Команда для просмотра очереди композиций.',
    aliases: ["queue", "q", "о"],
	cooldown: 5,
    block: false,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue){
			let embed = new Discord.MessageEmbed()
				.setTitle("🚫 **Внимание!**")
				.setColor('#ff4f4f')
				.setDescription(`В очереди пусто 😔`)
				.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL());
			return message.channel.send(embed);
		}
		let embed = new Discord.MessageEmbed()
			.setTitle("<:queue:736644719995781120> **Очередь**")
			.setColor('RANDOM')
			.setDescription(`> **Сейчас играет:** ${serverQueue.songs[0].title}\n\n> **Очередь:**\n${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}`)
			.setTimestamp()
			.setFooter(message.guild.name, message.guild.iconURL());
		return message.channel.send(embed);
		// 		return message.channel.send(`
		// __**Очередь песен:**__

		// ${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

		// **Сейчас играет:** ${serverQueue.songs[0].title}
		// 		`);
	}
};
