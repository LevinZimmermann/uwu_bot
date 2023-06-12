module.exports = function (client, message, args, EmbedBuilder) {
    console.log("ping pong command executing")

    message.channel.send('pong');
};