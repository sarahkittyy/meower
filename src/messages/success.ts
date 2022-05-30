import { MessageEmbed } from 'discord.js';

export default function success(msg: string): MessageEmbed {
	return new MessageEmbed() //
		.setTitle('Success!')
		.setColor(0x00ff00)
		.setDescription(msg)
		.setTimestamp();
}
