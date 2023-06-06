const { start } = require('./commands/slots/slot');
const { insultAll } = require('./commands/insult');

const prefix = 'uwu'; // Präfix für den Befehl
const modRoleID = '1115360144570724362';

async function handleMessage(message) {
  const UserMessage = message.content.toLowerCase();
  if (!UserMessage.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  const authorID = message.author.id;

  if (command === 'help') {
    message.channel.send('ich kann auch nicht helfen');
  }

  if (command === 'slot') {
    const number = args[0];
    const authorName = message.author.username;
    let response = start(number, authorID, authorName);
    message.channel.send(response);
  }

  if (command === 'ping') {
    message.channel.send('pong');
  }

  if (command === 'kys') {
    if (message.member.roles.cache.has(modRoleID) && args[1] === 'alli' && args[2] === 'fertig') {
      stop = true;
      message.channel.send('Insult-All-Prozess wurde gestoppt.');
    }
  }

  if (command === 'kill') {
    const targetName = message.mentions.users.first();
    const authorName = message.author;
    if (!targetName) {
      message.channel.send('Du hast keinen Benutzer erwähnt!');
      return;
    }
    const member = message.guild.members.cache.get(targetName.id);
    if (member) {
      message.channel.send(`<@${authorName.id}> hat <@${targetName.id}> gekillt`);
    }
  }

  if (command === 'mach') {
    const first = args[0];
    const second = args[1];
    const third = args[2];
    const fourth = args[3];
    const member = message.member;

    if (member.roles.cache.has(modRoleID)) {
      if (second === 'alli' && third === 'fertig') {
        insultAll(first, message);
      }
    } else {
      const targetName = message.mentions.users.first();
      if (!targetName) {
        message.channel.send('Du hast keinen Benutzer erwähnt!');
        return;
      }
      message.channel.send(`UWU macht <@${targetName.id}> fertig`);
      client.users.send(targetName.id, `UWU macht <@${targetName.id}> fertig`);
    }
  }

  if (command === 'fragen') {
    let userMessage = '';
    args.forEach(element => {
      userMessage += element;
    });
    GPTChatCommunication(userMessage, message);
  }
}

module.exports = { handleMessage };
