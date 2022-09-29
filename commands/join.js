const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');


module.exports = {
	data : new SlashCommandBuilder()
        .setName('join')
        .setDescription('Uta is coming to youuu and sing with you 😆'),
	async execute(...args) {
        const channel = await args[0].member.voice.channel;

        if (!channel) {
            await args[0].reply('You are not in a channel at the moment');
        }

        await args[0].reply('LETSSSS SINGGGGGGGGGG ALONGGG YEAHHHHHHHHHHHHH 😆🎶');

        joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
	},
};