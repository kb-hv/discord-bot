const command = require('../command');
const config = require('../../config.json');

module.exports = (client, queue, Discord) => {

    command(client, 'queue', async message => {
        const serverQueue = queue.get(message.guild.id)
        songQueue(message, serverQueue)
        function songQueue(message, serverQueue) {
            if (!message.member.voice.channel)
                return message.channel.send("You need to join the voice chat first");
            if (!serverQueue)
                return message.channel.send("There is no queue");
            let embed = new Discord.MessageEmbed()
                .setColor(`#ffc0cb`)
                .setTitle('Song Queue')
            serverQueue.songs.forEach(element => {
                let title = element.title.toString()
                embed.addFields({ name: '---------', value: title })
            });
            return message.channel.send(embed);
        }
    })
}