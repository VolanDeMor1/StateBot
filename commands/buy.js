const Discord = require('discord.js');
const profile = require('../profile.json');
const fs = require('fs');

module.exports = {
	name: 'купить',
	description: 'Посмотреть текущую композицию.',
    aliases: ["buy", "b"],
    args: true,
    usage: "[код]",
	cooldown: 5,
    block: false,
	execute(message, args, bot) {
        if(!Number(args[0])){
            const embed = new Discord.MessageEmbed()
            .setColor('#ff4f4f')
            .setTitle('🚫 **Внимание!**')
            .setTimestamp()
            .setDescription("Вы неверно указали код")
            .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1');
            message.channel.send(embed);
            return;
        }
        if(bot.db.spacepay[args[0]]){
            if(profile[message.author.id].coins < bot.db.spacepay[args[0]].sum){
                const embed = new Discord.MessageEmbed()
                .setColor('#ff4f4f')
                .setTitle('🚫 **Внимание!**')
                .setTimestamp()
                .setDescription("У вас недостаточно средств")
                .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1');
                message.channel.send(embed);
                return;
            }
            let embed = new Discord.MessageEmbed()
            .setTitle(`**SpacePay <:spacebank:715319742025695302>**`)
            .setDescription(`Вы уверены что готовы заплатить ${bot.db.spacepay[args[0]].sum} <:ap:721753226768023582>?`)
            .setColor('#fff5f5')
            .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1');
            message.channel.send(embed).then(msg => {
                msg.react('✅');
                let c = msg.createReactionCollector((r, u) => !u.bot, {max: 1, time:600000});
                c.on("collect", (r, u) => {
                    if(u.id !== message.author.id){
                        clearreact(msg, u.id);
                        collector(msg);
                        return "";
                    }else{
                        newlist(r, u, msg);
                    }
                });
            })
        }else if(!bot.db.spacepay[args[0]]){
            const embed = new Discord.MessageEmbed()
            .setColor('#ff4f4f')
            .setTitle('🚫 **Внимание!**')
            .setTimestamp()
            .setDescription("Код не найден")
            .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1');
            message.channel.send(embed);
            return;
        }

        async function newlist(r, user, msg){
            if(r.emoji.name == '✅'){
                profile[message.author.id].coins = Number(profile[message.author.id].coins - bot.db.spacepay[args[0]].sum);
                profile[bot.db.spacepay[args[0]].creator].coins = Number(profile[bot.db.spacepay[args[0]].creator].coins + bot.db.spacepay[args[0]].sum);
                let embed = new Discord.MessageEmbed()
                .setTitle(`**SpacePay <:spacebank:715319742025695302>**`)
                .setDescription(`Вы успешно заплатили ${bot.db.spacepay[args[0]].sum} <:ap:721753226768023582>`)
                .setColor('#fff5f5')
                .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1');
                msg.edit(embed);
                fs.writeFile('../profile.json',JSON.stringify(profile),(err)=>{
                    if(err) console.log(err);
                });
            }
        }

        function collector(msg) {
            let c = msg.createReactionCollector((r, u) => !u.bot, {max: 1, time:600000});
            c.on("collect", (r, u) => {
                if(u.id !== message.author.id){
                    clearreact(msg, u.id);
                    collector(msg);
                    return "";
                }else{
                    newlist(r, u, msg);
                }
            });
        };

        async function clearreact(msg, uid){
            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(uid));
            for (const reaction of userReactions.values()) {
                await reaction.users.remove(uid).then(()=>{
                    msg.react('✅');
                });}
        }
	}
};
