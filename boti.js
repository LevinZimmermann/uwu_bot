const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');
const { handleMessage } = require('./modules/messageHandler');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once('ready', () => {
  console.log('Bot is ready!');
});

client.on('messageCreate', handleMessage);

client.login(config.discord.token);
