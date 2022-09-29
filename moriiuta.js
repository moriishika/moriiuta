const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { createAudioPlayer } = require('@discordjs/voice');
const fs = require('node:fs');
const path = require('node:path');

require('dotenv').config();

const client = new Client({ intents : [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

client.commands = new Collection();

// This code for creating the path of the command file
const commandPath = path.join(__dirname, 'commands');

// This will get all the command names
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

// This is Main Audio Player
const player = createAudioPlayer();

for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
}

client.on('ready', () => {
    console.log('Uta is ready to rock and rolll 🎶😆');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction, player);
    }
    catch (error) {
        console.log(error);
        await interaction.reply({ content : 'Uta got a problem 😭', ephemeral : true });
    }
});

client.login(process.env.TOKEN);