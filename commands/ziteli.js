const Discord = require('discord.js');

module.exports = {
	name: 'жители',
	description: 'Посмотреть текущую композицию.',
	aliases: ["ж", "citizens"],
	args: true,
	usage: "[город]",
	cooldown: 5,
    block: false,
	execute(message, args, bot) {
            let toplist = '';
            for (let u in bot.db.cst[args.join(" ")].citizens) {
					toplist += `<@${u}> ― ${bot.db.cst[args.join(" ")].citizens[u].role}\n`;
			}
			if(!toplist){
				let embed = new Discord.MessageEmbed()
				.setTitle(`🚫 **Ошибка!**`)
				.setColor('#ff0000')
				.setTimestamp()
				.setDescription("Город не найден")
				.setFooter(message.guild.name, message.guild.iconURL())
		
				message.channel.send(embed);
				return "";
			}
	    		let embed = new Discord.MessageEmbed()
	    			.setTitle(`<a:smilecat:738121926668451921> Жители ${args.join(" ")}`)
	    			.setColor('#a200ff')
	    			.setDescription(toplist)
	    			.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL())
	    		message.channel.send(embed);
	}
};
