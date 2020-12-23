const Discord = module.require('discord.js');

module.exports = {
	name: 'блоклист',
	description: 'Команда для разработчиков.',
    aliases: ["blocklist", "bl"],
	cooldown: 5,
    block: false,
	async execute(message, args, bot) {
        let cl = '';
        let a = 1;
        bot.commands.forEach(c => {
            if(c.block){
                cl += `${a++}. **${c.name}**\n`
            }
        })
	    		let embed = new Discord.MessageEmbed()
	    			.setTitle(`🚫 Список заблокированых команд`)
	    			.setColor('#4287f5')
	    			.setDescription(cl || "Нет заблокированных команд")
	    			.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL())
	    		message.channel.send(embed);

	}
};
