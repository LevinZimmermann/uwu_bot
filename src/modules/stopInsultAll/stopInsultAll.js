module.exports = function (client, message, args, EmbedBuilder) {
    const member = message.member;
    if (member.roles.cache.has(modRoleID)) {
        stop = true;
        message.channel.send('Insult-All-Prozess wurde gestoppt.');
    }
};