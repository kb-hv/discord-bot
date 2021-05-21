const command = require('../command');

module.exports = (client, queue) => {
    command(client, 'skip', async message => {
        const serverQueue = queue.get(message.guild.id)
        skip(message, serverQueue)
        function skip(message, serverQueue) {
            if (!message.member.voice.channel)
                return message.channel.send("You need to join the voice chat first");
            if (!serverQueue)
                return message.channel.send("There is nothing to skip!");
                serverQueue.connection.dispatcher.end();
        }
    })
}
