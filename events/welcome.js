module.exports = (client) => {
    client.on('guildMemberAdd', async member => {
        // add new role
        const rolename = 'new';
        const { guild } = member
        const role = guild.roles.cache.find((role) => {
            return role.name === rolename
        })
        member.roles.add(role)
        
        const welcomeChannelId = '827503462358056991' // welcome channel
        const targetChannel = '827754582888546314' // rules channel
        const message = `Welcome, <@${member.id}>. Please check out ${member.guild.channels.cache
            .get(targetChannel).toString()}`
        const channel = member.guild.channels.cache.get(welcomeChannelId)
        channel.send(message)
    })
}