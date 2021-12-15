const axios = require('axios');
const config = require('../config.json');

module.exports = {
    name: "quotes",
    aliases: 'qs',
    run: async (client, message, args) => {
        const arguments = message.content.slice(args.length).trim().split(' ') 
        if(arguments[1] == null) {
            // Get all server quotes
            const server = message.guild.id
            // Make MongoDB connection to get all quotes by serverid
            const data = {
                serverId: server
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
            console.log(request.data)
        } else {
            message.channel.send("get all quotes by username")
        }
    }
}