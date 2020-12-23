const Discord = module.require('discord.js');

module.exports = {
	name: 'блокировка',
	description: 'Команда для разработчиков.',
    aliases: ["block", "b"],
	cooldown: 5,
    block: false,
	async execute(message, args, bot) {
		if (message.author.id !== '575981243011956749') {
			const embed = new Discord.MessageEmbed()
            	.setTitle(`🚫 **Ошибка!**`)
            	.setColor('#ff0000')
				.setTimestamp()
				.setDescription('У вас нет прав')
				.setImage('https://media1.tenor.com/images/36deb2e981bfafc250bd680609ecb107/tenor.gif?itemid=10611246');

			message.channel.send(embed);
			return '';
		}
		if (!args[0] || !bot.commands.get(args[0])) {
			const embed = new Discord.MessageEmbed()
            	.setTitle(`🚫 **Ошибка!**`)
            	.setColor('#ff0000')
				.setTimestamp()
				.setDescription('Вы не указали команду либо сделали это неправильно')
				.setImage('https://media1.tenor.com/images/36deb2e981bfafc250bd680609ecb107/tenor.gif?itemid=10611246')
				.setFooter(message.guild.name, message.guild.iconURL());

			message.channel.send(embed);
			return '';
        }
        
        if(bot.commands.get(args[0]).block){
            bot.commands.get(args[0]).block = false;
			const embed = new Discord.MessageEmbed()
            	.setTitle(`🚫 **Блокировка**`)
            	.setColor('#00c925')
				.setTimestamp()
				.setDescription(`Команда \`.${args[0]}\` разблокирована`)
				.setFooter(message.guild.name, message.guild.iconURL());

			message.channel.send(embed);
			return '';
        }else if(!bot.commands.get(args[0]).block){
            bot.commands.get(args[0]).block = true;
			const embed = new Discord.MessageEmbed()
            	.setTitle(`🚫 **Блокировка**`)
            	.setColor('#ff0000')
				.setTimestamp()
				.setDescription(`Команда \`.${args[0]}\` заблокирована`)
				.setFooter(message.guild.name, message.guild.iconURL());

			message.channel.send(embed);
			return '';
        }

	}
};
