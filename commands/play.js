const { SlashCommandBuilder } = require('discord.js');
const { createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const ytdl = require('ytdl-core');


module.exports = {
	data : new SlashCommandBuilder()
        .setName('play')
        .setDescription('Ask Uta to sing a song for you')
        .addStringOption(option => option
            .setName('link')
            .setDescription('The youtube link that you want Uta to sing')
            .setRequired(true)),
	async execute(interaction, player) {
        const song = ytdl(interaction.options.getString('link'), { filter:'audioonly' });
        const resource = createAudioResource(song, { inlineVolume : true });
        resource.volume.setVolume(1);

        const channel = await interaction.member.voice.channel;

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        connection.subscribe(player);

        await interaction.reply('I will sing a song for you now');

        player.play(resource);
	},
};