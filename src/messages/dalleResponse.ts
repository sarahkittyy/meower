import { EmbedBuilder } from 'discord.js';
import { CreateCompletionResponse } from 'openai';
import { openai } from '@util/openai';

export default function dalleResponse(
	prompt: string,
	completion: Awaited<ReturnType<typeof openai.createImage>>
): EmbedBuilder {
	return new EmbedBuilder() //
		.setColor(0xadd8e6)
		.setAuthor({
			name: `DALL-E Image AI`,
			iconURL: 'https://openai.com/content/images/2022/05/openai-avatar.png',
			url: 'https://beta.openai.com/playground',
		})
		.setTitle(prompt)
		.setImage(completion?.data?.data?.[0]?.url ?? null)
		.setTimestamp();
}
