const slot = require('./lib/commands/slots/slot.js')


const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

const prefix = 'uwu'; // Präfix für den Befehl

client.once('ready', () => {
    console.log('Bot ist bereit!');
});

client.on('messageCreate', message => {
    const UserMessage = message.content.toLowerCase()
    if (!UserMessage.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    const authorID = message.author.id;

    if (command === 'help') {
        message.channel.send('ich kann auch nicht helfen');
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
    if (command === 'kill') {
        const targetName = message.mentions.users.first();
        const authorName = message.author.username;
        if (!targetName) {
            message.channel.send('Du hast keinen Benutzer erwähnt!');
            return;
        }
        const member = message.guild.members.cache.get(targetName.id);
        if (member) {
            message.channel.send(`@${authorName} hat @${targetName.username} gekillt`);
        }
    }
    if(command === 'mach' && authorID === '889880980893098015' || command === 'mach' && authorID === '1009429505326206976'){
        const first = args[0]
        const second = args[1]
        const third = args[2]
        
        if(first === 'die' && second === 'alli' && third === 'fertig'){
            let playerArr = [] 
            playerArr = getPlayers(message.guild)

            console.log(playerArr)
            // playerArr.forEach(user => {
            //     message.channel.send(`@${user} esch e negg.. nätte Mönsch`)
            // });
        }
    }
});

async function getPlayers(guild) {
    try {
        const members = await guild.members.fetch();
        const players = members
            .filter(member => !member.user.bot) // Filtert Bots aus
            .map(member => member.user.username); // Verwendet den Benutzernamen der Mitglieder

        return players;
    } catch (error) {
        throw new Error('Fehler beim Abrufen der Mitgliederliste.');
    }
}

client.login('MTExNTE2OTU0NDI3MzY3MDE5Ng.GX8pwK.acuVJVV2tfb1k7PuTlCMu27YxVcdb2My_lTsd8');
