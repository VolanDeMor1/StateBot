const Discord = require('discord.js');
const fs = require("fs");
const mutes = require("../mutes.json");

module.exports = {
	name: 'мут',
	description: 'Посмотреть текущую композицию.',
    aliases: ["м", "m", "mute"],
    args: true,
    usage: "[пользователь] [время(минуты)]",
	cooldown: 5,
    block: false,
	async execute(message, args, bot) {
        let user = message.mentions.members.first();
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
        if(rUser.roles.cache.has('694869608695463997')){
            let embed = new Discord.MessageEmbed()
            .setTitle(`🚫 **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("У этого пользователя иммунитет")
			.setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(embed);
            return "";
        }
        if(!rUser){
            let embed = new Discord.MessageEmbed()
            .setTitle(`🚫 **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("Пользователь не найден ")
			.setFooter(message.guild.name, message.guild.iconURL())
    
            message.channel.send(embed);
            return "";
        }
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
        // if(rUser.roles.has(role.id)){
        //     let embed = new Discord.MessageEmbed()
        //     .setTitle(`🚫 **Ошибка!**`)
        //     .setColor('#ff0000')
        //     .setTimestamp()
        //     .setDescription("Этот пользователь уже в муте ")
		// 		.setFooter(message.guild.name, message.guild.iconURL())
    
        //     message.channel.send(embed);
        //     return "";
        // }
        bot.db.mutes[rUser.id] = {
            guild:message.guild.id,
            time:parseInt(Date.now() + (args[1]*64000)),
        };
        fs.writeFile('../mutes.json',JSON.stringify(bot.db.mutes),(err)=>{
            if(err) console.log(err);
        });
    
    
        message.channel.send("**████████████████\n█────█────█─██─█\n█─████─██─█─██─█\n█────█────█────█\n█─██─█─██─█─██─█\n█────█─██─█─██─█\n████████████████**");
    
        let embed = new Discord.MessageEmbed()
            .setTitle("**Мут**")
            .setColor('#ff1100')
            .addField("Замутил",`<@${message.author.id}>`)
            .addField("Нарушитель",`<@${user.id}>`)
            .addField("Время (в минутах)", args[1])
            .setThumbnail(user.avatarURL)
            .setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL())
        channelforconsole.send(embed)
        user.send(embed);
    
        rUser.roles.add(role);
	}
};
