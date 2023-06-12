module.exports = function (client, message, args, EmbedBuilder, config) {
  const authorName = message.author
  let answers = config.orakel.answers
  let response

  console.log("Orakel command executing")

  let request = "";
  args.forEach((letter) => {
    request += letter + " "
  });

  if (response != undefined) {
    response = undefined;
  }

  do {
    response = answers[Math.floor(Math.random(0, answers.length / 10) * 10)]
  } while (
    response === undefined &&
    Math.floor(Math.random() * 100) <= response.probability
  );

  const embed = new EmbedBuilder()
    .setColor(response.color)
    .setDescription(`<@${authorName.id}> hat das Orakel beschworen`)
    .addFields({ name: "Frage", value: request })
    .addFields(response)
    .setTimestamp()

  message.channel.send({ embeds: [embed] });
};
