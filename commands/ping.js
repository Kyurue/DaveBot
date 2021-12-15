module.exports = {
    name: "ping",
    run: async (client, message, args) => {
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        const arguments = message.content.slice(args.length).trim().split(' ')
        if(message.member.roles.cache.some(role => role.name === 'Admin')) {
            for(let i = 0; i < arguments[2]; i++) { 
                message.channel.send(arguments[1]) 
                await sleep(1200)
            }
        }
    }    
}