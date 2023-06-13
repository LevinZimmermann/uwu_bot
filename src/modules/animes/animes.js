const APIquery =  require("./API-query");

module.exports = function (client, message, args, EmbedBuilder, Animes) {
  const subcommand = args.shift().toLowerCase();
  
  let request
  let anime;


  args.forEach(letter => {
    if(letter === args[0]) return;
    request += letter + ' '
  });


  switch (subcommand) {
    case 'search':
      anime = APIquery.getSearch({query: request})
      break;
  
    case 'topten':
      anime = APIquery.getTopTen()
    default:
      break;
  }

  embed = new EmbedBuilder()
  .setColor("Blue")
  .setTitle(anime.name)
  .setDescription(`${anime.synopsis}`)
  .addFields({ name: "Raiting", value: anime.score })
  .addFields({ name: "Episoden", value: `Der Anime enthält ${anime.episodes} Episoden` })
  .addFields({ name: "Status", value: `${anime.status}`})
  .setTimestamp();



  // const authorName = message.author;

  // console.log("animes command executing")

  // do {
  //   anime =
  //     Animes.animeSuggestions[
  //       Math.floor(Math.random(0, Animes.animeSuggestions.length / 10) * 10)
  //     ];
  // } while (anime === undefined);

  // let embed;

  // if (anime.nsfw) {
  //   embed = new EmbedBuilder()
  //     .setColor("Blue")
  //     .setTitle(anime.name)
  //     .addFields({
  //       name: "Animesuggestions",
  //       value: `Der anime den ich dir Vorschlage heisst ${anime.name} und wird auf ${anime.showStage} mit einer ${anime.evaluation} bewertung bewertet.`,
  //     })
  //     .addFields({
  //       name: "NSFW",
  //       value: "Bitte beachte, dass dieser Anime 18+ Inhalte enthält",
  //     })
  //     .addFields({ name: "Anime-Link", value: `${anime.link}` })
  //     .setTimestamp();
  // } else {
  // }

  // client.users.send(authorName.id, { embeds: [embed] });
};
