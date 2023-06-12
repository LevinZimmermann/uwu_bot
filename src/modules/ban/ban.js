module.exports = function (
  client,
  message,
  args,
  EmbedBuilder,
  gifLink,
  modRoleID
){
  const member = message.member;

  const targetName = message.mentions.users.first();

  console.log("ban command executing")

  if (!member.roles.cache.has(modRoleID)) return;

  try {
    let request = "";
    args.forEach((letter) => {
      if (letter != "<@" + targetName.id + ">") {
        request += letter + " ";
      }
    });

    if(request.length <= 0) return; 

    let userID = targetName.id;

    const targetID = client.users.cache.get(userID);

    if (userID == "") {
      message.reply("Invalid user ID or mention.");
      return;
    }

    banUser(targetID, message, request);
  } catch (error) {
    console.log(error);
  }

  async function banUser(target, message, reason) {
    await message.guild.bans.create(target.id, { reason }).catch((err) => {
      console.log(err);
      return message.reply({ content: "User is unbanneble!", ephemeral: true });
    });

    let gif;
    do {
      gif =
        gifLink.ban[Math.floor(Math.random(0, gifLink.ban.length / 10) * 10)];
    } while (gif === undefined);

    console.log(`${target.id} was banned`);

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle(`Ban was executed!`)
      .addFields({ name: "Ban", value: `Ban was executed to <@${target.id}>` })
      .addFields({ name: "Reason", value: `${reason}` })
      .setImage(gif.value)
      .setTimestamp();

    message.reply({ embeds: [embed] });
  }
};
