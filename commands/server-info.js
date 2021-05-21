const command = require('./command');

module.exports = (client, Discord) => {
    command(client, 'server-info', message => {
        let embed = new Discord.MessageEmbed()
            .setThumbnail(message.guild.iconURL)
            .setColor('#f3f3f3')
            .setTitle(`${message.guild.name} Server Information`)
            .addFields(
                {
                    name: 'Owner',
                    value: message.guild.owner.user.tag
                },
                {
                    name: "Members: ",
                    value: `${message.guild.memberCount} user(s).`,
                    inline: true
                },
                {
                    name: "Members Online: ",
                    value: `${message.guild.members.cache.filter(m => m.user.presence.status == "online").size} user(s) online`,
                    inline: true
                },
                {
                    name: "Total Bots: ",
                    value: `${message.guild.members.cache.filter(m => m.user.bot).size} bot(s)`,
                    inline: true
                },
                {
                    name: "Creation Date: ",
                    value: message.guild.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: "Roles Count: ",
                    value: `There are ${message.guild.roles.cache.size} roles in this server.`,
                    inline: true,
                },
                {
                    name: 'Region:',
                    value: message.guild.region,
                    inline: true
                },
            )
        message.channel.send(embed)
    })
}
