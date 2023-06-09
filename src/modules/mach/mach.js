module.exports = function (client, message, args, EmbedBuilder) {
    const first = args[0]
    const second = args[1]
    const third = args[2]
    const fourth = args[3]
    const member = message.member;

    if (second === 'alli' && third === 'fertig') {
        console.log('"mach sie alli fertig" wurde gestarted')
        insultAll(first, message)
    } else {
        console.log(`mach wurde auf ${member} gestarted`)
        const targetName = message.mentions.users.first();
        if (!targetName) {
            message.channel.send('Du hast keinen Benutzer erwähnt!');
            return;
        }
        message.channel.send(`UWU macht <@${targetName.id}> fertig`)
        for (let i = 0; i <= 10; i++) {
            client.users.send(targetName.id, `Dich mach ich fertig <@${targetName.id}>`);
        }
    }

    async function insultAll(first, message) {
        let playerArr = []
        playerArr = await getPlayers(message.guild)
        stop = false; // Zurücksetzen des Flags für jeden Aufruf
    
        for (const player of playerArr) {
            if (stop) {
                console.log('Stopping the insultAll process.');
                break;
            }
    
            message.channel.send(`UWU macht <@${player.id}> fertig`)
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
};