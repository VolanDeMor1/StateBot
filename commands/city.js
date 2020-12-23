const { S_IFREG } = require('constants');
const Discord = require('discord.js');

module.exports = {
	name: 'город',
	description: 'Посмотреть текущую композицию.',
    aliases: ["го"],
    args: true,
    usage: "[город]",
	cooldown: 5,
    block: false,
	async execute(message, args, bot) {
        let f = 0;
        let j = 1;
        let o = 0;
        let a = 0;
        if(!bot.db.cst[args.slice(0, 9999).join(" ")]){
            const embed = new Discord.MessageEmbed()
            .setColor('#ff4f4f')
            .setTitle('🚫 **Внимание!**')
            .setTimestamp()
            .setDescription("Город не найден в Базе Данных")
            .setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(embed);
            return;
        }
        for(u in bot.db.cst[args.slice(0, 9999).join(" ")].citizens){
            j++;
            f++;
            bot.users.cache.filter(us => us.presence.status !== "offline").forEach(us => {
                if(us.id == u){
                    o++;
                }
            });
        }
        for(u in bot.db.cst[args.slice(0, 9999).join(" ")].blacklist){
            a++;
        }
        let embed = new Discord.MessageEmbed()
            .setTitle((bot.db.cst[args.slice(0, 9999).join(" ")].emoji) + ` ` + args.slice(0, 9999).join(" "))
            .setColor(bot.db.cst[args.slice(0, 9999).join(" ")].color)
            .setDescription(`> <:baked_potato:736618707693863022> **Описание:**\n${bot.db.cst[args.slice(0, 9999).join(" ")].description}`)
            .addField(`\n> <a:search:756225029095686245> **Информация:**`, `> **Жителей:** ${await f}\n> **Мер:** <@${bot.db.cst[args.slice(0, 9999).join(" ")].mayor}>`, true)
            .addField(`\n> <:GWmyasoStakePig:736643305710026885> **Доп. Информация:**`, `> **В чёрном списке:** ${a}\n> **Жителей в сети:** ${o}`, true)
            .setTimestamp()
            .setThumbnail('https://media.discordapp.net/attachments/694876445922689115/756233042808406086/search--v2.png?width=230&height=230')
            .setImage(bot.db.cst[args.slice(0, 9999).join(" ")].image)
            .setFooter(message.guild.name, message.guild.iconURL());
        message.channel.send(embed);
	}
};
