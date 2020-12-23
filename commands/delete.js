const Discord = require('discord.js');

module.exports = {
	name: 'удалить-город',
	description: 'Посмотреть текущую композицию.',
    aliases: ["delete-city"],
    args: true,
    usage: "[Город]",
	cooldown: 5,
    block: false,
	async execute(message, args, bot) {

        if(message.channel.id == '754611351980081212' || !bot.db.cst[args.slice(0, 100).join(" ")])return;

        let e = new Discord.MessageEmbed()
        .setTitle(`**Подтверждение 📊**`)
        .setColor('#4dff7c')
        .setTimestamp()
        .setDescription(`Вы уверены, что хотите удалить город под названием **${args.slice(0, 9999).join(" ")}**?`)
        .setFooter(message.guild.name, message.guild.iconURL())
        message.channel.send(e).then(msg => {
            collector(msg);
            msg.react('✅')
        })
        
        async function confirmed(msg){
            message.member.roles.remove(bot.guilds.cache.get('646285836500860929').roles.get('699974420323631275'));
            message.member.roles.remove(bot.guilds.cache.get('646285836500860929').roles.get('740098841575030847'));
            delete bot.db.cst[args.slice(0, 100).join(" ")];
            const embed = new Discord.MessageEmbed()
            .setDescription("<:Pid0r:736630978058911744> **Удаление**")
            .setFooter(message.guild.name, message.guild.iconURL())
            .setColor('RED')
            .setTimestamp()
            .addField("(Бывший) Мер",`<@${message.author.id}>`)
            .addField("(Бывший) Город", `${args.slice(0, 100).join(" ")}`, true)
        
            msg.edit(embed);
            msg.reactions.removeAll();
        }

        async function loading(msg, r, u){
            let embed = new Discord.MessageEmbed()
            .setTitle("<a:aiva_load:757138869748498522> **Загрузка**")
            .setFooter(message.guild.name, message.guild.iconURL())
            .setColor('#a6a6a6')
            .setTimestamp()
            .setDescription(`Удяляю кластер...`)
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

        function collector(msg) {
            let c = msg.createReactionCollector((r, u) => !u.bot, {max: 1, time:600000});
            c.on("collect", (r, u) => {
                if(u.id !== message.author.id || r.emoji.name !== '✅'){
                    collector(msg);
                    clearreact(msg, u.id)
                    return "";
                }else{
                    loading(msg);
                    setTimeout(confirmed, 3500, msg);
                }
            });
        };

	}
};
