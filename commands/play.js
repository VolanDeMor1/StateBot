const { Util } = require('discord.js');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const search = require('youtube-search');
const fs = require('fs');
const opts = {
    maxResults: 1,
    key: 'AIzaSyBUSzNzlHCfDE1UWvWhs-VmuPm_E1hV8xM',
    type: 'music'
};

module.exports = {
	name: 'играй',
	description: 'Командля для запуска воспроизведения музыки в голосовом канале.',
    aliases: ["p", "play", "и", "играть"],
	usage: '[ссылка]',
	args: true,
	cooldown: 5,
    block: false,
	async execute(message, args, bot) {
		const { channel } = message.member.voice;
		if (!channel) {
			let embed = new Discord.MessageEmbed()
				.setTitle("<:nope:751695799561486377> **Внимание!**")
				.setColor('#ff4f4f')
				.setDescription(`Вы должны быть в голосовом канале -_-`)
				.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL());
			return message.channel.send(embed);
		};
		const permissions = channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')){
			let embed = new Discord.MessageEmbed()
				.setTitle("<:nope:751695799561486377> **Внимание!**")
				.setColor('#ff4f4f')
				.setDescription(`Я не могу подключится к вашему каналу\nУ меня недостаточно следущих прав:\n\`\`\`CONNECT\`\`\``)
				.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL());
			return message.channel.send(embed);
		}
		if (!permissions.has('SPEAK')){
			let embed = new Discord.MessageEmbed()
				.setTitle("<:nope:751695799561486377> **Внимание!**")
				.setColor('#ff4f4f')
				.setDescription(`Я не могу воспроизводить музыку в вашем канале\nУ меня недостаточно следущих прав:\n\`\`\`SPEAK\`\`\``)
				.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL());
			return message.channel.send(embed);
		} 
		const serverQueue = message.client.queue.get(message.guild.id);
		if(message.guild.me.voice.channel !== channel && serverQueue){
			let embed = new Discord.MessageEmbed()
				.setTitle("<:nope:751695799561486377> **Внимание!**")
				.setColor('#ff4f4f')
				.setDescription(`Вы должны находится в том же канале, что и я`)
				.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL())
			return message.channel.send(embed);
		}

		search(args.join(' '), opts, async function(err, results) {
			if(err) return console.log(err);
		   
			console.dir(results);
			const serverQueue = message.client.queue.get(message.guild.id);
			try{
				const songInfo = await ytdl.getInfo(results[0].link);
				// console.dir(songInfo);
				const song = {
					id: results[0].id,
					title: Util.escapeMarkdown(results[0].title),
					url: results[0].link,
					author: songInfo.author.name,
					authoricon: songInfo.author.avatar,
					likes: songInfo.likes,
					dislikes: songInfo.dislikes,
					length: songInfo.length_seconds
				};
		
				if (serverQueue) {
					serverQueue.songs.push(song);
					console.log(serverQueue.songs);
					let embed = new Discord.MessageEmbed()
						.setTitle("<:music:736644780704006144> **Музыкальный плееер**")
						.setColor('RANDOM')
						.setDescription(`Трек: **${song.title}**\nдобавлен в очередь!`)
						.addField(`**Лайков:** ${song.likes}👍`, `**Дизлайков:** ${song.dislikes}👎`, true)
						.addField(`Продолжительность`, require('moment')(song.length * 1000).format('mm:ss'), true)
						.setTimestamp()
						.setThumbnail(results[0].thumbnails.high.url)
						.setFooter(song.author, song.authoricon);
					return message.channel.send(embed);
				}
		
				const queueConstruct = {
					textChannel: message.channel,
					voiceChannel: channel,
					connection: null,
					songs: [],
					volume: 1,
					playing: true,
					loop: false
				};
				message.client.queue.set(message.guild.id, queueConstruct);
				queueConstruct.songs.push(song);
		
				const play = async song => {
					const queue = message.client.queue.get(message.guild.id);
					if (!song) {
						queue.voiceChannel.leave();
						message.client.queue.delete(message.guild.id);
						return;
					}
		
					const dispatcher = queue.connection.play(ytdl(song.url))
						.on('finish', () => {
							queue.songs.shift();
							play(queue.songs[0]);
						})
						.on('error', error => console.error(error));
					dispatcher.setVolumeLogarithmic(queue.volume / 5);
					let embed = new Discord.MessageEmbed()
						.setTitle("<:music:736644780704006144> **Музыкальный плееер**")
						.setColor('RANDOM')
						.setDescription(`Начинаю играть: **${song.title}**`)
						.setThumbnail(song.thumbnail)
						.setTimestamp()
						.setFooter(song.author, song.authoricon);
					queue.textChannel.send(embed);
		
		
					// queue.textChannel.send(`🎶 Начинаю играть: **${song.title}**`);
				};
		
				try {
					const connection = await channel.join();
					queueConstruct.connection = connection;
					play(queueConstruct.songs[0]);
				} catch (error) {
					console.error(`I could not join the voice channel: ${error}`);
					message.client.queue.delete(message.guild.id);
					await channel.leave();
					let embed = new Discord.MessageEmbed()
						.setTitle("<:nope:751695799561486377> **Внимание!**")
						.setColor('#ff4f4f')
						.setDescription(`У меня не получилось подключится к вашему голосовому каналу\n\n> **Ошибка:**\n\`\`\`${error}\`\`\``)
						.setTimestamp()
						.setFooter(message.guild.name, message.guild.iconURL());
					return message.channel.send(embed);
				}
			}catch(e){
				let embed = new Discord.MessageEmbed()
					.setTitle("<:nope:751695799561486377> **Внимание!**")
					.setColor('#ff4f4f')
					.setDescription(`Песня не найдена`)
					.setTimestamp()
					.setFooter(message.guild.name, message.guild.iconURL());
				message.channel.send(embed);
			}
		  });

	}
};
