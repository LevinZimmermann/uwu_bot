module.exports = function (client, message, args, EmbedBuilder, gifLink) {
  const targetName = message.mentions.users.first();
  const authorName = message.author;
  console.log("kill command executing");
  if (!targetName) {
    message.channel.send("Du hast keinen Benutzer erwähnt!");
    return;
  }

  const member = message.guild.members.cache.get(targetName.id);
  if (member) {
    let gif;
    do {
      gif =
        gifLink.kill[Math.floor(Math.random(0, gifLink.kill.length / 10) * 10)];
    } while (gif === undefined);
    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setDescription(`<@${authorName.id}> hat <@${targetName.id}> gekillt`)
      .setImage(gif.value)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};
