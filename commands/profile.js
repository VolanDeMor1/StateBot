const Discord = module.require("discord.js");
const fs = require("fs");
const moment = require('moment');
const { format } = require('formatnumbers');

module.exports = {
	name: 'паспорт',
	description: 'Посмотреть свой профиль.',
    aliases: ["юзер", "ю", "passport", "профиль"],
	cooldown: 5,
    block: false,
	execute(message, args, bot) {
		const user = message.mentions.members.last() || message.guild.members.cache.get(args.join(" ")) || message.member;
        let a = "Нигде не живёт";
        let b = " ";
        for(let city in bot.db.cst){
            if(bot.db.cst[city].citizens[user.id]){
                a = city;
                b = bot.db.cst[city].citizens[user.id].role;
            }
        }
        let embed = new Discord.MessageEmbed()
        .setDescription("**Паспорт:**")
        .setColor(user.displayHexColor || 'RANDOM')
        .addField("Имя",`<@${user.id}>`)
        .addField("Тэг",user.user.tag)
        .addField("Жительство", `${b} **${a}**`)
        .setThumbnail(user.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL())
        message.channel.send(embed);
        return "";
    }

};
