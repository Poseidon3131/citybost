const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const ayarlar = require("./ayarlar.json");
require("./util/eventLoader")(client);
const db = require("quick.db");
const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(`...`);
  console.error("---");

  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

let prefix = ayarlar.prefix;
  




console.log("Bot Aktif");
const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} Komut Var!  `);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) return message.author.send("**Beni Sunucuda Deneyin**");
  let permlvl = 0;
  if (message.member.permissions.has("BAN_MEMBERS")) permlvl = 2;
  if (message.member.permissions.has("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};




////////////////////////
client.on('message', msg => {

if (!msg.content.startsWith(prefix)) {
    return;
  }

  });



client.login(ayarlar.token);

Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android"

client.on("guildMemberAdd", member => { 
  try {
  let role = member.guild.roles.cache.find(role => role.name ==='Members')
  member.roles.add(role);
  } catch(e) {
    console.log(e)
}
});



////////////////////////////// MUTE KOMUTU //////////////////////////////

client.on('roleDelete', async role => {
    const data = await require('quick.db').fetch(`codework-mute.${role.guild.id}`);
    if(data && data === role.id) require('quick.db').delete(`codework-mute.${role.guild.id}`); 
    });

////////////////////////////// MUTE KOMUTU //////////////////////////////


//-------------------- Otorol Sistemi --------------------//

client.on("guildMemberAdd", async member => {
  let kanal1 = await db.fetch(`otorolkanal_${member.guild.id}`);
  let rol1 = await db.fetch(`otorolrol_${member.guild.id}`);

  let kanal = member.guild.channels.cache.get(kanal1);
  let rol = member.guild.roles.cache.get(rol1);

  if (!kanal) return;
  if (!rol) return;

      kanal.send(`<:yesilok:840147578024099860> **Sunucumuza Hoş Geldin ${member} Başarıyla Üye Rolün Verildi!**`
    );

  member.roles.add(rol);
});




client.on("guildMemberLeft", async member => {
  let kanal1 = await db.fetch(`otorolkanal_${member.guild.id}`);
  let rol1 = await db.fetch(`otorolrol_${member.guild.id}`);

  let kanal = member.guild.channels.cache.get(kanal1);
  let rol = member.guild.roles.cache.get(rol1);

  if (!kanal) return;
  if (!rol) return;

      kanal.send(`<:yesilok:840147578024099860> **Sunucumuza SDSADASS ${member} Başarıyla Üye Rolün Verildi!**`
    );

  member.roles.add(rol);
});

//-------------------- Otorol Sistemi --------------------//


client.on('messageDelete', message => {
  const data = require("quick.db")
  data.set(`snipe.mesaj.${message.guild.id}`, message.content)
  data.set(`snipe.id.${message.guild.id}`, message.author.id)

})

//-------------------- Reklam Engel Sistemi --------------------//

client.on("message", async message => {
  let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.fetch(`kufur_${message.guild.id}`);
  let kullanici = message.member;
  if (!reklamkick) return;
  if (reklamkick == "Açık") {
    const reklam = [
      "discord.app",
      "discord.gg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.delete();
        db.add(`reklamuyari_${message.author.id}`, 1); //uyarı puanı ekleme
        if (uyarisayisi === null) {
          let uyari = new Discord.RichEmbed()
            .setColor("BLACK")
            .setTitle("City Bot Reklam-Engel!")
            .setDescription(
              `<@${message.author.id}> Reklam Yapmayı Kes! Bu İlk Uyarın! (1/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 1) {
          let uyari = new Discord.RichEmbed()
            .setColor("BLACK")
            .setTitle("City Bot Reklam-Engel!")
            .setDescription(
              `<@${message.author.id}> Reklam Yapmayı Kes! Bu İkinci Uyarın! (2/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 2) {
          message.delete();
          await kullanici.kick({
            reason: `Reklam-Engel Sistemi!`
          });
          let uyari = new Discord.RichEmbed()
            .setColor("BLACK")
            .setTitle("City Reklam-Engel!")
            .setDescription(
              `<@${message.author.id}> Reklam Yaptığı İçin Sunucudan Atıldı! (3/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 3) {
          message.delete();
          await kullanici.ban({
            reason: `City Bot Reklam-Engel Sistemi!`
          });
          db.delete(`reklamuyari_${message.author.id}`);
          let uyari = new Discord.RichEmbed()
            .setColor("BLACK")
            .setTitle("City Bot Reklam Kick Sistemi")
            .setDescription(
              `<@${message.author.id}> Atıldıktan Sonra Tekrar Reklam Yaptığı İçin Sunucudan Yasaklandı!`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
      }
    }
  }
});

//-------------------- Reklam Engel Sistemi --------------------//


//-------------------- Ever Here Engel --------------------//

client.on("message", async msg => {
  let hereengelle = await db.fetch(`hereengel_${msg.guild.id}`);
  if (hereengelle == "acik") {
    const here = ["@here", "@everyone"];
    if (here.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        msg.channel
          .send(`<@${msg.author.id}>`)
          .then(message => message.delete());
        var e = new Discord.Message()
          .setColor("BLACK")
          .setDescription(`Bu Sunucuda Everyone ve Here Yasak!`);
        msg.channel.send(e);
      }
    }
  } else if (hereengelle == "kapali") {
  }
});

//--------------------Otorol Sistemi Main-------------------//

  ////////////////////////////////////Girip Çıkma ////////////////////////////////////

client.on('guildDelete', guild => {

  let poseidon = new Discord.MessageEmbed()
  
  .setColor("RED")
  .setTitle("<:x_:839771014937444392> Bot Atıldı")
  .addField("<:tik_1:840135605366161418>Sunucu Adı:", guild.name)
  .addField("<:tac:839773144709333002> Sunucu sahibi", guild.owner)
  .addField("<:tac:839773144709333002> Sunucu Sahibi'nin ID'si", guild.ownerID)
  .addField("<:discord:840135605061025793> Sunucunun Kurulu Olduğu Bölge:", guild.region)
  .addField("<:partner:840135605304033280> Sunucudaki Kişi Sayısı:", guild.memberCount)
  .setThumbnail("https://cdn.discordapp.com/attachments/816565259385045042/840134346827366430/discord-avatar-512-XTJRL.png")
  
     client.channels.cache.get('840110196626161664').send(poseidon);
  
  });
  
  
  client.on('guildCreate', guild => {
  
  let poseidon = new Discord.MessageEmbed()
  
  .setColor("GREEN")
  .setTitle("<:tik:839802059213242399> Bot Eklendi")
  .addField("<:tik_1:840135605366161418> Sunucu Adı:", guild.name)
  .addField("<:tac:839773144709333002> Sunucu sahibi", guild.owner)
  .addField("<:tac:839773144709333002> Sunucu Sahibi'nin ID'si", guild.ownerID)
  .addField("<:discord:840135605061025793> Sunucunun Kurulu Olduğu Bölge:", guild.region)
  .addField("<:partner:840135605304033280> Sunucudaki Kişi Sayısı:", guild.memberCount)
  .setThumbnail("https://cdn.discordapp.com/attachments/816565259385045042/840134346827366430/discord-avatar-512-XTJRL.png")
  
     client.channels.cache.get('840110196626161664').send(poseidon);
  
  });


  ////////////////////////////////////Girip Çıkma ////////////////////////////////////
