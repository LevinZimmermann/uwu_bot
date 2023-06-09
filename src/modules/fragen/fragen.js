module.exports = function (client, message, args, EmbedBuilder) {
    let usermessage
    args.forEach(element => {
        usermessage += element
    })
    GPTChatCommunication(usermessage, message)
};
