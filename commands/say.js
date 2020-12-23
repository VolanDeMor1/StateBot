const Discord = module.require('discord.js');
const fs = require('fs');
module.exports = {
	name: 'сказать',
	description: 'Сказать от имени бота.',
    aliases: ["say"],
	usage: '[текст]',
	cooldown: 5,
    block: false,
	execute(message, args, bot) {
		if (!message.member.hasPermission('ADMINISTRATOR')) {
			const embed = new Discord.MessageEmbed()
				.setTitle("🚫 **Внимание!**")
				.setColor('#ff4f4f')
				.setTimestamp()
				.setDescription('У вас нет прав')
				.setImage('https://media1.tenor.com/images/36deb2e981bfafc250bd680609ecb107/tenor.gif?itemid=10611246')
				.setFooter(message.guild.name, message.guild.iconURL());

			message.channel.send(embed);
			return '';
		}
		if (!args[0]) {
			const embed = new Discord.MessageEmbed()
				.setTitle("🚫 **Внимание!**")
				.setColor('#ff4f4f')
				.setTimestamp()
				.setDescription('Вы не указали текст')
				.setImage('https://media1.tenor.com/images/36deb2e981bfafc250bd680609ecb107/tenor.gif?itemid=10611246')
				.setFooter(message.guild.name, message.guild.iconURL());

			message.channel.send(embed);
			return '';
		}
			message.delete().catch();
			const embed = new Discord.MessageEmbed()
				.setColor('#0064ff')
				.setTimestamp()
				.setDescription(args.join(" "))
				.setFooter(message.guild.name, message.guild.iconURL());

			message.channel.send(embed);
	}
};
