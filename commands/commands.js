
const help = require('./help')
const serverInfo = require('./server-info')
const images = require('./images')
const weather = require('./weather')
const clearChannel = require('./clear-channel')
const music = require('./music/music')

module.exports = (client, Discord) => {
    help(client, Discord)
    serverInfo(client, Discord)
    clearChannel(client)
    weather(client, Discord)
    images(client, Discord)
    music(client, Discord)
}