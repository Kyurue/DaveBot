const axios = require('axios');
const config = require('../config.json');

module.exports = {
    name: "quote",
    aliases: 'q',
    run: async (client, message, args) => {
        const arguments = message.content.slice(args.length).trim().split(' ')
        if (arguments[1] == "add") {
            const server = message.guild.id
            // Make MongoDB connection to save quotes associated with a user.
            const data = {
                quote: arguments[3],
                user: arguments[2],
                serverId: server
            }
            const apiConfig = {
                method: 'POST',
                url: `https://eu-central-1.aws.data.mongodb-api.com/app/dave-primp/endpoint/createQuote?secret=${config.secret}`,
                headers: { 
                    'Content-type': 'application/json',        
                },
                data: data
            };
          
            const request = await axios(apiConfig)
            if(request.status == 200) {
                message.channel.send("Quote successfully added!") 
            } else {
                message.channel.send("Quote not added")
            }
            //   console.log(request);
        } else if(arguments[1] == "delete") { 
            message.channel.send("delete quote")
        } else if(!isNaN(arguments[1])) {
            message.channel.send("getquote by number")
        } else if(arguments[1] != null) {
            message.channel.send("This is an unknown command")
        } else {
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
            const total = request.data.length
            const number = Math.floor(Math.random() * total);
            message.channel.send(request.data[number]['quote'])
        }
    }    
}