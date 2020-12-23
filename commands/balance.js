const Discord = require('discord.js');

module.exports = {
	name: 'баланс',
	description: 'Посмотреть текущую композицию.',
    aliases: ["balance", "b"],
    usage: "[пользователь]",
	cooldown: 5,
    block: false,
	execute(message, args, bot) {
        let user = message.mentions.members.first() || message.author;
        let channelapp = bot.channels.cache.get("710749869513375744")
        if(message.channel == channelapp){
            if (!message.mentions.users.size) {
                let ponimau2 = Number(bot.db.profile[user.id].coins) / 64;
                if(bot.db.profile[user.id].coins <= 64){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`**Баланс**`)
                    .setColor('#f0f0f0')
                    .setTimestamp()
                    .setDescription(`У <@${user.id}> на счету **${bot.db.profile[user.id].coins} <:ap:721753226768023582>**`)
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
        
                    message.channel.send(embed);
                }else{
                    let ponimau = Number(bot.db.profile[user.id].coins) / 64;
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`**Баланс**`)
                    .setColor('#f0f0f0')
                    .setTimestamp()
                    .setDescription(`У <@${user.id}> на счету **${bot.db.profile[user.id].coins} <:ap:721753226768023582> (${ponimau2}ст)**`)
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
        
                    message.channel.send(embed);
                }
                return "";
            }
        
            const mentioned = message.mentions.users.map(user => {
                // let rUser = bot.rUser;
                if(!bot.db.profile[user.id]){
                    // bot.message.channel.send("У этого пользователя нету счёта, за помощью обратитесь в канал <#709321730056781855> ");
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`🚫 **Ошибка!**`)
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setDescription("У этого пользователя нету счёта, за помощью обратитесь в канал <#709321730056781855> ")
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
    
                    message.channel.send(embed);
                    return "";
                }
                if(!user){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`🚫 **Ошибка!**`)
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setDescription("У этого пользователя нету счёта, за помощью обратитесь в канал <#709321730056781855> ")
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
    
                    message.channel.send(embed);
                    return "";
                }
                if(bot.db.profile[user.id].coins <= 64){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`**Баланс**`)
                    .setColor('#f0f0f0')
                    .setTimestamp()
                    .setDescription(`У <@${user.id}> на счету **${bot.db.profile[user.id].coins} <:ap:721753226768023582>**`)
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
        
                    message.channel.send(embed);
                }else{
                    let ponimau = Number(bot.db.profile[user.id].coins) / 64;
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`**Баланс**`)
                    .setColor('#f0f0f0')
                    .setTimestamp()
                    .setDescription(`У <@${user.id}> на счету **${bot.db.profile[user.id].coins} <:ap:721753226768023582> (${ponimau}ст)**`)
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
        
                    message.channel.send(embed);
                }
            });
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
