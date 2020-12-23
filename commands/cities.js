const Discord = require('discord.js');
const c = require('../cst.json');

module.exports = {
	name: 'города',
	description: 'Посмотреть текущую композицию.',
	aliases: ["го"],
	cooldown: 5,
    block: false,
	execute(message, args, bot) {
			let cl = '';
			let a = 1;
            for (let u in bot.db.cst){
						cl += `${a++}. **${u}**\n`
			}
	    		let embed = new Discord.MessageEmbed()
	    			.setTitle(`🗺️ Список городов`)
	    			.setColor('#4287f5')
	    			.setDescription(`${cl}\n\n\`Чтобы добавить город используйте .создать [Название-города]\``)
	    			.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL())
	    		message.channel.send(embed);
	}
};
