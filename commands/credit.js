const Discord = require('discord.js');

module.exports = {
	name: 'кредит',
	description: 'Посмотреть текущую композицию.',
    aliases: ["credit", "к"],
    args: true,
    usage: "[сумма]",
	cooldown: 5,
    block: false,
	async execute(message, args, bot) {
        let user = message.author;
        let channelapp = bot.channels.cache.get("710749869513375744")
        let channelforconsole = bot.channels.cache.get("715517792182468639")
        try{
            if(message.channel == channelapp){
                if(!user){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`🚫 **Ошибка!**`)
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setDescription("Пользователь не найден \n Ещё раз просмотрите канал <#711935562898079764> ")
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
            
                    message.channel.send(embed);
                    return "";
                }
                if(!Number(args[0])){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`🚫 **Ошибка!**`)
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setDescription("Вы неверно указали сумму перевода \n Ещё раз просмотрите канал <#711935562898079764> ")
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
            
                    message.channel.send(embed);
                    return "";
                }
                if(Number(args[0]) < 1){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`🚫 **Ошибка!**`)
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setDescription("Вы не можете взять кредит меньше 1 <:ap:721753226768023582>")
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
            
                    message.channel.send(embed);
                    return "";
                }
                if(!bot.db.profile[user.id]) return message.channel.send("Пользователя нету в profile.json");
                if(bot.db.credits[user.id]){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`🚫 **Ошибка!**`)
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setDescription("Вы не можете взять ещё один кредит")
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
            
                    message.channel.send(embed);
                    return "";
                }
                let wremya = await Date.now() + 4233600000;
                let a = await args[0] * 2;
                bot.db.profile[user.id].coins = Number(bot.db.profile[user.id].coins) + Number(args[0]);
                bot.db.credits[user.id] = {
                    guild: message.guild.id,
                    credit: a,
                    time: wremya,
                    chek: false
                };
                let embed = new Discord.MessageEmbed()
                .setDescription("**Кредит**")
                .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
                .setColor('#1aff00')
                .setTimestamp()
                .addField("Клиент",`<@${message.author.id}>`, true)
                .addField("Сумма", `${args[0]} <:ap:721753226768023582>`, true)
                .addField("Срок выплаты",`до ${require('moment')(wremya).format('DD.MM.yyyy')}, оплатить ${a} <:ap:721753226768023582>`)
            
                message.channel.send(embed);
                channelforconsole.send(embed);
                user.send(embed);
    
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
        }catch(err){
            console.log(`1.${err.name}\n2.${err.message}\n3.${err.stack}`);
        }
	}
};
