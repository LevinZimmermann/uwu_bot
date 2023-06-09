module.exports = function (client, message, args, EmbedBuilder) {
    const number = args[0];
    const authorName = message.author.username;
    let response = slot.start(number, authorID, authorName)
    message.channel.send(response)
};