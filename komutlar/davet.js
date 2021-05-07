const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {

        const yardim = new Discord.MessageEmbed()

             .setColor('BLACK')
              .setTitle(``)
             .setAuthor(`City Bots Davet Menüsü`, client.user.avatarURL()) 
             .setThumbnail(client.user.avatarURL())
             .addField("Botu Eklemek İçin:", `<a:yantik:839906633551577118>  [TIKLA](https://discord.com/api/oauth2/authorize?client_id=839734737302978580&permissions=8&scope=bot)`)
             .addField("Botu 0 Perm Eklemek İçin:", `<a:yantik:839906633551577118>  [TIKLA](https://discord.com/api/oauth2/authorize?client_id=839734737302978580&permissions=0&scope=bot)`)
             .addField("Botun Destek Sunucusuna Katılmak İçin:", `<a:yantik:839906633551577118>  [TIKLA](https://discord.com/invite/vNwZvYxG9B)`)
             .setFooter(`${message.author.username} Tarafından İstendi`, message.author.avatarURL())
            
        return message.channel.send(yardim);
}

exports.conf = {
    enabled : true,
    guildOnly : false,
    aliases : ['invites',"davet"], 
    permLevel : 0
}

exports.help = {
    name : 'davet',
    description : '',
    usage : 'davet'
}
