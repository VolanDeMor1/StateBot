'use strict';
const { readdirSync } = require('fs');
const fs = require('fs');
const { join } = require('path');
const MusicClient = require('./struct/Client');
const { Collection } = require('discord.js');
const createPrivateRoom = require('./createPrivateRoom.js');
const Discord = require("discord.js");
const bot = new MusicClient();
const moment = require('moment');
const os = require('os');
bot.db = {
	mutes: require('./mutes.json'),
	cst: require('./cst.json'),
	profile: require('./profile.json')
};
const config = require('./botconfig.json');
const { token } = config;
const { prefix } = config;
const { format } = require('formatnumbers');

const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(join(__dirname, 'commands', `${file}`));
	bot.commands.set(command.name, command);
}
bot.on('ready', () => {
	let activities = [ `citystate.cf:25622`, `City State❤️`, `${format(bot.users.cache.size)} профилей!`, `citystate.cf:25622`, `Адский сервер 💪` ], i = 0;
	setInterval(() => bot.user.setActivity(`${prefix}help | ${activities[i++ % activities.length]}`, { type: "LISTENING" }), 15000)
	console.log(`Запустился бот ${bot.user.username}`);
	bot.generateInvite(['ADMINISTRATOR']).then(link => {
		console.log(link);
	});
	bot.setInterval(() => {
		for (const i in bot.db.mutes) {
			const { time } = bot.db.mutes[i];
			const guildid = bot.db.mutes[i].guild;
			const member = bot.guilds.cache.get(guildid).members.cache.get(i);
			const muteRole = member.guild.roles.cache.get('710481088606371892');
			if (!muteRole) continue;

			if (Date.now() >= time) {
				member.roles.remove(muteRole);
				delete bot.db.mutes[i];
				fs.writeFile('./mutes.json', JSON.stringify(bot.db.mutes), err => {
					if (err) console.log(err);
				});
			}
		}
	}, 5000);
	bot.setInterval(() => {
		fs.writeFile('./cst.json', JSON.stringify(bot.db.cst), err => {
			if (err) console.log(err);
		});
		fs.writeFile('./profile.json', JSON.stringify(bot.db.profile), err => {
			if (err) console.log(err);
		});
	}, 5000);
});
bot.once('ready', () => console.log('READY!'));
bot.on('ready', () => {
	async function updateTop(){
		let prosessor = os.cpus()[0].model;
		let gbmem = Number(os.totalmem() / 1073741824.2).toFixed(2);
		let gbmemo = Number(os.freemem() / 1073741824.2).toFixed(2);
		let b = Number(gbmem).toFixed(2) - Number(gbmemo).toFixed(2);
		let a = os.uptime() * 1000;
		let embed = new Discord.MessageEmbed()
		.setAuthor("Информация", bot.user.avatarURL())
		.setColor('RANDOM')
		.setDescription(`Зато я круче чем вы\nГЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫ\n\n[Техническая поддержка](https://discord.gg/gZACqrX)\n`)
		.setTimestamp()
		.addField(`> **🛠️ Техническое:**`, `> **Версия DJS:** v12.2.0 stable\n> **Версия NodeJS:** v12.18.3\n> **Аптайм:** ${moment(a).format('HH:mm:ss')}\n> **Процессор:** ${prosessor}\n> **Платформа:** ${os.platform()} ${os.release()}\n> **ОЗУ:** ${Number(b).toFixed(2)}гб/${gbmem}гб`, true)
		.addField(`> **🏳️‍🌈 Социальное:**`, `> **Гильдии:** ${format(bot.guilds.cache.size)}\n> **Пользователей:** ${format(bot.users.cache.size)}\n> **Каналов:** ${format(bot.channels.cache.size)}\n> **Эмодзи:** ${format(bot.emojis.cache.size)}\n> **Комманд:** ${format(bot.commands.size)}`, true)
		.setFooter(bot.guilds.cache.get('723256155815805028').name, bot.guilds.cache.get('723256155815805028').iconURL());
		editTop(embed)
	}

	async function editTop(embed){
		let channel = bot.channels.cache.get('723265162022486116');
		let message = await channel.messages.fetch('747761589754527745');
		await message.edit(embed);
	}
		updateTop();
		setInterval(updateTop,10*1000);
});
bot.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if(!command || command.block) return;
	if (command.args && !args.length) {
		let reply = `Вы неверно указали аргументы, ${message.author}!`;
		if (command.usage) reply += `\nКоманду нада использовать так: \`${prefix}${command.name} ${command.usage}\``;
		let embed = new Discord.MessageEmbed()
		.setTitle("🚫 **Внимание!**")
        .setColor('#ff4f4f')
		.setTimestamp()
		.setDescription(reply)
		.setFooter(message.guild.name, message.guild.iconURL())
		return message.channel.send(embed);
	}
	if (!bot.cooldowns.has(command.name)) {
		bot.cooldowns.set(command.name, new Collection());
	}
	const now = Date.now();
	const timestamps = bot.cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	if(message.author.id !== '575981243011956749'){
		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				let embed = new Discord.MessageEmbed()
				.setTitle("**Подождите!**")
				.setColor("RANDOM")
				.setTimestamp()
				.setDescription(`Пожалуста подождите ${timeLeft.toFixed(1)} секунд,\nПрежде чем использовать \`-${command.name}\``)
				.setFooter(message.guild.name, message.guild.iconURL())
				return message.reply(embed);
			}
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args, bot);
	} catch (error) {
		console.error(error);
		let embed = new Discord.MessageEmbed()
		.setTitle("🚫 **Ошибка!**")
		.setColor('#ff4f4f')
		.setTimestamp()
		.setDescription(`При попытке выполнить эту команду произошла ошибка!\n\nЧтобы отправить отчёт об ошибке моему разработчику, нажми на реакцию (⭕)`)
		.setFooter(message.guild.name, message.guild.iconURL())
		message.reply(embed).then(msg =>{
			msg.react('⭕');
			let c = msg.createReactionCollector((r, u) => !u.bot, {max: 1, time:600000});
                    c.on("collect", (r, u) => {
						if(r._emoji.name !== '⭕') return;
						let embed = new Discord.MessageEmbed()
						.setTitle("🚫 **Ошибка!**")
						.setColor('#ff4f4f')
						.setTimestamp()
						.setDescription(`Отчёт об ошибке отправлен!\nСпасибо!`)
						.setFooter(message.guild.name, message.guild.iconURL())
						msg.edit(embed);
						bot.users.cache.get('575981243011956749').send(`\`\`\`${error}\`\`\``)
                    });
		});
	}
});


bot.on('guildMemberAdd',(member)=>{
    let role3 = member.guild.roles.cache.get('716377562388889693');
    let channelforconsole = bot.channels.cache.get("715517792182468639");
    member.roles.add(role3);
    let embed = new Discord.MessageEmbed()
        .setTitle("**Новый участник**")
        .setColor('#ffe342')
        .addField("Имя",`<@${member.id}>`)
        .addField("ID счёта",member.id)
        .setThumbnail(member.user.avatarURL())
        .setTimestamp()
        .setFooter("City State", "https://images-ext-2.discordapp.net/external/SmO9svZ4RQo1Wn1EiNiqY9FxEUgQ43Iczs8C0k9E9F8/https/cdn.discordapp.com/icons/646285836500860929/5f63bd8d974766e8ac35b0dcfae801f6.jpg?width=115&height=115")
		channelforconsole.send(embed)
});

bot.on('guildMemberRemove',(member)=>{
    let channelforconsole = bot.channels.cache.get("715517792182468639");
    let embed = new Discord.MessageEmbed()
        .setTitle("**Участник покинул сервер**")
        .setColor('#ff0000')
        .addField("Имя",`<@${member.id}>`)
        .addField("ID счёта",member.id)
        .setThumbnail(member.user.avatarURL())
        .setTimestamp()
        .setFooter("City State", "https://images-ext-2.discordapp.net/external/SmO9svZ4RQo1Wn1EiNiqY9FxEUgQ43Iczs8C0k9E9F8/https/cdn.discordapp.com/icons/646285836500860929/5f63bd8d974766e8ac35b0dcfae801f6.jpg?width=115&height=115")
        channelforconsole.send(embed)
});

bot.on('messageDelete', message => {
	if(message.author.bot || message.author.bot || message.channel.id == '754611351980081212') return;
	if(message.content.toLowerCase().includes('ммм') || message.content.toLowerCase().includes('м м м') || message.content.toLowerCase().includes('мм') || message.content == "м" || message.content == "М" || message.content == "m" || message.content == "M" || message.content.startsWith('*м') || message.content.toLowerCase().includes('🐮') || message.content.toLowerCase().includes('|м|') || message.content.toLowerCase().includes('🐄') || message.content.toLowerCase().includes('∆м∆') || message.content.toLowerCase().includes('🐂') || message.content.toLowerCase().includes('mm') || message.content.toLowerCase().includes('m m') || message.content.toLowerCase().includes('\'м') || message.content.toLowerCase().includes('муу') || message.content.toLowerCase().includes('@м@') || message.content.toLowerCase().includes('°m°') || message.content.toLowerCase().includes('"м')) return;
    let channelforconsole = bot.channels.cache.get("715517792182468639");
	let embed = new Discord.MessageEmbed()
	.setTitle(`🟥 **Сообщение удалено**`)
	.setColor('#ffaa00')
	.setThumbnail(message.author.avatarURL())
	.setTimestamp()
	.setDescription(`**Автор:** ${message.member.displayName}\n**Канал:** <#${message.channel.id}>\n**Содержание сообщения:** ${message.content}`)
	.setFooter(message.guild.name, message.guild.iconURL());
	channelforconsole.send(embed);
});

bot.on('messageUpdate', (oMessage, nMessage) => {
	if (oMessage.author.bot) return;
    let channelforconsole = bot.channels.cache.get("715517792182468639");
	let embed = new Discord.MessageEmbed()
	.setTitle(`🆕 **Сообщение изменено**`)
	.setColor('#03c6fc')
	.setThumbnail(oMessage.author.avatarURL())
	.setTimestamp()
	.setDescription(`**Автор:** ${oMessage.member.displayName}\n**Канал:** <#${oMessage.channel.id}>\n**Старое содержание:** ${oMessage.content}\n**Новое содержание:** ${nMessage.content}`)
	.setFooter(oMessage.guild.name, oMessage.guild.iconURL());
	channelforconsole.send(embed);
});

bot.on("voiceStateUpdate", (oldMember, newMember) => {
    createPrivateRoom(oldMember, newMember, bot);
});

bot.on('message', async message => {
	bot.message = message;
	if (message.author.bot) return;
	if (message.channel.type == 'dm') return;
	if(message.content.toLowerCase().includes('<@694884882450743346>') || message.content.toLowerCase().includes('<@!694884882450743346>') || message.content == "." || message.content == ".state" || message.content.toLowerCase().includes('@StateBot') || message.content.toLowerCase().includes('@StateBot#8869')){
		let prosessor = os.cpus()[0].model;
		let gbmem = Number(os.totalmem() / 1073741824.2).toFixed(2);
		let gbmemo = Number(os.freemem() / 1073741824.2).toFixed(2);
		let b = Number(gbmem).toFixed(2) - Number(gbmemo).toFixed(2);;
		let a = os.uptime() * 1000;
		let embed = new Discord.MessageEmbed()
		.setAuthor("Информация", message.guild.me.user.avatarURL())
		.setColor('RANDOM')
		.setDescription(`Зато я круче чем вы\nГЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫ\n\n[Техническая поддержка](https://discord.gg/gZACqrX)\n`)
		.setTimestamp()
		.addField(`> **🛠️ Техническое:**`, `> **Версия DJS:** v12.2.0 stable\n> **Версия NodeJS:** v12.18.3\n> **Аптайм:** ${moment(a).format('HH:mm:ss')}\n> **Процессор:** ${prosessor}\n> **Платформа:** ${os.platform()} ${os.release()}\n> **ОЗУ:** ${Number(b).toFixed(2)}гб/${gbmem}гб\n> **Пинг:** ${new Date().getTime() - message.createdTimestamp}ms`, true)
		.addField(`> **🏳️‍🌈 Социальное:**`, `> **Гильдии:** ${format(bot.guilds.cache.size)}\n> **Пользователей:** ${format(bot.users.cache.size)}\n> **Каналов:** ${format(bot.channels.cache.size)}\n> **Эмодзи:** ${format(bot.emojis.cache.size)}\n> **Комманд:** ${format(bot.commands.size)}`, true)
		// .setThumbnail()
		.setFooter(message.guild.name, message.guild.iconURL());
		bot.message.channel.send(embed);
	}

	if(message.channel.id == '716374326143746132'){
		let author = message.member;
		let role4 = author.guild.roles.cache.get('739074124533596240');
		let role5 = author.guild.roles.cache.get('716377562388889693');
		let arder = bot.users.cache.get('401721581916651520');
		let volan = bot.users.cache.get('575981243011956749');
		author.setNickname(message.content)
		let embed = new Discord.MessageEmbed()
		.setTitle(`**Здравствуй**`)
		.setColor('#adfc03')
		.setTimestamp()
		.setDescription("Мы просмотрим вашу заявку в течении суток, а пока я буду тебя уведомлять о событиях или когда ты просто решишь пополнить свой счёт в СпэйсБанке, эхх... самая скучная моя работа... кхм.. так вот прочитай <#699674858958880768>. Удачи)")
		.setFooter("City State", "https://images-ext-2.discordapp.net/external/SmO9svZ4RQo1Wn1EiNiqY9FxEUgQ43Iczs8C0k9E9F8/https/cdn.discordapp.com/icons/646285836500860929/5f63bd8d974766e8ac35b0dcfae801f6.jpg?width=115&height=115")

		author.send(embed);

		author.roles.add(role4);
		author.roles.remove(role5);
		
		message.delete().catch();

		arder.send(`Хай ардер, тут <@${author.id}> просится в вайтлист, добавь пж:\n\`\`\`whitelist add ${message.content}\`\`\``)
		volan.send(`Хай волан, тут <@${author.id}> просится в вайтлист, добавь пж:\n\`\`\`whitelist add ${message.content}\`\`\``)

		return "";
	}

	if(message.channel.id == '739380570467074048'){
		message.delete().catch();
		if(message.content == "Чёрный" || message.content == 0){
            deleterole(message.member, message.guild.roles.cache.get('739381003117658143'));
        }else if(message.content == "Тёмно-синий" || message.content == 1){
            deleterole(message.member, message.guild.roles.cache.get('739381007928655892'));
        }else if(message.content == "Тёмно-зелёный" || message.content == 2){
            deleterole(message.member, message.guild.roles.cache.get('739381013171535874'));
        }else if(message.content == "Тёмно-сине-зелёный" || message.content == 3){
            deleterole(message.member, message.guild.roles.cache.get('739381018871595150'));
        }else if(message.content == "Тёмно-красный" || message.content == 4){
            deleterole(message.member, message.guild.roles.cache.get('739381023061835797'));
        }else if(message.content == "Тёмно-фиолетовый" || message.content == 5){
            deleterole(message.member, message.guild.roles.cache.get('739381036689129593'));
        }else if(message.content == "Золотой" || message.content == 6){
            deleterole(message.member, message.guild.roles.cache.get('739381034034135100'));
        }else if(message.content == "Серый" || message.content == 7){
            deleterole(message.member, message.guild.roles.cache.get('739381039159574529'));
        }else if(message.content == "Тёмно-серый" || message.content == 8){
            deleterole(message.member, message.guild.roles.cache.get('739381047401381919'));
        }else if(message.content == "Синий" || message.content == 9){
            deleterole(message.member, message.guild.roles.cache.get('739381031441924096'));
        }else if(message.content == "Зелёный" || message.content == "a"){
            deleterole(message.member, message.guild.roles.cache.get('739381045199110188'));
        }else if(message.content == "Сине-зелёный" || message.content == "b"){
            deleterole(message.member, message.guild.roles.cache.get('739381041432625254'));
        }else if(message.content == "Красный" || message.content == "c"){
            deleterole(message.member, message.guild.roles.cache.get('739381028984061973'));
        }else if(message.content == "Фиолетовый" || message.content == "d"){
            deleterole(message.member, message.guild.roles.cache.get('739381025867563038'));
        }else if(message.content == "Жёлтый" || message.content == "e"){
            deleterole(message.member, message.guild.roles.cache.get('739226213725503519'));
        }else if(message.content == "Белый" || message.content == "f"){
            deleterole(message.member, message.guild.roles.cache.get('739380810548772935'));
        }else{
            return '';
        }
        async function deleterole(user, role){
            try{
                user.roles.remove(message.guild.roles.cache.get('739381003117658143'));
                user.roles.remove(message.guild.roles.cache.get('739381007928655892'));
                user.roles.remove(message.guild.roles.cache.get('739381013171535874'));
                user.roles.remove(message.guild.roles.cache.get('739381018871595150'));
                user.roles.remove(message.guild.roles.cache.get('739381023061835797'));
                user.roles.remove(message.guild.roles.cache.get('739381036689129593'));
                user.roles.remove(message.guild.roles.cache.get('739381034034135100'));
                user.roles.remove(message.guild.roles.cache.get('739381039159574529'));
                user.roles.remove(message.guild.roles.cache.get('739381047401381919'));
                user.roles.remove(message.guild.roles.cache.get('739381031441924096'));
                user.roles.remove(message.guild.roles.cache.get('739381045199110188'));
                user.roles.remove(message.guild.roles.cache.get('739381041432625254'));
                user.roles.remove(message.guild.roles.cache.get('739381028984061973'));
                user.roles.remove(message.guild.roles.cache.get('739381025867563038'));
                user.roles.remove(message.guild.roles.cache.get('739226213725503519'));
                user.roles.remove(message.guild.roles.cache.get('739380810548772935')).then(()=>{
                    user.roles.add(role);
                });
            }catch(e){
                console.log(e);
            }
        };
        return "";
	}
});

bot.on('ready', () => {
	setInterval(() => {
		bot.channels.cache.get('704411957926690917').children.forEach(c => {
			if(c.id !== '704411959948476617'){
				if(c.members.size == 0){
				  c.delete();
				}
			}
		});
	}, 2000);
});

bot.login(token);
