const Discord = require('discord.js');
let bank = require("../bank.json");

module.exports = {
	name: 'ары',
	description: 'Посмотреть текущую композицию.',
    aliases: ["даймонды", "д"],
	cooldown: 5,
    block: false,
	execute(message, args, bot) {
        let channelapp = bot.channels.cache.get("710749869513375744")
        if(message.channel == channelapp){
            // let ponimau2 = Number(bank["spawn"].coins) / 64;
            let ponimau3 = Number(bank["Блэквуд"].coins) / 64;
            let ponimau32 = Number(bank["Модерик"].coins) / 64;
            let embed = new Discord.MessageEmbed()
            .setTitle(`**Кол-во АРов в отделениях SpaceBank:**`)
            .setColor('#f0f0f0')
            .setTimestamp()
            // .setDescription(`Спавн - **${bank["spawn"].coins}** <:ap:721753226768023582> **(${ponimau2}ст)**`)
            .setDescription(`Блэквуд - **${bank["Блэквуд"].coins}** <:ap:721753226768023582> **(${ponimau3}ст)**\nМодерик - **${bank["Модерик"].coins}** <:ap:721753226768023582> **(${ponimau32}ст)**`)
            .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
            message.channel.send(embed);
    
        }else{
            let embed = new Discord.MessageEmbed()
            .setTitle(`🚫 **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("Это можно сделать только в канале <#710749869513375744>")
            .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
    
            message.channel.send(embed);
            return "";
        }
	}
};
