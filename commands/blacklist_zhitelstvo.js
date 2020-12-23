const Discord = module.require('discord.js');

module.exports = {
    name: 'чёрный-список',
	description: 'Команда для разработчиков.',
    aliases: ["чёрный", "список", "чс"],
	cooldown: 5,
    block: false,
	async execute(message, args, bot) {
        if(!bot.db.cst[args.join(" ")]){
            const embed = new Discord.MessageEmbed()
            .setColor('#ff4f4f')
            .setTitle('🚫 **Внимание!**')
            .setTimestamp()
            .setDescription("Город не найден!")
            .setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(embed);
            return;
        }
        let a = "";
        for(let u in bot.db.cst[args.join(" ")].blacklist){
            a += `<@${u}> - **${bot.db.cst[args.join(" ")].blacklist[u].reason}**\n`
        }
        let embed = new Discord.MessageEmbed()
            .setTitle(`🚫 Чёрный список ${args.join(" ")}`)
            .setColor('#ff4f4f')
            .setDescription(a || "В чёрном списке - пусто\n\n\`\`\`.чс-добавить [пользователь] [город] - Добавить пользователя в ЧС города\n.чс-удалить [пользователь] [город] - Удалить пользователя из ЧС города\`\`\`")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL())
        message.channel.send(embed);
	}
};
