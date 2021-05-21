module.exports = (client) => {
    const userMap = new Map();
    // (userid, {
    //     messageCount: Number,
    //     lastMessage: message,
    //     timer: fn()
    // })
    client.on('message', async (message) => {
        if (message.author.bot || message.member.hasPermission('ADMINISTRATOR')) return;
        if (userMap.has(message.author.id)) { // if user is already in map, they sent message within time interval
            // check message count and w last message
            let userData = userMap.get(message.author.id)
            const lastMessage = userData.lastMessage;
            const diff = message.createdTimestamp - lastMessage.createdTimestamp
            let messageCount = userData.messageCount;
            messageCount++;
            if (parseInt(messageCount) >= 5) {
                // mute
                let rolesList = []
                // remove all roles
                message.member.roles.cache.forEach(role => {
                    if (role.name != '@everyone') {
                        const toRemove = message.guild.roles.cache.get(role.id)
                        rolesList.push(toRemove)
                        message.member.roles.remove(toRemove)
                    }
                })
                console.log('in muting')
                const mutedRole = message.guild.roles.cache.get('831048047730360382')
                message.member.roles.add(mutedRole);
                message.channel.send(`${message.author.username} has been muted for spamming`)
                setTimeout(() => {
                    rolesList.forEach(role => {
                        // return roles
                        message.member.roles.add(role)
                    })
                    message.member.roles.remove(mutedRole)
                    message.channel.send(`Unmuted ${message.author.username}.`)
                }, 300000) // unmute after 5 minutes
            } else {
                userData.messageCount = messageCount;
                userMap.set(message.author.id, userData)
            }
        } else {
            let remove = setTimeout(() => {
                userMap.delete(message.author.id);
            }, 5000);
            userMap.set(message.author.id, {
                messageCount: 1,
                lastMessage: message,
                timer: remove
            })
        }
    })
}