const Discord = require('discord.js');
const fs = require("fs");

module.exports = {
	name: 'размут',
	description: 'Посмотреть текущую композицию.',
    aliases: ["unm", "unmute"],
	cooldown: 5,
    block: false,
	async execute(message, args, bot) {
        let channelforconsole = bot.channels.cache.get("715517792182468639")
        if(!message.member.roles.cache.has("694869608695463997")){
            let embed = new Discord.MessageEmbed()
            .setTitle(`🚫 **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("У вас недостаточно прав ")
			.setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(embed);
            return "";
        }
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("Пользователь не найден");
        
        let role = message.guild.roles.cache.get('710481088606371892');
        if(!role){
            role = await message.guild.createRole({
                name:"Muted",
                permissions:[]
            });
            message.guild.channels.forEach(async (channel,id) => {
                await channel.overwritePermissions(role,{
                    SEND_MESSAGES:false,
                    ADD_REACTIONS:false
                });
            });
        };
        rUser.roles.remove(role);
        delete bot.db.mutes[rUser.id];
    
        let embed = new Discord.MessageEmbed()
            .setTitle("**Размут**")
            .setColor('#ffe342')
            .addField("Имя",`<@${rUser.id}>`)
            .setThumbnail(rUser.user.avatarURL())
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL())
            channelforconsole.send(embed);
            message.channel.send(embed);
    
	}
};
