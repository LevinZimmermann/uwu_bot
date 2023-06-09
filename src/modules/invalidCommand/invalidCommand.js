module.exports = function (client, message, args, EmbedBuilder) {
  const embed = new EmbedBuilder()
    .setColor("#ff0000")
    .setTitle(`Das ist leider kein gültiger Command`)
    .addFields({ name: "Help", value: "```artemis help```" })
    .setTimestamp();

  message.reply({ embeds: [embed] });
};
