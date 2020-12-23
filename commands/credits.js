const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
	name: 'кредиты',
	description: 'Посмотреть текущую композицию.',
    aliases: ["credits"],
	cooldown: 5,
    block: false,
	execute(message, args, bot) {
	    const c = require('../credits.json');
	    let arr = []
	    Object.keys(c).forEach(u => {arr.push({id: u, time: c[u].time, credit: c[u].credit,})})
	    arr.sort(function(a, b) {
	      return a.time - b.time;
	    });
	    let topuser = arr.slice(0,30)
            let toplist = '';
            for (let u in topuser) {
              toplist += `<@${topuser[u].id}> - ${topuser[u].credit} <:ap:721753226768023582> - до ${moment(topuser[u].time).format('DD.MM.yyyy')}\n`
            }
	    		let embed = new Discord.MessageEmbed()
	    			.setTitle("Кредиты SpaceBank <:spacebank:715319742025695302>")
	    			.setColor('#a200ff')
	    			.setDescription(toplist)
	    			.setTimestamp()
                    .setFooter(`SpaceBank`, 'https://cdn.discordapp.com/emojis/715319742025695302.png?v=1')
	    		message.channel.send(embed);
	}
};
