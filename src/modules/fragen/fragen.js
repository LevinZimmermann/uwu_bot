module.exports = function (client, message, args, EmbedBuilder) {
    let usermessage

    console.log("Fragen command executing")

    args.forEach(element => {
        usermessage += element
    })
    GPTChatCommunication(usermessage, message)
};
