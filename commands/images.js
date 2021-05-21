const command = require('./command');
const axios = require('axios');

module.exports = (client, Discord) => {
    command(client, ['img', 'imgs', 'image', 'images'], async message => {
        let flag = false;
        const content = message.content
        if (content.indexOf("cat") != -1 || content.indexOf("mew") != -1 || content.indexOf("meow") != -1 || content.indexOf("kit") != -1) {
            flag = true;
            let getCat = async () => {
                let response = await axios.get('https://some-random-api.ml/img/cat')
                let cat = response.data
                return cat
            }
            let catVal = await getCat();
            let embed = new Discord.MessageEmbed()
                .setColor(`#ff0000`)
                .setImage(catVal.link)
                .setFooter(`mew`)
            await message.channel.send(embed);
        }
        if (content.indexOf("dog") != -1 || content.indexOf("wof") != -1 || content.indexOf("pup") != -1) {
            flag = true
            let getDog = async () => {
                let response = await axios.get('https://some-random-api.ml/img/dog')
                let dog = response.data
                return dog
            }
            let dogVal = await getDog();
            let embed = new Discord.MessageEmbed()
                .setColor(`#0000ff`)
                .setImage(dogVal.link)
                .setFooter(`wof`)
            await message.channel.send(embed)
        }
        if (content.indexOf("pand") != -1) {
            flag = true
            let getPanda = async () => {
                let response = await axios.get('https://some-random-api.ml/img/panda')
                let panda = response.data
                return panda
            }
            let panda = await getPanda();
            let embed = new Discord.MessageEmbed()
                .setColor(`#00ff00`)
                .setImage(panda.link)
                .setFooter(`*panda noises*`)
            await message.channel.send(embed)
        }
        if (!flag) {
            let getCat = async () => {
                let response = await axios.get('https://some-random-api.ml/img/cat')
                let cat = response.data
                return cat
            }
            let catVal = await getCat();
            let embed = new Discord.MessageEmbed()
                .setDescription(`The argument was invalid but here's a cat =^^=`)
                .setColor(`#ff0000`)
                .setImage(catVal.link)
                .setFooter(`Next time, try using the command with cat|dog|panda`)
            await message.channel.send(embed);
        }
    })
}