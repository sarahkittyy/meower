import { SlashCommandBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction } from 'discord.js';
import ICommand from './command';

import log from '@util/log';

import dalleResponse from '@msg/dalleResponse';
import { openai } from '@util/openai';
import error from '@msg/error';

export default <ICommand>{
	data: new SlashCommandBuilder() //
		.setName('dalle')
		.setDescription('Runs the openai DALL-E image generator given a prompt')
		.addStringOption((opt) =>
			opt //
				.setName('prompt')
				.setRequired(true)
				.setDescription('The prompt to send to DALL-E')
		),
	callback: async (interaction: ChatInputCommandInteraction) => {
		try {
			await interaction.deferReply();
			const prompt = interaction.options.getString('prompt', true);
			const completion = await openai.createImage({
				prompt,
				n: 1,
				size: '512x512',
			});
			await interaction.editReply({
				embeds: [dalleResponse(prompt, completion)],
			});
		} catch (e: any) {
			log.info(`OpenAI error: ${JSON.stringify(e?.response)}`);
			return interaction
				.editReply({
					embeds: [error(`${e?.response?.data}`)],
				})
				.catch(log.error);
		}
	},
};
