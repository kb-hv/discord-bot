const command = require('../command');

module.exports = (client, queue) => {
    command(client, 'stop', async message => {
        const serverQueue = queue.get(message.guild.id)
        if (serverQueue){
            stop(message, serverQueue)
            function stop(message, serverQueue) {
                if (!message.member.voice.channel)
                    return message.channel.send("You need to join the voice chat first")
                serverQueue.songs = [];
                serverQueue.connection.dispatcher.end();
            }
        } else {
            return message.channel.send("There is no queue");
        }
    })
}