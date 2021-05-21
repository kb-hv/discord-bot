const welcome = require('./welcome')
const antispam = require('./antispam')

module.exports = (client) => {
    welcome(client)
    antispam(client)
}