module.exports = function (client, message, args, EmbedBuilder) {
    const authorName = message.author;
    const commands = [
        { name: "slot", value: "Startet ein Slot-Spiel." },
        { name: "help", value: "Zeigt das Inhaltsverzeichnis der verfügbaren Befehle an." },
        { name: "ping", value: 'Antwortet mit "pong".' },
        { name: "kys", value: "Stoppt den Insult-All-Prozess (nur für Moderatoren)." },
        { name: "kill", value: 'Tötet einen Benutzer, indem er ihn "killt" (nur für Moderatoren).' },
        { name: "mach", value: "Macht einen Benutzer fertig (nur für Moderatoren) oder sendet eine persönliche Nachricht an einen Benutzer." },
        { name: "fragen", value: "Stellt eine Frage an den Chatbot." },
        { name: "orakel", value: "Befrage das Orakel und erhalte eine Antwort." },
        { name: "ban", value: "Bannt einen Benutzer (nur für Moderatoren)." },
        { name: "animes", value: "Schlägt einen Anime vor." },
    ];

    const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Inhaltsverzeichnis der Befehle")
        .setDescription("Hier ist das Inhaltsverzeichnis der verfügbaren Befehle:")
        .addFields(commands)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp();

        client.users.send(authorName.id, { embeds: [embed] });
};