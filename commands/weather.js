const command = require('./command');
const config = require('../config.json');
const axios = require('axios');

module.exports = (client, Discord) => {
    command(client, 'weather', async message => {
        const location = message.content.replace(config.prefix + 'weather ', '')
        try {
            let getWeather = async () => {
                let response = await axios.get('http://api.weatherapi.com/v1/current.json?key=' + config.weatherkey + '&q="' + location + '"')
                let weather = response.data
                return weather
            }
            let weatherValue = await getWeather()
            let embed = new Discord.MessageEmbed()
                .setColor(`#6ca6cd`)
                .setTitle('Weather in ' + weatherValue.location.name)
                .setAuthor('WeatherAPI.com', 'http://cdn.weatherapi.com/v4/images/weatherapi_logo.png', 'https://www.weatherapi.com/')
                .setDescription(weatherValue.location.region + ' ' + weatherValue.location.country)
                .setThumbnail('http:' + weatherValue.current.condition.icon)
                .addFields(
                    { name: 'Condition', value: weatherValue.current.condition.text ?? 'N/A' },
                    { name: 'Temp °F', value: weatherValue.current.temp_f ?? 'N/A', inline: true },
                    { name: 'Temp °C', value: weatherValue.current.temp_c ?? 'N/A', inline: true },
                    { name: 'Humidity', value: weatherValue.current.humidity ?? 'N/A', inline: true }
                )
                .setFooter('Local Time: ' + weatherValue.location.localtime)
            await message.channel.send(embed);
        } catch (e) {
            if (e.response.status == 400) {
                message.channel.send('There was an error, check the location.')
            } else if (e.response.status == 401 || e.response.status == 403) {
                message.channel.send('There was an error, contact an admin.')
            } else {
                message.channel.send('There was an error, please try again later.')
            }
        }
    })
}