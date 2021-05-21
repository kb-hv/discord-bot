const play = require("./play")
const skip = require("./skip")
const stop = require("./stop")
const pause = require("./pause")
const resume = require("./resume")
const songQueue = require('./queue')

module.exports = (client, Discord) => {
    const queue = new Map()
    play(client, queue)
    skip(client, queue)
    stop(client, queue)
    pause(client, queue)
    resume(client, queue)
    songQueue(client, queue, Discord)
}