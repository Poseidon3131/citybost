const Discord = require('discord.js');
const database = require('quick.db');

exports.run = async (client, message, args) => {

if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
if(!args[0]) return message.channel.send('Bir rol belirtmeniz gerekiyor.');

if(args[0] === 'create') {
  
message.guild.roles.create({ data: { name: args.slice(1).join(' ') || 'Muted', color: '#ff000b' }}).then(role => {
role.setPermissions(0);
message.channel.send("Rol başarıyla oluşturuldu. Üzerine yazılanları şimdi uyguluyorum. Bu bir kaç saniye alabilir. Bitirdiğimde bir mesaj alacaksınız.").then(() => {
let arrayed = message.guild.channels.cache.filter(a => a.type === 'text').array();

var okay = 0;

for(const key in arrayed) {
arrayed[key].overwritePermissions([{
id: role.id,
deny: ['SEND_MESSAGES', 'ADD_REACTIONS'],
}], 'Mute rolü güncellendi  '+message.author.tag);
okay++;
};
database.set(`codework-mute.${message.guild.id}`, role.id);
return message.channel.send("<:tik:839802059213242399> Başarıyla oluşturuldu **"+role.name+"** Oluşturan "+okay+".");

});
});
};

if(!args[0] === 'create') {
let role = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first() || message.guild.roles.cache.find(a => a.name.toLowerCase().includes(args.slice(0).join(' ').toLowerCase()))
if(!role) return message.channel.send('Rol "'+args.slice(0).join(' ')+'" bulunamadı.');

database.set(`codework-mute.${message.guild.id}`, role.id);
return message.channel.send(`**${role.name}** Mute rolü yapıldı.`);
};

}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['muterol'],
  permLevel: 0
};
 
exports.help = {
  name: 'muterole'
};