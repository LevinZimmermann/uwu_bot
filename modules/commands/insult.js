async function insultAll(first, message) {
  let playerArr = [];
  playerArr = await getPlayers(message.guild);
  stop = false; // Zurücksetzen des Flags für jeden Aufruf

  for (const player of playerArr) {
    if (stop) {
      console.log('Stopping the insultAll process.');
      break;
    }

    message.channel.send(`UWU macht <@${player.id}> fertig`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

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

module.exports = { insultAll };
