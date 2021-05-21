const command = require('../command');


module.exports = (client, queue) => {
    command(client, 'resume', async message => {
        const serverQueue = queue.get(message.guild.id)
        if (!message.member.voice.channel)
            return message.channel.send("You need to join the voice chat first")
        if (!serverQueue.connection)
            return message.channel.send('There is no music')
        if (serverQueue.connection.dispatcher.resumed)
            return message.channel.send('The song is already playing. Try doing ~pause')
        if (!serverQueue.connection.dispatcher.paused)
            return message.channel.send('The song is not been paused.')
        serverQueue.connection.dispatcher.resume()
        message.channel.send("The song has been resumed")
    })
}