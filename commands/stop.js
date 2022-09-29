const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data : new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Do you want Uta to rest for a bit?'),
	async execute(interaction, player) {
        await interaction.reply('Uta stop singing, uta is fine 😞');
        player.stop();
	},
};