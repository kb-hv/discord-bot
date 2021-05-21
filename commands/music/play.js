const command = require('../command');
const config = require('../../config.json');

module.exports = (client, queue) => {
    const ytdl = require('ytdl-core')
    const { YTSearcher } = require('ytsearcher');
    const searcher = new YTSearcher({
        key: config.ytkey,
        revealed: true
    })
    command(client, 'play', async message => {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
        const serverQueue = queue.get(message.guild.id)
        await execute(message, serverQueue)
        async function execute(message, serverQueue) {
            let vc = message.member.voice.channel;
            if (!vc) {
                return message.channel.send("Please join a voice chat first");
            } else {
                let result = await searcher.search(args.join(" "), { type: "video" })
                const songInfo = await ytdl.getInfo(result.first.url)
                let song = {
                    title: songInfo.videoDetails.title,
                    url: songInfo.videoDetails.video_url
                };
                if (!serverQueue) { // if there's no queue yet
                    const queueConstructor = {
                        txtChannel: message.channel,
                        vChannel: vc,
                        connection: null,
                        songs: [],
                        volume: 10,
                        playing: true
                    };
                    queue.set(message.guild.id, queueConstructor);
                    queueConstructor.songs.push(song);
                    try {
                        let connection = await vc.join();
                        queueConstructor.connection = connection;
                        play(message.guild, queueConstructor.songs[0]);
                    } catch (err) {
                        console.error(err);
                        queue.delete(message.guild.id);
                        return message.channel.send(`Unable to join the voice chat ${err}`)
                    }
                } else {
                    serverQueue.songs.push(song);
                    console.log(serverQueue.songs)
                    return message.channel.send(`${song.title} has been added`);
                }
            }       
        }
        function play(guild, song) {
            const serverQueue = queue.get(guild.id);
            if (!song) {
                serverQueue.vChannel.leave(); 
                queue.delete(guild.id);
                return;
            }
            const dispatcher = serverQueue.connection
                .play(ytdl(song.url))
                .on('finish', () => {
                    serverQueue.songs.shift();
                    play(guild, serverQueue.songs[0]);
                })
            serverQueue.txtChannel.send(`Now playing ${serverQueue.songs[0].title}`)
        }
    })
}