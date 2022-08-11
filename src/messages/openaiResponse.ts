import { EmbedBuilder } from 'discord.js';
import { CreateCompletionResponse } from 'openai';
import { openai } from '@util/openai';

export default function openaiResponse(
	prompt: string,
	completion: Awaited<ReturnType<typeof openai.createCompletion>>
): EmbedBuilder {
	return new EmbedBuilder() //
		.setColor(0xadd8e6)
		.setAuthor({
			name: `OpenAI model:${completion.data.model}`,
			iconURL: 'https://openai.com/content/images/2022/05/openai-avatar.png',
			url: 'https://beta.openai.com/playground',
		})
		.setTitle(prompt)
		.setDescription(completion.data.choices?.[0].text ?? '[No response fetched...]');
}
