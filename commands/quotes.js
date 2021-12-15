const axios = require('axios');
const config = require('../config.json');

module.exports = {
    name: "quotes",
    aliases: 'qs',
    run: async (client, message, args) => {
        const server = message.guild.id
        const arguments = message.content.slice(args.length).trim().split(' ') 
        if(arguments[1] == null) {
            const quotes = await getAll(server)
            console.log(quotes)
        } else {
            const quotes = await getAll(server, arguments[1])
            console.log(quotes)
        }
    }
}


async function getAll(server, user) {

    /* 
        * Make request to mongodb to get all quotes by server
        * @param serverId String
    */

    const data = {
        serverId: server,
        user: user
    }

    const apiConfig = {
        method: 'POST',
        url: `https://eu-central-1.aws.data.mongodb-api.com/app/dave-primp/endpoint/getQuotes?secret=${config.secret}`,
        headers: { 
            'Content-type': 'application/json',        
        },
        data: data
    }

    const request = await axios(apiConfig)
    return request.data
}