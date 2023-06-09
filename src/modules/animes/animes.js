module.exports = function (client, message, args, EmbedBuilder, Animes) {
  const authorName = message.author;
  let anime;

  do {
    anime =
      Animes.animeSuggestions[
        Math.floor(Math.random(0, Animes.animeSuggestions.length / 10) * 10)
      ];
  } while (anime === undefined);

  let embed;

  if (anime.nsfw) {
    embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle(anime.name)
      .addFields({
        name: "Animesuggestions",
        value: `Der anime den ich dir Vorschlage heisst ${anime.name} und wird auf ${anime.showStage} mit einer ${anime.evaluation} bewertung bewertet.`,
      })
      .addFields({
        name: "NSFW",
        value: "Bitte beachte, dass dieser Anime 18+ Inhalte enthält",
      })
      .addFields({ name: "Anime-Link", value: `${anime.link}` })
      .setTimestamp();
  } else {
    embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle(anime.name)
      .setDescription(
        `Der anime den ich dir Vorschlage heisst ${anime.name} und wird auf ${anime.showStage} mit einer ${anime.evaluation} bewertung bewertet.`
      )
      .addFields({ name: "Languages", value: anime.language })
      .addFields({ name: "Anime-Link", value: `${anime.link}` })
      .setTimestamp();
  }

  client.users.send(authorName.id, { embeds: [embed] });
};
