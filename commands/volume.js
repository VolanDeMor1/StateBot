const Discord = module.require("discord.js");

module.exports = {
	name: 'громкость',
	description: 'Volume command.',
    aliases: ["v", "volume", "г"],
	cooldown: 2,
    block: false,
	execute(message, args) {
		const { channel } = message.member.voice;
		if (!channel) {
			let embed = new Discord.MessageEmbed()
				.setTitle("🚫 **Внимание!**")
				.setColor('#ff4f4f')
				.setDescription(`Вы должны быть в голосовом канале -_-`)
				.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL())
			return message.channel.send(embed);
		};
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
		if (!args[0]) return message.channel.send(`Громкость уже: **${serverQueue.volume}**`);
		if(!Number(args[0])){
			let embed = new Discord.MessageEmbed()
				.setTitle("🚫 **Внимание!**")
				.setColor('#ff4f4f')
				.setDescription(`Вы неверно указали число`)
				.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL())
			return message.channel.send(embed);
		}
		if(message.guild.me.voice.channel !== channel && serverQueue){
			let embed = new Discord.MessageEmbed()
				.setTitle("🚫 **Внимание!**")
				.setColor('#ff4f4f')
				.setDescription(`Вы должны находится в том же канале, что и я`)
				.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL())
			return message.channel.send(embed);
		}
		serverQueue.volume = args[0]; // eslint-disable-line
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
		// serverQueue.loop = true;
		let embed = new Discord.MessageEmbed()
			.setTitle("🔉 **Изменение громкости**")
			.setColor('RANDOM')
			.setDescription(`Громкость установлена: **${args[0]}**`)
			.setTimestamp()
			.setFooter(message.guild.name, message.guild.iconURL())
		return message.channel.send(embed);
	}
};
