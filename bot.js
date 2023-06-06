const slot = require('./lib/commands/slots/slot.js')
const config = require('./config.json')
const axios = require('axios');
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

const chatGptEndpoint = 'https://api.openai.com/v1/chat/completions';
const modRoleID = '1115360144570724362';


const prefix = 'artemis'; // Präfix für den Befehl


client.once('ready', () => {
    console.log('Bot is ready!');
});

let stop = false;


const commands = [
    { name: 'slot', value: 'Startet ein Slot-Spiel.' },
    { name: 'help', value: 'Zeigt das Inhaltsverzeichnis der verfügbaren Befehle an.' },
    { name: 'ping', value: 'Antwortet mit "pong".' },
    { name: 'kys', value: 'Stoppt den Insult-All-Prozess (nur für Moderatoren).' },
    { name: 'kill', value: 'Tötet einen Benutzer, indem er ihn "killt" (nur für Moderatoren).' },
    { name: 'mach', value: 'Macht einen Benutzer fertig (nur für Moderatoren) oder sendet eine persönliche Nachricht an einen Benutzer.' },
    { name: 'fragen', value: 'Stellt eine Frage an den Chatbot.' }
];

client.on('messageCreate', message => {
    const UserMessage = message.content.toLowerCase()
    if (!UserMessage.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    const authorID = message.author.id;

    if (command === 'help') {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Inhaltsverzeichnis der Befehle')
            .setDescription('Hier ist das Inhaltsverzeichnis der verfügbaren Befehle:')
            .addFields(commands)
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp();


        message.channel.send({ embeds: [embed] });
    }

    if (command === 'slot') {
        const number = args[0];
        const authorName = message.author.username;
        let response = slot.start(number, authorID, authorName)
        message.channel.send(response)
    }

    if (command === 'ping') {
        message.channel.send('pong');
    }

    if (command === 'kys') {
        if (member.roles.cache.has(modRoleID) && second === 'alli' && third === 'fertig') {
            stop = true;
            message.channel.send('Insult-All-Prozess wurde gestoppt.');
        }
    }

    if (command === 'kill') {
        const targetName = message.mentions.users.first();
        const authorName = message.author;

        if (!targetName) {
            message.channel.send('Du hast keinen Benutzer erwähnt!');
            return;
        }
        const member = message.guild.members.cache.get(targetName.id);
        if (member) {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`KILL!`)
                .setDescription(`<@${authorName.name}> hat <@${targetName.name}> gekillt` + '\n' + 'https://thumbs.gfycat.com/BothPlasticIslandwhistler-size_restricted.gif')
                .setTimestamp();


            message.channel.send({ embeds: [embed] });
        }
    }

    if (command === 'mach') {
        const first = args[0]
        const second = args[1]
        const third = args[2]
        const fourth = args[3]
        const member = message.member;

        if (member.roles.cache.has(modRoleID) && second === 'alli' && third === 'fertig') {
            insultAll(first, message)
        } else {
            const targetName = message.mentions.users.first();
            if (!targetName) {
                message.channel.send('Du hast keinen Benutzer erwähnt!');
                return;
            }
            message.channel.send(`UWU macht <@${targetName.id}> fertig`)
            for(let i = 0; i <= 10; i++){
                client.users.send(targetName.id, `Dich mach ich fertig <@${targetName.id}>`);
            }
        }
    }

    if (command === 'fragen') {
        let usermessage
        args.forEach(element => {
            usermessage += element
        })
        GPTChatCommunication(usermessage, message)
    }
});

async function getPlayers(guild) {
    try {
        const members = await guild.members.fetch();
        const players = members
            .filter(member => !member.user.bot) // Filtert Bots aus
            .map(member => member.user); // Verwendet den Benutzernamen der Mitglieder
        return players;
    } catch (error) {
        throw new Error('Fehler beim Abrufen der Mitgliederliste.');
    }
}


async function insultAll(first, message) {
    let playerArr = []
    playerArr = await getPlayers(message.guild)
    stop = false; // Zurücksetzen des Flags für jeden Aufruf

    for (const player of playerArr) {
        if (stop) {
            console.log('Stopping the insultAll process.');
            break;
        }

        message.channel.send(`UWU macht <@${player.id}> fertig`)
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

async function GPTChatCommunication(usermassege, message) {
    // Deine Logik für den Aufruf der ChatGPT-API hier
    const response = await axios.post(chatGptEndpoint, {
        prompt: usermassege,  // Die Benutzereingabe als ChatGPT-Prompt verwenden
        max_tokens: 50,  // Maximale Anzahl von Tokens für die Antwort begrenzen
        temperature: 0.7,  // Temperatur für die Antwortkontrolle
        model: 'gpt-3.5-turbo',  // Das gewünschte GPT-Modell
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`,  // Dein OpenAI API-Schlüssel hier
        },
    });

    // Die Antwort aus der API extrahieren und in den Discord-Channel senden
    const reply = response.data.choices[0].text.trim();
    message.channel.send(reply);
}

client.login(config.discord.token);