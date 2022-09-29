const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');


module.exports = {
	data : new SlashCommandBuilder()
        .setName('disconnect')
        .setDescription('Do you want Uta chan to go back home? 😞'),
	async execute(...args) {
        const [interaction] = args;
        const connection = getVoiceConnection(interaction.guildId);
        await interaction.reply('Bye - bye 😞💔');
        connection.destroy();
	},
};