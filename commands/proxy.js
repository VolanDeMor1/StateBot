const Discord = require('discord.js');

module.exports = {
	name: 'proxy',
	description: 'Посмотреть текущую композицию.',
    aliases: ["pro", "доверенность"],
    args: true,
    usage: "[пользователь] [уровень]",
	cooldown: 5,
    block: false,
	execute(message, args, bot) {
        if(!message.member.roles.cache.has("681828123620540457")){
            let embed = new Discord.MessageEmbed()
            .setTitle(`🚫 **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("У вас недостаточно прав")
            .setFooter(message.guild.name, message.guild.iconURL())
    
            message.channel.send(embed);
            return "";
        };
        if(!args[1]){
            let embed = new Discord.MessageEmbed()
            .setTitle(`🚫 **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("Укажите уровень")
            .setFooter(message.guild.name, message.guild.iconURL())
    
            message.channel.send(embed);
            return "";
        }
	}
};
