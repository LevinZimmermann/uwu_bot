const slot = "";
const config = require('./config.json')
const axios = require('axios');
const gifLink = require('./giflink.json')
const Animes = require('./anime.json')

// initialize the discord variables
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const chatGptEndpoint = 'https://api.openai.com/v1/chat/completions';
const modRoleID = config.discord.modRoleId;
const prefix = 'artemis'; // Präfix für den Befehl
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});
const commands = [
    { name: 'slot', value: 'Startet ein Slot-Spiel.' },
    { name: 'help', value: 'Zeigt das Inhaltsverzeichnis der verfügbaren Befehle an.' },
    { name: 'ping', value: 'Antwortet mit "pong".' },
    { name: 'kys', value: 'Stoppt den Insult-All-Prozess (nur für Moderatoren).' },
    { name: 'kill', value: 'Tötet einen Benutzer, indem er ihn "killt" (nur für Moderatoren).' },
    { name: 'mach', value: 'Macht einen Benutzer fertig (nur für Moderatoren) oder sendet eine persönliche Nachricht an einen Benutzer.' },
    { name: 'fragen', value: 'Stellt eine Frage an den Chatbot.' },
    { name: 'orakel', value: 'Befrage das Orakel und erhalte eine Antwort.' },
    { name: 'ban', value: 'Bannt einen Benutzer (nur für Moderatoren).' },
    { name: 'animes', value: 'Schlägt einen Anime vor.' }
];


let stop = false;

client.once('ready', () => {
    console.log('Bot is ready!');
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


async function banUser(target, message, reason) {
    await message.guild.bans.create(target.id, { reason }).catch(err => {
        console.log(err)
        return message.reply({ content: "User is unbanneble!", ephemeral: true })
    })

    let gif;
    do {
        gif = gifLink.ban[Math.floor(Math.random(0, ((gifLink.ban.length) / 10)) * 10)]
    } while (gif === undefined)

    console.log(`${target.id} was banned`)

    const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle(`Ban was executed!`)
        .addFields({ name: "Ban", "value": `Ban was executed to <@${target.id}>` })
        .addFields({ name: "Reason", "value": `${reason}` })
        .setImage(gif.value)
        .setTimestamp();

    message.reply({ embeds: [embed] });
}


client.on('messageCreate', message => {
    const UserMessage = message.content.toLowerCase()
    if (!UserMessage.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    const authorID = message.author.id;
    console.log('message detected')

    if (command === 'help') {
    //     const embed = new EmbedBuilder()
    //         .setColor('#0099ff')
    //         .setTitle('Inhaltsverzeichnis der Befehle')
    //         .setDescription('Hier ist das Inhaltsverzeichnis der verfügbaren Befehle:')
    //         .addFields(commands)
    //         .setThumbnail(client.user.displayAvatarURL())
    //         .setTimestamp();


    //     client.user.send(authorID, { embeds: [embed] });
    }

    else if (command === 'slot') {
        const number = args[0];
        const authorName = message.author.username;
        let response = slot.start(number, authorID, authorName)
        message.channel.send(response)
    }

    else if (command === 'ping') {
        message.channel.send('pong');
    }

    else if (command === 'kys') {
        const member = message.member;
        if (member.roles.cache.has(modRoleID)) {
            stop = true;
            message.channel.send('Insult-All-Prozess wurde gestoppt.');
        }
    }

    else if (command === 'kill') {
        const targetName = message.mentions.users.first();
        const authorName = message.author;
        console.log('kill command executing')
        if (!targetName) {
            message.channel.send('Du hast keinen Benutzer erwähnt!');
            return;
        }

        const member = message.guild.members.cache.get(targetName.id);
        if (member) {
            let gif;
            do {
                gif = gifLink.kill[Math.floor(Math.random(0, ((gifLink.kill.length) / 10)) * 10)]
            } while (gif === undefined)
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setDescription(`<@${authorName.id}> hat <@${targetName.id}> gekillt`)
                .setImage(gif.value)
                .setTimestamp();


            message.channel.send({ embeds: [embed] });
        }
    }

    else if (command === 'mach' && member.roles.cache.has(modRoleID)) {
        const first = args[0]
        const second = args[1]
        const third = args[2]
        const fourth = args[3]
        const member = message.member;

        if (second === 'alli' && third === 'fertig') {
            console.log('"mach sie alli fertig" wurde gestarted')
            insultAll(first, message)
        } else {
            console.log(`mach wurde auf ${member} gestarted`)
            const targetName = message.mentions.users.first();
            if (!targetName) {
                message.channel.send('Du hast keinen Benutzer erwähnt!');
                return;
            }
            message.channel.send(`UWU macht <@${targetName.id}> fertig`)
            for (let i = 0; i <= 10; i++) {
                client.users.send(targetName.id, `Dich mach ich fertig <@${targetName.id}>`);
            }
        }
    }

    else if (command === 'fragen') {
        let usermessage
        args.forEach(element => {
            usermessage += element
        })
        GPTChatCommunication(usermessage, message)
    }

    else if (command === 'orakel') {
        let answers = config.orakel.answers
        const authorName = message.author;
        let response
        let color = '#ffa500'

        console.log('Orakel wurde gestarted')

        let request = ""
        args.forEach(letter => {
            request += letter + " "
        });

        if (response != undefined) {
            response = undefined
        }

        do {
            response = answers[Math.floor(Math.random(0, ((answers.length) / 10)) * 10)]
        } while (response === undefined)

        if (Math.floor(Math.random() * 100) === 1) {
            response.value = 'UWU'
        }

        if (response.value === 'NEIN') {
            color = '#ff0000'
        } else if (response.value === 'JA') {
            color = '#00ff00'
        } else if (response.value === 'UWU') {
            color = '#ffc0cb'
        }

        const embed = new EmbedBuilder()
            .setColor(color)
            .setDescription(`<@${authorName.id}> hat das Orakel beschworen`)
            .addFields({ name: "Frage", "value": request })
            .addFields(response)
            .setTimestamp();

        message.channel.send({ embeds: [embed] });


    }

    else if (command === 'ban') {
        const member = message.member;
        const targetName = message.mentions.users.first();
        if (!member.roles.cache.has(modRoleID)) return;

        try {

            let request = ""
            args.forEach(letter => {
                if (letter != ("<@" + targetName.id + ">")) { request += letter + " " }
            });


            let userID = targetName.id

            const targetID = client.users.cache.get(userID)

            console.log(userID)

            if (userID == '') {
                message.reply('Invalid user ID or mention.');
                return;
            }

            banUser(targetID, message, request)
        } catch (error) {
            console.log(error)
        }
    }

    else if (command === 'animes') {
        const authorName = message.author;
        let anime

        do {
            anime = Animes.animeSuggestions[Math.floor(Math.random(0, ((Animes.animeSuggestions.length) / 10)) * 10)]
        } while (anime === undefined)

        let embed

        if (anime.nsfw) {
            embed = new EmbedBuilder()
                .setColor('Blue')
                .setTitle(anime.name)
                .addFields({ name: "Animesuggestions", "value": `Der anime den ich dir Vorschlage heisst ${anime.name} und wird auf ${anime.showStage} mit einer ${anime.evaluation} bewertung bewertet.` })
                .addFields({ name: "NSFW", value: "Bitte beachte, dass dieser Anime 18+ Inhalte enthält" })
                .addFields({ name: "Anime-Link", value: `${anime.link}` })
                .setTimestamp();
        } else {
            embed = new EmbedBuilder()
                .setColor('Blue')
                .setTitle(anime.name)
                .setDescription(`Der anime den ich dir Vorschlage heisst ${anime.name} und wird auf ${anime.showStage} mit einer ${anime.evaluation} bewertung bewertet.`)
                .addFields({ name: "Languages", value: anime.language})
                .addFields({ name: "Anime-Link", value: `${anime.link}` })
                .setTimestamp();
        }

        client.users.send(authorName.id, { embeds: [embed] })
    }

    else {
        const embed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle(`Das ist leider kein gültiger Command`)
            .addFields({ name: "Help", "value": "```artemis help```" })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
});

client.login(config.discord.token);