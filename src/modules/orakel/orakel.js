module.exports = function (client, message, args, EmbedBuilder, config) {
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
};