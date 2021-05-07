const Discord = require('discord.js');
const database = require('quick.db');

exports.run = async (client, message, args) => {

if(!message.member.hasPermission('MANAGE_MESSAGES')) return;

const muteRoleFetch = await database.fetch(`codework-mute.${message.guild.id}`);
if(!muteRoleFetch) return message.channel.send('Bu sunucuda mute rolü ayarlı değil ayarlamak için `!muterol` yada sizin için oluşturmamızı istiyorsanuz `/muterole create <muteroladı>` yazabilirsiniz.');

if(!args[0]) return message.channel.send(`${message.content.split('unmute')[0]}unmute  [kişi]
      
Kimin Mutesini kaldıracağım ?.`);

let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.guild.members.cache.find(a => message.guild.members.cache.get(a.user.id).nickname && a.nickname.toLowerCase().includes(args[0].toLowerCase())) || message.guild.members.cache.find(a => a.user.username.toLowerCase().includes(args[0].toLowerCase()))
if(!member) return message.channel.send(`üye "${args[0]}" bulunamadı`);
member.roles.remove(muteRoleFetch).then(() => {
return message.channel.send('Başarıyla mutesi kaldırıldı **'+member.user.tag+'**');
})
}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'unmute'
};