import { Client, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config"
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

client.on("messageCreate", (message) => {
    if(message.author.bot) return
    if(message.content.startsWith("create")){
        const url = message.content.split("create")[1]
        return message.reply({
            content : `Url of your site is ${url}`
        })
    }
    
    const user = message.author
  message.reply({
    content: `Hi Welcome ${user}`
  })
});

client.on("interactionCreate",(interaction)=>{
    console.log(interaction)
    interaction.reply("Pong !")
})

client.login(process.env.BOT_KEY);
