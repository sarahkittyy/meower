import { SlashCommandBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction } from 'discord.js';
import ICommand from './command';

import log from '@util/log';

import openaiResponse from '@msg/openaiResponse';
import { openai } from '@util/openai';
import error from '@msg/error';

export default <ICommand>{
	data: new SlashCommandBuilder() //
		.setName('openai')
		.setDescription('Send a prompt to OpenAI and fetch the resulting text.')
		.addStringOption((opt) =>
			opt //
				.setName('prompt')
				.setRequired(true)
				.setDescription('The prompt to send to OpenAI')
		),
	callback: async (interaction: ChatInputCommandInteraction) => {
		await interaction.deferReply();
		try {
			const prompt = interaction.options.getString('prompt', true);
			const completion = await openai.createCompletion({
				model: 'text-davinci-002',
				prompt,
				temperature: 0.9,
				best_of: 1,
				max_tokens: 2048,
			});
			return interaction.editReply({
				embeds: [openaiResponse(prompt, completion)],
			});
		} catch (e) {
			return interaction.editReply({
				embeds: [error(`OpenAI API error: ${e}`)],
			});
		}
	},
};
