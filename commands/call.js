const Discord = require('discord.js');

module.exports = {
	name: 'вызов',
	description: 'Посмотреть текущую композицию.',
	aliases: ["вызвать", "банкир"],
	args: true,
	usage: '[отделение]',
	cooldown: 5,
    block: false,
	execute(message, args, bot) {
		if(message.channel.id == '710749869513375744'){
			let e = new Discord.MessageEmbed()
                    .setTitle(`<:yeah:751695766787063918> **Подтверждение**`)
                    .setColor('#1aff00')
                    .setDescription(`Вы уверены, что хотите вызвать банкира в отделение **${args[0]}**?`)
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
                    .setTimestamp();
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
                            return "";
                        }
                    });
                };

				function loading(msg, r, u){
					let embed = new Discord.MessageEmbed()
					.setTitle("<a:aiva_load:757138869748498522> **Загрузка**")
					.setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
					.setColor('#a6a6a6')
					.setTimestamp()
					.setDescription(`Отправка запроса...`)
					msg.edit(embed);
					setTimeout(success, 3500, msg, r, u);
					return "";
				};

				async function success(msg, r, u){
					if(require('../bank.json')[args[0]]){
							let embed = new Discord.MessageEmbed()
							.setTitle("<:yeah:751695766787063918> **Успешно!**")
							.setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
							.setColor('#1aff00')
							.setTimestamp()
							.setDescription(`Вы вызвали банкира в отделение **${args[0]}**`);
							msg.edit(embed);
							msg.reactions.removeAll();
							let e = new Discord.MessageEmbed()
							.setTitle("<a:smilecat:757138869748498522> **Вызов**")
							.setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
							.setColor('#1aff00')
							.setTimestamp()
							.setDescription(`<@${message.author.id}> вызвал банкира в отделение **${args[0]}**`);
							bot.channels.cache.get('710865544152088686').send(`<@&710816159578062948>`, e);
							return "";
					}else{
						let embed = new Discord.MessageEmbed()
						.setTitle(`<:nope:751695799561486377> **Внимание!**`)
						.setColor('#ff0000')
						.setTimestamp()
						.setDescription(`Отделение не найдено`)
						.setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
				
						msg.edit(embed);
						return "";
					}
				};
		
			async function clearreact(msg, uid){
				const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(uid));
				for (const reaction of userReactions.values()) {
					await reaction.users.remove(uid).then(()=>{
						msg.react('✅')
					});}
			}
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
	}
};
