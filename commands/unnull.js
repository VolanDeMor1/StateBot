const Discord = require('discord.js');
const fs = require("fs");

module.exports = {
	name: 'аннулировать',
	description: 'Посмотреть текущую композицию.',
    aliases: ["обнулить", "сбросить"],
    args: true,
    usage: "[пользователь]",
	cooldown: 5,
    block: false,
	execute(message, args, bot) {
        let user = message.mentions.members.first() || message.author;
        let channelapp = bot.channels.cache.get("710749869513375744")
        if(message.channel == channelapp){
            if(!args[0]) return message.channel.send("Вы не указали пользователя");
            if(!user) return message.channel.send("Пользователь не найден");
            // if(!args[1]) return bot.message.channel.send("Вы не указали размер штрафа");
            // if(!args[2]) return bot.message.channel.send("Вы не указали причину штрафа, если вы растерялись вот доступные причины: Грифферство, Каннибализм, Флуд, Спам");
            if(!profile[user.id]){
                let embed = new Discord.MessageEmbed()
                .setTitle(`🚫 **Ошибка!**`)
                .setColor('#ff0000')
                .setTimestamp()
                .setDescription("У этого пользователя нету счёта, за помощью обратитесь в канал <#709321730056781855> ")
                .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
        
                message.channel.send(embed);
                return "";
            }
            bot.db.profile[user.id].coins = Number(0);
            let embed = new Discord.MessageEmbed()
            .setDescription("**Обнуление**")
            .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
            .setColor('#e22216')
            .setTimestamp()
            .addField("Администратор",`<@${message.author.id}>`)
            .addField("Пользователю",`<@${user.id}>`)
        
            message.channel.send(embed);
        }else{
            let embed = new Discord.MessageEmbed()
            .setTitle(`🚫 **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("Это можно сделать только в канале <#710749869513375744")
            .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
    
            message.channel.send(embed);
            return "";
        }
	}
};
