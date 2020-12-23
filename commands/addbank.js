const Discord = require('discord.js');
const fs = require("fs");
let profile = require("../profile.json");
let bank = require("../bank.json");

module.exports = {
	name: 'добавить',
	description: 'Посмотреть текущую композицию.',
    aliases: ["add", "add"],
    args: true,
    usage: '[]',
	cooldown: 5,
    block: false,
	execute(message, args, bot) {
        let user = message.mentions.members.first() || message.author || args[0] == "Спавн";
        let channelapp = bot.channels.cache.get("710749869513375744")
        let channelforconsole = bot.channels.cache.get("715517792182468639")
        try{
            if(message.channel == channelapp){
                if(!message.member.roles.cache.has('710816159578062948')){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setDescription("У вас нет прав \n Это могут сделать только <@&710816159578062948> ")
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
            
                    message.channel.send(embed);
                    return "";
                }
                if(!user){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setDescription("Пользователь не найден \n Ещё раз просмотрите канал <#711935562898079764> ")
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
            
                    message.channel.send(embed);
                    return "";
                }
                if(!args[1]){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setDescription("Вы не указали сумму \n Ещё раз просмотрите канал <#711935562898079764> ")
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
            
                    message.channel.send(embed);
                    return "";
                }
                if(!Number(args[1])){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setDescription("Вы неверно указали сумму перевода \n Ещё раз просмотрите канал <#711935562898079764> ")
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
            
                    message.channel.send(embed);
                    return "";
                }
                if(args[0] == "Спавн"){
                    bank["spawn"].coins = Number(bank["spawn"].coins) + Number(args[1]);
                    let embed = new Discord.MessageEmbed()
                    .setDescription("**Транзакция**")
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
                    .setColor('#1aff00')
                    .setTimestamp()
                    .addField("Банкир",`<@${message.author.id}>`, true)
                    .addField("Отделение",`${args[0]}`, true)
                    .addField("Сумма", `${args[1]} <:ap:721753226768023582>`, true)
                    .addField("В отделении всего",`${bank["spawn"].coins} <:ap:721753226768023582>`, true)
                
                    message.channel.send(embed);
                    channelforconsole.send(embed);
                    return "";
                }
                if(!bot.db.profile[user.id]) return message.channel.send("Пользователя нету в profile.json");

                let e = new Discord.MessageEmbed()
                    .setTitle(`<:yeah:751695766787063918> **Подтверждение**`)
                    .setColor('#1aff00')
                    .setDescription(`Вы уверены, что собираетесь пополнить счёт **<@${user.id}>**, на сумму ${args[1]} <:ap:721753226768023582>, в отделении **${args[2] || "Не указано"}**`)
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
                    const a = ["WF", "Блэквуд", "Блеквуд", "Блек", "Блэк", "б"];
                    const b = ["Модерик", "Модер", "М"];
                    if(a.includes(args[2])){
                        bank["Блэквуд"].coins = Number(bank["Блэквуд"].coins) + Number(args[1]);
                        bot.db.profile[user.id].coins = Number(profile[user.id].coins) + Number(args[1]);
                        let embed = new Discord.MessageEmbed()
                        .setTitle("<:yeah:751695766787063918> **Транзакция**")
                        .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
                        .setColor('#1aff00')
                        .setTimestamp()
                        .setDescription(`> 💳 **Данные транзакции:**\n> **Банкир:** <@${message.author.id}>\n> **Клиент:** <@${user.user.id}>\n> **Отделение:** Блэквуд\n> **Сумма:** ${args[1]} <:ap:721753226768023582>`)
                        msg.edit(embed);
                        msg.reactions.removeAll();
                        channelforconsole.send(embed);
                        user.send(embed);
                        return "";
                    }else if(b.includes(args[2])){
                        bank["Модерик"].coins = Number(bank["Модерик"].coins) + Number(args[1]);
                        bot.db.profile[user.id].coins = Number(profile[user.id].coins) + Number(args[1]);
                        let embed = new Discord.MessageEmbed()
                        .setTitle("<:yeah:751695766787063918> **Транзакция**")
                        .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
                        .setColor('#1aff00')
                        .setTimestamp()
                        .setDescription(`> 💳 **Данные транзакции:**\n> **Банкир:** <@${message.author.id}>\n> **Клиент:** <@${user.user.id}>\n> **Отделение:** Модерик\n> **Сумма:** ${args[1]} <:ap:721753226768023582>`)
                        msg.edit(embed);
                        msg.reactions.removeAll();
                        channelforconsole.send(embed);
                        user.send(embed);
                        return "";
                    }else{
                        let embed = new Discord.MessageEmbed()
                        .setTitle(`<:nope:751695799561486377> **Внимание!**`)
                        .setColor('#ff0000')
                        .setTimestamp()
                        .setDescription(`Вы не указали отделение или просто указали его неверно это значит что вы собираетесь просто исправить счёт <@${user.user.id}>, нажмите на реакцию чтобы подтвердить это.\n\n\`Это сообщение сгенерировано автоматически, выполнение запроса продолжится после нажатие на реакцию\``)
                        .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
                
                        msg.edit(embed);
                        msg.reactions.removeAll();
                        msg.react('☑️')
                        collector2(msg);
                        return "";
                    }
                }

                async function collector2(msg){
                    let c = msg.createReactionCollector((r, u) => !u.bot, {max: 1, time:600000});
                    c.on("collect", (r, u) => {
                        if(u.id !== message.author.id || r.emoji.name !== '☑️'){
                            clearreact2(msg, u.id);
                            collector2(msg);
                            return "";
                        }else{
                            loading2(msg, r, u);
                            setTimeout(notO, 3500, msg, r, u);
                            return "";
                        }
                    });
                };
    
                async function clearreact2(msg, uid){
                    const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(uid));
                    for (const reaction of userReactions.values()) {
                        await reaction.users.remove(uid).then(()=>{
                            msg.react('☑️')
                        });}
                }

                async function notO(msg, r, u){
                    bot.db.profile[user.id].coins = Number(profile[user.id].coins) + Number(args[1]);
                    let embed = new Discord.MessageEmbed()
                    .setTitle("<:yeah:751695766787063918> **Транзакция**")
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
                    .setColor('#1aff00')
                    .setTimestamp()
                    .setDescription(`> 💳 **Данные транзакции:**\n> **Банкир:** <@${message.author.id}>\n> **Клиент:** <@${user.user.id}>\n> **Сумма:** ${args[1]} <:ap:721753226768023582>`)
                    msg.edit(embed);
                    msg.reactions.removeAll();
                    channelforconsole.send(embed);
                    user.send(embed);
                }

                async function loading(msg, r, u){
                    let embed = new Discord.MessageEmbed()
                    .setTitle("<a:aiva_load:757138869748498522> **Загрузка**")
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
                    .setColor('#a6a6a6')
                    .setTimestamp()
                    .setDescription(`Получение ответа...`)
                    msg.edit(embed);
                    return "";
                };

                async function loading2(msg, r, u){
                    let embed = new Discord.MessageEmbed()
                    .setTitle("<a:aiva_load:757138869748498522> **Загрузка**")
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
                    .setColor('#a6a6a6')
                    .setTimestamp()
                    .setDescription(`Проверка...`)
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
