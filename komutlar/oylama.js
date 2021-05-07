const Discord = require('discord.js') // FYNIXCODE

    exports.run = (client, message, args) => {
        let emoji1 = args[0];
        let emoji2 = args[1];
        let oyla = args.slice(2).join(' ')
    
    if(!emoji1) return message.channel.send('LÜTFEN EMOJİ GİR :fire:')
    if(!emoji2) return message.channel.send('LÜTFEN 2. EMOJİ GİR :rose:')
    if(!oyla) return message.channel.send('LÜTFEN OYLAMA YAZISI GİRİNİZ')

        const oylaembed = new Discord.MessageEmbed()
        .setDescription(oyla + " \n\n`Oylamak İçin Lütfen Emojilere Tıklayınız`")
    .setColor('BLACK')
        client.channels.cache.get('KanalID').send(oylaembed).then(fynix => fynix.react(emoji1) + fynix.react(emoji2))
    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Oylama','Oyla','oylama-yap'],
    permLevel: 0
}

exports.help = {
    name: 'oyla'
}