import { EmbedBuilder } from 'discord.js';

export default function success(msg: string): EmbedBuilder {
	return new EmbedBuilder() //
		.setTitle('Success!')
		.setColor(0x00ff00)
		.setDescription(msg)
		.setTimestamp();
}
