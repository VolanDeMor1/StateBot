const Discord = module.require('discord.js');

module.exports = {
    name: 'чс-удалить',
	description: 'Команда для разработчиков.',
    aliases: [],
    args: true,
    usage: "[пользователь] [город]",
	cooldown: 5,
    block: false,
	async execute(message, args, bot) {
        let user = message.mentions.members.first();
        if(!user){
            const embed = new Discord.MessageEmbed()
            .setColor('#ff4f4f')
            .setTitle('🚫 **Внимание!**')
            .setTimestamp()
            .setDescription("Пользователь не найден")
            .setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(embed);
            return;
        }
        if(!bot.db.cst[args.slice(1, 99999).join(" ")]){
            const embed = new Discord.MessageEmbed()
            .setColor('#ff4f4f')
            .setTitle('🚫 **Внимание!**')
            .setTimestamp()
            .setDescription("Город не найден!")
            .setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(embed);
            return;
        }

        let e = new Discord.MessageEmbed()
            .setTitle(`<:yeah:751695766787063918> **Подтверждение**`)
            .setColor('#1aff00')
            .setDescription(`Вы уверены, что хотите **убрать** из ЧС города ${args.slice(1, 99999).join(" ")}, <@${user.id}>?`)
            .setFooter(message.guild.name, message.guild.iconURL())
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

        async function loading(msg, r, u){
            let embed = new Discord.MessageEmbed()
            .setTitle("<a:aiva_load:757138869748498522> **Загрузка**")
            .setFooter(message.guild.name, message.guild.iconURL())
            .setColor('#a6a6a6')
            .setTimestamp()
            .setDescription(`Проверяю...`)
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

        async function success(msg, r, u){
                let embed = new Discord.MessageEmbed()
                    .setTitle(`🚫 Чёрный список ${args.slice(1, 99999).join(" ")}`)
                    .setColor('#ff4f4f')
                    .setDescription(`Из ЧС убран <@${user.id}>\n> **Причина (была):** ${bot.db.cst[args.slice(1, 99999).join(" ")].blacklist[user.id].reason}`)
                    .setTimestamp()
                    .setFooter(message.guild.name, message.guild.iconURL())
                message.channel.send(embed);
                delete bot.db.cst[args.slice(1, 99999).join(" ")].blacklist[user.id];
        }
	}
};
