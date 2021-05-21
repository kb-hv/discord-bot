const command = require('./command');

module.exports = (client, Discord) => {
    command(client, ['help', 'info', 'h'], message => {
        let embed = new Discord.MessageEmbed()
            .setColor(`#ffc0cb`)
            .setTitle('CloPro')
            .setDescription('A multipurpose bot for Discord')
            .addFields(
                { name: '~help', value: 'for list of commands' },
                { name: '~weather', value: '~weather <city> for weather forecase' },
                { name: '~image / ~img ', value: '~image <cat|dog|panda> for random animal pictures', },
                { name: '~play', value: '~play <song> to play a song or add song to queue', inline: true },
                { name: '~skip', value: 'to play next song', inline: true },
                { name: '~stop', value: 'to delete queue and disconnect bot', inline: true },
                { name: '~pause', value: 'to pause current song', inline: true },
                { name: '~resume', value: 'to resume paused song', inline: true },
                { name: '~queue', value: 'to view all songs in queue', inline: true },
                { name: '~server-info', value: 'to get details of this server'},
            ).setFooter('created by kbhv')
        message.channel.send(embed);
    })
}