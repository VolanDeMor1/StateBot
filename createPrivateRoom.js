
module.exports = function(oM, nM, bot) {
  if(nM.guild.id !== '646285836500860929') return;
  if (nM.channelID) {
    //создаём приватку если пользователь зайдёт в канал
    if (nM.channelID == '704411959948476617') {
      nM.guild.channels.create(`Приват ${nM.guild.members.cache.get(nM.id).displayName}`, {
          type: "VOICE",
          parent: "704411957926690917",
          permissionOverwrites: [
            {
              id: nM.guild.id,
              deny: ["ADMINISTRATOR"],
              allow: ["CONNECT", "SPEAK", "VIEW_CHANNEL"]
            },
            {
              id: nM.id,
              allow: ["KICK_MEMBERS", "MANAGE_CHANNELS"]
            },
            {
              id: '710481088606371892',
              deny: ["CONNECT", "SPEAK"]
            },
            {
              id: '694869608695463997',
              allow: ["CONNECT", "SPEAK", "VIEW_CHANNEL", "MANAGE_CHANNELS"]
            }
          ]
        })
        .then(room => {
          nM.setChannel(room.id);
          if (!bot.db.servers[nM.guild.id]) bot.db.servers[nM.guild.id] = {};
          if (!bot.db.servers[nM.guild.id].voiceMember)
            bot.db.servers[nM.guild.id].voiceMember = {};
          if (!bot.db.servers[nM.guild.id].voiceMember[nM.id])
            bot.db.servers[nM.guild.id].voiceMember[nM.id] = {};
          if (!bot.db.servers[nM.guild.id].voiceMember[nM.id].room)
            bot.db.servers[nM.guild.id].voiceMember[nM.id].room = room.id;
          bot.db.servers[nM.guild.id].voiceMember[nM.id].room = room.id;
        });
    }
  }
  //При выходе из канала, удаление приват комнаты
  if (!nM.channelID) {
    if (!bot.db.servers[nM.guild.id]) bot.db.servers[nM.guild.id] = {};
    if (!bot.db.servers[nM.guild.id].voiceMember)
      bot.db.servers[nM.guild.id].voiceMember = {};
    if (!bot.db.servers[nM.guild.id].voiceMember[nM.id])
      bot.db.servers[nM.guild.id].voiceMember[nM.id] = {};
    if (!bot.db.servers[nM.guild.id].voiceMember[nM.id].room)
      bot.db.servers[nM.guild.id].voiceMember[nM.id].room = 0;
    if (!oM.voiceChannel) return;
  }
};