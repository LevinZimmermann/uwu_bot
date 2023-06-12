const axios = require("axios");

// load jsons
const config = require("./config.json");
const gifLink = require("./src/jsons/giflink.json");
const Animes = require("./src/jsons/anime.json");

// initialize the discord variables
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

// import all Modules
const ban = require("./src/modules/ban/ban.js");
const help = require("./src/modules/help/help.js");
const slot = require("./src/modules/slot/slot.js");
const ping = require("./src/modules/ping/ping.js");
const kill = require("./src/modules/kill/kill.js");
const mach = require("./src/modules/mach/mach.js");
const animes = require("./src/modules/animes/animes.js");
const fragen = require("./src/modules/fragen/fragen.js");
const orakel = require("./src/modules/orakel/orakel.js");
const stopInsultAll = require("./src/modules/mach/stopInsultAll.js");
const invalidCommand = require("./src/modules/invalidCommand/invalidCommand.js");

// variable inizialize
const chatGptEndpoint = "https://api.openai.com/v1/chat/completions";
const modRoleID = config.discord.modRoleId;
const prefix = "artemis"; // Präfix für den Befehl
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once("ready", () => {
  console.log("Bot ist bereit!");
});

client.on("messageCreate", (message) => {
  const UserMessage = message.content.toLowerCase();
  if (!UserMessage.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();

  try {
    if (command === "help") {
      help(client, message, args, EmbedBuilder);
    } else if (command === "slot") {
      slot(client, message, args, EmbedBuilder);
    } else if (command === "ping") {
      ping(client, message, args, EmbedBuilder);
    } else if (command === "kys") {
      stopInsultAll(client, message, args, EmbedBuilder);
    } else if (command === "kill") {
      kill(client, message, args, EmbedBuilder, gifLink);
    } else if (command === "mach") {
      mach(client, message, args, EmbedBuilder);
    } else if (command === "fragen") {
      fragen(client, message, args, EmbedBuilder);
    } else if (command === "orakel") {
      orakel(client, message, args, EmbedBuilder, config);
    } else if (command === "ban") {
      const targetName = message.mentions.users.first();
      if(targetName === undefined){message.reply("Invalid user ID or mention."); }
      else{ban(client, message, args, EmbedBuilder, gifLink, modRoleID, targetName);}
    } else if (command === "animes") {
      animes(client, message, args, EmbedBuilder, Animes);
    } else {
      invalidCommand(client, message, args, EmbedBuilder);
    }
  } catch (err) {
    console.log(err)
  }
});

client.login(config.discord.token);
