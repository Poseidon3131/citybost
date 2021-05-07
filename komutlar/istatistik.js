const Discord = require("discord.js");
const moment = require("moment");
const os = require("os");
const process = require("process");
require("moment-duration-format");
const ayarlar = require("../ayarlar.json")
exports.run = async (client, message, args) => { //AntiCode Development
    try {
        const samita = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
        let wen = client.users.cache.get(ayarlar.sahip)
        const wensamita = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`${client.user.username} - İstatistikler`, client.user.avatarURL())
        .setDescription(`
        👑 **Yapımcılarım**
        ${wen} | ${wen.tag} [(${wen.id})](https://discord.com/channels/@me/${wen.id})
        `) //WenSamita Neiva
        .addField(`
        🤖 Bot Hakkında`, `\`\`\`cs
» #Ping: ${client.ws.ping} ms
» Uptime: ${samita}
» #Sunucu Sayısı: ${client.guilds.cache.size.toLocaleString()}
» Kullanıcı Sayısı: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}
» #Kanal Sayısı: ${client.channels.cache.size.toLocaleString()}
» Emoji Sayısı: ${client.emojis.cache.size.toLocaleString()}\`\`\``, true)
        .addField(`:vylexbeyazms: Versiyonlar`, `\`\`\`cs
» #Bot Versiyonu: v3.0.0 BETA
» Node.js Versiyonu: ${process.version}
» #Discord.js Versiyonu: v${Discord.version}
        \`\`\``, true)
        .addField(`💻 Sistem Bilgileri`, `\`\`\`cs
        » #İşletim Sistemi: ${os.type()} ${os.arch()}
        » CPU: ${os.cpus().map(i => `${i.model}`)[0]}
        » #RAM kullanımı: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
        » CPU Çalışma Hızı: ${(os.cpus().map(i => i.speed)[0] / 1024).toFixed(2)} GHz\`\`\`
        [**Davet Linki:** https://bit.ly/winceorwaive](https://bit.ly/winceorwaive)`) //Bu benim botumun davet linkidir isterseniz ekleyin :D
        return message.channel.send(wensamita)
    }
catch(err) {
        console.error(err); //AntiCode
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["i", "istatistik"],
    permLevel: 0
};
  
exports.help = {
    name: "istatistik",
    description: "WenSamita Neiva tarafından AntiCode Üyeleri için yazılmıştır", //seviyom sizi sj <3
    usage: "istatistik"
};