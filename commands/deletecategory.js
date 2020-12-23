const Discord = require('discord.js');

module.exports = {
	name: 'удалить',
	description: 'Посмотреть текущую композицию.',
    aliases: ["delete", "del", "удали", "удоли", "удолить"],
    args: true,
    usage: '[id-категории]',
	cooldown: 5,
    block: false,
	execute(message, args, bot) {

        if(message.channel.id !== '754611351980081212' || !bot.db.categories[args[0]] || bot.db.categories[args[0]].creator !== message.author.id){
            return;
        }

        let e = new Discord.MessageEmbed()
        .setTitle(`<:warn:759364431296593931> **Внимание!**`)
        .setColor('#f0d032')
        .setTimestamp()
        .setDescription("Вы уверены что хотите удалить категорию, вместе с каналами?")
        .setFooter(message.guild.name, message.guild.iconURL())

        message.channel.send(e).then(msg => {
            collector(msg);
            msg.react('✅');
        })

        async function deletecategory(msg){
            let e = new Discord.MessageEmbed()
            .setTitle(`<:yeah:751695766787063918> **Успешно!**`)
            .setColor('RANDOM')
            .setTimestamp()
            .setDescription(`Ваша категория была удалена, безвозвратно.`)
            .setFooter(message.guild.name, message.guild.iconURL());
            msg.edit(e).then(msg => {
                msg.delete({ timeout:15*1000 })
            });
            delete bot.db.categories[args[0]];
            bot.channels.cache.get(args[0]).children.forEach(ch => {
                ch.delete();
            })
            bot.channels.cache.get(args[0]).delete();
        }

        async function collector(msg){
            let c = msg.createReactionCollector((r, u) => !u.bot, {max: 1, time:60000});
            c.on("collect", (r, u) => {
                if(u.id !== message.author.id || r.emoji.name !== '✅'){
                    clearreact(msg, u.id);
                    collector(msg);
                    return "";
                }else{
                    loading(msg, r, u);
                    setTimeout(deletecategory, 3500, msg);
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
            .setDescription(`Удаляю...`)
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
