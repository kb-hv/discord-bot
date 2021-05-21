const command = require('../command');


module.exports = (client, queue) => {
    command(client, 'pause', async message => {
        const serverQueue = queue.get(message.guild.id)
        if (!message.member.voice.channel)
            return message.channel.send("You need to join the voice chat first")
        if (!serverQueue.connection)
            return message.channel.send('There is no music playing right now')
        if (serverQueue.connection.dispatcher.paused) 
            return message.channel.send('The song is already paused. Try doing ~resume')
        serverQueue.connection.dispatcher.pause()
        message.channel.send("The song has been paused")
    })
}