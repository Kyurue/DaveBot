const { Client, Intents } = require('discord.js');
const Discord = require("discord.js");
const config = require("./config.json")
/* Permissions voor je bot */
const fs = require("fs")
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]});

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()


client.on("ready", () => {

    console.log("Dave is online.");
    client.user.setActivity({ type: "PLAYING", name: `with your stupid quotes` })
})


/* Here we pulled a Dani. Pretty much dit zorgt er voor dat je in je commands folder al je commands kan maken */
fs.readdir("./commands/", (err, files) => {
    if (err) return console.log("Could not find any commands!")
    const jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach(file => {
        const cmd = require(`./commands/${file}`)
        console.log(`Loaded ${file}`)

        /* Put aliases in an array otherwise forEach won't work */
        const cmdArr = []
        cmdArr.push(cmd.aliases)
        client.commands.set(cmd.name, cmd)

        /* If there are any alisases it will loop through every alias and make it available */
        if(cmdArr) {
            console.log(cmdArr)
            cmdArr.forEach(alias => client.aliases.set(alias, cmd.name))
        }

    })
})



client.on("messageCreate", async message => {

    const prefix = config.prefix

    if(!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/g)

    /* change everything to lower case so you don't have to worry about that */
    const command = args.shift().toLowerCase()

    /* Load in aliasses for commands */
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))

    
    if(!cmd) return

    try {

        cmd.run(client, message, args)
    } catch(e) {
        console.log(e)
    }
    
})

client.login(config.token);


