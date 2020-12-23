const Discord = require('discord.js');

module.exports = {
	name: 'щачо',
	description: 'Посмотреть текущую композицию.',
    aliases: ["np", "now"],
	cooldown: 5,
    block: false,
	execute(message, args, bot) {
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
		return message.channel.send(`🎶 Щас играет: **${serverQueue.songs[0].title}**`);
	}
};
