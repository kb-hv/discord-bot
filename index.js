const events = require('events')
events.EventEmitter.defaultMaxListeners = 15

const Discord = require('discord.js')
const config = require('./config.json')
const events = require('./events/events')
const commands = require('./commands/commands')

const client = new Discord.Client()

client.on('ready', () => {
    console.log(`${client.user.username} is online`)
    events(client)
    commands(client, Discord)
})

client.login(config.token)