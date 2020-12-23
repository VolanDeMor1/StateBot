const Discord = module.require('discord.js');
const fs = require('fs');
module.exports = {
	name: 'помощь',
	description: 'Получить список команд.',
    aliases: ["help", "h", "хелп", "х"],
	usage: '[текст]',
	cooldown: 10,
    block: false,
	execute(message, args, bot) {
		const permissions = message.channel.permissionsFor(message.client.user);
			const embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('**Помощь по командам (1/2)**')
				.setTimestamp()
				.setDescription("> **Музыкальные команды:**\n<:yeah:751695766787063918> **.помощь** - Отображает список доступных команд.\n<:yeah:751695766787063918> **.играй** - Начинает воспроизводить музыку в голосовом канале.\n<:yeah:751695766787063918> **.стоп** - Отключает бота от голосового канала.\n<:yeah:751695766787063918> **.очередь** - Отображает список треков.\n<:yeah:751695766787063918> **.громкость** - Устанавливает громоксть воспроизведения.\n<:yeah:751695766787063918> **.скип** - Пропускает текущий трек.\n<:yeah:751695766787063918> **.пауза** - Ставит воспроизведение на паузу.\n<:yeah:751695766787063918> **.продолжай** - Продолжает воспроизведение(после паузы).\n<:yeah:751695766787063918> **.щачо** - Отображает текущий трек.")
				.setFooter(message.guild.name, message.guild.iconURL());

			message.channel.send(embed).then(msg=> {
                msg.react('◀️')
                msg.react('▶️')
                collector(msg);
                // let c = msg.createReactionCollector((r, u) => !u.bot, {max: 1, time:600000});
                // c.on("collect", (r, u) => {
                //     newlist(r, u);
                // });
                function newlist(r, u) {
                    if(r.emoji.name == '▶️'){
                        const embed = new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('**Помощь по командам (2/2)**')
                            .setTimestamp()
                            .setDescription("> **Пользовательствкие команды:**\n<:yeah:751695766787063918> **.города** - Отображает список городов внесёных в Базу Данных бота.\n<:yeah:751695766787063918> **.город** - Отображает подробную информацию о городе.\n<:yeah:751695766787063918> **.изменить** - Изменить данные города указаные в команде \`.город\`.\n<:yeah:751695766787063918> **.жители** - Отображает список жителей города.\n<:yeah:751695766787063918> **.жительство-добавить** - Установить жительство для определённого пользователя.\n<:yeah:751695766787063918> **.жительство-убрать** - Убрать жителельство определённого пользователя.\n<:yeah:751695766787063918> **.чс** - Отображает чёрный список города.\n<:yeah:751695766787063918> **.чс-добавить** - Добавить пользователя в чс.\n<:yeah:751695766787063918> **.чс-удалить** - Удалить из час пользователя.")
                            .setFooter(message.guild.name, message.guild.iconURL());
            
                        msg.edit(embed);
                        if(!permissions.has('MANAGE_MESSAGES')){
                            const embed = new Discord.MessageEmbed()
                                .setColor('#ff4f4f')
                                .setTitle('🚫 **Внимание!**')
                                .setTimestamp()
                                .setDescription("У меня недостаточно прав, удалять реакции (`MANAGE_MESSAGES`)")
                                .setFooter(message.guild.name, message.guild.iconURL());
                
                                msg.edit(embed)
                            return '';
                        }
                        collector(msg);
                        clearreact(msg, u.id);
                    }else if(r.emoji.name == '◀️'){
                        const embed = new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('**Помощь по командам (1/2)**')
                            .setTimestamp()
                            .setDescription("> **Музыкальные команды:**\n<:yeah:751695766787063918> **.помощь** - Отображает список доступных команд.\n<:yeah:751695766787063918> **.играй** - Начинает воспроизводить музыку в голосовом канале.\n<:yeah:751695766787063918> **.стоп** - Отключает бота от голосового канала.\n<:yeah:751695766787063918> **.очередь** - Отображает список треков.\n<:yeah:751695766787063918> **.громкость** - Устанавливает громоксть воспроизведения.\n<:yeah:751695766787063918> **.скип** - Пропускает текущий трек.\n<:yeah:751695766787063918> **.пауза** - Ставит воспроизведение на паузу.\n<:yeah:751695766787063918> **.продолжай** - Продолжает воспроизведение(после паузы).\n<:yeah:751695766787063918> **.щачо** - Отображает текущий трек.")
                            .setFooter(message.guild.name, message.guild.iconURL());

                        msg.edit(embed);
                        if(!permissions.has('MANAGE_MESSAGES')){
                            const embed = new Discord.MessageEmbed()
                                .setColor('#ff4f4f')
                                .setTitle('🚫 **Внимание!**')
                                .setTimestamp()
                                .setDescription("У меня недостаточно прав, удалять реакции (`MANAGE_MESSAGES`)")
                                .setFooter(message.guild.name, message.guild.iconURL());
                
                                msg.edit(embed)
                            return '';
                        }
                        collector(msg);
                        clearreact(msg, u.id);
                    }else{
                        if(!permissions.has('MANAGE_MESSAGES')){
                            const embed = new Discord.MessageEmbed()
                                .setColor('#ff4f4f')
                                .setTitle('🚫 **Внимание!**')
                                .setTimestamp()
                                .setDescription("У меня недостаточно прав, удалять реакции (`MANAGE_MESSAGES`)")
                                .setFooter(message.guild.name, message.guild.iconURL());
                
                                msg.edit(embed)
                            return '';
                        }
                        allreact(msg, u.id);
                        collector(msg);
                    }
                };

                function collector(msg) {
                    let c = msg.createReactionCollector((r, u) => !u.bot, {max: 1, time:600000});
                    c.on("collect", (r, u) => {
                        if(u.id !== message.author.id){
                            clearreact(msg, u.id);
                            collector(msg);
                            return "";
                        }else{
                            newlist(r, u);
                        }
                    });
                };

                async function clearreact(msg, uid){
                    const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(uid));
                    for (const reaction of userReactions.values()) {
                        await reaction.users.remove(uid).then(()=>{
                            msg.react('◀️')
                            msg.react('▶️')
                        });}
                }

                async function allreact(msg, uid){
                    const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(uid));
                    for (const reaction of userReactions.values()) {
                        await reaction.users.remove(uid);
                    }
                }
                    // msg.reaction.users.remove(uid)
            });
	}
};
