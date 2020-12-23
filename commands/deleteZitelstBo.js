const Discord = require('discord.js');

module.exports = {
	name: 'удалить',
	description: 'Посмотреть текущую композицию.',
    aliases: ["delete"],
    args: true,
    usage: "[пользователь]",
	cooldown: 5,
    block: false,
	async execute(message, args, bot) {

        let user = message.mentions.members.first();
        if(message.channel.id == '754611351980081212') return;
        
        let e = new Discord.MessageEmbed()
        .setTitle(`**Удаление жительства**`)
        .setColor('#4dff7c')
        .setTimestamp()
        .setDescription(`Жительство для <@${user.id}> удалено.`)
        .setFooter(message.guild.name, message.guild.iconURL())
        message.channel.send(e);
        for(let city in bot.db.cst){
            if(bot.db.cst[city].citizens[user.id]){
                delete bot.db.cst[city].citizens[user.id];
            }
        }
	}
};
