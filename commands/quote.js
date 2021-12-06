const axios = require('axios');
const config = require('../config.json');

module.exports = {
    name: "quote",
    aliases: 'q',
    run: async (client, message, args) => {
       
        // Make MongoDB connection to save quotes associated with a user.
        const data = {
            quote: 'FUcking dumb ass shit',
            user: '@Lientje',
            serverId: 'a98yd98y921y198'
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
          console.log(request);
    }    
}