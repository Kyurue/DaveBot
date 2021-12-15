const axios = require('axios');
const config = require('../config.json');

module.exports = {
    name: "quote",
    aliases: "q",
    run: async (client, message, args) => {
        const arguments = message.content.slice(args.length).trim().split(' ')
        const server = message.guild.id
        if (arguments[1] == "add") {

            try {
           
                /* 
                    * Make POST request to mongodb to insert a quote 
                    * @param quote    String
                    * @param user     String
                    * @param serverId String
                */
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
                const quotes = await getAll(server)
                const number = quotes.length
                message.channel.send(`quote ${number} successfully added!`) 
                // console.log(request)
            } catch(e) {
                console.log(e);
                message.channel.send("Failed to add quote")
            }
            
        } else if(arguments[1] == "delete") { 
            const quotes = await getAll(server)
            const number = arguments[2] - 1
            const quote = quotes[number]
            console.log(quote)

            /* 
                * Make POST request to mongodb to delete a quote 
                * @param quote    String
                * @param user     String
                * @param serverId String
            */

            const data = {
                quote: quote["quote"],
                user: quote["user"],
                serverId: quote["serverId"]
            }
            const apiConfig = {
                method: 'POST',
                url: `https://eu-central-1.aws.data.mongodb-api.com/app/dave-primp/endpoint/delQuote?secret=${config.secret}`,
                headers: { 
                    'Content-type': 'application/json',        
                },
                data: data
            };
            const request = await axios(apiConfig)
            message.channel.send(`quote ${arguments[2]} successfully deleted!`) 
        } else if(!isNaN(arguments[1])) {
            const quotes = await getAll(server)
            const number = arguments[1] - 1
            message.channel.send(quotes[number]['quote'])
        } else if(arguments[1] != null) {
            message.channel.send("This is an unknown command")
        } else {
            const quotes = await getAll(server)
            const total = quotes.length
            const number = Math.floor(Math.random() * total);
            message.channel.send(quotes[number]['quote'])
        }
    }    
}

async function getAll(server) {

    /* 
        * Make request to mongodb to get all quotes by server
        * @param serverId String
    */

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
    return request.data
}