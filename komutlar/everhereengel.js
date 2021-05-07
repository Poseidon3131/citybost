const db = require('quick.db');
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
let prefix = ayarlar.prefix

exports.run = async (client, message, args) => {
  
  if (!args[0]) {
    
  const poseidon = new Discord.MessageEmbed() 
  
  .setDescription('Lütfen **aç** Veya **kapat** Yazın. Örnek Kullanım : **!ever-here-engel aç/kapat**')
  .setColor("#FFF0F5")

  return message.channel.send(poseidon)
  }
  
  if (args[0] == 'aç') {
    
  db.set(`hereengel_${message.guild.id}`, 'acik')
    
  const poseidon = new Discord.MessageEmbed() 
  
  .setDescription('Ever-Here Engel Başarılı Bir Şekilde Aktif Edildi!')
  .setColor("#FFF0F5")

  return message.channel.send(poseidon)
  }
  
  if (args[0] == 'kapat') {
    
  db.set(`hereengel_${message.guild.id}`, 'kapali')
    
  const poseidon = new Discord.MessageEmbed() 
  
  .setDescription('Ever-Here Engel Başarılı Bir Şekilde Deaktif Edildi!')
  .setColor("#FFF0F5")

  return message.channel.send(poseidon)
  } 
  
  }

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ever-here-engel','everhere-engel','ever-hereengel'],
  permLevel: 3
};

exports.help = {
  name: 'everengel',
  description: 'World Code & Only V12',
  usage: 'everhereengel'
};