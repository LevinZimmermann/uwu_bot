# Artemis Discord Bot

Artemis is a Discord bot built using Node.js and the Discord.js library. It provides various commands and functionalities to enhance the Discord server experience. The bot is designed to respond to user messages starting with a specific prefix ("artemis") and execute the corresponding command.

## Prerequisites

Before running the bot, ensure that you have the following:

- Node.js installed on your system
- Discord bot token obtained from the Discord Developer Portal
- Configuration file (`config.json`) containing necessary bot configurations
- JSON files for additional resources (`giflink.json`, `anime.json`)

## Installation

1. Clone the repository or download the source code.
2. Install the required dependencies by running the following command in the project directory:

```
npm install
```

3. Replace the placeholder values in the `config.json` file with your actual bot token and other necessary configurations.

## Usage

To start the bot, run the following command:

```
npm run start
```
To start the bot in the developer mode, run the following command:

```
npm run dev
```


The bot will initialize and connect to the Discord gateway. You should see a "Bot ist bereit!" message in the console, indicating that the bot is ready.

## Commands

Artemis provides the following commands:

- `help`: Displays a list of available commands and their descriptions.
- `slot`: Simulates a slot machine game.
- `ping`: Measures the latency between the bot and the Discord API server.
- `kys`: Stops the insult command for all users (requires moderator role).
- `kill`: Sends a GIF of a character killing another character.
- `mach`: Generates a random insult using the ChatGPT API.
- `fragen`: Answers random questions using the ChatGPT API.
- `orakel`: Provides answers to specific questions using predefined responses.
- `ban`: Bans a user from the server (requires moderator role).
- `animes`: Displays information about various anime titles.

## Extending the Bot

To add or modify commands, follow these steps:

1. Create a new JavaScript file in the `src/modules` directory for your command.
2. Implement the command logic, following the existing command files as examples.
3. Import the newly created module in the `artemis.js` file.
4. Add an `else if` statement in the `messageCreate` event handler to handle the command invocation.
5. Test the bot with the new command and make any necessary adjustments.

## Config.json

To add the config.json file, enter the following code into the config.json file.

```
{
  "discord": {
    "token": "YOUR_DISCORD_TOKEN",
    "modRoleId": "IF_YOU_HAVE_A_MODROLEID"
  },
  "orakel": {
    // dont touch the following code!
    "answers": [
      { "name": "orakel", "value": "JA", "probability": "90", "color": "#00ff00" },
      { "name": "orakel", "value": "NEIN", "probability": "90", "color": "#ff0000" },
      { "name": "orakel", "value": "VIELLEICHT", "probability": "80", "color":"#ffa500"},
      { "name": "orakel", "value": "EHER JA", "probability": "70", "color":"#ffa500" },
      { "name": "orakel", "value": "EHER NEIN", "probability": "70", "color":"#ffa500" },
      { "name": "orakel", "value": "UWU", "probability": "5", "color": "#ffc0cb" }
    ]
  }
}
```

Die config.json ist eine externe Konfigurationsdatei für den Code. Sie enthält zwei Hauptabschnitte:

- `Discord`: Hier werden die Discord-Informationen gespeichert, wie der Token des Bots und die Mod-Rollen-ID.
- `orakel`: Hier werden die Antworten des Orakel-Moduls gespeichert. Jede Antwort besteht aus einem Namen, einem Wert, einer Wahrscheinlichkeit und einer Farbe.

Diese Datei ermöglicht es, sensible Informationen und Konfigurationen vom eigentlichen Code zu trennen und sie leicht anzupassen oder zu aktualisieren.

Stelle sicher, dass die config.json im gleichen Verzeichnis wie der restliche Code liegt und dass die Werte korrekt und gültig sind.


Bitte beachte, dass es sich hierbei um eine Beschreibung der `config.json` handelt und nicht um den eigentlichen Code.
