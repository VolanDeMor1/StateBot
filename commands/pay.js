const Discord = require('discord.js');
const fs = require("fs");

module.exports = {
	name: 'перевод',
	description: 'Посмотреть текущую композицию.',
    aliases: ["pay", "заплатить"],
    args: true,
    usage: "[пользователь] [сумма] [коментарий(необязательно)]",
	cooldown: 5,
    block: false,
	execute(message, args, bot) {
        let user = message.mentions.members.first();
        let channelapp = bot.channels.cache.get("710749869513375744")
        let channelforconsole = bot.channels.cache.get("715517792182468639")
        try{
            if(message.channel == channelapp){
                let uid = message.author.id;
                let u = bot.db.profile[uid];
                if(!user){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setDescription("Пользователь не найден \n За помощью обратитесь в канал <#709321730056781855> ")
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
            
                    message.channel.send(embed);
                    return "";
                }
                if(args[1] < 1){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setDescription("Вы не можете указать сумму ниже 1 <:ap:721753226768023582> \n Ещё раз просмотрите канал <#710866083480993924> ")
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
            
                    message.channel.send(embed);
                    return "";
                }
                if(args[1] > bot.db.profile[message.author.id].coins){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setDescription("Вы не можете указать сумму больше количества ар у вас на счету")
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
            
                    message.channel.send(embed);
                    return "";
                }
                if(!Number(args[1])){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setDescription("Вы неверно указали сумму перевода \n Ещё раз просмотрите канал <#710866083480993924> ")
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
            
                    message.channel.send(embed);
                    return "";
                }
                if(!bot.db.profile[user.id]){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setDescription("У этого пользователя нету счёта, за помощью обратитесь в канал <#709321730056781855> ")
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
            
                    message.channel.send(embed);
                    return "";
                }
                let e = new Discord.MessageEmbed()
                    .setTitle(`<:yeah:751695766787063918> **Подтверждение**`)
                    .setColor('#1aff00')
                    .setDescription(`Вы уверены, что собираетесь перевести ${Math.floor(args[1])} <:ap:721753226768023582>, на счёт **<@${user.user.id}>**?\nКоментарий перевода **${args.slice(2, 100000).join(" ") || "Не указан"}**`)
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
                    .setTimestamp()
                message.channel.send(e).then(msg => {
                    msg.react('✅');
                    collector(msg);
                });

                async function collector(msg){
                    let c = msg.createReactionCollector((r, u) => !u.bot, {max: 1, time:600000});
                    c.on("collect", (r, u) => {
                        if(u.id !== message.author.id || r.emoji.name !== '✅'){
                            clearreact(msg, u.id);
                            collector(msg);
                            return "";
                        }else{
                            loading(msg, r, u);
                            setTimeout(success, 3500, msg, r, u);
                            return "";
                        }
                    });
                };
    
                async function clearreact(msg, uid){
                    const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(uid));
                    for (const reaction of userReactions.values()) {
                        await reaction.users.remove(uid).then(()=>{
                            msg.react('✅')
                        });}
                }

                async function success(msg, r, u){
                    if(message.author.id == user.id){
                        let embed = new Discord.MessageEmbed()
                        .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                        .setColor('#ff0000')
                        .setTimestamp()
                        .setDescription("Вы не можете пополнить счёт себе")
                        .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
                    
                        msg.edit(embed);
                        msg.reactions.removeAll();
                        return "";
                    }
                    bot.db.profile[user.id].coins = Number(bot.db.profile[user.id].coins) + Number(Math.floor(args[1]));
                    bot.db.profile[message.author.id].coins = Number(bot.db.profile[message.author.id].coins) - Number(Math.floor(args[1]));
                    let embed = new Discord.MessageEmbed()
                    .setTitle("<:yeah:751695766787063918> **Транзакция**")
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
                    .setColor('#1aff00')
                    .setTimestamp()
                    .setDescription(`> 💳 **Данные транзакции:**\n> **Отправитель:** <@${message.author.id}>\n> **Получатель:** <@${user.user.id}>\n> **Сумма:** ${Math.floor(args[1])} <:ap:721753226768023582>\n> **Коментарий:** ${args.slice(2, 100000).join(" ") || "Не указан"}`)
                    msg.edit(embed);
                    msg.reactions.removeAll();
                    channelforconsole.send(embed);
                    user.send(embed);
                    return "";
                };

                async function loading(msg, r, u){
                    let embed = new Discord.MessageEmbed()
                    .setTitle("<a:aiva_load:757138869748498522> **Загрузка**")
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
                    .setColor('#a6a6a6')
                    .setTimestamp()
                    .setDescription(`Отправка средств...`)
                    msg.edit(embed);
                    return "";
                };
            }else{
                let embed = new Discord.MessageEmbed()
                .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
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
