const Discord = require('discord.js');

module.exports = {
    name: 'spacepay',
	description: 'Посмотреть текущую композицию.',
    aliases: ["sp", "сп"],
    args: true,
    usage: "[сумма] [время(дни)]",
	cooldown: 150,
    block: false,
	execute(message, args, bot) {
        if(!Number(args[0])){
            const embed = new Discord.MessageEmbed()
            .setColor('#ff4f4f')
            .setTitle('🚫 **Внимание!**')
            .setTimestamp()
            .setDescription("Вы неверно указали сумму")
            .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1');
            message.channel.send(embed);
            return;
        }
        if(!args[1]){
            let embed = new Discord.MessageEmbed()
            .setTitle(`**SpacePay <:spacebank:715319742025695302>**`)
            .setDescription(`Вы хотите сделать бесконечный код?`)
            .setColor('#03fc56')
            .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1');
            message.reply(embed).then(msg => {
                msg.react(`✅`);
                let c = msg.createReactionCollector((r, u) => !u.bot, {max: 1, time:600000});
                c.on("collect", (r, u) => {
                    if(u.id !== message.author.id){
                        clearreact(msg, u.id);
                        collector(msg)
                        return "";
                    }else{
                        genCode(msg, r, u);
                    }
                });
            })
            
            async function genCode(msg, r, user){
                var password = "";
                var symbols = "1234567890";
                for (var i = 0; i < 5; i++){
                    password += symbols.charAt(Math.floor(Math.random() * symbols.length));     
                }
                newlist(msg, r, user, password);
            }

            async function newlist(msg, r, user, code){
                if(r.emoji.name == '✅'){
                    if(bot.db.spacepay[code]){
                        genCode(msg, r, user);
                        return "";
                    }
                    bot.db.spacepay[code] = {
                        creator:user.id,
                        sum:args[0],
                        time: "Бесконечно",
                        chek:false
                    }
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`**SpacePay <:spacebank:715319742025695302>**`)
                    .setDescription(`Ваш код: **${code}**`)
                    .addField(`Истекает:`, `♾️`, true)
                    .addField(`Сумма:`, `${args[0]} <:ap:721753226768023582>`, true)
                    .setColor('#03fc56')
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1');
                    msg.delete()
                    user.send(embed);
                    bot.channels.cache.get('715517792182468639').send(embed);
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
                        genCode(msg, r, u);
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
        }else if(args[1]){
            if(!Number(args[1])){
                const embed = new Discord.MessageEmbed()
                .setColor('#ff4f4f')
                .setTitle('🚫 **Внимание!**')
                .setTimestamp()
                .setDescription("Вы неверно указали дату")
                .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1');
                message.channel.send(embed);
                return;
            }
            if(args[1] <= 0){
                const embed = new Discord.MessageEmbed()
                .setColor('#ff4f4f')
                .setTitle('🚫 **Внимание!**')
                .setTimestamp()
                .setDescription("Вы не можете сделать код который будет действовать меньше 1го дня")
                .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1');
            }
            let embed = new Discord.MessageEmbed()
            .setTitle(`**SpacePay <:spacebank:715319742025695302>**`)
            .setDescription(`Вы хотите сделать код который будет действовать ${args[1]} дней?`)
            .setColor('#03fc56')
            .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1');
            message.reply(embed).then(msg => {
                msg.react(`✅`);
                let c = msg.createReactionCollector((r, u) => !u.bot, {max: 1, time:600000});
                c.on("collect", (r, u) => {
                    if(u.id !== message.author.id){
                        clearreact(msg, u.id);
                        collectorA(msg)
                        return "";
                    }else{
                        genCodeA(msg, r, u);
                    }
                });
            })

            function collectorA(msg) {
                let c = msg.createReactionCollector((r, u) => !u.bot, {max: 1, time:600000});
                c.on("collect", (r, u) => {
                    if(u.id !== message.author.id){
                        clearreact(msg, u.id);
                        collectorA(msg);
                        return "";
                    }else{
                        genCodeA(msg, r, u);
                    }
                });
            };

            async function genCodeA(msg, r, user){
                var password = "";
                var symbols = "1234567890";
                for (var i = 0; i < 5; i++){
                    password += symbols.charAt(Math.floor(Math.random() * symbols.length));     
                }
                newlistB(msg, r, user, password);
            }

            async function newlistB(msg, r, user, code){
                if(r.emoji.name = '✅'){
                    if(bot.db.spacepay[code]){
                        genCodeA(user);
                        return "";
                    }
                    let time = args[1] * 86400000;
                    bot.db.spacepay[code] = {
                        creator:user.id,
                        sum:args[0],
                        time:time,
                        chek:false
                    }
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`**SpacePay <:spacebank:715319742025695302>**`)
                    .setDescription(`Ваш код: **${code}**`)
                    .addField(`Истекает:`, `Через ${args[1]} дней`, true)
                    .addField(`Сумма:`, `${args[0]} <:ap:721753226768023582>`, true)
                    .setColor('#03fc56')
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1');
                    msg.delete()
                    user.send(embed);
                    bot.channels.cache.get('715517792182468639').send(embed);
                }
            }
        }
	}
};
