const Discord = require('discord.js');

module.exports = {
	name: 'оплаткредита',
	description: 'Посмотреть текущую композицию.',
    aliases: ["оплатакредита"],
	cooldown: 5,
    block: false,
	execute(message, args, bot) {
        let user = message.author;
        let channelapp = bot.channels.cache.get("710749869513375744")
        if(message.channel == channelapp){
            let a = message.author;
            let uid = message.author.id;
            let u = bot.db.profile[uid];
            if(!bot.db.credits[user.id]){
                let embed = new Discord.MessageEmbed()
                .setTitle(`🚫 **Ошибка!**`)
                .setColor('#ff0000')
                .setTimestamp()
                .setDescription("У вас нет неоплаченых кредитов")
                .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
                message.channel.send(embed);
                return "";
            }else{
                if(bot.db.profile[user.id].coins >= bot.db.credits[user.id].credit){
                    let embed = new Discord.MessageEmbed()
                    .setDescription("**Оплата кредита:**")
                    .setColor('#48ff00')
                    .setTimestamp()
                    .addField("Клиент",`<@${user.id}>`)
                    .addField("Сумма выплаты",`${user.id}`)
                    .setThumbnail(a.avatarURL())
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
                    message.channel.send(embed);
                    bot.db.profile['575981243011956749'].coins = bot.db.profile['575981243011956749'].coins + Number(bot.db.credits[user.id].credit);
                    bot.db.profile[user.id].coins = bot.db.profile[user.id].coins - Number(bot.db.credits[user.id].credit);
                    delete bot.db.credits[user.id];
                    return "";
                }else{
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`🚫 **Ошибка!**`)
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setDescription("У вас недостаточно средств \n Ещё раз просмотрите канал <#710866083480993924> ")
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
                    message.channel.send(embed);
                    return "";
                }
            }
        }else{
            let embed = new Discord.MessageEmbed()
            .setTitle(`🚫 **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("Это можно сделать только в канале <#710749869513375744>")
            .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
    
            message.channel.send(embed);
            return "";
        }
	}
};
