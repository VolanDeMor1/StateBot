const Discord = require('discord.js');

module.exports = {
	name: 'очистить',
	description: 'Посмотреть текущую композицию.',
    aliases: ["удалить", "clear"],
	cooldown: 5,
    block: false,
	execute(message, args, bot) {
        if(!message.member.roles.cache.has("694869608695463997")){
            let embed = new Discord.MessageEmbed()
            .setTitle(`🚫 **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("У вас недостаточно прав")
            .setFooter(message.guild.name, message.guild.iconURL())
    
            message.channel.send(embed);
            return "";
        };
        if(args[0]>100){
            let embed = new Discord.MessageEmbed()
            .setTitle(`🚫 **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("Укажите число меньше 100")
            .setFooter(message.guild.name, message.guild.iconURL())
    
            message.channel.send(embed);
            return "";
        };
        if(args[0]<1){
            let embed = new Discord.MessageEmbed()
            .setTitle(`🚫 **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("Укажите число больше 0")
            .setFooter(message.guild.name, message.guild.iconURL())
    
            message.channel.send(embed);
            return "";
        };
        let embed = new Discord.MessageEmbed()
        .setTitle(`**Успешно**`)
        .setColor('#ffaa00')
        .setTimestamp()
        .setDescription(`${args[0]} сообщений удалено!`)
        .setFooter(message.guild.name, message.guild.iconURL())
    
        message.channel.bulkDelete(args[0]).then(() =>{
            message.channel.send(embed).then(msg => msg.delete({ timeout: 5*1000 }));
        });
	}
};
