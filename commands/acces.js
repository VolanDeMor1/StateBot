const Discord = require('discord.js');

module.exports = {
	name: 'одобрить',
	description: 'Посмотреть текущую композицию.',
    aliases: ["адобрить", "acces"],
    args: true,
    usage: "[пользователь]",
    cooldown: 5,
    block: false,
	execute(message, args, bot) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("У вас нет прав");
        if(!args[0]) return message.channel.send("А кому?");
        let user = message.mentions.members.first()
        let botmessage = args.slice(1, 100000).join(" ");
        let embed = new Discord.MessageEmbed()
        .setColor('#80ff00')
        .setTitle("ОДОБРЕНИЕ")
        .setDescription(`Здравствуйте, ${user.user.username}!\nВы были добавлены в белый список. Удачной игры!`)
        .setTimestamp()
        .setFooter("City State", message.guild.iconURL)
        message.delete().catch();
    
        user.send(embed);
    
	}
};
