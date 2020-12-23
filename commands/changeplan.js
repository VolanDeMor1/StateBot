const Discord = require('discord.js');

module.exports = {
	name: 'сменить',
	description: 'Посмотреть текущую композицию.',
    aliases: ["смена", "план", "plan", "change", "ch"],
    args: true,
    usage: '[номер] [id-категории]',
	cooldown: 5,
    block: false,
	execute(message, args, bot) {

        if(message.channel.id !== '754611351980081212' || !bot.db.categories[args[1]] || bot.db.categories[args[1]].creator !== message.author.id){
            return;
        }


        if(args[0] == 1){
            if(bot.db.categories[args[1]].plan == 'Обычный'){
                let e = new Discord.MessageEmbed()
                .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                .setColor('#ff0000')
                .setTimestamp()
                .setDescription("У вас уже данный план")
                .setFooter(message.guild.name, message.guild.iconURL())

                message.channel.send(e).then(msg => {
                    msg.delete({ timeout: 15*1000 })
                })
                return "";
            }
            let e = new Discord.MessageEmbed()
            .setTitle(`<:yeah:751695766787063918> **Подтверждение**`)
            .setColor('#1aff00')
            .setDescription(`Вы уверены что хотите изменить свой план на **Обычный**?\n\`Стоимость изменения плана 1 ap\``)
            .setFooter(message.guild.name, message.guild.iconURL());
            message.channel.send(e).then(msg => {
                msg.react('✅');
                collector(msg);
            });
        }else if(args[0] == 2){
            if(bot.db.categories[args[1]].plan == 'Необычный'){
                let e = new Discord.MessageEmbed()
                .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                .setColor('#ff0000')
                .setTimestamp()
                .setDescription("У вас уже данный план")
                .setFooter(message.guild.name, message.guild.iconURL())

                message.channel.send(e).then(msg => {
                    msg.delete({ timeout: 15*1000 })
                })
                return "";
            }
            let e = new Discord.MessageEmbed()
            .setTitle(`<:yeah:751695766787063918> **Подтверждение**`)
            .setColor('#1aff00')
            .setDescription(`Вы уверены что хотите изменить свой план на **Необычный**?\n\`Стоимость изменения плана 9 ap\``)
            .setFooter(message.guild.name, message.guild.iconURL());
            message.channel.send(e).then(msg => {
                msg.react('✅');
                collector(msg);
            });
        }else if(args[0] == 3){
            if(bot.db.categories[args[1]].plan == 'Эпический'){
                let e = new Discord.MessageEmbed()
                .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                .setColor('#ff0000')
                .setTimestamp()
                .setDescription("У вас уже данный план")
                .setFooter(message.guild.name, message.guild.iconURL())

                message.channel.send(e).then(msg => {
                    msg.delete({ timeout: 15*1000 })
                })
                return "";
            }
            let e = new Discord.MessageEmbed()
            .setTitle(`<:yeah:751695766787063918> **Подтверждение**`)
            .setColor('#1aff00')
            .setDescription(`Вы уверены что хотите изменить свой план на **Эпический**?\n\`Стоимость изменения плана 19 ap\``)
            .setFooter(message.guild.name, message.guild.iconURL());
            message.channel.send(e).then(msg => {
                msg.react('✅');
                collector(msg);
            });
        }else if(args[0] == 4){
            if(bot.db.categories[args[1]].plan == 'Профессиональный'){
                let e = new Discord.MessageEmbed()
                .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                .setColor('#ff0000')
                .setTimestamp()
                .setDescription("У вас уже данный план")
                .setFooter(message.guild.name, message.guild.iconURL())

                message.channel.send(e).then(msg => {
                    msg.delete({ timeout: 15*1000 })
                })
                return "";
            }
            let e = new Discord.MessageEmbed()
            .setTitle(`<:yeah:751695766787063918> **Подтверждение**`)
            .setColor('#1aff00')
            .setDescription(`Вы уверены что хотите изменить свой план на **Профессиональный**?\n\`Стоимость изменения плана 19 ap\``)
            .setFooter(message.guild.name, message.guild.iconURL());
            message.channel.send(e).then(msg => {
                msg.react('✅');
                collector(msg);
            });
        }

        async function success(msg, r, u){
            if(args[0] == 1){
                if(bot.db.profile[message.author.id].coins < 1){
                    let e = new Discord.MessageEmbed()
                    .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setDescription("У вас не достаточно денег")
                    .setFooter(message.guild.name, message.guild.iconURL())
    
                    msg.edit(e).then(msg => {
                        msg.delete({ timeout: 15*1000 })
                    })
                    return "";
                }
                bot.db.profile[message.author.id].coins = bot.db.profile[message.author.id].coins - 1;
                bot.db.profile['575981243011956749'].coins++;
                bot.db.categories[args[1]] = {
                    name: bot.channels.cache.get(args[1]).name,
                    guild: '646285836500860929',
                    creator: message.author.id,
                    plan: 'Обычный'
                }
                let e = new Discord.MessageEmbed()
                .setTitle(`<:yeah:751695766787063918> **Успешно!**`)
                .setColor('RANDOM')
                .setTimestamp()
                .setDescription(`Теперь у вас **${bot.db.categories[args[1]].plan} план**`)
                .setFooter(message.guild.name, message.guild.iconURL());
                msg.edit(e).then(msg => {
                    msg.delete({ timeout:15*1000 })
                });
            }else if(args[0] == 2){
                if(bot.db.profile[message.author.id].coins < 9){
                    let e = new Discord.MessageEmbed()
                    .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setDescription("У вас не достаточно денег")
                    .setFooter(message.guild.name, message.guild.iconURL())
    
                    msg.edit(e).then(msg => {
                        msg.delete({ timeout: 15*1000 })
                    })
                    return "";
                }
                bot.db.profile[message.author.id].coins = bot.db.profile[message.author.id].coins - 9;
                bot.db.profile['575981243011956749'].coins = bot.db.profile[message.author.id].coins + 9;
                bot.db.categories[args[1]] = {
                    name: bot.channels.cache.get(args[1]).name,
                    guild: '646285836500860929',
                    creator: message.author.id,
                    plan: 'Необычный'
                }
                createTextChannel(bot.channels.cache.get(args[1]));
                createVoiceChannel(bot.channels.cache.get(args[1]));
                let e = new Discord.MessageEmbed()
                .setTitle(`<:yeah:751695766787063918> **Успешно!**`)
                .setColor('RANDOM')
                .setTimestamp()
                .setDescription(`Теперь у вас **${bot.db.categories[args[1]].plan} план**`)
                .setFooter(message.guild.name, message.guild.iconURL());
                msg.edit(e).then(msg => {
                    msg.delete({ timeout:15*1000 })
                });
            }else if(args[0] == 3){
                if(bot.db.profile[message.author.id].coins < 19){
                    let e = new Discord.MessageEmbed()
                    .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setDescription("У вас не достаточно денег")
                    .setFooter(message.guild.name, message.guild.iconURL())
    
                    msg.edit(e).then(msg => {
                        msg.delete({ timeout: 15*1000 })
                    })
                    return "";
                }
                bot.db.profile[message.author.id].coins = bot.db.profile[message.author.id].coins - 19;
                bot.db.profile['575981243011956749'].coins = bot.db.profile[message.author.id].coins + 19;
                bot.db.categories[args[1]] = {
                    name: bot.channels.cache.get(args[1]).name,
                    guild: '646285836500860929',
                    creator: message.author.id,
                    plan: 'Эпический'
                }
                createTextChannel(bot.channels.cache.get(args[1]));
                createTextChannel(bot.channels.cache.get(args[1]));
                createTextChannel(bot.channels.cache.get(args[1]));
                createVoiceChannel(bot.channels.cache.get(args[1]));
                createVoiceChannel(bot.channels.cache.get(args[1]));
                let e = new Discord.MessageEmbed()
                .setTitle(`<:yeah:751695766787063918> **Успешно!**`)
                .setColor('RANDOM')
                .setTimestamp()
                .setDescription(`Теперь у вас **${bot.db.categories[args[1]].plan} план**`)
                .setFooter(message.guild.name, message.guild.iconURL());
                msg.edit(e).then(msg => {
                    msg.delete({ timeout:15*1000 })
                });
            }else if(args[0] == 4){
                if(bot.db.profile[message.author.id].coins < 19){
                    let e = new Discord.MessageEmbed()
                    .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setDescription("У вас не достаточно денег")
                    .setFooter(message.guild.name, message.guild.iconURL())
    
                    msg.edit(e).then(msg => {
                        msg.delete({ timeout: 15*1000 })
                    })
                    return "";
                }
                bot.db.profile[message.author.id].coins = bot.db.profile[message.author.id].coins - 19;
                bot.db.profile['575981243011956749'].coins = bot.db.profile[message.author.id].coins + 19;
                bot.db.categories[args[1]] = {
                    name: bot.channels.cache.get(args[1]).name,
                    guild: '646285836500860929',
                    creator: message.author.id,
                    plan: 'Профессиональный',
                    time: Date.now() + 2592000000,
                    chek: false
                }
                createTextChannel(bot.channels.cache.get(args[1]));
                createTextChannel(bot.channels.cache.get(args[1]));
                createTextChannel(bot.channels.cache.get(args[1]));
                createVoiceChannel(bot.channels.cache.get(args[1]));
                createVoiceChannel(bot.channels.cache.get(args[1]));
                createVoiceChannel(bot.channels.cache.get(args[1]));
                createVoiceChannel(bot.channels.cache.get(args[1]));
                createVoiceChannel(bot.channels.cache.get(args[1]));
                let e = new Discord.MessageEmbed()
                .setTitle(`<:yeah:751695766787063918> **Успешно!**`)
                .setColor('RANDOM')
                .setTimestamp()
                .setDescription(`Теперь у вас **${bot.db.categories[args[1]].plan} план**`)
                .setFooter(message.guild.name, message.guild.iconURL());
                msg.edit(e).then(msg => {
                    msg.delete({ timeout:15*1000 })
                });
            }
        }

        async function createTextChannel(cat){
            let a = ['фоточки', 'заказы', 'отзывы', 'музыка', 'новости', 'анкеты'];
            message.guild.channels.create(a[Math.round(Math.random() * a.length)], {
                type: "TEXT",
                parent: cat,
                permissionOverwrites: [
                    {
                      id: message.author.id,
                      allow: ['VIEW_CHANNEL', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS'],
                   },
                   {
                    id: message.guild.id,
                    deny: ['MANAGE_MESSAGES'],
                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES']
                   },
                ]						   
            });
        }

        async function createVoiceChannel(cat){
            let a = ['голоса', 'поддержка', 'общение', 'музыка', 'эфир', 'сказки'];
            message.guild.channels.create(a[Math.round(Math.random() * a.length)], {
                type: "VOICE",
                parent: cat,
                permissionOverwrites: [
                    {
                      id: message.author.id,
                      allow: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'MANAGE_CHANNELS'],
                   },
                   {
                    id: message.guild.id,
                    deny: ['MANAGE_CHANNELS'],
                    allow: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK']
                   },
                ]						   
            });
        }

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

        async function loading(msg, r, u){
            let embed = new Discord.MessageEmbed()
            .setTitle("<a:aiva_load:757138869748498522> **Загрузка**")
            .setFooter(message.guild.name, message.guild.iconURL())
            .setColor('#a6a6a6')
            .setTimestamp()
            .setDescription(`Проверка данных...`)
            msg.edit(embed);
            return "";
        };

        async function clearreact(msg, uid){
            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(uid));
            for (const reaction of userReactions.values()) {
                await reaction.users.remove(uid).then(()=>{
                    msg.react('✅')
                });}
        }

	}
};
