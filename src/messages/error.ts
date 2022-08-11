import { EmbedBuilder } from 'discord.js';

export default function error(msg: string): EmbedBuilder {
	return new EmbedBuilder() //
		.setTitle('Error')
		.setColor(0xff0000)
		.setDescription(msg)
		.setTimestamp();
}
